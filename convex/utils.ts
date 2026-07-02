'use node';

type InteractionLike = {
  output_image?: {
    data?: string;
    mime_type?: string;
  };
  output_text?: string;
  steps?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      data?: string;
      mime_type?: string;
    }>;
  }>;
};

type ExtractedContent = {
  hasInlineData: boolean;
  imageURL: string;
  summary: string;
};

const summarizeResponse = (value: unknown) => {
  try {
    const seen = new WeakSet<object>();
    const serialized = JSON.stringify(
      value,
      (_key, currentValue) => {
        if (typeof currentValue === 'string') {
          if (currentValue.length > 240) {
            return `${currentValue.slice(0, 240)}...[truncated]`;
          }
          return currentValue;
        }

        if (currentValue && typeof currentValue === 'object') {
          if (seen.has(currentValue as object)) {
            return '[Circular]';
          }
          seen.add(currentValue as object);
        }

        return currentValue;
      },
      2,
    );

    return serialized.length > 2000
      ? `${serialized.slice(0, 2000)}...[truncated]`
      : serialized;
  } catch {
    return String(value);
  }
};

const extractContentFromUnknown = (value: unknown): ExtractedContent => {
  let imageURL = '';
  const textParts = new Set<string>();

  const visit = (currentValue: unknown) => {
    if (!currentValue) return;

    if (Array.isArray(currentValue)) {
      for (const item of currentValue) {
        visit(item);
      }
      return;
    }

    if (typeof currentValue !== 'object') {
      return;
    }

    const record = currentValue as Record<string, unknown>;

    if (typeof record.text === 'string' && record.text.includes('|')) {
      textParts.add(record.text);
    }

    const inlineData = record.inlineData;
    if (inlineData && typeof inlineData === 'object') {
      const inlineDataRecord = inlineData as Record<string, unknown>;
      const base64Data = inlineDataRecord.data;
      const mimeType =
        typeof inlineDataRecord.mimeType === 'string' &&
        inlineDataRecord.mimeType.length > 0
          ? inlineDataRecord.mimeType
          : 'image/png';

      if (typeof base64Data === 'string' && base64Data.length > 0) {
        imageURL = `data:${mimeType};base64,${base64Data}`;
      }
    }

    for (const nestedValue of Object.values(record)) {
      visit(nestedValue);
    }
  };

  visit(value);

  return {
    hasInlineData: Boolean(imageURL),
    imageURL,
    summary: Array.from(textParts).join(' '),
  };
};

export const fetchImageAsBase64 = async (url: string) => {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = await res.arrayBuffer();
  // Convert ArrayBuffer to base64 string
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${contentType};base64,${base64}`;
};

export const fetchImageAsBase64Raw = async (url: string) => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const fetchImageAsBase64WithMime = async (url: string) => {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type') || 'image/png';
  const buffer = await res.arrayBuffer();

  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return {
    data: btoa(binary),
    mimeType: contentType,
  };
};

export function dataURItoBlob(dataURI: string) {
  let base64: string;
  let mimeType: string;

  if (dataURI.startsWith('data:')) {
    // Proper data URI: data:<mime>;base64,<data>
    const commaIndex = dataURI.indexOf(',');
    if (commaIndex === -1) {
      throw new Error('Invalid data URI: missing comma separator');
    }
    const header = dataURI.substring(0, commaIndex);
    base64 = dataURI.substring(commaIndex + 1);
    const mimeMatch = header.match(/data:(.*?);base64/);
    mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  } else {
    // Raw base64 string without data URI prefix
    base64 = dataURI;
    mimeType = 'image/png';
  }

  // Pad base64 to valid length (must be multiple of 4)
  const remainder = base64.length % 4;
  if (remainder) {
    base64 += '='.repeat(4 - remainder);
  }

  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mimeType });
}

export const handleGeneratedContent = (interaction: InteractionLike) => {
  if (interaction.output_image?.data) {
    const mimeType = interaction.output_image.mime_type || 'image/png';
    return {
      hasInlineData: true,
      imageURL: `data:${mimeType};base64,${interaction.output_image.data}`,
      summary: interaction.output_text || '',
    };
  }

  // Interleaved or multi-step responses can store images in steps instead of output_image.
  const steps = interaction.steps || [];
  for (const step of steps) {
    if (step.type !== 'model_output' || !Array.isArray(step.content)) {
      continue;
    }

    for (const block of step.content) {
      if (block.type === 'image' && block.data) {
        const mimeType = block.mime_type || 'image/png';
        return {
          hasInlineData: true,
          imageURL: `data:${mimeType};base64,${block.data}`,
          summary: interaction.output_text || '',
        };
      }
    }
  }

  const extracted = extractContentFromUnknown(interaction);
  if (extracted.hasInlineData || extracted.summary) {
    return extracted;
  }

  throw new Error(`No image content found. Response: ${summarizeResponse(interaction)}`);
};
