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
import { useNavigate } from 'react-router';
import ActionSection from './ActionSection';
import { motion, Variants } from 'framer-motion';
import { useGeneratorSetting } from '@/store/useGeneratorData';

type PreviewImageProps = {
  wardrobeId?: string | null;
  currentOutfitId?: string | null;
  outfitStatus?: string | null;
};

const arrowButtonVariant: Variants = {
  animate: {
    x: 0,

    transition: { type: 'spring', duration: 1.3, ease: 'easeOut', bounce: 0.4 },
  },
};

const arrowInteractionTransition = {
  type: 'spring' as const,
  duration: 0.8,
  stiffness: 150,
  ease: 'easeIn' as const,
  bounce: 0.4,
};

const getArrowWhileHover = (xDirection: 1 | -1) => ({
  scale: 1.01,
  x: 5 * xDirection,
  transition: arrowInteractionTransition,
});

const getArrowWhileTap = (xDirection: 1 | -1) => ({
  scale: [0.95, 1.01],
  x: 10 * xDirection,
  transition: arrowInteractionTransition,
});
const PreviewImageDisplay: React.FC<PreviewImageProps> = ({
  wardrobeId,
  currentOutfitId,
}) => {
  const { setModal } = useGeneratorSetting();
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

  const addModal = () => {
    setModal(otherOutfitList[selectedIndex].imageUrl ?? '');
  };

  const downloadImage = () => {};

  const fullView = () => {};

  const deleteOutfit = () => {};

  if (!otherOutfitList || otherOutfitList.length === 0) {
    return null;
  }
  return (
    <PreviewCarouselContainer>
      <PreviewCarouselMeta>
        <TabBarContainer>
          <PreviewCarouselCounter>
            <h3 className="text-base-content text-xs font-black">
              {totalSlides > 1 ? 'Outfits' : 'Outfit'}
            </h3>
            <div className="flex items-center gap-4">
              {totalSlides > 1 && (
                <h3 className="text-base-content text-xs font-black">
                  {selectedIndex + 1} / {totalSlides}
                </h3>
              )}
              <ActionSection
                addModal={addModal}
                downloadImage={downloadImage}
                fullView={fullView}
                deleteOutfit={deleteOutfit}
              />
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
              animate="animate"
              initial={{ x: 20 }}
              variants={arrowButtonVariant}
              whileHover={getArrowWhileHover(-1)}
              whileTap={getArrowWhileTap(-1)}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </motion.svg>
            </PreviewCarouselArrowButton>

            <PreviewCarouselArrowButton
              type="button"
              aria-label="Next image"
              $side="right"
              onClick={goToNext}
              disabled={totalSlides <= 1}
              animate="animate"
              initial={{ x: -20 }}
              variants={arrowButtonVariant}
              whileHover={getArrowWhileHover(1)}
              whileTap={getArrowWhileTap(1)}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-5"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </motion.svg>
            </PreviewCarouselArrowButton>
          </>
        )}
      </PreviewCarouselViewport>
    </PreviewCarouselContainer>
  );
};

export default PreviewImageDisplay;
