import { useGeneratorSetting } from "@/store/useGeneratorData";

const Event = () => {
  const { event, setEvent } = useGeneratorSetting();

  return (
    <div className="block h-full w-1/2">
      <h2 className="input-label">Occasion</h2>
      <select
        id="event"
        className="select cursor-pointer w-full h-[35px] font-semibold text-xs py-2 border border-base-300 shadow focus:outline-none focus:ring-2 focus:ring-base-300 transition-all break-words whitespace-pre-wrap bg-base-200"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      >
        <option className="text-xs" value="casual">
          Casual everyday
        </option>
        <option className="text-xs" value="creative_workspace">
          Creative workspace
        </option>
        <option className="text-xs" value="corporate">
          Corporate / professional
        </option>
        <option className="text-xs" value="date_night">
          Date night
        </option>
        <option className="text-xs" value="party">
          Party / nightlife
        </option>
        <option className="text-xs" value="formal">
          Formal event
        </option>
        <option className="text-xs" value="editorial">
          Editorial / runway
        </option>
      </select>
    </div>
  );
};

export default Event;
