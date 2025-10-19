import { useGeneratorSetting } from "@/store/useGeneratorData";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

interface Outfit {
  _id: string;
  // Add other outfit properties as needed
}

interface HeaderProps {
  outfit?: Outfit | undefined;
  outfits: Outfit[];
}

const Header: React.FC<HeaderProps> = ({ outfit, outfits }) => {
  const setOutfitId = useGeneratorSetting((state) => state.setOutfitId);
  const { idx, prevDisabled, nextDisabled } = useMemo(() => {
    const i = outfit ? outfits.findIndex((o) => o._id === outfit._id) : -1;
    return {
      idx: i,
      prevDisabled: i <= 0,
      nextDisabled: i < 0 || i >= outfits.length - 1,
    };
  }, [outfit?._id, outfits]);

  return (
    <div className="flex items-center gap-4">
      {/* Prev icon + label */}
      <div
        role="button"
        tabIndex={0}
        title="Previous outfit"
        aria-label="Previous outfit"
        onClick={() => {
          if (prevDisabled) return;
          setOutfitId(outfits[idx - 1]._id);
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !prevDisabled)
            setOutfitId(outfits[idx - 1]._id);
        }}
        className={`group flex flex-col items-center select-none ${
          prevDisabled ? "opacity-40 pointer-events-none" : "cursor-pointer"
        }`}
      >
        <ArrowLeftIcon
          className={`w-5 h-5 transition-transform duration-200 ease-in-out transform group-hover:-translate-x-1 ${
            prevDisabled ? "text-gray-300" : "text-base-content"
          }`}
        />
      </div>

      {/* Index / total with subtle animation */}
      <div className="flex flex-col items-center cursor-default">
        <div className="text-sm font-semibold leading-none transition-transform duration-200 transform hover:scale-105">
          {outfit ? idx + 1 : 0}{" "}
          <span className="text-xs text-muted">/ {outfits.length}</span>
        </div>
      </div>

      {/* Next icon + label */}
      <div
        role="button"
        tabIndex={0}
        title="Next outfit"
        aria-label="Next outfit"
        onClick={() => {
          if (nextDisabled) return;
          setOutfitId(outfits[idx + 1]._id);
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !nextDisabled)
            setOutfitId(outfits[idx + 1]._id);
        }}
        className={`group flex flex-col items-center gap-1 select-none ${
          nextDisabled ? "opacity-40 pointer-events-none" : "cursor-pointer"
        }`}
      >
        <ArrowRightIcon
          className={`w-5 h-5 transition-transform duration-200 ease-out transform group-hover:translate-x-2 ${
            nextDisabled ? "text-gray-300" : "text-base-content"
          }`}
        />
      </div>
    </div>
  );
};

export default Header;
