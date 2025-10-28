export type GenerateDataType = {
  modal: string;
  accessories: { storageId: string }[];
  fit: "bodyCon" | "tailored" | "standardFit" | "relaxed" | "oversized";
  style_theme: string[];
  initial_prompt: string;
  title: string;
};
