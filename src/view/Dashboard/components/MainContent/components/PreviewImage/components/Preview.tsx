import React from "react";

type PreviewProps = {
  imageUrl: string;
  outfit: {
    title: string;
    summary: string;
  };
};

const Preview: React.FC<PreviewProps> = ({ imageUrl, outfit }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center rounded-xs relative">
      <div className="max-h-4/5  min-w-full flex items-center justify-center rounded-t-xs overflow-hidden">
        <img
          src={imageUrl}
          alt="Generated outfit"
          className="h-full min-w-full object-contain rounded"
        />
      </div>
      <div className="absolute top-2 right-2">
        <button className="btn btn-sm btn-ghost bg-black rounded-sm mt-2">
          Download Image
        </button>
      </div>
      <div className="bg-base-300 min-h-[20%] w-full px-2">
        <h2 className="text-left mt-2 text-md text-base-content font-bold">
          {outfit?.title}
        </h2>
        <p className="text-left mt-2 text-sm text-base-content font-normal">
          {outfit?.summary}
        </p>
      </div>
    </div>
  );
};

export default Preview;
