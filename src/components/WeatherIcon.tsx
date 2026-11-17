import clearDay from "@meteocons/svg/fill/clear-day.svg";
import clearNight from "@meteocons/svg/fill/clear-night.svg";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyCloudyNight from "@meteocons/svg/fill/partly-cloudy-night.svg";
import cloudy from "@meteocons/svg/fill/cloudy.svg";
import fog from "@meteocons/svg/fill/fog.svg";
import drizzle from "@meteocons/svg/fill/drizzle.svg";
import rain from "@meteocons/svg/fill/rain.svg";
import showers from "@meteocons/svg/fill/partly-cloudy-day-rain.svg";;
import snow from "@meteocons/svg/fill/snow.svg";
import thunderstorms from "@meteocons/svg/fill/thunderstorms.svg";
import notAvailable from "@meteocons/svg/fill/not-available.svg";
import type { WeatherCondition } from "../utilities/weatherCodes";

type WeatherIconProps = {
  condition: WeatherCondition;
  isDay?: boolean;
  className?: string;
};

export default function WeatherIcon({
  condition,
  isDay = true,
  className = "",
}: WeatherIconProps) {
  const icons: Record<string, string> = {
    sunny: isDay ? clearDay : clearNight,
    "partly-cloudy": isDay ? partlyCloudyDay : partlyCloudyNight,
    cloudy,
    fog,
    drizzle,
    rain,
    showers,
    snow,
    thunderstorm: thunderstorms,
    "clear-night": clearNight,
    unknown: notAvailable,
  };

  return (
    <img
      src={icons[condition] ?? notAvailable}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
