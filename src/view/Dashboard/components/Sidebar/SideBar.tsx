import Flex from "@/components/Core/Flex";
import { useAppSetting } from "@/store/useAppSetting";
import { PlusIcon } from "@heroicons/react/24/outline";
import { usePaginatedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import OutfitItems from "./OutfitItems";

const SideBar = () => {
  const { theme } = useAppSetting();
  const { results, status, loadMore } = usePaginatedQuery(
    api.wardrobes.getAllWardrobesByUserId,
    {},
    { initialNumItems: 10 },
  );
  return (
    <div className="overflow-y-hidden relative">
      <ul className="menu relative text-base-content min-h-screen w-80 bg-base-100">
        {/* Sidebar content here */}
        <Flex
          className="mb-4 items-center justify-between w-80 fixed top-0 left-0 p-4 bg-base-100 z-50 "
          direction="row"
          justify="between"
        >
          <Flex className="flex items-center justify-center">
            <img
              src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
              alt="menu"
              className="h-10 w-8 object-contain hover:scale-110"
            />
            <h1 className="login-outfit text-base-content text-[20px] ml-2">
              Outfit
            </h1>
          </Flex>
          <div>
            <button className="btn btn-sm btn-neutral rounded-sm w-8 h-8 p-1">
              <PlusIcon className="h-10 w-10" />
            </button>
          </div>
        </Flex>
        <div className="max-h-[calc(100vh-100px)] mt-20 overflow-y-auto">
          {results.map((wardrobe) => (
            <OutfitItems key={wardrobe._id} {...wardrobe} />
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
