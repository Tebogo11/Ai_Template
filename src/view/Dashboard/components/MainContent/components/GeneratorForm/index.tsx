
import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import { useAppSetting } from "@/store/useAppSetting";
import IsNewOutput from "./components/ToggleSection/IsNewOutput";
import Fit from "./components/Select/Fit";
import Tags from "./components/TagInput/Tags";

const GeneratorForm = () => {


  const { isPreviewPage } = useAppSetting();

  // const recentOutfit = useQuery(api.outfit.getOutfitById, {
  //   outfitId: outfitID || "",
  // });

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
