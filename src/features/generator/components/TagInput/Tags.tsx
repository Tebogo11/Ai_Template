import { useGeneratorSetting } from "@/store/useGeneratorData";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const TAG_LIMIT = 5;

const Tags = () => {
  const { themes, setStyleTheme } = useGeneratorSetting();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string>("");

  const addTags = () => {
    if (!inputValue.trim()) return;

    const proposedTags = inputValue
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const invalidTag = proposedTags.find((tag) => tag.length > 20);
    if (invalidTag) {
      setError(
        `Tags must be 20 characters or fewer. "${invalidTag}" is too long.`,
      );
      return;
    }

    const nextTags = [...themes];
    for (const tag of proposedTags) {
      if (nextTags.length >= TAG_LIMIT) {
        setError("Maximum of 5 tags allowed.");
        return;
      }
      if (!nextTags.includes(tag)) {
        nextTags.push(tag);
      }
    }

    setStyleTheme(nextTags);
    setInputValue("");
    setError("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      addTags();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setStyleTheme(themes.filter((tag) => tag !== tagToRemove));
    setError("");
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <h2 className="input-label  m-0">Themes</h2>
        <span
          className={`text-xs font-semibold ${
            themes.length >= TAG_LIMIT ? "text-error" : "text-base-content"
          }`}
        >
          {themes.length}/{TAG_LIMIT}
        </span>
      </div>
      <div className="tag-input-container ">
        {error && <p className="text-error text-xs mb-2">{error}</p>}
        <input
          className="input input-bordered w-full text-xs py-2 border-1  border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200 "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={addTags}
          onKeyDown={handleKeyDown}
          placeholder="Enter themes separated by commas e.g. Streetwear, Minimalist, Vintage, etc."
          disabled={themes.length >= TAG_LIMIT}
        />
        {!!themes.length && (
          <div className="flex flex-wrap gap-2 mt-2 ">
            {themes.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="badge badge-primary text-xs font-semibold rounded flex items-center gap-1 pr-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="flex items-center justify-center border-l-2 border-base-100  cursor-pointer"
                  aria-label={`Remove ${tag}`}
                >
                  <XMarkIcon className="w-3.5 h-3.5 text-base-100" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;
