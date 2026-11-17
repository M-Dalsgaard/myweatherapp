import { Wind, Sunrise, Sunset, Navigation } from "lucide-react";

import type { WeatherData } from "../types/index";
import { getWeatherDescription } from "../utilities/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import { formatTime, formatWindDirection } from "../utilities/formatters";
import WeatherCardDecorations from "./WeatherCardDecorations";
import WeatherConditionDecorations from "./WeatherConditionDecorations";

type CurrentWeatherProps = {
  current: WeatherData["current"];
  sunrise: string;
  sunset: string;
  heroGradientClass: string;
  locationName: string;
};

const CurrentWeather = ({
  current,
  sunrise,
  sunset,
  heroGradientClass,
  locationName,
}: CurrentWeatherProps) => {
  const today = getWeatherDescription(
    current.weather_code,
    current.is_day === 1,
  );

  return (
    <section
      aria-labelledby="current-weather-heading"
      className={`relative isolate overflow-hidden rounded-4xl border border-white/15 bg-linear-to-br p-6 shadow-2xl shadow-indigo-950/40 transition-colors duration-1000 sm:p-10 ${heroGradientClass}`}
    >
      <WeatherCardDecorations />
      <WeatherConditionDecorations
        weatherCode={current.weather_code}
        isDay={current.is_day === 1}
      />

      {current.is_day !== 1 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-24 z-1 sm:left-1/2 sm:top-6 sm:-translate-x-1/2"
        >
          <svg
            viewBox="0 0 80 80"
            className="block size-24 shrink-0 opacity-75 sm:size-28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58 12
     A30 30 0 1 0 58 68
     A18 18 0 0 1 58 12Z"
              fill="#E9D5FF"
            />
          </svg>
        </div>
      )}

      <header className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.2em] text-indigo-100">
            {locationName}
          </p>

          <h2
            id="current-weather-heading"
            className="mt-2 text-sm font-medium text-white/75"
          >
            Aktuelt vejr
          </h2>
        </div>

        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
          {current.is_day === 1 ? "Dag" : "Nat"}
        </span>
      </header>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
        <div className="order-2 sm:order-1">
          <p className="text-7xl font-black tracking-tighter sm:text-8xl">
            {Math.round(current.temperature_2m)}°
          </p>

          <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
            {today.description}
          </h3>

          <p className="mt-2 text-sm text-white/75">
            Føles som {Math.round(current.apparent_temperature)}°
          </p>
        </div>

        <div className="order-1 flex size-32 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-inner backdrop-blur-sm sm:order-2 sm:size-44">
          <WeatherIcon
            condition={today.condition}
            isDay={current.is_day === 1}
            className="size-24 sm:size-32"
          />
        </div>
      </div>

      <div className="relative z-10 mt-8 space-y-3 border-t border-white/20 pt-6">
        {/* Wind information */}
        <section
          aria-labelledby="wind-heading"
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
        >
          <div
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10"
          >
            <Wind size={24} className="text-sky-200" />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              id="wind-heading"
              className="text-xs font-medium uppercase tracking-wider text-indigo-200"
            >
              Vind
            </h3>

            <dl className="mt-2 grid grid-cols-2 divide-x divide-white/15">
              {/* Wind speed */}
              <div className="pr-3">
                <dt className="text-xs text-white/60">Vindhastighed</dt>

                <dd className="mt-1 flex items-center gap-1 font-normal">
                  <span className="text-2xl font-semibold tracking-tight">
                    {(current.wind_speed_10m / 3.6).toFixed(1)}
                  </span>

                  <span className="whitespace-nowrap text-xs text-white/70">
                    m/s
                  </span>

                  <Navigation
                    aria-hidden="true"
                    size={18}
                    className="ml-0.5 shrink-0 text-sky-100"
                    style={{
                      transform: `rotate(${current.wind_direction_10m + 180}deg)`,
                    }}
                  />
                </dd>

                <dd className="mt-1 text-sm font-medium text-white/85">
                  Fra {formatWindDirection(current.wind_direction_10m)}
                </dd>
              </div>

              {/* Wind gusts */}
              <div className="pl-3">
                <dt className="text-xs text-white/60">Vindstød</dt>

                <dd className="mt-1 flex items-baseline gap-x-1.5 font-normal">
                  <span className="text-2xl font-semibold tracking-tight">
                    {(current.wind_gusts_10m / 3.6).toFixed(1)}
                  </span>

                  <span className="text-sm text-white/70">m/s</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Sunrise and sunset */}
        <section
          aria-label="Solopgang og solnedgang"
          className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
        >
          <dl className="mt-3 flex items-center gap-3">
            <div className="min-w-0 flex-1 text-center">
              <dt className="flex items-center justify-center gap-2 text-xs text-white/85">
                <Sunrise
                  aria-hidden="true"
                  size={20}
                  className="shrink-0 text-amber-300"
                />
                Solopgang
              </dt>

              <dd className="mt-1 text-lg font-semibold">
                {formatTime(sunrise)}
              </dd>
            </div>

            <div
              aria-hidden="true"
              className="h-10 w-px shrink-0 bg-white/20"
            />

            <div className="min-w-0 flex-1 text-center">
              <dt className="flex items-center justify-center gap-2 text-xs text-white/85">
                <Sunset
                  aria-hidden="true"
                  size={20}
                  className="shrink-0 text-orange-300"
                />
                Solnedgang
              </dt>

              <dd className="mt-1 text-lg font-semibold">
                {formatTime(sunset)}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  );
};

export default CurrentWeather;
