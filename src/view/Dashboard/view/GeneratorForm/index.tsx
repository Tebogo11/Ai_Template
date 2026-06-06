import ImageSection from './components/ImageSection/ImageSection';
import PromptSection from './components/PromptSection';
import { useAppSetting } from '@/store/useAppSetting';
import IsNewOutput from './components/ToggleSection/IsNewOutput';
import {
  FormContainer,
  ScrollableContent,
  PromptWrapper,
  DrawerTriggerContainer,
  ChevronIcon,
} from './styles';
import AccessoriesImageListUpload from './components/ImageSection/AccessoriesImageListUpload';
import { useState } from 'react';
import useSetFormValues from './hooks/useSetFormValues';

const GeneratorForm = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useSetFormValues();
  return (
    <FormContainer isDrawerOpen={isDrawerOpen}>
      {isDrawerOpen && (
        <>
          <ScrollableContent>
            <ImageSection />
            <IsNewOutput />
            <AccessoriesImageListUpload />
          </ScrollableContent>
          <PromptWrapper>
            <PromptSection />
          </PromptWrapper>
        </>
      )}
      <DrawerTriggerContainer
        isDrawerOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <ChevronIcon className="size-6" isDrawerOpen={isDrawerOpen} />
      </DrawerTriggerContainer>
    </FormContainer>
  );
};

export default GeneratorForm;
