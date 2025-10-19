import { useGeneratorSetting } from "@/store/useGeneratorData";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import SpinnerUrl from "/public/assets/icons/infinite-spinner.svg";
import Header from "./components/Header";
import InitialPage from "./components/InitialPage";
import Preview from "./components/Preview";
import Loading from "./components/Loading";

const PreviewImage = () => {
  const apiError = useGeneratorSetting((state) => state.apiError);
  const outfitId = useGeneratorSetting((state) => state.outfitId);

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<"_storage">,
  });

  const outfits = useQuery(api.outfit.getOutfitsByWardrobeId, {
    wardrobeId: outfit?.wardrobeId as Id<"wardrobe">,
  });

  return (
    <div className="flex flex-col h-full min-w-full ">
      <div className="flex flex-1 justify-between w-full">
        <div>
          <h2 className="form-label h-5">Preview</h2>
        </div>
        {outfits && outfits?.length !== 0 && (
          <Header outfit={outfit} outfits={outfits} />
        )}
      </div>
      {outfit?.status === "generating" ? (
        <Loading />
      ) : (
        <div className="relative h-full bg-base-200 rounded-xs">
          {apiError && (
            <div className="absolute top-0 right-0 left-0 bg-error bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-80">
              <p className="text-error-content text-[0.6rem]">
                Something went wrong: {apiError}
              </p>
            </div>
          )}
          {outfitId && imageUrl ? (
            <Preview
              imageUrl={imageUrl}
              outfit={{
                title: outfit?.title || "",
                summary: outfit?.summary || "",
              }}
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
