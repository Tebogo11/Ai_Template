import DarkModeSwitch from "@/confg/darkMode/DarkModeSwitch";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { UserButton } from "@clerk/clerk-react";
import { Bars3BottomLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

const Header = () => {
  const { title, setTitle, wardrobeId } = useWardrobeStore();
  const changeTitle = useMutation(api.wardrobe.changeTitle);

  const onChangeTitle = () => {
    if (wardrobeId) {
      changeTitle({ title, wardrobeId });
    }
  };

  return (
    <div className="flex bg-background dark:bg-darkBackground items-start justify-between md:justify-end py-4 px-0 w-full">
      <div className="flex items-center w-full">
        <label
          htmlFor="my-drawer"
          className="drawer-button cursor-pointer ml-[-5px]"
        >
          <Bars3BottomLeftIcon className="h-8 w-8 text-primary" />
        </label>
        <h2 className="login-outfit text-base-content text-[20px]  ml-2 mt-[2px]">
          Outfit
        </h2>

        <label className="input input-ghost ml-2 font-bold cursor-pointer flex items-center w-fit">
          <PencilIcon className="h-4 w-4 text-primary " />
          <input
            type="search"
            placeholder="Untitled wardrobe"
            value={title}
            onBlur={onChangeTitle}
            onChange={(e) => setTitle(e.target.value || "Untitled wardrobe")}
          />
        </label>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
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
  );
};

export default Header;
