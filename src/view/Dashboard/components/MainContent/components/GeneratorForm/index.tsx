import { useEffect } from "react";
import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import {
  AccessoriesType,
  OutfitData,
  useGeneratorSetting,
} from "@/store/useGeneratorData";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useAppSetting } from "@/store/useAppSetting";
import IsNewOutput from "./components/ToggleSection/IsNewOutput";
import Fit from "./components/Select/Fit";
import Tags from "./components/TagInput/Tags";

const GeneratorForm = () => {
  const { setSelectedOutfit } = useGeneratorSetting();
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
      console.log("recentOutfit", recentOutfit);
      setSelectedOutfit({
        accessories:
          recentOutfit?.accessories?.map((url, index) => {
            return {
              id: `${index}`,
              url: url.storageId,
            } as AccessoriesType;
          }) || [],
        initial_prompt: recentOutfit?.initial_prompt || "",
        modal: recentOutfit?.modal || "",
        fit: recentOutfit?.fit || "standardFit",
        themes: recentOutfit?.style_theme || [],
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
        fit: "standardFit",
        themes: [],
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
          <div className="flex">
            <Fit />
            <IsNewOutput />
          </div>
          <Tags />
        </div>
      </div>
      <div className="flex flex-grow-1">
        <PromptSection />
      </div>
    </div>
  );
};

export default GeneratorForm;
