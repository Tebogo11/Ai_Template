import Header from '../components/Header';
import GeneratorForm from './GeneratorForm';
import PreviewImage from './PreviewImage/PreviewImage';
import WardrobeModalProvider from './WardrobeModalContext';

const MainContent = () => {
  // useGetValues();
  return (
    <>
      <div className="bg-base-100 dark:bg-darkBase-300 flex h-full w-full flex-col">
        <div className="h-[8svh] px-5">
          <Header />
        </div>
        <WardrobeModalProvider>
          <div className="flex gap-5 pl-5 lg:pl-10">
            <GeneratorForm />
            <PreviewImage />
          </div>
        </WardrobeModalProvider>
      </div>
    </>
  );
};

export default MainContent;
