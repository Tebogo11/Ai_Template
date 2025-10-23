import { isConvexStorageId } from "@/utils/convex/isConvexStoargeid";

import { useMutation } from "convex/react";
import React, { useState, ChangeEvent, FC, useMemo, useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ImageUploadProps {
  onChange?: (file: string | null) => void;
  value?: string | null; // Optional initial image URL
  className?: string;
  size?: string; // Tailwind size classes, e.g. "w-64 h-64"
  isSmall?: boolean;
  idPrefix: string;
  isModal?: boolean;
}

const FileInputBox: FC<ImageUploadProps> = ({
  onChange,
  value = null,
  className = "",
  size = "w-64 h-64",
  isSmall = false,
  idPrefix,
  isModal = false,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string | null>(null);
  const [storageId, setStorageId] = useState<string | null>(null);
  const { outfitId } = useGeneratorSetting();

  const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  const deleteImage = useMutation(api.storage.deleteImage);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      onChange?.(imageUrl);
    }
  };

  const handleRemove = async () => {
    // setPreview(null);

    if (storageId) {
      await deleteImage({
        storageId: storageId,
        outfitColumnKey: isModal ? "modal" : "accessories",
        outfitId: outfitId || "",
      });
    }

    onChange?.(null);
  };

  useEffect(() => {
    const normaliseUrl = async () => {
      const isConvex = isConvexStorageId(value || "");

      if (isConvex && value) {
        const result = await getImageUrl({
          storageId: value,
        });

        if (result) {
          setStorageId(value);
          onChange?.(result);
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
          <PhotoIcon
            className={
              isSmall ? `w-5 h-5 text-primary` : `w-10 h-10 text-primary`
            }
          />
          <p
            className={`text-primary text-center ${isSmall ? "text-xs" : "text-sm"}`}
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
          <div
            className={`relative ${size} overflow-hidden bg-base-200 flex justify-center items-center `}
          >
            <img
              src={urlInput}
              alt="Preview"
              className="absolute top-0 left-0 w-full h-full object-contain object-center shadow"
            />
            <div className="flex flex-col max-h-6 absolute top-0 right-1 w-6 h-full ">
              {/* <button
                type="button"
                onClick={() => setShowModal(true)}
                className=" bg-base-100 text-white text-xs px-1
                w-20 py-1  hover:bg-base-200 transition cursor-pointer"
              >
                <EyeIcon className="h-5.5 w-5.5 text-base-content" />
              </button> */}
              <button
                type="button"
                onClick={handleRemove}
                className="  bg-base-100 text-white text-xs px-1 pb-1  w-25  cursor-pointer rounded-bl-xl "
              >
                <XMarkIcon className="h-5.5 w-5.5 text-base-content hover:animate-jump animate-once" />
                {/* <TrashIcon className="h-4 w-4 text-error" /> */}
              </button>
            </div>
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="relative bg-base-100 rounded-lg shadow-lg p-4">
                  <img
                    src={urlInput}
                    alt="Full Preview"
                    className="w-[90vw] h-[80vh] rounded object-contain object-center"
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
