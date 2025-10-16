import { useGeneratorSetting } from "@/store/useGeneratorData";
import React from "react";

const useHandleGeneratorForm = () => {
  const { setModal, modal } = useGeneratorSetting();
  return {
    setModal,
    modal,
  };
};

export default useHandleGeneratorForm;
