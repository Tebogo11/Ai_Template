import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import Slider from "./components/Slider/Slider";
import ToggleSections from "./components/ToggleSection";

const GeneratorForm = () => {
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
