import Flex from '@/components/Core/Flex';
import { useAppSetting } from '@/store/useAppSetting';
import { PlusIcon } from '@heroicons/react/24/outline';
import { usePaginatedQuery } from 'convex/react';
import { useEffect, useRef } from 'react';
import { api } from '../../../../../convex/_generated/api';
import OutfitItems from './OutfitItems';
import { Link, useNavigate } from 'react-router';
import useWindowSize from '@/hook/useWindowSize';
import DarkModeSwitch from '@/confg/darkMode/DarkModeSwitch';

const SideBar = () => {
  const { theme } = useAppSetting();
  const { width } = useWindowSize();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMoreRef = useRef(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.wardrobe.query.getAllWardrobesByUserId,
    {},
    { initialNumItems: 10 },
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (status !== 'LoadingMore') {
      isLoadingMoreRef.current = false;
    }
  }, [status]);

  const onCreateNewWardrobe = () => {
    // Logic to create a new wardrobe
    navigate('/');
  };

  const onScrollWardrobes = () => {
    const container = scrollContainerRef.current;

    if (!container || status !== 'CanLoadMore' || isLoadingMoreRef.current) {
      return;
    }

    const distanceToBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (distanceToBottom > 24) {
      return;
    }

    isLoadingMoreRef.current = true;
    loadMore(10);
  };

  return (
    <div className="relative overflow-y-hidden">
      <ul className="menu text-base-content bg-base-100 relative min-h-screen w-80">
        {/* Sidebar content here */}
        <Flex
          className="bg-base-100 fixed top-0 left-0 z-50 w-80 items-center justify-between p-4 pb-0"
          direction="row"
          justify="between"
        >
          <Flex className="flex items-center justify-center">
            <img
              src={`/assets/logo/${theme === 'light' ? 'Logo' : 'Logo-white'}.png`}
              alt="menu"
              loading="eager" // load immediately
              decoding="async" // doesn’t block rendering
              className="h-10 w-8 object-contain hover:scale-110"
            />
            <h1 className="login-outfit text-base-content mt-1 ml-2 text-[20px]">
              Outfit
            </h1>
          </Flex>
          <Link to="/" className="btn btn-sm btn-neutral h-8 w-8 rounded-sm p-1">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              onClick={onCreateNewWardrobe}
              className="drawer-overlay btn btn-sm btn-neutral h-8 w-8 rounded-sm p-1"
            >
              <PlusIcon className="h-10 w-10" />
            </label>
          </Link>
        </Flex>
        <div className="mt-13.5">
          <p className="text-base-content mb-2 text-right text-xs opacity-40">
            Wardrobe List
          </p>
        </div>
        <div
          ref={scrollContainerRef}
          onScroll={onScrollWardrobes}
          className="max-h-[calc(100vh-150px)] overflow-y-auto pb-2"
        >
          {results.map((wardrobe) => (
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
              <OutfitItems key={wardrobe._id} {...wardrobe} />
            </label>
          ))}
        </div>
        <div className="flex flex-1 items-end justify-center md:hidden">
          <DarkModeSwitch size="large" />
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
