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

const GeneratorForm = () => {
  const setSelectedOutfit = useGeneratorSetting((s) => s.setSelectedOutfit);
  const outfitID = useGeneratorSetting((s) => s.outfitId);

  const recentOutfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitID || "",
  });

  const getImageUrlList = useMutation(api.storage.getListImageUrl);
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);

  useEffect(() => {
    const getOutfitData = async () => {
      const modalUrl = await getImageUrl({
        storageId: recentOutfit?.modal || "",
      });
      const accessories = await getImageUrlList({
        storageIdsList: recentOutfit?.accessories || [],
      });
      setSelectedOutfit({
        accessories:
          accessories?.map((url, index) => {
            return {
              id: `${index}`,
              url: url,
            } as AccessoriesType;
          }) || [],
        formality: recentOutfit?.formality || "",
        initial_prompt: recentOutfit?.initial_prompt || "",
        modal: modalUrl || "",
        season: recentOutfit?.season || "",
        style_intensity: recentOutfit?.style_intensity || "",
      } as OutfitData);
    };
    if (outfitID && recentOutfit) {
      getOutfitData();
    }
  }, [outfitID, recentOutfit, setSelectedOutfit]);
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
      <div className="w-full ">
        <ImageSection />
        <div className="w-full my-4 mt-5 gap-2.5">
          <Slider />
          <ToggleSections />
        </div>
      </div>
      <div className="flex flex-1">
        <PromptSection />
      </div>
    </div>
  );
};

export default GeneratorForm;
