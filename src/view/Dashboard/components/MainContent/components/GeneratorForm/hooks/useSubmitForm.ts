import { useMutation, useQuery } from "convex/react";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { api } from "../../../../../../../../convex/_generated/api";
import { saveImagesToStorage } from "./utils";
import { GenerateDataType } from "../types";
import { useWardrobeStore } from "@/store/useWardrobeStore";

const useSubmitForm = () => {
  const {
    modal,
    accessories,
    styleIntensity,
    formality,
    prompt,
    setIsGenerating,
    setOutfitId,
    season,
    is_new_outfit,
    setApiError,
  } = useGeneratorSetting();
  const { title, setTitle, setWardrobeId, wardrobeId } = useWardrobeStore();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const generatorOutfit = useMutation(api.outfit.generatorOutfit);
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);

  const onSubmit = async () => {
    setApiError(null);
    if (!modal) throw new Error("Modal is required");

    setIsGenerating(true);

    try {
      const { modalStorageId, accessoriesStorageIds } =
        await saveImagesToStorage(
          getImageUrl,
          generateUploadUrl,
          modal,
          accessories,
        );

      const generateData = {
        modal: modalStorageId,
        accessories: accessoriesStorageIds,
        style_intensity: Number(styleIntensity),
        formality: Number(formality),
        initial_prompt: prompt,
        season,
        is_new_outfit,
        title,
        wardrobeId,
      } as GenerateDataType;

      const {
        outfitId,
        wardrobeId: tempWardrobeId,
        title: generatedTitle,
      } = await generatorOutfit(generateData);

      if (!outfitId) throw new Error("Failed to generate outfit");
      setOutfitId(outfitId);
      setTitle(generatedTitle || "untitled wardrobe");
      setWardrobeId(tempWardrobeId);
    } catch (err) {
      setApiError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return { onSubmit };
};

export default useSubmitForm;
