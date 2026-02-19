import { useMutation } from "convex/react";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { api } from "../../../../../../../../convex/_generated/api";
import { saveImagesToStorage } from "./utils";
import { GenerateDataType } from "../types";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { AmountOfChangeOption } from "../components/ToggleSelect/const";

const useSubmitForm = () => {
  const {
    modal,
    accessories,
    fit,
    amount_of_change,
    event,
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
      const hasPrompt = prompt.trim().length > 0;
      const hasThemes = themes.length > 0;
      const hasAccessories = accessoriesStorageIds.length > 0;
      const hasNonDefaultChange =
        amount_of_change !== AmountOfChangeOption.None ||
        fit !== "relaxed" ||
        event !== "casual";
      const generation_mode: GenerateDataType["generation_mode"] =
        hasPrompt || hasThemes || hasAccessories || hasNonDefaultChange
          ? "style_transfer"
          : "improve_only";

      const generateData = {
        modal: modalStorageId,
        accessories: accessoriesStorageIds,
        fit,
        amount_of_change,
        event,
        themes,
        initial_prompt: prompt,
        is_new_outfit,
        generation_mode,
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
