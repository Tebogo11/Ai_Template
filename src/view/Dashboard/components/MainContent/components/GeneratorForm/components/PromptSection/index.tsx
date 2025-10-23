import { useGeneratorSetting } from "@/store/useGeneratorData";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as PaparAirplaneIconSolid } from "@heroicons/react/24/solid";
import React, { useMemo, useLayoutEffect } from "react";
import useSubmitForm from "../../hooks/useSubmitForm";
import Loading from "@/components/Core/Loading";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";

const PromptSection = () => {
  const { setPrompt, prompt, modal, isGenerating, outfitId } =
    useGeneratorSetting();

  const outfit = useQuery(api.outfit.getOutfitById, {
    outfitId: outfitId || "",
  });
  const { onSubmit } = useSubmitForm();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit();
    }
  };

  const isSubmitDisabled = useMemo(() => {
    return !Boolean(prompt?.trim()) || !Boolean(modal?.trim());
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
    <div className="flex  flex-col justify-end w-full h-full rounded-xs relative">
      <form
        onSubmit={handleSend}
        className="flex flex-col justify-end w-full h-full"
      >
        <h2 className="form-label">
          What changes do you want for this outfit?{" "}
          <span className="font-light text-xs">(Required)</span>
        </h2>
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className="textarea box-border w-full resize-none min-h-[40px] px-4 pr-16 py-2 border-1 dark:border-primary border-secondary shadow focus:outline-none focus:ring-2 focus:ring-primary transition-all break-words whitespace-pre-wrap bg-base-200 max-h-[20vh]"
            placeholder="Type your prompt here..."
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
          {isGenerating || outfit?.status === "generating" ? (
            <Loading size="xs" />
          ) : !isSubmitDisabled ? (
            <PaparAirplaneIconSolid
              className={`w-5 h-5 text-primary opacity-100`}
            />
          ) : (
            <PaperAirplaneIcon
              className={`w-5 h-5 text-primary ${isSubmitDisabled ? "opacity-50" : "opacity-100"}`}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptSection;
