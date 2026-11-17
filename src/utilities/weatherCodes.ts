
export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "showers"
  | "snow"
  | "thunderstorm"
  | "clear-night"
  | "unknown";

interface WeatherDescription {
  condition: WeatherCondition;
  description: string;
}

export function getWeatherDescription(
  code: number,
  isDay = true,
): WeatherDescription {
  if (code === 0) {
    return isDay
      ? { condition: "sunny", description: "Solrigt" }
      : { condition: "clear-night", description: "Klart vejr" };
  }

  if (code === 1) {
    return {
      condition: "partly-cloudy",
      description: "Overvejende klart",
    };
  }

  if (code === 2) {
    return {
      condition: "partly-cloudy",
      description: "Delvist skyet",
    };
  }

  if (code === 3) {
    return { condition: "cloudy", description: "Overskyet" };
  }

  if (code === 45 || code === 48) {
    return { condition: "fog", description: "Tåge" };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { condition: "drizzle", description: "Støvregn" };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return { condition: "rain", description: "Regn" };
  }

  if ([80, 81, 82].includes(code)) {
    return { condition: "showers", description: "Regnbyger" };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { condition: "snow", description: "Sne" };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      condition: "thunderstorm",
      description: "Tordenvejr",
    };
  }

  return {
    condition: "unknown",
    description: "Ukendt vejr",
  };
}
