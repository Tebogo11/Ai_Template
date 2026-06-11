import { motion } from 'framer-motion';
import React from 'react';
import { DrawerClosedFormPreview, MobileViewLabel } from './styles';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import { PlusIcon } from '@heroicons/react/24/outline';

const DrawerClosedPreview = () => {
  const { modal, accessories } = useGeneratorSetting();
  return (
    <DrawerClosedFormPreview>
      <div className="flex h-full flex-col items-center justify-between gap-4">
        <div>
          <MobileViewLabel className="font-bold">Modal:</MobileViewLabel>
          {modal && <img src={modal} alt="Logo" />}
          <div className="bg-base-200 mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm">
            <PlusIcon className="text-base-500 size-5" />
          </div>
          <MobileViewLabel className="font-bold">Outfits:</MobileViewLabel>
          <div className="bg-base-200 mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-2 px-4">
            <div className="border-base-400 mx-[2px] rounded-[3px] border-1 border-dashed p-[2px]">
              <p className="text-base-500 py-[1px] text-[0.35rem] font-bold tracking-[-0.09em] uppercase">
                Try Something On
              </p>
            </div>
          </div>
          {accessories &&
            accessories.map((accessory, index) => (
              <img key={index} src={accessory.url} alt={`Accessory ${index + 1}`} />
            ))}
          <div className="bg-base-200 mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm">
            <PlusIcon className="text-base-500 size-5" />
          </div>
        </div>
        <motion.div
          className="bg-primary border-base-300 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 pr-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </motion.div>
      </div>
    </DrawerClosedFormPreview>
  );
};

export default DrawerClosedPreview;
