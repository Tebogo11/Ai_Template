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
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

const GeneratorForm = () => {
  const setSelectedOutfit = useGeneratorSetting((s) => s.setSelectedOutfit);
  const outfitID = useGeneratorSetting((s) => s.outfitId);

  const recentOutfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitID || "",
  });

  useEffect(() => {
    const getOutfitData = async () => {
      setSelectedOutfit({
        accessories:
          recentOutfit?.accessories?.map((url, index) => {
            return {
              id: `${index}`,
              url: url,
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
