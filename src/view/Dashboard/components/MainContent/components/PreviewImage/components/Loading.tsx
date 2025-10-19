const Loading = () => {
  return (
    <div className=" w-full  h-full bg-base-200 px-4 py-2 rounded relative mb-2 items-center justify-center flex flex-col gap-2">
      <div className="bg-base-100 flex flex-col items-center justify-center p-10 rounded-sm">
        <span className="loading loading-bars loading-xl"></span>
        <h2 className="text-base-content text-md mt-4 text-center font-medium">
          Please give us a moment, we're generating outfit
          <span className="loading loading-dots loading-xs mt-1"></span>
        </h2>
      </div>
    </div>
  );
};

export default Loading;
