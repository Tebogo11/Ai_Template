export type GenerateDataType = {
  modal: string;
  accessories: { storageId: string }[];
  fit:
    | "slimAndSharp"
    | "tailored"
    | "relaxed"
    | "oversized"
    | "flowing";
  amount_of_change: "None" | "Light" | "Moderate" | "Major" | "Complete";
  event:
    | "casual"
    | "creative_workspace"
    | "corporate"
    | "date_night"
    | "party"
    | "formal"
    | "editorial";
  themes: string[];
  initial_prompt: string;
  generation_mode: "improve_only" | "style_transfer";
  title: string;
  wardrobeId?: string;
  is_new_outfit?: boolean;
};
