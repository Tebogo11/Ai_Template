import Header from "./components/Header";
import PreviewImage from "./components/PreviewImage";
import GeneratorForm from "./components/GeneratorForm";

const MainContent = () => {
  return (
    <div className="h-[100svh] px-5 w-full">
      <div className="h-15">
        <Header />
      </div>
      <div className="flex flex-1 justify-center max-w-[1280px] mx-auto space-x-1">
        <div className="h-[80vh] max-w-full min-w-full md:min-w-1/2 md:max-w-1/2">
          <GeneratorForm />
        </div>
        <div className="h-[80vh] max-w-1/2 min-w-1/2 min-h-[calc(100svh-100px)] px-5 hidden md:block">
          <h2 className="form-label h-5">Preivew</h2>
          <PreviewImage />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
