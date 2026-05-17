import { useGeneratorSetting } from '@/store/useGeneratorData';
import { useQuery } from 'convex/react';
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
import { useWardrobeStore } from '@/store/useWardrobeStore';

const PreviewImage = () => {
  const { wardrobeId } = useWardrobeStore();
  const { outfitId } = useGeneratorSetting();

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || undefined,
  });

  const imageUrl = useQuery(api.outfit.preview.query.getPreviewImage, {
    outfitId: outfitId || undefined,
  });

  const hasImage = outfit?.status === 'done' && Boolean(imageUrl);

  return (
    <Container>
      <Stage>
        {outfit?.status === 'generating' && (
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

        {outfit?.status === 'error' && (
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

        {hasImage && (
          <PreviewImageDisplay
            imageUrl={imageUrl}
            wardrobeId={wardrobeId}
            currentOutfitId={outfitId}
          />
        )}

        <GuideSlide outfitStatus={outfit?.status} hasImage={hasImage} />
      </Stage>
    </Container>
  );
};

export default PreviewImage;
