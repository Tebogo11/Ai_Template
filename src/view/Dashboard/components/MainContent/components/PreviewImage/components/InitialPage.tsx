import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const InitialPage = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-xs gap-4 p-1">
      <div className=" bg-base-100 p-4 rounded-sm space-y-1 max-w-85">
        <h2 className="text-xs md:text-sm">How to use</h2>
        <p className="text-[8px] md:text-sm text-base-content text-xs text-left  opacity-80">
          1: Upload your model (required) — This is where we’ll make your outfit
          edits.
        </p>
        <p className="text-[8px] md:text-sm text-base-content text-xs text-left  opacity-80">
          2: Add accessories (optional) — Things like dresses, jeans, hats, or
          watches.
        </p>
        <p className="text-[8px] md:text-sm text-base-content text-xs text-left  opacity-80">
          3: Adjust the sliders — Pick your style intensity, formality, and
          season.
        </p>
        <p className="text-[8px] md:text-sm text-base-content text-xs text-left  opacity-80">
          4: Describe your vision (required) — Tell us what changes or style you
          want in the prompt box.
        </p>
        <div className="text-[8px] md:text-sm flex items-center ">
          <p className="text-[8px] md:text-sm text-base-content  text-xs text-left opacity-80">
            5: Submit{" "}
          </p>
          <PaperAirplaneIcon className={`w-5 h-5 text-primary opacity-710`} />
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
