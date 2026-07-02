import { useState } from 'react';
import Header from '../components/Header';
import GeneratorForm from '@/features/generator';
import PreviewImage from '@/features/preview/PreviewImage';
import WardrobeModalProvider from '@/features/wardrobe';

const MainContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="bg-base-100 dark:bg-darkBase-300 flex h-full w-full flex-col">
        <div className="px-5">
          <Header />
        </div>
        <WardrobeModalProvider>
          <div className="flex gap-5 pl-5 lg:pl-10">
            <GeneratorForm
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
            <PreviewImage isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
          </div>
        </WardrobeModalProvider>
      </div>
    </>
  );
};

export default MainContent;
