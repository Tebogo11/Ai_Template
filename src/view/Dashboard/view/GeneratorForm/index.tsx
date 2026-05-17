import ImageSection from './components/ImageSection/ImageSection';
import PromptSection from './components/PromptSection';
import { useAppSetting } from '@/store/useAppSetting';
import IsNewOutput from './components/ToggleSection/IsNewOutput';
import { FormContainer, ScrollableContent, PromptWrapper } from './styles';
import AccessoriesImageListUpload from './components/ImageSection/AccessoriesImageListUpload';

const GeneratorForm = () => {
  const { isPreviewPage } = useAppSetting();

  return (
    <FormContainer isPreviewPage={isPreviewPage}>
      <ScrollableContent>
        <ImageSection />
        <IsNewOutput />
        <AccessoriesImageListUpload />
      </ScrollableContent>
      <PromptWrapper>
        <PromptSection />
      </PromptWrapper>
    </FormContainer>
  );
};

export default GeneratorForm;
