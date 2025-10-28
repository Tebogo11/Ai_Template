import DarkModeSwitch from "@/confg/darkMode/DarkModeSwitch";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { UserButton } from "@clerk/clerk-react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { useState } from "react";
import {
  Bars3BottomLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAppSetting } from "@/store/useAppSetting";

const Header = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { title, setTitle, wardrobeId, setWardrobeId } = useWardrobeStore();
  const { setShowSubscriptionModal } = useAppSetting();
  const { setOutfitId } = useGeneratorSetting();

  const user = useQuery(api.user.getters.getUser);
  const changeTitle = useMutation(api.wardrobe.changeTitle);
  const deleteWardrobe = useMutation(api.wardrobe.deleteWardrobe);

  const onChangeTitle = () => {
    if (wardrobeId) {
      changeTitle({ title, wardrobeId });
    }
  };

  const onCreateNewWardrobe = () => {
    setWardrobeId("");
    setTitle("");
    setOutfitId(null);
  };

  const onDeleteWardrobe = async () => {
    // Implement wardrobe deletion logic here
    setIsDeleting(true);
    try {
      if (wardrobeId) {
        await deleteWardrobe({ wardrobeId });
      }
      onCreateNewWardrobe();
    } catch (error) {
      console.error("Error deleting wardrobe:", error);
      setIsDeleting(false);
    }
    setIsDeleting(false);
    (document.getElementById("my_modal_1") as HTMLDialogElement).close();
  };

  return (
    <>
      <div className="flex bg-background dark:bg-darkBackground items-start justify-between py-4 px-0 w-full">
        <div className="flex items-center ">
          <label
            htmlFor="my-drawer"
            className="drawer-button cursor-pointer ml-[-5px]"
          >
            <Bars3BottomLeftIcon className="h-8 w-8 text-primary" />
          </label>
          <h2 className="login-outfit text-base-content text-[20px]  ml-3.5 mt-[2px] hidden md:block">
            Outfit
          </h2>

          <label className="input input-ghost focus:border-0 border-2 ml-2 font-bold cursor-pointer flex items-center w-fit bg-base-200 ">
            <PencilIcon className="h-4 w-4 text-primary " />
            <input
              type="search"
              placeholder="Untitled wardrobe"
              value={title}
              className="max-w-33"
              onBlur={onChangeTitle}
              onChange={(e) => setTitle(e.target.value || "Untitled wardrobe")}
            />
          </label>
          {wardrobeId && (
            <TrashIcon
              className="h-5 w-6 text-error ml-2 cursor-pointer hover:animate-wiggle-more active:scale-110 transition-transform"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal()
              }
            />
          )}
        </div>
        <div className="flex items-center space-x-4 mt-1 cursor-pointer box-border">
          <div
            className="tooltip tooltip-bottom mt-[-10px] md:mt-0 ml-5 md:flex gap-2"
            data-tip={
              user?.plan === "free"
                ? "Upgrade to premium for more credits"
                : `Your credits will reset on ${user?.nextCreditCheck}`
            }
            onClick={() => setShowSubscriptionModal(true)}
          >
            <div className="flex items-center gap-1 =">
              <h2 className="text-base-content text-[10px] md:text-xs font-normal ">
                {user?.credits} Credits Left
              </h2>
            </div>
            <div className=" hover:bg-gradient-to-br hover:from-[#db944d] hover:to-[hsl(182,65%,25%)] p-0.5 text-primary-content hover:text-secondary">
              <div className=" bg-primary px-5 py-1 hover:bg-base-100 ">
                <p className="text-sm  font-semibold">
                  {user?.plan === "free" ? "Upgrade" : "Manage"}
                </p>
              </div>
            </div>
          </div>

          <div className=" items-center space-x-2 hidden md:flex">
            <DarkModeSwitch />
          </div>

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-30 h-30", // Custom width and height
                userButtonPopoverCard: " text-red-100", // Custom background for the popover card
                userButtonPopoverActionButton: "text-secondary", // Custom text color for action buttons
              },
            }}
          />
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-5/12 ">
          {!isDeleting ? (
            <>
              <h3 className="font-bold text-lg text-center">Are you sure?</h3>
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

                <form method="dialog" className=" h-fit">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn ">Cancel</button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
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
