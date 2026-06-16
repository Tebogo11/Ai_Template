import { useMutation } from 'convex/react';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import { api } from '../../../../../../convex/_generated/api';
import { saveImagesToStorage } from './utils';
import { useWardrobeStore } from '@/store/useWardrobeStore';
import { useNavigate, useParams } from 'react-router';

const useSubmitForm = () => {
  const { wardrobeId } = useParams<{ wardrobeId: string }>();
  const { modal, accessories, prompt, is_new_outfit, setIsGenerating } =
    useGeneratorSetting();

  const { title } = useWardrobeStore();
  const navigate = useNavigate();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const generateOutfit = useMutation(api.generator.mutation.generateOutfit);
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  const invokeToken = useMutation(api.user.tokens.invokingToken);

  const onSubmit = async () => {
    // 1. Format data to passes to mutation
    setIsGenerating(true);
    if (modal) {
      // 1.3 save images to storage and get their storage ids
      const storageIds = await saveImagesToStorage(
        getImageUrl,
        generateUploadUrl,
        modal,
        accessories,
      );

      const data = {
        modal: storageIds.modalStorageId || '',
        accessories: storageIds.accessoriesStorageIds,
        prompt: prompt || '',
        is_new_outfit,
        wardrobeId: wardrobeId as string | undefined,
        title: title || 'Untitled Outfits',
      };

      console.log('Submitting with data:', data);
      const { outfitId, wardrobeId: newWardrobeId } = await generateOutfit(data);
      invokeToken();
      navigate(`/wardrobe/${newWardrobeId}/outfit/${outfitId}`);
    }
  };
  return { onSubmit };
};

export default useSubmitForm;
