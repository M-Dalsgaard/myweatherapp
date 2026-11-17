import { Droplets, Wind } from "lucide-react";

import type { WeatherData } from "../types/index";
import { getWeatherDescription } from "../utilities/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import { formatDate, formatWindDirection } from "../utilities/formatters";

type DailyForecastProps = {
  daily: WeatherData["daily"];
};

const DailyForecast = ({ daily }: DailyForecastProps) => {
  return (
    <section aria-labelledby="daily-heading">
      <h2
        id="daily-heading"
        className="mb-3 mt-1 text-xl font-bold sm:text-2xl"
      >
        7-dages vejrudsigt
      </h2>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {daily.time.map((date, index) => {
          const description = getWeatherDescription(daily.weather_code[index]);

          const rainChance = daily.precipitation_probability_max[index] ?? 0;

          return (
            <article
              key={date}
              className={`rounded-2xl border p-3 sm:p-4 ${
                index === 0
                  ? "border-violet-300/40 bg-linear-to-br from-indigo-500/25 to-violet-500/20"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* Day, icon and temperatures */}
              <div className="flex items-center gap-3">
                <div aria-hidden="true">
                  <WeatherIcon
                    condition={description.condition}
                    className="size-14"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">
                    <time dateTime={date}>
                      {index === 0 ? "I dag" : formatDate(date)}
                    </time>
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-indigo-200">
                    {description.description}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-2xl font-semibold">
                    {Math.round(daily.temperature_2m_max[index])}°
                    <span className="ml-1 text-lg font-normal text-indigo-300">
                      {Math.round(daily.temperature_2m_min[index])}°
                    </span>
                  </p>
                  <p className="text-xs text-indigo-300">Høj / lav</p>
                </div>
              </div>

              {/* Rain and wind */}
              <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-2 border-t border-white/10 pt-3 text-sm">
                <p
                  aria-label={`Sandsynlighed for nedbør: ${rainChance}%`}
                  className={`w-fit rounded-lg px-2 py-1 text-xs font-semibold ${
                    rainChance >= 60
                      ? "bg-blue-500/25 text-blue-200"
                      : rainChance >= 30
                        ? "bg-sky-500/15 text-sky-200"
                        : "text-indigo-200"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Droplets
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-sky-300"
                    />
                    {rainChance}%
                  </span>
                </p>

                <div className="flex flex-col items-end gap-1 text-indigo-200">
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium">
                    <Wind
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-sky-200"
                    />
                    {(daily.wind_speed_10m_max[index] / 3.6).toFixed(1)}
                    <span className="text-xs text-indigo-300">m/s</span>
                  </p>

                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs">
                    {formatWindDirection(
                      daily.wind_direction_10m_dominant[index],
                    )}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
