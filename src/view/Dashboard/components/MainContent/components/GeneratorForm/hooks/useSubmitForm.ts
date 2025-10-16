import { useState } from "react";
import { useMutation } from "convex/react";
import {
  GoogleGenAI,
  ContentListUnion,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/genai";
import { AccessoriesType, useGeneratorSetting } from "@/store/useGeneratorData";
import { api } from "../../../../../../../../convex/_generated/api";
import { saveImagesToStorage } from "./utils";
import { GenerateDataType } from "../types";
import { imgGenPromp } from "./Prompt";

interface GenerateAIParams {
  modal: string;
  accessories: AccessoriesType[];
  style_intensity: number;
  formality: number;
  initial_prompt: string;
}

const useSubmitForm = () => {
  const {
    modal,
    accessories,
    styleIntensity,
    formality,
    prompt,
    setPreviewOutfit,
    setIsGenerating,
    setOutfitId,
  } = useGeneratorSetting();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const generatorOutfit = useMutation(api.aiSystem.generatorOutfit);

  const convertToBase64 = async (file: File | string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            const base64 = reader.result.replace(
              /^data:image\/(png|jpeg|jpg);base64,/,
              "",
            );
            resolve(base64);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };
        reader.readAsDataURL(file);
      } else if (typeof file === "string") {
        fetch(file)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                const base64 = reader.result.replace(
                  /^data:image\/(png|jpeg|jpg);base64,/,
                  "",
                );
                resolve(base64);
              }
            };
            reader.readAsDataURL(blob);
          })
          .catch(reject);
      }
    });
  };

  const handleGeneratedContent = (response: any) => {
    if (!response?.candidates?.[0]?.content?.parts) return false;

    let hasInlineData = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64String = part.inlineData.data as string;
        const imageUrl = `data:image/png;base64,${base64String}`;
        setPreviewOutfit(imageUrl);
        hasInlineData = true;
      }
    }
    return hasInlineData;
  };

  const retry = async (ai: any, base64Image: string, aiSummary: string) => {
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

    const hasImage = handleGeneratedContent(retryResponse);
    if (!hasImage) {
      throw new Error("Failed to generate image. Please try again.");
    }
  };

  const generatePreviewWithAI = async ({
    modal,
    accessories,
    style_intensity,
    formality,
    initial_prompt,
  }: GenerateAIParams) => {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY || "",
    });

    const base64Image = await convertToBase64(modal);
    const fullPrompt: ContentListUnion = [
      { text: imgGenPromp },
      {
        text: `
        Modal: [First image]
        Accessories: [Every other image]
        Style Intensity: ${style_intensity}
        Formality: ${formality}
        Season: winter
        User Prompt: ${initial_prompt}
        Is New Outfit: ${true}
        Model: image 1
        `,
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
      ...(await Promise.all(
        accessories.map((acc) =>
          convertToBase64(acc.url).then((data) => ({
            inlineData: {
              mimeType: "image/png",
              data,
            },
          })),
        ),
      )),
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: fullPrompt,
      config: {
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.OFF,
          },
        ],
      },
    });

    const hasImage = handleGeneratedContent(response);
    if (!hasImage && response?.candidates?.[0]?.content?.parts) {
      // If no image generated, retry with only the first image and a summary of the previous attempt

      const textContent = response.candidates[0].content.parts
        .filter((part) => part.text)
        .map((part) => part.text)
        .join(" ");

      if (textContent.includes("no human found")) {
        throw new Error("No human found in the provided image.");
      }
      await retry(ai, base64Image, textContent);
    }
  };

  const onSubmit = async () => {
    if (!modal) throw new Error("Modal is required");

    setIsGenerating(true);
    try {
      const { modalStorageId, accessoriesStorageIds } =
        await saveImagesToStorage(generateUploadUrl, modal, accessories);

      const generateData = {
        modal: modalStorageId,
        accessories: accessoriesStorageIds,
        style_intensity: Number(styleIntensity),
        formality: Number(formality),
        initial_prompt: prompt,
        season: "Summer",
        is_new_outfit: true,
      } as GenerateDataType;
      const { outfitId } = await generatorOutfit(generateData);
      console.log("Outfit ID:", outfitId);
      if (!outfitId) throw new Error("Failed to generate outfit");
      setOutfitId(outfitId);
    } finally {
      setIsGenerating(false);
    }
  };

  return { onSubmit };
};

export default useSubmitForm;
