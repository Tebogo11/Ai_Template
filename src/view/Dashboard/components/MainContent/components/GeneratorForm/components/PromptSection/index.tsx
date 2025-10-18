import { useGeneratorSetting } from "@/store/useGeneratorData";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
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

  return (
    <div className="flex flex-1 flex-col justify-end w-full  rounded-xs relative">
      <h2 className="form-label">
        What changes do you want for this outfit?{" "}
        <span className="font-light text-xs">(Required)</span>
      </h2>
      <form onSubmit={handleSend} className="flex flex-col justify-end w-full">
        <div className="relative w-full">
          <textarea
            className="input w-full resize-none min-h-[40px] max-h-[120px] px-4 pr-16 py-2 border-1 dark:border-primary border-secondary rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-primarytransition-all break-words whitespace-pre-wrap overflow-y-auto bg-base-200"
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={1}
            style={{
              overflowY: "auto",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              paddingRight: "4rem", // More space for button
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              // Only auto-expand if not at max height
              if (target.scrollHeight <= 120) {
                target.style.height = target.scrollHeight + "px";
              } else {
                target.style.height = "120px";
              }
            }}
          />
          <button
            type="submit"
            className="cursor-pointer absolute bottom-0.5 right-5 py-2 text-white font-semibold rounded-xl hover:scale-105 transition-all z-10"
            style={{ zIndex: 10 }}
          >
            {isGenerating || outfit?.status === "generating" ? (
              <Loading size="xs" />
            ) : (
              <PaperAirplaneIcon
                className={`w-5 h-5 text-primary ${isSubmitDisabled ? "opacity-50" : "opacity-100"}`}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptSection;
