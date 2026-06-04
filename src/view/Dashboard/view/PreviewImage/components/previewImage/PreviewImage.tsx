import React from 'react';
import {
  PreviewThumbImage,
  EmblaViewport,
  EmblaContainer,
  EmblaSlide,
  EmblaCarouselContainer,
  EmblaControls,
  EmblaNavButton,
  EmblaMeta,
  EmblaCounter,
  TabBarContainer,
} from './style';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import useSetOutfit from '@/view/Dashboard/hooks/useSetOutfit';
import { useGeneratorSetting } from '@/store/useGeneratorData';

type PreviewImageProps = {
  wardrobeId?: string | null;
  currentOutfitId?: string | null;
  outfitStatus?: string | null;
};

const carouselOptions: EmblaOptionsType = {
  align: 'start',
  containScroll: 'trimSnaps',
  dragFree: false,
  skipSnaps: false,
  slidesToScroll: 'auto',
};

const PreviewImageDisplay: React.FC<PreviewImageProps> = ({
  wardrobeId,
  currentOutfitId,
  outfitStatus,
}) => {
  const otherOutfitList =
    useQuery(api.outfit.preview.query.getAllPreviewImages, {
      wardrobeId: wardrobeId ? (wardrobeId as Id<'wardrobe'>) : undefined,
    }) || [];
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const wheelDeltaRef = React.useRef(0);
  const userInitiatedSelectionRef = React.useRef(false);

  const { setOutfitId } = useGeneratorSetting();
  const { setOutfit } = useSetOutfit();
  const getOutfit = useMutation(api.outfit.mutation.getOutfitDetailsForEdit);

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
    onSelect();
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (outfitStatus !== 'done') return;
    if (!userInitiatedSelectionRef.current) return;

    const visibleOutfit = otherOutfitList?.[selectedIndex];
    if (!visibleOutfit?.outfitId) return;
    if (String(visibleOutfit.outfitId) === String(currentOutfitId)) return;

    let cancelled = false;

    const syncVisibleOutfit = async () => {
      if (!visibleOutfit.outfitId) return;
      const newSelectedOutfit = await getOutfit({
        outfitId: visibleOutfit.outfitId as Id<'outfit'>,
      });

      if (cancelled) return;

      setOutfitId(newSelectedOutfit.outfit?._id || null);
      setOutfit({
        prompt: newSelectedOutfit.outfit?.initial_prompt,
        isNewOutfit: newSelectedOutfit.outfit?.is_new_outfit,
        outfitId: newSelectedOutfit.outfit?._id,
      });
    };

    void syncVisibleOutfit();

    return () => {
      cancelled = true;
    };
  }, [
    currentOutfitId,
    getOutfit,
    otherOutfitList,
    selectedIndex,
    setOutfit,
    setOutfitId,
    outfitStatus,
  ]);

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

  const handleViewportWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 6) return;

    event.preventDefault();
    userInitiatedSelectionRef.current = true;
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
      userInitiatedSelectionRef.current = true;
      emblaApi.scrollPrev();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      userInitiatedSelectionRef.current = true;
      emblaApi.scrollNext();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      userInitiatedSelectionRef.current = true;
      emblaApi.scrollTo(0);
    }

    if (event.key === 'End' && totalSlides > 0) {
      event.preventDefault();
      userInitiatedSelectionRef.current = true;
      emblaApi.scrollTo(totalSlides - 1);
    }
  };

  if (!otherOutfitList || otherOutfitList.length === 0) {
    return null;
  }
  return (
    <EmblaCarouselContainer>
      <EmblaMeta>
        <TabBarContainer>
          <EmblaCounter>
            <h3 className="text-base-content text-xs font-black">
              Outfits {selectedPreviewIndex + 1} / {totalSlides}
            </h3>
          </EmblaCounter>
          <EmblaControls>
            <EmblaNavButton
              onClick={() => {
                userInitiatedSelectionRef.current = true;
                goToPrev();
              }}
              disabled={!canScrollPrev}
            >
              Prev
            </EmblaNavButton>
            <EmblaNavButton
              onClick={() => {
                userInitiatedSelectionRef.current = true;
                goToNext();
              }}
              disabled={!canScrollNext}
            >
              Next
            </EmblaNavButton>
          </EmblaControls>
        </TabBarContainer>
      </EmblaMeta>

      <EmblaViewport
        ref={emblaRef}
        tabIndex={0}
        role="group"
        aria-label="Outfit preview carousel"
        onWheel={handleViewportWheel}
        onKeyDown={handleViewportKeyDown}
        className="embla"
      >
        <EmblaContainer className="embla__container">
          {otherOutfitList.map((outfit, index) => {
            const isSelectedSlide = selectedPreviewIndex === index;
            const isFocusedSlide = activeIndex === index;

            return (
              <div
                className="flex h-full min-w-full items-center justify-center px-5"
                key={outfit.outfitId}
              >
                <EmblaSlide
                  key={outfit.outfitId}
                  $isSelected={isSelectedSlide}
                  $isFocused={isFocusedSlide}
                  className="embla__slide"
                  onClick={() => {
                    userInitiatedSelectionRef.current = true;
                    emblaApi?.scrollTo(index);
                  }}
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
              </div>
            );
          })}
        </EmblaContainer>
      </EmblaViewport>
    </EmblaCarouselContainer>
  );
};

export default PreviewImageDisplay;
