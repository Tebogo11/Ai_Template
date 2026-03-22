import {
  useGeneratorSetting,
  AccessoriesType,
  OutfitData,
} from '@/store/useGeneratorData';
import { AmountOfChangeOption } from '../view/GeneratorForm/components/ToggleSelect/const';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';

const useGetValues = () => {
  const { setSelectedOutfit, setPreviewOutfit, setIsGettingValues } =
    useGeneratorSetting();
  const outfitID = useGeneratorSetting((s) => s.outfitId);

  const recentOutfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitID || '',
  });

  // const getImageUrlList = useMutation(api.storage.getListImageUrl);
  // const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  useEffect(() => {
    const getOutfitData = async () => {
      // const modalUrl = await getImageUrl({
      //   storageId: recentOutfit?.modal || "",
      // });
      // const accessories = await getImageUrlList({
      //   storageIdsList: recentOutfit?.accessories.map((a) => a.storageId) || [],
      // });
      console.log('recentOutfit', recentOutfit);
      setSelectedOutfit({
        accessories:
          recentOutfit?.accessories?.map((url, index) => {
            return {
              id: `${index}`,
              url: url.storageId,
            } as AccessoriesType;
          }) || [],
        initial_prompt: recentOutfit?.initial_prompt || '',
        modal: recentOutfit?.modal || '',
        fit: recentOutfit?.fit || 'relaxed',
        event: recentOutfit?.event || 'casual',
        amount_of_change: recentOutfit?.amount_of_change || AmountOfChangeOption.None,
        themes: recentOutfit?.themes || recentOutfit?.style_theme || [],
      } as OutfitData);
      console.log('recentOutfit preview images', recentOutfit?.preview_images);
      setPreviewOutfit(recentOutfit?.preview_images || '');
    };
    setIsGettingValues(true);
    if (outfitID && recentOutfit) {
      getOutfitData();
    } else {
      setSelectedOutfit({
        accessories: [] as AccessoriesType[],
        initial_prompt: '',
        modal: '',
        fit: 'relaxed',
        event: 'casual',
        amount_of_change: AmountOfChangeOption.None,
        themes: [],
      } as OutfitData);
      setPreviewOutfit('');
    }
    setIsGettingValues(false);
  }, [outfitID, recentOutfit, setSelectedOutfit]);

  return {};
};

export default useGetValues;
