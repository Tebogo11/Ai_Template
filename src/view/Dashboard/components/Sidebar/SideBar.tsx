import Flex from "@/components/Core/Flex";
import { useAppSetting } from "@/store/useAppSetting";
import { PlusIcon } from "@heroicons/react/24/outline";
import { usePaginatedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import OutfitItems from "./OutfitItems";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { title } from "process";

const SideBar = () => {
  const { setWardrobeId, setTitle, wardrobeId } = useWardrobeStore();
  const { setOutfitId } = useGeneratorSetting();
  const { theme } = useAppSetting();
  const { results, status, loadMore } = usePaginatedQuery(
    api.wardrobes.getAllWardrobesByUserId,
    {},
    { initialNumItems: 10 },
  );

  const onCreateNewWardrobe = () => {
    // Logic to create a new wardrobe

    setWardrobeId("");
    setTitle("");
    setOutfitId(null);
  };

  return (
    <div className="overflow-y-hidden relative">
      <ul className="menu relative text-base-content min-h-screen w-80 bg-base-100">
        {/* Sidebar content here */}
        <Flex
          className="items-center justify-between w-80 fixed top-0 left-0 p-4 pb-0 bg-base-100 z-50 "
          direction="row"
          justify="between"
        >
          <Flex className="flex items-center justify-center">
            <img
              src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
              alt="menu"
              className="h-10 w-8 object-contain hover:scale-110"
            />
            <h1 className="login-outfit text-base-content text-[20px] ml-2 mt-1">
              Outfit
            </h1>
          </Flex>
          <div>
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              onClick={onCreateNewWardrobe}
              className="drawer-overlay btn btn-sm btn-neutral rounded-sm w-8 h-8 p-1"
            >
              <PlusIcon className="h-10 w-10" />
            </label>
          </div>
        </Flex>
        <div className="mt-13.5">
          <p className=" text-right text-base-content text-xs mb-2 opacity-40">
            Wardrobe List
          </p>
        </div>
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          {results.map((wardrobe) => (
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
              <OutfitItems key={wardrobe._id} {...wardrobe} />
            </label>
          ))}

          {status === "CanLoadMore" && (
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={() => loadMore(10)}
              disabled={status !== "CanLoadMore"}
            >
              Load More
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
