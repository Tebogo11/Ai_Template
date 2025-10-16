import IsNewOutput from "./IsNewOutput";
import SeasonInput from "./SeasonInput";

const ToggleSections = () => {
  return (
    <div className="flex w-full">
      <SeasonInput />
      <IsNewOutput />
    </div>
  );
};

export default ToggleSections;
