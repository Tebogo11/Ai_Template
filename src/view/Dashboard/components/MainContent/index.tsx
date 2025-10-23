import Header from "./components/Header";
import PreviewImage from "./components/PreviewImage/PreviewImage";
import GeneratorForm from "./components/GeneratorForm";

const MainContent = () => {
  return (
    <div className="px-5 pb-10">
      <div className="h-[75px]">
        <Header />
      </div>
      <div className="flex flex-grow-1  justify-center gap-5 lg:px-10 ">
        {/* <div className="w-1/2"> */}
        <GeneratorForm />
        {/* </div> */}
        {/* <div className="w-1/2 ml-5 hidden md:block "> */}
        <PreviewImage />
        {/* </div> */}
      </div>
    </div>
  );
};

export default MainContent;
