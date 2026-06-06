import React from 'react';
import {
  PreviewThumbImage,
  PreviewCarouselArrowButton,
  PreviewCarouselContainer,
  PreviewCarouselCounter,
  PreviewCarouselFrame,
  PreviewCarouselMeta,
  PreviewCarouselTrack,
  PreviewCarouselViewport,
  TabBarContainer,
} from './style';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';
import ActionSection from './ActionSection';

type PreviewImageProps = {
  wardrobeId?: string | null;
  currentOutfitId?: string | null;
  outfitStatus?: string | null;
};

const PreviewImageDisplay: React.FC<PreviewImageProps> = ({
  wardrobeId,
  currentOutfitId,
}) => {
  const navigate = useNavigate();
  const otherOutfitList =
    useQuery(api.outfit.preview.query.getAllPreviewImages, {
      wardrobeId: wardrobeId ? (wardrobeId as Id<'wardrobe'>) : undefined,
    }) || [];

  const totalSlides = otherOutfitList.length;
  const selectedIndex = React.useMemo(() => {
    if (!otherOutfitList.length || !currentOutfitId) {
      return 0;
    }

    const matchedIndex = otherOutfitList.findIndex(
      (outfit) => String(outfit.outfitId) === String(currentOutfitId),
    );

    return matchedIndex >= 0 ? matchedIndex : 0;
  }, [currentOutfitId, otherOutfitList]);

  const navigateToIndex = (nextIndex: number) => {
    const selectedOutfit = otherOutfitList[nextIndex];

    if (!wardrobeId || !selectedOutfit?.outfitId) {
      return;
    }

    navigate(`/wardrobe/${wardrobeId}/outfit/${selectedOutfit.outfitId}`);
  };

  const goToPrev = () => {
    if (totalSlides <= 1) return;
    navigateToIndex((selectedIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    if (totalSlides <= 1) return;
    navigateToIndex((selectedIndex + 1) % totalSlides);
  };

  if (!otherOutfitList || otherOutfitList.length === 0) {
    return null;
  }
  return (
    <PreviewCarouselContainer>
      <PreviewCarouselMeta>
        <TabBarContainer>
          <PreviewCarouselCounter>
            <h3 className="text-base-content text-xs font-black">Outfits</h3>
            <div className="flex items-center gap-4">
              {totalSlides > 1 && (
                <h3 className="text-base-content text-xs font-black">
                  {selectedIndex + 1} / {totalSlides}
                </h3>
              )}
              <ActionSection />
            </div>
          </PreviewCarouselCounter>
        </TabBarContainer>
      </PreviewCarouselMeta>

      <PreviewCarouselViewport
        tabIndex={0}
        role="group"
        aria-label="Outfit preview viewer"
      >
        <PreviewCarouselTrack
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {otherOutfitList.map((outfit, index) => {
            return (
              <PreviewCarouselFrame
                key={outfit.outfitId}
                aria-label={`Preview ${index + 1}`}
              >
                <PreviewThumbImage
                  src={outfit.imageUrl ?? ''}
                  alt="Other outfit preview"
                />
              </PreviewCarouselFrame>
            );
          })}
        </PreviewCarouselTrack>
        {totalSlides > 1 && (
          <>
            <PreviewCarouselArrowButton
              type="button"
              aria-label="Previous image"
              $side="left"
              onClick={goToPrev}
              disabled={totalSlides <= 1}
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </PreviewCarouselArrowButton>

            <PreviewCarouselArrowButton
              type="button"
              aria-label="Next image"
              $side="right"
              onClick={goToNext}
              disabled={totalSlides <= 1}
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </PreviewCarouselArrowButton>
          </>
        )}
      </PreviewCarouselViewport>
    </PreviewCarouselContainer>
  );
};

export default PreviewImageDisplay;
