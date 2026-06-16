import { useAppSetting } from '@/store/useAppSetting';
import { PricingTable } from '@clerk/clerk-react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PriceTable = () => {
  const { setShowSubscriptionModal } = useAppSetting();

  return (
    <div className="absolute top-0 left-0 z-99 flex h-dvh w-dvw items-center justify-center bg-[#0c0c0c95] p-5 md:p-15">
      <div className="bg-base-100 relative max-h-full w-full max-w-[1024px] overflow-y-hidden p-5">
        <h1 className="mb-1 text-2xl font-bold">Subscription</h1>
        <h2 className="font-medium">Try outfits before you buy — instantly.</h2>
        <p className="mb-5 text-xs font-light">
          Outfit.AI brings back the dressing-room experience for online shopping. Pick
          season, formality, and accessories — get instant looks you’ll actually wear.
        </p>
        <div className="max-h-[70dvh] overflow-y-auto">
          <PricingTable />
        </div>

        <div className="hover:bg-base-300 absolute top-2 right-2">
          <XMarkIcon
            className="text-primary h-6 w-6 cursor-pointer"
            onClick={() => setShowSubscriptionModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
