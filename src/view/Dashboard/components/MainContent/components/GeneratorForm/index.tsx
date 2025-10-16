import ImageSection from "./components/ImageSection/ImageSection";
import PromptSection from "./components/PromptSection";
import Slider from "./components/Slider/Slider";

const GeneratorForm = () => {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
      <div className="">
        <ImageSection />
        <Slider />
      </div>
      <div className="flex flex-1">
        <PromptSection />
      </div>
    </div>
  );
};

export default GeneratorForm;
