import { useGeneratorSetting } from '@/store/useGeneratorData';

const IsNewOutput = () => {
  const { setIsNewOutfit, is_new_outfit } = useGeneratorSetting();
  return (
    <div className="bg-base-200 mt-4 mb-2 flex min-w-[100%] items-center justify-between rounded-sm px-1.5 py-1">
      <h2 className="input-label mt-0.5" style={{ fontSize: '0.6rem' }}>
        Try preserve current models outfit{' '}
        <span className="text-xxs font-light">
          (or are you looking for a complete change?)
        </span>
      </h2>
      <div className="bg-base-300 flex w-2/6 justify-between space-x-0.5 rounded-sm p-0.5">
        <button
          onClick={() => setIsNewOutfit(true)}
          className={`btn btn-xs flex-1 rounded-xs border-0 text-[0.8rem] ${is_new_outfit ? 'bg-base-100' : 'bg-base-300'}`}
        >
          No
        </button>
        <button
          onClick={() => setIsNewOutfit(false)}
          className={`btn btn-xs flex-1 rounded-xs border-0 text-[0.8rem] ${!is_new_outfit ? 'bg-base-100' : 'bg-base-300'}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default IsNewOutput;
