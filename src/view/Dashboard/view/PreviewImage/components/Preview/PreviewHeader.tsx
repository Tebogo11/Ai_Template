import { useGeneratorSetting } from '@/store/useGeneratorData';
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useMutation, useQuery } from 'convex/react';
import React, { useMemo, useState } from 'react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { cleanAiText } from '@/utils/string/cleanuptext';
import { useWardrobeStore } from '@/store/useWardrobeStore';
import { useAppSetting } from '@/store/useAppSetting';
import { FullscreenIcon } from 'lucide-react';

interface Outfit {
  _id: string;
  // Add other outfit properties as needed
}

const PreviewHeader = ({ outfits }: { outfits: Outfit[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { setIsPreviewPage } = useAppSetting();
  const { wardrobeId, setWardrobeId, setTitle } = useWardrobeStore();
  const outfitId = useGeneratorSetting((state) => state.outfitId);
  const setOutfitId = useGeneratorSetting((state) => state.setOutfitId);
  const setModalImageUrl = useGeneratorSetting((state) => state.setModal);

  const deleteOutfit = useMutation(api.outfit.deleteOutfitById);
  const deleteWardrobe = useMutation(api.wardrobe.deleteWardrobe);
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || '',
  });
  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<'_storage'>,
  });

  const { idx, prevDisabled, nextDisabled } = useMemo(() => {
    const i = outfit ? outfits.findIndex((o) => o._id === outfit._id) : -1;
    return {
      idx: i,
      prevDisabled: i <= 0,
      nextDisabled: i < 0 || i >= outfits.length - 1,
    };
  }, [outfit?._id, outfits]);

  //Download Image Function
  const downloadImage = async () => {
    if (!imageUrl) return;
    setIsLoading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `outfit-${cleanAiText(outfit?.title || '').replace(/\s+/g, '') || 'image'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
    setIsLoading(false);
  };

  const onUseAsModal = async () => {
    // Implement the logic to set this image as the modal
    setModalImageUrl(imageUrl || '');
    setIsPreviewPage(false);
  };

  const onCreateNewWardrobe = () => {
    setWardrobeId('');
    setTitle('');
    setOutfitId(null);
  };

  const onDeleteWardrobe = async () => {
    // Implement wardrobe deletion logic here

    try {
      if (wardrobeId) {
        await deleteWardrobe({ wardrobeId });
      }
      onCreateNewWardrobe();
    } catch (error) {
      console.error('Error deleting wardrobe:', error);
    }

    (document.getElementById('my_modal_1') as HTMLDialogElement).close();
  };

  const onDeleteOutfit = async () => {
    if (!outfitId) return;
    setIsDeleting(true);
    try {
      await deleteOutfit({ outfitId });
      if (!prevDisabled) {
        setOutfitId(outfits[idx - 1]._id);
      } else if (!nextDisabled) {
        setOutfitId(outfits[idx + 1]._id);
      } else {
        await onDeleteWardrobe();
        setOutfitId(null);
      }

      (document.getElementById('delete-outfit') as HTMLDialogElement).close();
      setIsDeleting(false);
      // Handle successful deletion (e.g., show a toast, redirect, etc.)
    } catch (error) {
      console.error('Error deleting outfit:', error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-base-300 absolute top-[0%] right-0 z-20 flex h-36 w-10 flex-col items-center justify-center rounded-bl-sm p-2">
        <div className="flex flex-col space-y-4">
          {isLoading ? (
            <ArrowPathIcon className="text-neutral-content h-5 w-5 animate-spin" />
          ) : (
            <div className="tooltip tooltip-left" data-tip="Download Outfit Image">
              <ArrowDownTrayIcon
                className="text-base-content h-5 w-5 cursor-pointer"
                onClick={() => void downloadImage()}
              />
            </div>
          )}
          <div className="tooltip tooltip-left" data-tip="View Fullscreen">
            <FullscreenIcon
              className="text-base-content h-5 w-5 cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className="tooltip tooltip-left" data-tip="Delete Outfit">
            <TrashIcon
              className="text-error h-5 w-5 cursor-pointer transition-transform hover:opacity-80 active:scale-110"
              onClick={() =>
                (
                  document.getElementById('delete-outfit') as HTMLDialogElement
                ).showModal()
              }
            />
          </div>
        </div>
        <div className="tooltip tooltip-left" data-tip="Use as Modal Image">
          <button
            className="btn btn-sm btn-base-100 mt-2 flex w-8 items-center justify-center bg-white p-1 transition-transform hover:opacity-80 active:scale-110"
            onClick={() => void onUseAsModal()}
          >
            <PlusIcon className="text-base-content h-10 w-10" />
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-base-100 relative rounded-lg p-4 shadow-lg">
            <img
              src={imageUrl || ''}
              alt="Full Preview"
              loading="eager" // load immediately
              decoding="async" // doesn’t block rendering
              className="h-[80vh] w-[90vw] rounded object-contain object-center"
            />
            <button
              type="button"
              onClick={() => void setShowModal(false)}
              className="absolute top-2 right-2 cursor-pointer rounded bg-black/60 px-2 py-1 text-xs text-white transition hover:bg-black/80"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <dialog id="delete-outfit" className="modal">
        <div className="modal-box w-5/12">
          {!isDeleting ? (
            <>
              <h3 className="text-center text-lg font-bold">Are you sure?</h3>
              <p className="py-4 text-center">
                You want to delete this <strong>Outfit</strong>.
              </p>
              <div className="flex justify-between">
                <div className="h-full w-full flex-1">
                  <button
                    className="btn btn-neutral bg-red-800"
                    onClick={() => void onDeleteOutfit()}
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

export default PreviewHeader;
