import { isConvexStorageId } from "@/utils/convex/isConvexStoargeid";
import { EyeIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "convex/react";
import React, { useState, ChangeEvent, FC, useMemo, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { useAppSetting } from "@/store/useAppSetting";

interface ImageUploadProps {
  onChange?: (file: string | null) => void;
  value?: string | null; // Optional initial image URL
  className?: string;
  size?: string; // Tailwind size classes, e.g. "w-64 h-64"
  isSmall?: boolean;
  idPrefix: string;
}

const FileInputBox: FC<ImageUploadProps> = ({
  onChange,
  value = null,
  className = "",
  size = "w-64 h-64",
  isSmall = false,
  idPrefix,
}) => {
  const { theme } = useAppSetting();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string | null>(null);

  const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  const deleteImage = useMutation(api.storage.deleteImage);

  const { outfitId } = useGeneratorSetting();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setPreview(imageUrl);
      // console.log("Add Modal", file);
      onChange?.(imageUrl);
    }
  };

  const handleRemove = async () => {
    // setPreview(null);
    if (isConvexStorageId(value || "") && value) {
      await deleteImage({ storageId: value });
    }

    onChange?.(null);
  };

  useEffect(() => {
    const normaliseUrl = async () => {
      const isConvex = isConvexStorageId(value || "");
      console.log("Is Convex URL:", isConvex, value);
      if (isConvex && value) {
        const result = await getImageUrl({
          storageId: value,
        });
        console.log("Fetched URL from Convex:", result);
        if (result) {
          setUrlInput(result);
          return;
        }
        setUrlInput(null);
      } else {
        setUrlInput(value);
      }
    };
    normaliseUrl();
  }, [value]);

  return (
    <div
      className={`flex flex-col items-center justify-center ${className} min-h-full w-full`}
    >
      {/* URL input always visible when no value */}

      {!urlInput ? (
        <label
          htmlFor={"image-upload" + idPrefix}
          className={`flex flex-col items-center justify-center ${size} rounded cursor-pointer hover:border-blue-400 transition bg-base-200 border-2 border-dashed border-base-100 p-4`}
        >
          <PhotoIcon className={isSmall ? `w-5 h-5` : `w-10 h-10`} />
          <p
            className={`text-gray-500 text-center ${isSmall ? "text-xs" : "text-sm"}`}
          >
            Click to upload image
          </p>
          <input
            id={"image-upload" + idPrefix}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        urlInput && (
          <div className={`relative ${size} overflow-hidden bg-base-200 `}>
            <img
              src={urlInput}
              alt="Preview"
              className="absolute top-0 left-0 w-full h-full object-contain object-center shadow"
            />
            <div className="flex flex-col max-h-6 absolute top-0 right-2 w-6 h-full ">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className=" bg-base-100 text-white text-xs px-1
                w-20 py-1  hover:bg-base-200 transition cursor-pointer"
              >
                <EyeIcon className="h-5.5 w-5.5 text-base-content" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="  bg-base-100 text-white text-xs px-1 py-1  w-25 hover:bg-base-200 transition cursor-pointer"
              >
                <TrashIcon className="h-5.5 w-5.5 text-error" />
              </button>
            </div>
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="relative bg-base-100 rounded-lg shadow-lg p-4">
                  <img
                    src={urlInput}
                    alt="Full Preview"
                    className="max-w-[90vw] max-h-[80vh] rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black/80 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default FileInputBox;
