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
import { useWardrobeStore } from '@/store/useWardrobeStore';
import { Id } from '../../../../../convex/_generated/dataModel';

const PreviewImage = () => {
  const { wardrobeId } = useWardrobeStore();
  const { outfitId, setOutfitId } = useGeneratorSetting();
  const deleteOutfitById = useMutation(api.outfit.mutation.deleteOutfitById);

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || undefined,
  });

  const imageUrl = useQuery(api.outfit.preview.query.getPreviewImage, {
    outfitId: outfitId || undefined,
  });

  const isEmptyWardrobe = useQuery(api.wardrobe.query.isEmptyWardrobe, {
    wardrobeId: wardrobeId,
  });

  const hasImage = !!outfitId && outfit?.status === 'done' && Boolean(imageUrl);

  // Keep the last valid URL so PreviewImageDisplay is never unmounted
  // during the brief loading window when switching outfits.
  const stableImageUrl = React.useRef<string | null | undefined>(null);
  if (imageUrl) stableImageUrl.current = imageUrl;
  const showPreview =
    outfit?.status !== 'error' &&
    (outfit?.status === 'done' ||
      outfit?.status === 'generating' ||
      Boolean(stableImageUrl.current));
  const showLoadingState = outfit?.status === 'generating';
  const showErrorState = outfit?.status === 'error';

  const handleDownloadPreview = React.useCallback(() => {
    const currentImageUrl = imageUrl ?? stableImageUrl.current;
    if (!currentImageUrl) return;

    const link = document.createElement('a');
    link.href = currentImageUrl;
    link.download = `preview-${outfitId ?? 'image'}.png`;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, outfitId]);

  const handleOpenFullView = React.useCallback(() => {
    const currentImageUrl = imageUrl ?? stableImageUrl.current;
    if (!currentImageUrl) return;
    window.open(currentImageUrl, '_blank', 'noopener,noreferrer');
  }, [imageUrl]);

  const handleDeleteOutfit = React.useCallback(async () => {
    if (!outfitId) return;

    const confirmed = window.confirm('Delete this preview and outfit?');
    if (!confirmed) return;

    await deleteOutfitById({ outfitId: outfitId as Id<'outfit'> });
    setOutfitId(null);
    stableImageUrl.current = null;
  }, [deleteOutfitById, outfitId, setOutfitId]);

  return (
    <Container>
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

        {showPreview && (
          <PreviewImageDisplay
            wardrobeId={wardrobeId}
            currentOutfitId={outfitId}
            outfitStatus={outfit?.status}
          />
        )}

        {!isEmptyWardrobe && showPreview && (
          <EdgeOptions aria-label="Preview options">
            <EdgeOptionButton type="button" onClick={handleDownloadPreview}>
              Download
            </EdgeOptionButton>
            <EdgeOptionButton type="button" onClick={handleOpenFullView}>
              Full View
            </EdgeOptionButton>
            <EdgeOptionButton type="button" $danger onClick={handleDeleteOutfit}>
              Delete
            </EdgeOptionButton>
          </EdgeOptions>
        )}

        {isEmptyWardrobe && !showLoadingState && !showErrorState && !showPreview && (
          <GuideSlide outfitStatus={outfit?.status} hasImage={hasImage} />
        )}
      </Stage>
    </Container>
  );
};

export default PreviewImage;
