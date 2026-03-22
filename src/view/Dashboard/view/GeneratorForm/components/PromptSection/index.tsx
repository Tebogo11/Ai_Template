import { useGeneratorSetting } from '@/store/useGeneratorData';
import { EyeIcon } from '@heroicons/react/24/outline';
import React, { useMemo, useLayoutEffect } from 'react';
import useSubmitForm from '../../hooks/useSubmitForm';
import Loading from '@/components/Core/Loading';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useAppSetting } from '@/store/useAppSetting';

const PromptSection = () => {
  const { setPrompt, prompt, modal, isGenerating, outfitId } = useGeneratorSetting();
  const { setIsPreviewPage } = useAppSetting();

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || '',
  });

  const hasTokenLeft = useQuery(api.user.tokens.hasTokenLeft);

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<'_storage'>,
  });

  const { onSubmit } = useSubmitForm();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const isSubmitDisabled = useMemo(() => {
    return !modal?.trim();
  }, [modal]);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [prompt]);

  const resizeTextarea = (ta: HTMLTextAreaElement | null) => {
    if (!ta) return;
    ta.style.height = 'auto';
    const MAX =
      typeof window !== 'undefined' ? window.innerHeight * 0.2 : Number.MAX_SAFE_INTEGER;
    ta.style.maxHeight = '20vh';
    const newHeight = Math.min(ta.scrollHeight, MAX);
    ta.style.height = `${newHeight}px`;
    ta.style.overflowY = ta.scrollHeight > MAX ? 'auto' : 'hidden';
  };

  return (
    <div className="relative flex h-full w-full flex-1 justify-start rounded-xs pt-2 pb-0">
      <form
        onSubmit={(e) => void handleSend(e)}
        className={`relative flex flex-col justify-end ${imageUrl ? 'w-[75%]' : 'w-full'} h-full md:w-full ${imageUrl ? 'mr-5' : ''} md:mr-0`}
      >
        <h2 className="input-label">
          Any specific instructions?{' '}
          <span className="text-xs font-light">
            (e.g. I want to try this dress with a leather jacket.)
          </span>
        </h2>

        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className={`textarea box-border w-full resize-none ${imageUrl ? 'min-h-[12dvh]' : 'min-h-[40px]'} border-base-300 focus:ring-base-300 bg-base-200 max-h-[18dvh] border-1 px-4 py-2 pr-20 break-words whitespace-pre-wrap shadow transition-all focus:ring-2 focus:outline-none md:min-h-[40px]`}
            placeholder="e.g. I want to try this dress."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={1}
            style={{ maxHeight: '20vh' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              resizeTextarea(target);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm absolute right-[4px] bottom-[4px] cursor-pointer font-semibold text-white transition-all hover:scale-105"
          disabled={!!isSubmitDisabled}
        >
          {hasTokenLeft ? (
            isGenerating || outfit?.status === 'generating' ? (
              <div className="flex items-center gap-1">
                <p className="text-sm opacity-100">Generating...</p>
                <Loading size="xs" color="base-100" />
              </div>
            ) : (
              <p className="text-sm opacity-100">
                {prompt.trim() || !modal?.trim()
                  ? !modal?.trim()
                    ? 'Add Modal'
                    : 'Create'
                  : 'No, Create'}
              </p>
            )
          ) : (
            <p className="text-sm opacity-55">No tokens left</p>
          )}
        </button>
      </form>

      {imageUrl && (
        <label
          className="btn btn-ghost block max-h-40 min-h-40 w-[25%] rounded-sm px-0 pt-2 transition-transform active:scale-105 md:hidden"
          onClick={() => setIsPreviewPage(true)}
        >
          <img
            src={imageUrl}
            alt="Preview"
            loading="eager" // load immediately
            decoding="async" // doesn’t block rendering
            className="h-full w-full rounded-sm object-cover object-top shadow"
          />
          <div className="absolute top-5 right-5 flex h-full max-h-6 w-6 flex-col">
            <button
              type="button"
              onClick={() => {}}
              className="bg-base-100 grid w-10 cursor-pointer place-items-center rounded-md p-1 text-xs text-white"
            >
              <EyeIcon className="text-base-content hover:animate-jump animate-once h-5.5 w-5.5" />
            </button>
          </div>
        </label>
      )}
    </div>
  );
};

export default PromptSection;
