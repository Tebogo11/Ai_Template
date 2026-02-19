import { useGeneratorSetting } from "@/store/useGeneratorData";

const IsNewOutput = () => {
  const { setIsNewOutfit, is_new_outfit } = useGeneratorSetting();
  return (
    <div className="flex justify-between items-center min-w-[100%] mb-2 bg-base-200 py-1 px-1.5 rounded-sm">
      <h2 className="input-label mt-0.5" style={{ fontSize: "0.6rem" }}>
        Try before you buy{" "}
        <span className="font-light text-xxs">
          (or Looking for inspiration?)
        </span>
      </h2>
      <div className="flex justify-between space-x-0.5 bg-base-300 p-0.5 rounded-sm w-2/6 ">
        <button
          onClick={() => setIsNewOutfit(false)}
          className={`btn btn-xs border-0 rounded-xs text-[0.8rem] flex-1 ${!is_new_outfit ? "bg-base-100" : "bg-base-300"}`}
        >
          No
        </button>
        <button
          onClick={() => setIsNewOutfit(true)}
          className={`btn btn-xs border-0 rounded-xs text-[0.8rem] flex-1 ${is_new_outfit ? "bg-base-100" : "bg-base-300"}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default IsNewOutput;
