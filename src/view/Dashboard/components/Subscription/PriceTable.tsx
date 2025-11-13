import { useAppSetting } from "@/store/useAppSetting";
import { PricingTable } from "@clerk/clerk-react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PriceTable = () => {
  const { setShowSubscriptionModal } = useAppSetting();

  return (
    <div className="absolute top-0 left-0 h-dvh w-dvw p-5 md:p-15 z-20 bg-[#0c0c0c95] flex justify-center items-center">
      <div className="max-h-full max-w-[1024px] overflow-y-auto w-full bg-base-100 p-5 relative">
        <h1 className="text-2xl font-bold mb-1">Subscription</h1>
        <h2 className="font-medium">Try outfits before you buy — instantly.</h2>
        <p className="text-xs mb-5 font-light">
          Outfit.AI brings back the dressing-room experience for online
          shopping. Pick season, formality, and accessories — get instant looks
          you’ll actually wear.
        </p>
        <PricingTable />
        <div className="absolute top-2 right-2 hover:bg-base-300">
          <XMarkIcon
            className="h-6 w-6 text-primary cursor-pointer"
            onClick={() => setShowSubscriptionModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
