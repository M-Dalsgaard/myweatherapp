
import type { WeatherData } from "../types/index";

const DEFAULT_LATITUDE = 56.4167;
const DEFAULT_LONGITUDE = 10.8783;

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// Reuse an in-flight request when the same coordinates are requested again.
const inFlightRequests = new Map<string, Promise<WeatherData>>();

export async function fetchWeather(
  latitude: number = DEFAULT_LATITUDE,
  longitude: number = DEFAULT_LONGITUDE,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset",
    hourly:
      "temperature_2m,apparent_temperature,weather_code,precipitation_probability,wind_speed_10m,wind_direction_10m",
    timezone: "Europe/Copenhagen",
    forecast_days: "7",
  });

  const url = `${FORECAST_URL}?${params.toString()}`;
  const requestKey = `${latitude},${longitude}`;

  const existingRequest = inFlightRequests.get(requestKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async (): Promise<WeatherData> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Vejrforespørgslen mislykkedes (${response.status})`,
      );
    }

    return (await response.json()) as WeatherData;
  })();

  inFlightRequests.set(requestKey, request);

  try {
    return await request;
  } finally {
    // Only remove this request if it is still the registered one.
    if (inFlightRequests.get(requestKey) === request) {
      inFlightRequests.delete(requestKey);
    }
  }
}
