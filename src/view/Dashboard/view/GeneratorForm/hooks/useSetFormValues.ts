import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { api } from '../../../../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import useSetOutfit from '@/view/Dashboard/hooks/useSetOutfit';

const useSetFormValues = () => {
  const { outfitId } = useParams();
  const { setOutfit, clearOutfit } = useSetOutfit();
  const {} = useGeneratorSetting();
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId ? outfitId : 'skip',
  });

  useEffect(() => {
    if (!outfit) {
      clearOutfit();
      return;
    }
    // Fetch the outfit details using the outfitId and set the form values accordingly
    // You can use your existing API call or state management logic here to fetch and set the data
    setOutfit({
      prompt: outfit.initial_prompt,
      isNewOutfit: outfit.is_new_outfit,
      outfitId: outfit._id,
    });
  }, [outfit]);
};

export default useSetFormValues;
