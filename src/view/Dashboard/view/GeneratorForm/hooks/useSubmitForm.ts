import { useMutation } from 'convex/react';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import { api } from '../../../../../../convex/_generated/api';
import { saveImagesToStorage } from './utils';
import { GenerateDataType } from '../types';
import { useWardrobeStore } from '@/store/useWardrobeStore';
import { AmountOfChangeOption } from '../components/ToggleSelect/const';

const useSubmitForm = () => {
  const { modal, accessories, prompt, is_new_outfit, setOutfitId } =
    useGeneratorSetting();
  const { title, setTitle, setWardrobeId, wardrobeId } = useWardrobeStore();

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const generateOutfit = useMutation(api.generator.mutation.generateOutfit);
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);
  const invokeToken = useMutation(api.user.tokens.invokingToken);

  const onSubmit = async () => {
    // 1. Format data to passes to mutation

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
        title: title || 'Untitled Outfit',
      };

      console.log('Submitting with data:', data);
      const {
        outfitId,
        wardrobeId: newWardrobeId,
        title: newTitle,
      } = await generateOutfit(data);
      invokeToken();
      setWardrobeId(newWardrobeId);
      setTitle(newTitle);
      setOutfitId(outfitId);
    }
  };
  return { onSubmit };
};

export default useSubmitForm;
