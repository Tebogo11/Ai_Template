import React from 'react';
import PreviewHeader from './PreviewHeader';
import ZoomPanImage from './ZoomPanImage';

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
    <div className="relative flex h-full max-h-full flex-col justify-between rounded-xs">
      {/* Image area */}
      <div className="relative min-h-[300px] flex-1 rounded bg-neutral-900">
        <PreviewHeader outfits={outfits} />
        {imageUrl ? (
          <ZoomPanImage
            src={imageUrl}
            alt={outfit?.title ?? 'Generated outfit'}
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
