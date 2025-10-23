export const cleanAiText = (text: string): string => {
  return text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[\[\]"]+/, "")
    .replace(/[\[\]"]+$/, "")
    .trim();
};
