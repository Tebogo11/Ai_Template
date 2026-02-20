import { useGeneratorSetting } from "@/store/useGeneratorData";
import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useLayoutEffect } from "react";
import useSubmitForm from "../../hooks/useSubmitForm";
import Loading from "@/components/Core/Loading";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { useAppSetting } from "@/store/useAppSetting";

const PromptSection = () => {
  const { setPrompt, prompt, modal, isGenerating, outfitId } =
    useGeneratorSetting();
  const { setIsPreviewPage } = useAppSetting();

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });

  const hasTokenLeft = useQuery(api.user.tokens.hasTokenLeft);

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<"_storage">,
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
    ta.style.height = "auto";
    const MAX =
      typeof window !== "undefined"
        ? window.innerHeight * 0.2
        : Number.MAX_SAFE_INTEGER;
    ta.style.maxHeight = "20vh";
    const newHeight = Math.min(ta.scrollHeight, MAX);
    ta.style.height = `${newHeight}px`;
    ta.style.overflowY = ta.scrollHeight > MAX ? "auto" : "hidden";
  };

  return (
    <div className="flex justify-start w-full h-full rounded-xs relative pt-2 pb-0">
      <form
        onSubmit={(e) => void handleSend(e)}
        className={`relative flex flex-col justify-end ${imageUrl ? "w-[70%]" : "w-full"} md:w-full h-full ${imageUrl ? "mr-5" : ""} md:mr-0 `}
      >
        <h2 className="input-label">
          Any specific instructions?{" "}
          <span className="font-light text-xs">
            (e.g. I want to try this dress with a leather jacket.)
          </span>
        </h2>

        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className={`textarea box-border w-full resize-none ${imageUrl ? "min-h-[18dvh]" : "min-h-[40px]"} md:min-h-[40px] px-4 pr-20 py-2 border-1  border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200  max-h-[18dvh]`}
            placeholder="e.g. I want to try this dress."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={1}
            style={{ maxHeight: "20vh" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              resizeTextarea(target);
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm cursor-pointer absolute bottom-[4px] right-[4px] text-white font-semibold hover:scale-105 transition-all  "
          disabled={!!isSubmitDisabled}
        >
          {hasTokenLeft ? (
            isGenerating || outfit?.status === "generating" ? (
              <div className="flex items-center gap-1">
                <p className=" text-sm opacity-100">Generating...</p>
                <Loading size="xs" color="base-100" />
              </div>
            ) : (
              <p className="text-sm opacity-100">
                {prompt.trim() || !modal?.trim()
                  ? !modal?.trim()
                    ? "Add Modal"
                    : "Create"
                  : "No, Create"}
              </p>
            )
          ) : (
            <p className="text-sm opacity-55">No tokens left</p>
          )}
        </button>
      </form>

      {imageUrl && (
        <label
          className="btn btn-ghost px-0 rounded-sm block md:hidden min-h-[21svh]  max-h-[21svh] pt-2 w-[30%] active:scale-105 transition-transform"
          onClick={() => setIsPreviewPage(true)}
        >
          <img
            src={imageUrl}
            alt="Preview"
            loading="eager" // load immediately
            decoding="async" // doesn’t block rendering
            className="w-full h-full object-cover object-top shadow rounded-sm"
          />
          <div className="flex flex-col max-h-6 absolute top-0 right-1 w-6 h-full ">
            <button
              type="button"
              onClick={() => {}}
              className="  bg-base-100 text-white text-xs px-1 pt-3 pb-1  w-25  cursor-pointer rounded-bl-xl "
            >
              <EyeIcon className="h-5.5 w-5.5 text-base-content hover:animate-jump animate-once" />
            </button>
          </div>
        </label>
      )}
    </div>
  );
};

export default PromptSection;
