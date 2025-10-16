import { EyeIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState, ChangeEvent, FC } from "react";

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
  const [preview, setPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setPreview(imageUrl);
      // console.log("Add Modal", file);
      onChange?.(imageUrl);
    }
  };

  const handleRemove = () => {
    // setPreview(null);
    onChange?.(null);
  };

  const handleUrlPaste = () => {
    if (urlInput.trim()) {
      onChange?.(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${className} min-h-full w-full`}
    >
      {/* URL input always visible when no value */}

      {!value ? (
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
        value && (
          <div className={`relative ${size} overflow-hidden bg-base-200 `}>
            <img
              src={value}
              alt="Preview"
              className="absolute top-0 left-0 w-full h-full object-contain object-center shadow"
            />
            <div className="flex max-h-6 absolute top-2 right-4.5 w-10 h-full space-x-1 ">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className=" bg-black/60 text-white text-xs px-1 py-1 rounded hover:bg-black/80 transition cursor-pointer"
              >
                <EyeIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className=" bg-black/60 text-white text-xs px-1 py-1 rounded hover:bg-black/80 transition cursor-pointer"
              >
                <TrashIcon className="h-4 w-4 text-error" />
              </button>
            </div>
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="relative bg-base-100 rounded-lg shadow-lg p-4">
                  <img
                    src={value}
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
