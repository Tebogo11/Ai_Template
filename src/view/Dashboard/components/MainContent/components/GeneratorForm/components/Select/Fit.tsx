import { useGeneratorSetting } from "@/store/useGeneratorData";

const Fit = () => {
  const { fit, setFit } = useGeneratorSetting();
  console.log("fit in Fit component:", fit);
  return (
    <div className="block h-full w-1/2">
      <h2 className="form-label">Fit Level</h2>
      <select
        id="fit"
        className="select w-full h-[35px] font-semibold text-xs py-2 border-1  border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200"
        value={
          "tailored" === fit
            ? "tailored"
            : fit === "bodyCon"
              ? "bodyCon"
              : fit === "relaxed"
                ? "relaxed"
                : fit === "oversized"
                  ? "oversized"
                  : "standardFit"
        }
        onChange={(e) => setFit(e.target.value as any)}
      >
        <option className="text-xs" value="bodyCon">
          Body Con
        </option>
        <option className="text-xs" value="tailored">
          Tailored
        </option>
        <option className="text-xs" value="standardFit" selected>
          Standard Fit
        </option>
        <option className="text-xs" value="relaxed">
          Relaxed
        </option>
        <option className="text-xs" value="oversized">
          Oversized
        </option>
      </select>
    </div>
  );
};

export default Fit;
