import React from 'react';
import {
  PreviewThumbImage,
  PreviewCarouselArrowButton,
  PreviewCarouselContainer,
  PreviewCarouselCounter,
  PreviewCarouselFrame,
  PreviewCarouselTrack,
  PreviewCarouselViewport,
  TabBarContainer,
} from './style';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useNavigate } from 'react-router';
import ActionSection from './ActionSection';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useGeneratorSetting } from '@/store/useGeneratorData';

type PreviewImageProps = {
  wardrobeId?: string | null;
  currentOutfitId?: string | null;
  outfitStatus?: string | null;
  isNotActiveState?: boolean;
  otherOutfitList: {
    imageUrl: string | null;
    outfitId: Id<'outfit'>;
  }[];
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
  isNotActiveState,
  otherOutfitList,
}) => {
  const [isFullViewOpen, setIsFullViewOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const { isDeleting, setModal, setIsDeleting } = useGeneratorSetting();
  const navigate = useNavigate();

  const deleteOutfitById = useMutation(api.outfit.mutation.deleteOutfitById);
  const deleteWardrobe = useMutation(api.wardrobe.mutation.deleteWardrobe);

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

  const selectedImageUrl = otherOutfitList[selectedIndex]?.imageUrl ?? '';

  const getDownloadFileName = (imageUrl: string) => {
    try {
      const path = new URL(imageUrl).pathname;
      const fileName = path.split('/').pop();

      if (fileName && fileName.includes('.')) {
        return fileName;
      }
    } catch {
      // Use fallback name when URL parsing fails.
    }

    return `outfit-${selectedIndex + 1}.jpg`;
  };

  const triggerFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = async () => {
    if (!selectedImageUrl) {
      return;
    }

    const fileName = getDownloadFileName(selectedImageUrl);

    try {
      const response = await fetch(selectedImageUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      const imageBlob = await response.blob();
      const objectUrl = URL.createObjectURL(imageBlob);
      triggerFileDownload(objectUrl, fileName);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback for sources that block fetch due to CORS.
      triggerFileDownload(selectedImageUrl, fileName);
    }
  };

  const fullView = () => {
    if (!selectedImageUrl) {
      return;
    }
    setIsFullViewOpen(true);
  };

  const openDeleteConfirm = () => {
    if (!otherOutfitList[selectedIndex]?.outfitId) {
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteOutfit = async () => {
    if (!otherOutfitList[selectedIndex]?.outfitId) {
      return;
    }

    setIsDeleting(true);
    await deleteOutfitById({ outfitId: otherOutfitList[selectedIndex].outfitId });

    setIsDeleteModalOpen(false);

    if (totalSlides === 1) {
      // Delete Wardrobe if it was the last outfit, or navigate to wardrobe view if there are other outfits remaining.
      if (wardrobeId) {
        await deleteWardrobe({ wardrobeId });
      }
      navigate(`/`);
    } else {
      const nextIndex = selectedIndex === 0 ? 1 : selectedIndex - 1;
      navigateToIndex(nextIndex);
    }

    setIsDeleting(false);
  };

  React.useEffect(() => {
    if (!isFullViewOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullViewOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullViewOpen]);

  if (isNotActiveState) {
    return null;
  }
  return (
    <AnimatePresence>
      <PreviewCarouselContainer
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <TabBarContainer
          key={otherOutfitList[selectedIndex]?.outfitId ?? 'empty-state'}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeInOut' }}
        >
          <PreviewCarouselCounter>
            <h3 className="text-base-content pt-[1px] text-xs font-semibold tracking-[0.08em] uppercase">
              {totalSlides > 1 ? 'Outfits' : 'Outfit'}
            </h3>
            <div className="border-base-content mx-1 mb-0.25 h-[1px] w-full border-1 border-dashed" />
            <motion.div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <motion.div
                  className="bg-base-content h-0.75 w-0.75 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0, duration: 0.3, ease: 'easeIn' }}
                />
                <motion.div
                  className="bg-base-content h-1 w-1 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.3, ease: 'easeIn' }}
                />
                <motion.div
                  className="bg-base-content h-1.25 w-1.25 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.3, ease: 'easeIn' }}
                />
                <motion.div
                  className="bg-base-content h-1.5 w-1.5 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.3, ease: 'easeIn' }}
                />
                <motion.div
                  className="bg-base-content h-1.75 w-1.75 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              {totalSlides > 1 && (
                <motion.div
                  className="bg-base-100 border-base-content flex w-10 items-center justify-around rounded-md border-2 px-1 py-1"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
                >
                  <AnimatePresence>
                    <motion.h3
                      key={selectedIndex}
                      className="text-base-content text-[10px] font-bold tracking-[0.08em] uppercase"
                      initial={{ x: 2, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.6,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      exit={{ x: -2, opacity: 0 }}
                    >
                      {selectedIndex + 1}
                    </motion.h3>
                  </AnimatePresence>
                  <div className="border-base-content/50 mx-1 h-5 w-[4px] border-2" />
                  <h3 className="text-base-content text-[10px] font-bold tracking-[0.08em] uppercase">
                    {totalSlides}
                  </h3>
                </motion.div>
              )}
              <ActionSection
                addModal={addModal}
                downloadImage={downloadImage}
                fullView={fullView}
                deleteOutfit={openDeleteConfirm}
              />
            </motion.div>
          </PreviewCarouselCounter>
        </TabBarContainer>

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

        {isFullViewOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Full image preview"
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/70 p-4"
            onClick={() => setIsFullViewOpen(false)}
          >
            <div
              className="bg-base-100 relative h-[80svh] w-[80svw] rounded-md p-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsFullViewOpen(false)}
                className="bg-base-100 text-base-content absolute top-3 right-3 z-10 rounded-md px-3 py-1 text-xs font-bold shadow"
              >
                Close
              </button>
              <img
                src={selectedImageUrl}
                alt="Full outfit preview"
                className="h-full w-full rounded-sm object-contain"
              />
            </div>
          </div>
        )}

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          isDeleting={isDeleting}
          onClose={closeDeleteConfirm}
          onConfirm={confirmDeleteOutfit}
        />
      </PreviewCarouselContainer>
    </AnimatePresence>
  );
};

export default PreviewImageDisplay;
