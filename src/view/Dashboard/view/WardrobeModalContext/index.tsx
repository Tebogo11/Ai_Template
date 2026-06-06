import { useQuery } from 'convex/react';
import React, { createContext, useEffect, useRef } from 'react';
import { api } from '../../../../../convex/_generated/api';
import { useParams } from 'react-router';
import { useWardrobeStore } from '@/store/useWardrobeStore';

export const WardrobeModalContext = createContext<{
  wardrobeId: string | undefined;
  outfitId: string | undefined;
} | null>(null);

export const useWardrobeModalContext = () => {
  const context = React.useContext(WardrobeModalContext);
  if (context === null) {
    throw new Error(
      'useWardrobeModalContext must be used within a WardrobeModalProvider',
    );
  }
  return context;
};

const WardrobeModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { wardrobeId, outfitId } = useParams();
  //   const { wardrobeId: storeWardrobeId, setWardrobeId, setTitle } = useWardrobeStore();
  //   const syncedTitleForWardrobeRef = useRef<string | null>(null);
  // const { setOutfitId } = useGeneratorSetting();
  // const { setOutfit } = useSetOutfit();
  const wardrobe = useQuery(
    api.wardrobe.query.getWardrobeById,
    wardrobeId ? ({ wardrobeId } as any) : 'skip',
  );

  return (
    <WardrobeModalContext.Provider value={{ wardrobeId, outfitId }}>
      {children}
    </WardrobeModalContext.Provider>
  );
};

export default WardrobeModalProvider;
