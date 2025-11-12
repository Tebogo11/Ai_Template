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
    fit,
    themes,
    prompt,
    setIsGenerating,
    setOutfitId,
    is_new_outfit,
    setApiError,
    setPreviewOutfit,
  } = useGeneratorSetting();
  const { title, setTitle, setWardrobeId, wardrobeId } = useWardrobeStore();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const generatorOutfit = useMutation(api.outfit.generatorOutfit);
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  const invokeToken = useMutation(api.user.tokens.invokingToken);

  const onSubmit = async () => {
    setApiError(null);
    if (!modal) throw new Error("Modal is required");
    setPreviewOutfit("");
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
        fit,
        style_theme: themes,
        initial_prompt: prompt,
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
      await invokeToken();
    } catch (err) {
      setApiError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return { onSubmit };
};

export default useSubmitForm;
