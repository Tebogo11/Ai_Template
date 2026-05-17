import FileInputBox from '@/components/Forms/FileInputBox';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import { Section, InputLabel, RequiredSpan } from './styles';

const ImageSection = () => {
  const { setModal, modal } = useGeneratorSetting();

  const onChangeModal = (newModal: string | null) => {
    setModal(newModal);
  };

  return (
    <Section>
      <InputLabel>
        1. Upload your model <RequiredSpan>(Required)</RequiredSpan>
      </InputLabel>
      <FileInputBox
        size="w-full "
        value={modal}
        onChange={onChangeModal}
        idPrefix="modal"
        isModal
      />
    </Section>
  );
};

export default ImageSection;
