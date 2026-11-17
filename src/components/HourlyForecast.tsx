import { CloudRain, CloudSun, Droplets, Wind } from "lucide-react";

import type { WeatherData } from "../types/index";
import { getWeatherDescription } from "../utilities/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import { formatWindDirection, getDenmarkNow } from "../utilities/formatters";

type HourlyForecastProps = {
  hourly: WeatherData["hourly"];
};

const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  const denmarkNow = getDenmarkNow();

  const upcomingHours = hourly.time
    .map((time, index) => ({
      time,
      index,
      rainChance: hourly.precipitation_probability[index] ?? 0,
    }))
    .filter(({ time }) => time.replace("T", " ") >= denmarkNow)
    .slice(0, 6);

  const firstRainyHour = upcomingHours.find(
    ({ rainChance }) => rainChance >= 40,
  );

  const displayHours = hourly.time
    .map((time, index) => ({ time, index }))
    .filter(({ time }) => time.replace("T", " ") >= denmarkNow)
    .slice(0, 24);

  return (
    <section aria-labelledby="hourly-heading">
      {/* Rain summary */}
      <aside className="mb-3 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3">
        {firstRainyHour ? (
          <div className="flex items-center gap-3">
            <CloudRain
              size={28}
              aria-hidden="true"
              className="shrink-0 text-sky-300"
            />
            <div>
              <p className="font-semibold leading-snug text-blue-100">
                Mulighed for regn kl.{" "}
                <span className="whitespace-nowrap">
                  {firstRainyHour.time.slice(11, 16)}
                </span>
              </p>
              <p className="text-sm text-blue-200/80">
                {firstRainyHour.rainChance}% sandsynlighed for nedbør
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CloudSun
              size={28}
              aria-hidden="true"
              className="shrink-0 text-amber-300"
            />
            <div>
              <p className="font-semibold text-blue-100">
                Lille risiko for regn
              </p>
              <p className="text-sm text-blue-200/80">
                Ingen af de kommende timer har mindst 40% sandsynlighed for
                regn.
              </p>
            </div>
          </div>
        )}
      </aside>

      <h2
        id="hourly-heading"
        className="mb-3 mt-1 text-xl font-bold sm:text-2xl"
      >
        Time for time
      </h2>

      <ol className="flex gap-3 overflow-x-auto pb-3">
        {displayHours.map(({ time, index }, position) => {
          const hour = Number(time.slice(11, 13));
          const description = getWeatherDescription(hourly.weather_code[index]);

          return (
            <li key={time} className="list-none">
              <article
                className={`w-24 shrink-0 rounded-2xl border p-3 text-center ${
                  position === 0
                    ? "border-violet-300/40 bg-linear-to-b from-indigo-500/30 to-violet-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <time
                  dateTime={time}
                  className="text-sm font-medium text-indigo-200"
                >
                  {time.slice(11, 16)}
                </time>

                <div className="my-3 flex justify-center" aria-hidden="true">
                  <WeatherIcon
                    condition={description.condition}
                    isDay={hour >= 6 && hour < 20}
                    className="size-12"
                  />
                </div>

                <p className="text-2xl font-semibold">
                  {Math.round(hourly.temperature_2m[index])}°
                </p>

                <p className="mt-2 text-xs text-indigo-200">
                  <span className="inline-flex items-center gap-1">
                    <Droplets
                      size={14}
                      aria-hidden="true"
                      className="text-sky-300"
                    />
                    {hourly.precipitation_probability[index] ?? 0}%
                  </span>
                </p>

                <p className="mt-1 text-xs text-indigo-200">
                  <Wind
                    size={14}
                    aria-hidden="true"
                    className="mr-1 inline-block align-[-2px] text-violet-300"
                  />
                  {(hourly.wind_speed_10m[index] / 3.6).toFixed(1)} m/s
                </p>

                <p className="mt-1 text-xs text-indigo-200">
                  {formatWindDirection(hourly.wind_direction_10m[index])}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default HourlyForecast;
