import React, { createContext } from 'react';
import { useParams } from 'react-router';

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

  return (
    <WardrobeModalContext.Provider value={{ wardrobeId, outfitId }}>
      {children}
    </WardrobeModalContext.Provider>
  );
};

export default WardrobeModalProvider;
