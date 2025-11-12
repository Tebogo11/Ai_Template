import { useGeneratorSetting } from "@/store/useGeneratorData";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import InitialPage from "./components/InitialPage";
import Preview from "./components/Preview/Preview";
import Loading from "./components/Loading";
import HeaderRight from "./components/Header/HeaderRight";
import { cleanAiText } from "@/utils/string/cleanuptext";
import { useAppSetting } from "@/store/useAppSetting";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const PreviewImage = () => {
  const { outfitId, apiError, previewOutfit, isGettingValues } =
    useGeneratorSetting();
  const { isPreviewPage } = useAppSetting();

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: previewOutfit as Id<"_storage">,
  });
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });

  const outfits = useQuery(api.outfit.getOutfitsByWardrobeId, {
    wardrobeId: outfit?.wardrobeId as Id<"wardrobe">,
  });

  return (
    <div
      className={` ${!isPreviewPage ? "hidden" : "flex "} md:flex flex-col  md:w-1/2 min-h-[90dvh] pb-5`}
    >
      <div className="flex justify-between w-full">
        <div className="hidden md:block">
          <h2 className="form-label h-5">OUTFIT</h2>
        </div>
        <div className="block md:hidden">
          <button
            className="btn btn-ghost btn-sm  rounded-sm active:scale-105 transition-transform px-0 pr-4"
            onClick={() => {
              useAppSetting.getState().setIsPreviewPage(false);
            }}
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to Edit
          </button>
        </div>
        {outfits && outfits?.length !== 0 && (
          <HeaderRight outfit={outfit} outfits={outfits} />
        )}
      </div>
      {outfit?.status === "generating" || isGettingValues ? (
        <Loading text="Please give us a moment, we're generating your outfit" />
      ) : outfit?.status === "error" ? (
        <div className="flex flex-col flex-grow-1 bg-base-200 rounded-xs flex items-center justify-center p-5">
          <p className="text-error text-center">
            Something went wrong while generating your outfit.
          </p>
          <p className="text-error text-center">Please try again</p>
        </div>
      ) : (
        <div className="flex-grow-1 bg-base-200 rounded-xs">
          {apiError && (
            <div className="absolute top-0 right-0 left-0 bg-error bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-80">
              <p className="text-error-content text-[0.6rem]">
                Something went wrong: {apiError}
              </p>
            </div>
          )}
          {outfitId ? (
            <Preview
              imageUrl={imageUrl}
              outfit={{
                title: cleanAiText(outfit?.title || ""),
                summary: cleanAiText(outfit?.summary || ""),
              }}
              outfits={outfits || []}
            />
          ) : (
            <InitialPage />
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewImage;

// 🧾 Replacement Text

// How it works 👇
// 1️⃣ Upload your model — This is where we’ll make your outfit edits.
// 2️⃣ Add accessories (optional) — Things like dresses, jeans, hats, or watches.
// 3️⃣ Adjust the sliders — Pick your style intensity, formality, and season.
// 4️⃣ Describe your vision — Tell us what changes or style you want in the prompt box.
// 5️⃣ Generate your look — Hit the ✈️ button and watch your outfit come to life!
