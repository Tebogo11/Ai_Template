import IsNewOutput from "./IsNewOutput";
import SeasonInput from "./SeasonInput";

const ToggleSections = () => {
  return (
    <div className="flex  mt-3.5 ">
      <SeasonInput />
      <IsNewOutput />
    </div>
  );
};

export default ToggleSections;
