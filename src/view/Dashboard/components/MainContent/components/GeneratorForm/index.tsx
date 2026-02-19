import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import { useAppSetting } from "@/store/useAppSetting";

import Fit from "./components/Select/Fit";
import Event from "./components/Select/Event";
import Tags from "./components/TagInput/Tags";
import IsNewOutput from "./components/ToggleSection/IsNewOutput";
import AmountOfChange from "./components/ToggleSelect/amountOfChange";

const GeneratorForm = () => {
  const { isPreviewPage } = useAppSetting();

  // const recentOutfit = useQuery(api.outfit.getOutfitById, {
  //   outfitId: outfitID || "",
  // });

  return (
    <div
      className={`${isPreviewPage ? "hidden" : "grid"} md:grid grid-rows-[400px 2fr]  md:w-2/6 min-w-[380px] min-h-[90dvh] pb-5 pr-5 md:px-0`}
    >
      <div className="w-full">
        <ImageSection />
        <div className="w-full mt-4 gap-2">
          <AmountOfChange />
          <div className="flex gap-2">
            <Fit />
            <Event />
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
