import { useGeneratorSetting } from "@/store/useGeneratorData";

const useHandleGeneratorForm = () => {
  const { setModal, modal } = useGeneratorSetting();
  return {
    setModal,
    modal,
  };
};

export default useHandleGeneratorForm;
