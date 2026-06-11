import { useGeneratorSetting } from '@/store/useGeneratorData';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import {
  Container,
  Stage,
  StateBody,
  StateCard,
  StateTitle,
  StatusGlyph,
  StatusOrb,
} from './style';
import GuideSlide from './components/Guide';
import PreviewImageDisplay from './components/previewImage/PreviewImage';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useParams } from 'react-router';
import generatingIconData from '../../../../../public/assets/lottie/generatingicon.json';
import errorIconData from '../../../../../public/assets/lottie/errorIcon.json';
import Lottie, { Options } from 'react-lottie';
import { AnimatePresence, motion } from 'framer-motion';
import useSubmitForm from '../GeneratorForm/hooks/useSubmitForm';

type PreviewImageProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
};
const PreviewImage = ({ setIsDrawerOpen }: PreviewImageProps) => {
  const { outfitId, wardrobeId } = useParams<{
    outfitId: Id<'outfit'>;
    wardrobeId: Id<'wardrobe'>;
  }>();
  const { onSubmit } = useSubmitForm();
  const { isGenerating, setIsGenerating } = useGeneratorSetting();
  const deleteOutfitById = useMutation(api.outfit.mutation.deleteOutfitById);

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || undefined,
  });

  const imageUrl = useQuery(api.outfit.preview.query.getPreviewImage, {
    outfitId: outfitId || undefined,
  });

  const isEmptyWardrobe = useQuery(api.wardrobe.query.isEmptyWardrobe, {
    wardrobeId: wardrobeId as Id<'wardrobe'>,
  });

  const hasImage = !!outfitId && outfit?.status === 'done' && Boolean(imageUrl);

  const showPreview = outfit?.status !== 'error' && outfit?.status === 'done';
  const showLoadingState = outfit?.status === 'generating' || isGenerating;
  const showErrorState = outfit?.status === 'error' && !isGenerating;
  // const showErrorState = outfit?.status === 'error';

  const loadingAnimationOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: generatingIconData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const errorAnimationOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: errorIconData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (isGenerating && (outfit?.status === 'generating' || outfit?.status === 'error')) {
      setIsGenerating(false);
    }
  }, [setIsGenerating, isGenerating, outfit?.status]);

  useEffect(() => {
    // if status is error then delete the outfit,
    // if its the only outfit delete the wardrobe as well
  }, [setIsGenerating, isGenerating, outfit?.status]);

  return (
    <AnimatePresence>
      <Container
        onClick={(e) => {
          setIsDrawerOpen(false);
        }}
      >
        <Stage>
          {showLoadingState && (
            <StateCard $variant="loading">
              <Lottie options={loadingAnimationOptions} height={200} width={200} />

              <StateTitle>Generating your preview</StateTitle>
              <StateBody>
                We are composing the outfit, lighting, and styling details now. Keep this
                panel open while the render finishes.
              </StateBody>
            </StateCard>
          )}

          {showErrorState && (
            <StateCard $variant="error">
              <Lottie options={errorAnimationOptions} height={200} width={200} />

              <StateTitle>Preview generation failed</StateTitle>
              <StateBody>
                Something interrupted the render. Try generating again after adjusting the
                prompt or simplifying the accessory selection.
              </StateBody>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  //Delete current outfit
                  onSubmit();
                }}
                className="mt-4 cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white"
              >
                Try Again
              </motion.button>
            </StateCard>
          )}
          <PreviewImageDisplay
            wardrobeId={wardrobeId as Id<'wardrobe'>}
            currentOutfitId={outfitId}
            outfitStatus={outfit?.status}
            isNotActiveState={showLoadingState || showErrorState}
          />
          {isEmptyWardrobe && !showLoadingState && !showErrorState && !showPreview && (
            <GuideSlide outfitStatus={outfit?.status} hasImage={hasImage} />
          )}
        </Stage>
      </Container>
    </AnimatePresence>
  );
};

export default PreviewImage;
