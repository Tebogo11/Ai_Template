import { useGeneratorSetting } from '@/store/useGeneratorData';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import InitialPage from './components/InitialPage';
import Preview from './components/Preview/Preview';
import Loading from './components/Loading';
import HeaderRight from './components/Header/HeaderRight';
import { cleanAiText } from '@/utils/string/cleanuptext';
import { useAppSetting } from '@/store/useAppSetting';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const PreviewImage = () => {
  const { outfitId, apiError, previewOutfit, isGettingValues, isGenerating } =
    useGeneratorSetting();
  const { isPreviewPage } = useAppSetting();

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: previewOutfit as Id<'_storage'>,
  });
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || '',
  });

  const outfits = useQuery(api.outfit.getOutfitsByWardrobeId, {
    wardrobeId: outfit?.wardrobeId as Id<'wardrobe'>,
  });

  return (
    <div
      className={` ${!isPreviewPage ? 'hidden' : 'flex'} border-base-300 bg-base-300 relative min-h-[92dvh] flex-col rounded-tl-[6px] border p-5 pb-5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] md:flex md:w-2/3 lg:w-4/5`}
    >
      <div className="flex w-full justify-between">
        <div className="block md:hidden">
          <button
            className="btn btn-ghost btn-sm rounded-sm px-0 pr-4 transition-transform active:scale-105"
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
      {isGenerating || outfit?.status === 'generating' || isGettingValues ? (
        <Loading text="Please give us a moment, we're generating your outfit" />
      ) : outfit?.status === 'error' ? (
        <div className="bg-base-200 flex flex-grow-1 flex-col items-center justify-center rounded-xs p-5">
          <p className="text-error text-center">
            Something went wrong while generating your outfit.
          </p>
          <p className="text-error text-center">Please try again</p>
        </div>
      ) : (
        <div className="bg-base-200 flex-grow-1 rounded-xs">
          {apiError && (
            <div className="bg-error bg-opacity-50 absolute top-0 right-0 left-0 rounded px-2 py-1 text-xs text-white opacity-80">
              <p className="text-error-content text-[0.6rem]">
                Something went wrong: {apiError}
              </p>
            </div>
          )}
          {outfitId ? (
            <Preview
              imageUrl={imageUrl}
              outfit={{
                title: cleanAiText(outfit?.title || ''),
                summary: cleanAiText(outfit?.summary || ''),
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
