import { Season, useGeneratorSetting } from "@/store/useGeneratorData";
import React, { use, useEffect, useState } from "react";

const seasonOptions = [
  { label: "🌸", value: Season.SPRING },
  { label: "☀️", value: Season.SUMMER },
  { label: "🍂", value: Season.AUTUMN },
  { label: "❄️", value: Season.WINTER },
];

const SeasonInput = () => {
  const { season: currentSeason, setSeason } = useGeneratorSetting();
  useEffect(() => {
    const currentSeason = getCurrentSeason();
    setSeason(currentSeason);
  }, []);
  return (
    <div className="flex-1 pr-3">
      <h2 className="form-label">Season</h2>
      <div className="flex justify-between space-x-0.5 bg-base-300 p-0.5 rounded-sm ">
        {seasonOptions.map((season) => (
          <button
            onClick={() => setSeason(season.value)}
            key={season.value}
            className={`btn btn-sm border-0 rounded-xs text-[0.8rem] flex-1 ${currentSeason === season.value ? "bg-base-100" : "bg-base-300"}`}
          >
            {season.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonInput;

// Season	Emoji	Meaning
// Spring	🌸	Blossoms, renewal, fresh starts
// Summer	☀️	Warmth, sunshine, energy
// Autumn	🍂	Falling leaves, change
// Winter	❄️	Snow, cold, calm

function getCurrentSeason(): Season {
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth() returns 0-11

  if (month >= 3 && month <= 5) return Season.SPRING;
  if (month >= 6 && month <= 8) return Season.SUMMER;
  if (month >= 9 && month <= 11) return Season.AUTUMN;
  return Season.WINTER;
}
