import { useGeneratorSetting } from "@/store/useGeneratorData";

const Fit = () => {
  const { fit, setFit } = useGeneratorSetting();

  return (
    <div className="block h-full w-1/2">
      <h2 className="input-label">Fit Preference</h2>
      <select
        id="fit"
        className="select cursor-pointer  w-full h-[35px] font-semibold text-xs py-2 border-1  border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200"
        value={fit || "relaxed"}
        onChange={(e) => setFit(e.target.value as any)}
      >
        <option className="text-xs" value="slimAndSharp">
          Slim & sharp
        </option>
        <option className="text-xs" value="tailored">
          Tailored & structured
        </option>
        <option className="text-xs" value="relaxed" selected>
          Relaxed & loose
        </option>
        <option className="text-xs" value="oversized">
          Oversized
        </option>
        <option className="text-xs" value="flowing">
          Flowing & draped
        </option>
      </select>
    </div>
  );
};

export default Fit;
