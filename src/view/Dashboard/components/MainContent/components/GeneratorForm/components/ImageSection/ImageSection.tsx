import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import AccessoriesImageListUpload from "./AccessoriesImageListUpload";

const ImageSecrion = () => {
  const { setModal, modal } = useGeneratorSetting();

  return (
    <div className="flex items-start justify-start ">
      <div className="w-[70%] mr-5 ">
        <h2 className="form-label">
          Upload your modal{" "}
          <span className="font-light text-xs">(Required)</span>
        </h2>
        <FileInputBox
          size="min-w-full min-h-[44svh]"
          value={modal}
          onChange={setModal}
          idPrefix="modal"
        />
      </div>
      <div className="w-[30%] ">
        <h2 className="form-label">Accessories</h2>
        <AccessoriesImageListUpload />
      </div>
    </div>
  );
};

export default ImageSecrion;
