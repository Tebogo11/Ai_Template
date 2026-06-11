import { AccessoriesType, useGeneratorSetting } from '@/store/useGeneratorData';
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAppSetting } from '@/store/useAppSetting';

const useSetOutfit = () => {
  const { setModal, setAccessories, setPrompt, setIsNewOutfit, setOutfitId } =
    useGeneratorSetting();
  const { setDashboardLoading } = useAppSetting();
  const getFormImages = useMutation(api.outfit.mutation.getFormImages);

  const setOutfit = async ({
    modal,
    accessories,
    prompt,
    isNewOutfit,
    outfitId,
  }: {
    modal?: string;
    accessories?: AccessoriesType[];
    prompt?: string;
    isNewOutfit?: boolean;
    outfitId?: Id<'outfit'>;
  }) => {
    setDashboardLoading(true);
    if (outfitId !== undefined) setOutfitId(outfitId);
    if (prompt !== undefined) setPrompt(prompt);
    if (isNewOutfit !== undefined) setIsNewOutfit(isNewOutfit);
    if (modal !== undefined) {
      setModal(modal);
      if (accessories) setAccessories(accessories);
      setDashboardLoading(false);
    } else {
      const data = await getFormImages({
        outfitId: outfitId as Id<'outfit'>,
      });
      if (data?.modelFinal) setModal(data.modelFinal);
      if (data?.accessories) setAccessories(data.accessories);
      setDashboardLoading(false);
    }
  };

  const clearOutfit = () => {
    setOutfitId(null);
    setPrompt('');
    setIsNewOutfit(true);
    setModal(null);
    setAccessories([]);
  };

  return { setOutfit, clearOutfit };
};

export default useSetOutfit;
