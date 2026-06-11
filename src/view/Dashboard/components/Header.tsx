import DarkModeSwitch from '@/confg/darkMode/DarkModeSwitch';
import { UserButton } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useEffect, useState } from 'react';
import { Bars3BottomLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useAppSetting } from '@/store/useAppSetting';
import { useNavigate, useParams } from 'react-router';

const Header = () => {
  const { wardrobeId } = useParams();
  const navigate = useNavigate();

  const wardrobe = useQuery(
    api.wardrobe.query.getWardrobeById,
    wardrobeId ? ({ wardrobeId: wardrobeId } as any) : 'skip',
  );

  useEffect(() => {
    if (wardrobeId && wardrobe === null) {
      navigate('/', { replace: true });
    }
  }, [navigate, wardrobe, wardrobeId]);

  const [isDeleting, setIsDeleting] = useState(false);
  const { setShowSubscriptionModal } = useAppSetting();

  const user = useQuery(api.user.getters.getUser);
  const changeTitle = useMutation(api.wardrobe.changeTitle);
  const deleteWardrobe = useMutation(api.wardrobe.mutation.deleteWardrobe);

  const onDeleteWardrobe = async () => {
    // Implement wardrobe deletion logic here
    setIsDeleting(true);
    try {
      if (wardrobeId) {
        await deleteWardrobe({ wardrobeId });
      }
    } catch (error) {
      console.error('Error deleting wardrobe:', error);
      setIsDeleting(false);
    }
    setIsDeleting(false);
    (document.getElementById('my_modal_1') as HTMLDialogElement).close();
  };

  return (
    <>
      <div className="flex w-full items-start justify-between px-0 py-2">
        <div className="ml-[-10px] flex items-center">
          <label
            htmlFor="my-drawer"
            className="drawer-button cursor-pointer md:ml-[-5px]"
          >
            <Bars3BottomLeftIcon className="text-primary h-8 w-8" />
          </label>
          <h2 className="login-outfit text-base-content mt-[2px] ml-3.5 hidden text-[20px] md:block">
            Outfit
          </h2>

          <label className="input input-ghost bg-base-200 ml-2 flex w-fit cursor-pointer items-center border-2 font-bold focus:border-0">
            <PencilIcon className="text-primary h-4 w-4" />
            <input
              type="search"
              placeholder="Untitled wardrobe"
              value={wardrobeId ? wardrobe?.title : ''}
              className="max-w-28 md:max-w-32"
              onChange={(e) =>
                changeTitle({
                  title: e.target.value || 'Untitled wardrobe',
                  wardrobeId: wardrobeId!,
                })
              }
            />
          </label>
          {wardrobeId && (
            <TrashIcon
              className="text-error hover:animate-wiggle-more ml-2 h-5 w-6 cursor-pointer transition-transform active:scale-110"
              onClick={() =>
                (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()
              }
            />
          )}
        </div>
        <div className="mt-1 box-border flex cursor-pointer items-center space-x-4">
          <div
            className="tooltip tooltip-bottom md:mt-0c ml-1 flex items-center justify-center gap-2"
            data-tip={
              user?.plan === 'free'
                ? 'Upgrade to premium for more credits'
                : `Your credits will reset on ${user?.nextCreditCheck}`
            }
            onClick={() => setShowSubscriptionModal(true)}
          >
            <div className="mt-0.5 flex flex-col items-start">
              <h2 className="text-base-content text-[7px] font-bold md:text-[8px]">
                Available Credits:
              </h2>
              <h2 className="text-base-content text-[8px] font-normal md:text-[9px]">
                {user?.credits} Credit Left
              </h2>
            </div>
            <div className="text-primary-content p-0.5 hover:bg-gradient-to-br hover:from-[#db944d] hover:to-[hsl(182,65%,25%)] hover:text-[hsl(182,65%,25%)]">
              <div className="bg-base-content hover:bg-base-100 px-2.5 py-1 md:px-5">
                <p className="text-[10px] font-semibold md:text-[12px] lg:text-[14px]">
                  {user?.plan === 'free' ? 'Upgrade' : 'Manage'}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden items-center space-x-2 md:flex">
            <DarkModeSwitch />
          </div>

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-30 h-30', // Custom width and height
                userButtonPopoverCard: ' text-red-100', // Custom background for the popover card
                userButtonPopoverActionButton: 'text-primary', // Custom text color for action buttons
              },
            }}
          />
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-5/12 max-w-[325px]">
          {!isDeleting ? (
            <>
              <h3 className="text-center text-lg font-bold">Are you sure?</h3>
              <p className="py-4 text-center">
                You want to delete this wardrobe and all of its outfits.
              </p>
              <div className="flex justify-between">
                <div className="h-full w-full flex-1">
                  <button
                    className="btn btn-neutral bg-red-800"
                    onClick={onDeleteWardrobe}
                  >
                    Delete
                  </button>
                </div>

                <form method="dialog" className="h-fit">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="loading loading-bars loading-xl"></span>
              <h2 className="text-base-content text-md mt-4 text-center font-medium">
                Deleting Outfit
                <span className="loading loading-dots loading-xs mt-1"></span>
              </h2>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Header;
