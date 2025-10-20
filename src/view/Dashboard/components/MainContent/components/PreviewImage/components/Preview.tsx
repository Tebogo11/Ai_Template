import React from "react";

type PreviewProps = {
  imageUrl: string | null | undefined;
  outfit: {
    title: string;
    summary: string;
  };
};

const Preview: React.FC<PreviewProps> = ({ imageUrl, outfit }) => {
  return (
    <div className="h-full w-full flex flex-col relative rounded-xs">
      {/* Image area — takes 80% of the container */}
      <div className="basis-[80%] min-h-0 w-full overflow-hidden flex items-center justify-center rounded-t-xs">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated outfit"
            className="h-full w-auto object-contain block rounded animate-fade animate-once animate-duration-1000 animate-ease-out animate-fill-both"
          />
        ) : null}
      </div>

      {/* Download button (positioned over image) */}
      <div className="absolute top-2 right-2">
        <button className="btn btn-sm btn-ghost bg-black rounded-sm mt-2">
          Download Image
        </button>
      </div>

      {/* Info area — takes remaining 20% */}
      <div className="basis-[20%] bg-base-300 w-full px-3 py-2 flex flex-col justify-center">
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
