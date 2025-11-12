import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import AccessoriesImageListUpload from "./AccessoriesImageListUpload";

const ImageSection = () => {
  const { setModal, modal } = useGeneratorSetting();

  const onChangeModal = (newModal: string | null) => {
    setModal(newModal);
  };
  return (
    <div className="flex items-start justify-start max-h-[50dvh]">
      <div className="w-[70%] mr-5 ">
        <h2 className="form-label ">
          Upload your modal{" "}
          <span className="font-light text-xs">(Required)</span>
        </h2>
        <FileInputBox
          size="w-full h-[44dvh] p-2"
          value={modal}
          onChange={onChangeModal}
          idPrefix="modal"
          isModal
        />
      </div>
      <div className="w-[30%] ">
        <h2 className="form-label">Clothing Items</h2>
        <AccessoriesImageListUpload />
      </div>
    </div>
  );
};

export default ImageSection;
