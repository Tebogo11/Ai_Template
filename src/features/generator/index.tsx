import ImageSection from './components/ImageSection/ImageSection';
import PromptSection from './components/PromptSection';
import IsNewOutput from './components/ToggleSection/IsNewOutput';
import { FormContainer, ScrollableContent, PromptWrapper } from './styles';
import AccessoriesImageListUpload from './components/ImageSection/AccessoriesImageListUpload';
import { useEffect } from 'react';
import useSetFormValues from './hooks/useSetFormValues';
import useWindowSize from '@/hooks/useWindowSize';
import DrawerClosedPreview from './DrawerClosedPreview';
import DrawerTrigger from './DrawerTrigger';

export const MOBILE_WIDTH = 992;

type GeneratorFormProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
};
const GeneratorForm = ({ setIsDrawerOpen, isDrawerOpen }: GeneratorFormProps) => {
  useSetFormValues();
  const { width, isMobile } = useWindowSize();

  useEffect(() => {
    if (!isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [width, isMobile]);

  return (
    <FormContainer
      isDrawerOpen={isDrawerOpen || !isMobile}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDrawerOpen) {
          setIsDrawerOpen(true);
        }
      }}
      initial={{ width: !isDrawerOpen ? 'calc(100vw - 80px)' : '50px' }}
      animate={{ width: isDrawerOpen ? 'calc(100vw - 80px)' : '50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {isDrawerOpen || !isMobile ? (
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
      ) : (
        <DrawerClosedPreview />
      )}
      <DrawerTrigger isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </FormContainer>
  );
};

export default GeneratorForm;
