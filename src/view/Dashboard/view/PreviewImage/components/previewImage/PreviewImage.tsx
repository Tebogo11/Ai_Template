import React from 'react';
import {
  StyledImage,
  PreviewThumbImage,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaCarouselContainer,
  EmblaControls,
  EmblaNavButton,
  EmblaMeta,
  EmblaCounter,
} from './style';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

type PreviewImageProps = {
  imageUrl?: string | null;
  wardrobeId?: string | null;
  currentOutfitId?: string | null;
};

const carouselOptions: EmblaOptionsType = {
  align: 'start',
  containScroll: 'trimSnaps',
  dragFree: false,
  skipSnaps: false,
  slidesToScroll: 'auto',
};

const PreviewImageDisplay: React.FC<PreviewImageProps> = ({
  imageUrl,
  wardrobeId,
  currentOutfitId,
}) => {
  const otherOutfitList = useQuery(api.outfit.preview.query.getAllPreviewImages, {
    wardrobeId: wardrobeId as Id<'wardrobe'>,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const wheelDeltaRef = React.useRef(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const selectedOutfitIndex = React.useMemo(() => {
    if (!otherOutfitList || !currentOutfitId) return -1;

    return otherOutfitList.findIndex(
      (outfit) => String(outfit.outfitId) === String(currentOutfitId),
    );
  }, [otherOutfitList, currentOutfitId]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (!emblaApi || selectedOutfitIndex < 0) return;

    emblaApi.scrollTo(selectedOutfitIndex);
    onSelect();
  }, [emblaApi, selectedOutfitIndex, onSelect]);

  React.useEffect(() => {
    return () => {
      wheelDeltaRef.current = 0;
    };
  }, []);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();
  const totalSlides = otherOutfitList?.length ?? 0;
  const activeIndex = selectedIndex;
  const selectedPreviewIndex =
    selectedOutfitIndex >= 0 ? selectedOutfitIndex : selectedIndex;

  const handleThumbnailClick = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  const handleViewportWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 6) return;

    event.preventDefault();
    wheelDeltaRef.current += dominantDelta;

    if (wheelDeltaRef.current >= 32) {
      emblaApi.scrollNext();
      wheelDeltaRef.current = 0;
    }

    if (wheelDeltaRef.current <= -32) {
      emblaApi.scrollPrev();
      wheelDeltaRef.current = 0;
    }
  };

  const handleViewportKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi.scrollPrev();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi.scrollNext();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      emblaApi.scrollTo(0);
    }

    if (event.key === 'End' && totalSlides > 0) {
      event.preventDefault();
      emblaApi.scrollTo(totalSlides - 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <StyledImage src={imageUrl ?? ''} alt="Generated outfit preview" />

      {otherOutfitList && otherOutfitList.length > 1 && (
        <EmblaCarouselContainer>
          <EmblaMeta>
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <EmblaCounter>
                Preview {selectedPreviewIndex + 1} / {totalSlides}
              </EmblaCounter>
              <EmblaControls>
                <EmblaNavButton onClick={goToPrev} disabled={!canScrollPrev}>
                  Prev
                </EmblaNavButton>
                <EmblaNavButton onClick={goToNext} disabled={!canScrollNext}>
                  Next
                </EmblaNavButton>
              </EmblaControls>
            </div>

            {/* <EmblaProgressTrack aria-hidden="true">
              <EmblaProgressFill style={{ width: `${progressWidth}%` }} />
            </EmblaProgressTrack> */}
          </EmblaMeta>

          <EmblaViewport
            ref={emblaRef}
            tabIndex={0}
            role="group"
            aria-label="Outfit preview carousel"
            onWheel={handleViewportWheel}
            onKeyDown={handleViewportKeyDown}
          >
            <EmblaContainer>
              {otherOutfitList.map((outfit, index) => {
                const isSelectedSlide = selectedPreviewIndex === index;
                const isFocusedSlide = activeIndex === index;

                return (
                  <EmblaSlide
                    key={outfit.outfitId}
                    $isSelected={isSelectedSlide}
                    $isFocused={isFocusedSlide}
                    onClick={() => handleThumbnailClick(index)}
                    aria-label={`Preview ${index + 1}`}
                    aria-current={isSelectedSlide ? 'true' : undefined}
                  >
                    <PreviewThumbImage
                      $isSelected={isSelectedSlide}
                      $isFocused={isFocusedSlide}
                      src={outfit.imageUrl ?? ''}
                      alt="Other outfit preview"
                    />
                  </EmblaSlide>
                );
              })}
            </EmblaContainer>
          </EmblaViewport>
        </EmblaCarouselContainer>
      )}
    </div>
  );
};

export default PreviewImageDisplay;
