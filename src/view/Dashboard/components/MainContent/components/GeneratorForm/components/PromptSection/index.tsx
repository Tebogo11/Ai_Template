import { useGeneratorSetting } from "@/store/useGeneratorData";
import { EyeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as PaparAirplaneIconSolid } from "@heroicons/react/24/solid";
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

  const user = useQuery(api.user.getters.getUser);
  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });

  const hasTokenLeft = useQuery(api.user.tokens.hasTokenLeft);

  const imageUrl = useQuery(api.storage.getImageUrl, {
    storageId: outfit?.preview_images as Id<"_storage">,
  });

  const { onSubmit } = useSubmitForm();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit();
    }
  };

  const isSubmitDisabled = useMemo(() => {
    return (
      !Boolean(modal?.trim()) ||
      !Boolean(prompt.trim()) ||
      hasTokenLeft === false ||
      isGenerating ||
      outfit?.status === "generating"
    );
  }, [prompt, modal]);

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
        onSubmit={handleSend}
        className={`relative flex flex-col justify-end ${imageUrl ? "w-[70%]" : "w-full"} md:w-full h-full ${imageUrl ? "mr-5" : ""} md:mr-0 `}
      >
        <h2 className="form-label">
          Design Prompt <span className="font-light text-xs">(Required)</span>
        </h2>

        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className={`textarea box-border w-full resize-none ${imageUrl ? "min-h-[18dvh]" : "min-h-[40px]"} md:min-h-[40px] px-4  py-2 border-1  border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200  max-h-[18dvh]`}
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
          className="cursor-pointer absolute bottom-0.5 right-5 py-2 text-white font-semibold rounded-xl hover:scale-105 transition-all z-10"
          style={{ zIndex: 10 }}
          disabled={isSubmitDisabled}
        >
          {hasTokenLeft ? (
            isGenerating || outfit?.status === "generating" ? (
              <Loading size="xs" />
            ) : !isSubmitDisabled ? (
              <PaparAirplaneIconSolid
                className={`w-5 h-5 text-primary opacity-100`}
              />
            ) : (
              <PaperAirplaneIcon
                className={`w-5 h-5 text-primary ${isSubmitDisabled ? "opacity-50" : "opacity-100"}`}
              />
            )
          ) : (
            <p className="text-sm opacity-55">No tokens left</p>
          )}
        </button>
      </form>

      {imageUrl && (
        <label
          className="btn btn-ghost px-0 rounded-sm block md:hidden h-full pt-2 w-[30%] active:scale-105 transition-transform"
          onClick={() => setIsPreviewPage(true)}
        >
          <img
            src={imageUrl}
            alt="Preview"
            loading="eager" // load immediately
            decoding="async" // doesn’t block rendering
            className="w-full h-full object-cover object-center shadow rounded-sm"
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
