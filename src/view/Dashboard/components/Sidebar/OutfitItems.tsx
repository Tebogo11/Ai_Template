import { Id } from '../../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useWardrobeStore } from '@/store/useWardrobeStore';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import dayjs from 'dayjs';
import useSetOutfit from '@/view/Dashboard/hooks/useSetOutfit';
import { Link, useParams } from 'react-router';

type OutfitItemsProps = {
  _id: Id<'wardrobe'>;
  _creationTime: number;
  title: string;
  user_id: string;
};

const OutfitItems = ({ _id, title }: OutfitItemsProps) => {
  const { wardrobeId } = useParams<{ wardrobeId?: string }>();
  // const { setOutfitId } = useGeneratorSetting();
  // const { setOutfit } = useSetOutfit();
  const outfitsData = useQuery(api.outfit.query.getRecentOutfitByWardrobeId, {
    wardrobeId: _id,
  });

  const imageUrl = useQuery(api.outfit.preview.query.getPreviewImage, {
    outfitId: outfitsData?.recentOutfit?._id || undefined,
  });

  // const onPickWardrobe = () => {
  //   // Implement wardrobe selection logic here
  //   setWardrobeId(_id);
  //   setTitle(title);
  //   setOutfitId(recentOutfit?._id || null);
  //   setOutfit({
  //     prompt: recentOutfit?.initial_prompt,
  //     isNewOutfit: recentOutfit?.is_new_outfit,
  //     outfitId: recentOutfit?._id,
  //   });
  // };

  return (
    <Link
      to={`/wardrobe/${_id}/outfit/${outfitsData?.recentOutfit?._id}`}
      className="block"
    >
      <div
        // onClick={onPickWardrobe}
        className={`border-base-200 flex items-center border-t p-4 ${wardrobeId === _id ? 'bg-base-200' : ''} hover:bg-base-200 cursor-pointer`}
      >
        {!imageUrl ? (
          <div className="border-base-300 mr-4 grid h-10 w-10 place-items-center rounded-xs border-1">
            ?
          </div>
        ) : (
          <img
            src={imageUrl || '/assets/placeholder.png'}
            alt="Outfit Preview"
            loading="eager" // load immediately
            decoding="async" // doesn’t block rendering
            className="border-base-300 mr-4 h-10 w-10 rounded-xs border-1 object-cover"
          />
        )}
        <div>
          <h2 className="text-sm font-semibold">{title || 'Untitled Wardrobe'}</h2>
          <p className="text-xs">
            {dayjs(outfitsData?.recentOutfit?._creationTime).format('MMM D, YYYY') ||
              'Untitled Outfit'}
          </p>
        </div>
        <div className="bg-base-300 ml-auto flex h-6 w-6 items-center justify-center gap-1 rounded-xs text-xs">
          <div>{outfitsData?.outfitCount || 0}</div>
        </div>
      </div>
    </Link>
  );
};

export default OutfitItems;
