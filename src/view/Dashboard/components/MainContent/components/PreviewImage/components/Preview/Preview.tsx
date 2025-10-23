import React from "react";
import PreviewHeader from "./PreviewHeader";

interface Outfit {
  _id: string;
  // Add other outfit properties as needed
}

type PreviewProps = {
  imageUrl: string | null | undefined;
  outfit: {
    title: string;
    summary: string;
  };
  outfits: Outfit[];
};

const Preview: React.FC<PreviewProps> = ({ imageUrl, outfit, outfits }) => {
  return (
    <div className=" flex flex-col justify-between h-full relative rounded-xs">
      {/* Image area — takes 80% of the container */}
      <div className="max-h-[70dvh] flex flex-1 w-full overflow-hidden  items-center justify-center  rounded-t-xs">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated outfit"
            className="max-h-[60dvh] object-contain rounded animate-fade animate-once animate-duration-1000 animate-ease-out animate-fill-both"
          />
        ) : null}
      </div>

      {/* Download button (positioned over image) */}
      <PreviewHeader outfits={outfits} />

      {/* Info area — takes remaining 20% */}
      <div className="h-3/12 bg-base-300 w-full px-3 py-2 flex flex-col justify-center">
        <h2 className="text-left text-md text-base-content font-bold animate-fade animate-once animate-duration-1000 animate-ease-out animate-fill-both">
          {outfit?.title}
        </h2>
        <p className="text-left mt-1 text-sm text-base-content font-normal animate-fade-down animate-once ">
          {outfit?.summary}
        </p>
      </div>
    </div>
  );
};

export default Preview;
