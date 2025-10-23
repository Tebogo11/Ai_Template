import { useEffect } from "react";
import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import Slider from "./components/Slider/Slider";
import ToggleSections from "./components/ToggleSection";
import {
  AccessoriesType,
  OutfitData,
  useGeneratorSetting,
} from "@/store/useGeneratorData";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useAppSetting } from "@/store/useAppSetting";

const GeneratorForm = () => {
  const setSelectedOutfit = useGeneratorSetting((s) => s.setSelectedOutfit);
  const outfitID = useGeneratorSetting((s) => s.outfitId);
  const { isPreviewPage } = useAppSetting();

  const recentOutfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitID || "",
  });
  // const getImageUrlList = useMutation(api.storage.getListImageUrl);
  // const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  useEffect(() => {
    const getOutfitData = async () => {
      // const modalUrl = await getImageUrl({
      //   storageId: recentOutfit?.modal || "",
      // });
      // const accessories = await getImageUrlList({
      //   storageIdsList: recentOutfit?.accessories.map((a) => a.storageId) || [],
      // });
      setSelectedOutfit({
        accessories:
          recentOutfit?.accessories?.map((url, index) => {
            return {
              id: `${index}`,
              url: url.storageId,
            } as AccessoriesType;
          }) || [],
        formality: recentOutfit?.formality || "",
        initial_prompt: recentOutfit?.initial_prompt || "",
        modal: recentOutfit?.modal || "",
        season: recentOutfit?.season || "",
        style_intensity: recentOutfit?.style_intensity || "",
      } as OutfitData);
    };
    if (outfitID && recentOutfit) {
      getOutfitData();
    } else {
      setSelectedOutfit({
        accessories: [] as AccessoriesType[],
        formality: 50,
        initial_prompt: "",
        modal: "",
        season: "",
        style_intensity: 50,
      } as OutfitData);
    }
  }, [outfitID, recentOutfit, setSelectedOutfit]);

  return (
    <div
      className={`${isPreviewPage ? "hidden" : "grid"} md:grid grid-rows-[400px 2fr] w-1/1 md:w-1/2 min-h-[90dvh] pb-5`}
    >
      <div className="w-full">
        <ImageSection />
        <div className="w-full mt-4 gap-2">
          <Slider />
          <ToggleSections />
        </div>
      </div>
      <div className="flex flex-grow-1">
        <PromptSection />
      </div>
    </div>
  );
};

export default GeneratorForm;
