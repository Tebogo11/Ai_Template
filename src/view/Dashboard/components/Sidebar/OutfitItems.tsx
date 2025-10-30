import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import dayjs from "dayjs";
import { LazyLoadImage } from "react-lazy-load-image-component";

type OutfitItemsProps = {
  _id: Id<"wardrobe">;
  _creationTime: number;
  title: string;
  user_id: string;
};

const OutfitItems = ({ _id, title }: OutfitItemsProps) => {
  const { setWardrobeId, setTitle, wardrobeId } = useWardrobeStore();
  const { setOutfitId } = useGeneratorSetting();

  const recentOutfit = useQuery(api.outfit.getRecentOutfitByWardrobeId, {
    wardrobeId: _id,
  });
  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: recentOutfit?.preview_images as Id<"_storage">,
  });

  const onPickWardrobe = () => {
    // Implement wardrobe selection logic here
    setWardrobeId(_id);
    setTitle(title);
    setOutfitId(recentOutfit?._id || null);
  };

  return (
    <div
      onClick={onPickWardrobe}
      className={`p-4 border-t border-base-200 flex ${wardrobeId === _id ? "bg-base-200" : ""} hover:bg-base-200 cursor-pointer`}
    >
      <LazyLoadImage
        src={imageUrl || "/assets/placeholder.png"}
        alt="Outfit Preview"
        className="w-6 h-8 object-cover rounded-xs mr-4"
      />
      <div>
        <h2 className="text-sm font-semibold">
          {title || "Untitled Wardrobe"}
        </h2>
        <p className="text-xs">
          {dayjs(recentOutfit?._creationTime).format("MMM D, YYYY") ||
            "Untitled Outfit"}
        </p>
      </div>
    </div>
  );
};

export default OutfitItems;
