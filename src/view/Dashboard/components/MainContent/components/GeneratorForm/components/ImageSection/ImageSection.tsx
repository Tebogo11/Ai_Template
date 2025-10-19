import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import AccessoriesImageListUpload from "./AccessoriesImageListUpload";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";

const ImageSecrion = () => {
  const { setModal, modal, outfitId } = useGeneratorSetting();
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });
  const initialModal = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.modal as Id<"_storage">,
  });
  return (
    <div className="flex items-start justify-start ">
      <div className="w-[70%] mr-5 ">
        <h2 className="form-label">
          Upload your modal{" "}
          <span className="font-light text-xs">(Required)</span>
        </h2>
        <FileInputBox
          size="min-w-full min-h-[44svh]"
          value={modal || initialModal || ""}
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
