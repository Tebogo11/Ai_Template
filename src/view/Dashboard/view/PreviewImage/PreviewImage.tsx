import { useGeneratorSetting } from '@/store/useGeneratorData';
import React from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import {
  Container,
  EdgeOptionButton,
  EdgeOptions,
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

type PreviewImageProps = {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
};
const PreviewImage = ({ setIsDrawerOpen, isDrawerOpen }: PreviewImageProps) => {
  const { outfitId, wardrobeId } = useParams<{
    outfitId: Id<'outfit'>;
    wardrobeId: Id<'wardrobe'>;
  }>();
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
  const showLoadingState = outfit?.status === 'generating';
  const showErrorState = outfit?.status === 'error';

  return (
    <Container
      onClick={(e) => {
        setIsDrawerOpen(false);
      }}
    >
      <Stage>
        {showLoadingState && (
          <StateCard $variant="loading">
            <StatusOrb $variant="loading">
              <StatusGlyph>~</StatusGlyph>
            </StatusOrb>
            <StateTitle>Generating your preview</StateTitle>
            <StateBody>
              We are composing the outfit, lighting, and styling details now. Keep this
              panel open while the render finishes.
            </StateBody>
          </StateCard>
        )}

        {showErrorState && (
          <StateCard $variant="error">
            <StatusOrb $variant="error">
              <StatusGlyph>!</StatusGlyph>
            </StatusOrb>
            <StateTitle>Preview generation failed</StateTitle>
            <StateBody>
              Something interrupted the render. Try generating again after adjusting the
              prompt or simplifying the accessory selection.
            </StateBody>
          </StateCard>
        )}

        {!showLoadingState && !showErrorState && (
          <PreviewImageDisplay
            wardrobeId={wardrobeId as Id<'wardrobe'>}
            currentOutfitId={outfitId}
            outfitStatus={outfit?.status}
          />
        )}

        {isEmptyWardrobe && !showLoadingState && !showErrorState && !showPreview && (
          <GuideSlide outfitStatus={outfit?.status} hasImage={hasImage} />
        )}
      </Stage>
    </Container>
  );
};

export default PreviewImage;
