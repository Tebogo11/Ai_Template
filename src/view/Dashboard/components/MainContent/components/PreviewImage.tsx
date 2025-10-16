import { useGeneratorSetting } from "@/store/useGeneratorData";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

const PreviewImage = () => {
  const { outfitId, apiError } = useGeneratorSetting();

  const outfit = useQuery(api.aiSystem.getOutfitById, {
    outfitId: outfitId || "",
  });

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images?.[0] as Id<"_storage">,
  });

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center bg-base-300 rounded">
      {apiError && (
        <div className="absolute top-0 right-0 left-0 bg-error bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-80">
          <p className="text-error-content text-[0.6rem]">
            Something went wrong: {apiError}
          </p>
        </div>
      )}
      {outfitId ? (
        <div className="relative">
          <img
            src={imageUrl || ""}
            alt="Generated outfit"
            className="h-[80svh] 2xl:h-[70svh] object-contain rounded"
          />
          <p className="text-center mt-2 text-sm text-gray-600 absolute bottom-0 left-0">
            Here is your generated look! {outfit?.summary}
          </p>
        </div>
      ) : (
        <>
          <CameraIcon className="w-10 h-10" />
          <p className="text-gray-500 text-sm">
            No look yet — try generating one!
          </p>
        </>
      )}
    </div>
  );
};

export default PreviewImage;
