import { useGeneratorSetting } from "@/store/useGeneratorData";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

const PreviewImage = () => {
  const { outfitId, apiError } = useGeneratorSetting();

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<"_storage">,
  });

  return (
    <div className="flex flex-col h-full min-w-full ">
      <div className="flex flex-1 justify-between w-full">
        <div>
          <h2 className="form-label h-5">Preview</h2>
        </div>
        <div className="flex items-between gap-3">
          <ArrowLeftIcon className="w-5 h-5  cursor-pointer hover:text-gray-400" />
          <h2 className="form-label">1/2</h2>
          <ArrowRightIcon className="w-5 h-5 cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      <div className="relative h-full bg-base-300 rounded-xs">
        {apiError && (
          <div className="absolute top-0 right-0 left-0 bg-error bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-80">
            <p className="text-error-content text-[0.6rem]">
              Something went wrong: {apiError}
            </p>
          </div>
        )}
        {outfitId && imageUrl ? (
          <div className="h-full w-full flex flex-col items-center justify-center rounded-xs relative">
            <div className="max-h-4/5  min-w-full flex items-center justify-center rounded-t-xs overflow-hidden">
              <img
                src={imageUrl}
                alt="Generated outfit"
                className="h-full min-w-full object-contain rounded"
              />
            </div>
            <div className="absolute top-2 right-2">
              <button className="btn btn-sm btn-ghost bg-black rounded-sm mt-2">
                Download Image
              </button>
            </div>
            <div className="bg-base-300 min-h-[20%] w-full px-2">
              <h2 className="text-left mt-2 text-md text-base-content font-bold">
                {outfit?.title}
              </h2>
              <p className="text-left mt-2 text-sm text-base-content font-normal">
                {outfit?.summary}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center rounded-xs gap-4">
            <CameraIcon className="w-10 h-10" />
            <p className="text-gray-500 text-sm">
              No look yet — try generating one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewImage;
