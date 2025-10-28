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

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Generated outfit"
          className="h-full w-full object-contain rounded animate-fade animate-once animate-duration-1000 animate-ease-out animate-fill-both"
        />
      ) : null}

      {/* Download button (positioned over image) */}
      <PreviewHeader outfits={outfits} />
    </div>
  );
};

export default Preview;
