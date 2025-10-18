"use node";
import {
  ContentListUnion,
  GenerateContentResponse,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/genai";

export const fetchImageAsBase64 = async (url: string) => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  // Convert ArrayBuffer to base64 string
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export function dataURItoBlob(dataURI: string) {
  const [header, base64] = dataURI.split(",");
  const mimeMatch = header.match(/data:(.*);base64/);
  const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mimeType });
}

export const handleGeneratedContent = (response: GenerateContentResponse) => {
  let imageURL = "";
  let summary = "";
  if (!response?.candidates?.[0]?.content?.parts)
    throw new Error("No content parts found");

  let hasInlineData = false;
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64String = part.inlineData.data as string;
      imageURL = `data:image/png;base64,${base64String}`;

      hasInlineData = true;
    }
    summary = response.candidates[0].content.parts
      .filter((part) => part.text && part.text.includes("|"))
      .map((part) => part.text)
      .join(" ");
  }
  return { hasInlineData, imageURL, summary };
};

export const retry = async (
  ai: any,
  base64Image: string,
  aiSummary: string,
) => {
  const rePrompt: ContentListUnion = [
    {
      text: `Generate only the outfit image based on the following AI summary and model.
        Do not include any extra text or description.
        AI Summary: ${aiSummary}`,
    },
    { text: `Modal: image 1` },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const retryResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: rePrompt,
    config: {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.OFF,
        },
      ],
    },
  });

  const { hasInlineData, imageURL } = handleGeneratedContent(retryResponse);
  if (!hasInlineData) {
    throw new Error("Failed to generate image. Please try again.");
  }
  return imageURL;
};
