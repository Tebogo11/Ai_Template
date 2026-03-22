import { useGeneratorSetting } from "@/store/useGeneratorData";
import { amountOfChangeOptions } from "./const";

const AmountOfChange = () => {
  const { setAmountOfChangeOption: setAmountOfChange, amount_of_change } =
    useGeneratorSetting();
  return (
    <div>
      <h2 className="input-label">
        How much of the model's outfit do you want to change?
      </h2>

      <div className="flex justify-between items-center min-w-[100%] mb-2 bg-base-300 py-1 px-1.5 rounded-sm">
        <div className="flex justify-between space-x-1.5 p-0.5 rounded-sm w-full ">
          {amountOfChangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setAmountOfChange(option.value)}
              className={`flex w-[20%] btn btn-xs border-0 rounded-xs text-[0.8rem] flex-1 ${amount_of_change === option.value ? "bg-base-100 opacity-100" : "bg-base-300 opacity-70"}`}
            >
              {" "}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmountOfChange;
