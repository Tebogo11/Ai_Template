import React from "react";
import PreviewHeader from "./PreviewHeader";
import ZoomPanImage from "./ZoomPanImage";

interface Outfit {
  _id: string;
}

type PreviewProps = {
  imageUrl: string | null | undefined;
  outfit: { title: string; summary: string };
  outfits: Outfit[];
};

const Preview: React.FC<PreviewProps> = ({ imageUrl, outfit, outfits }) => {
  return (
    <div className="flex flex-col justify-between h-full relative rounded-xs max-h-full">
      {/* Image area */}
      <div className="relative flex-1 min-h-[300px] bg-neutral-900 rounded">
        <PreviewHeader outfits={outfits} />
        {imageUrl ? (
          <ZoomPanImage
            src={imageUrl}
            alt={outfit?.title ?? "Generated outfit"}
            className="h-full w-full"
            initialScale={1}
            minScale={0.5}
            maxScale={6}
          />
        ) : null}

        {/* Download / actions overlay */}
      </div>
    </div>
  );
};

export default Preview;
