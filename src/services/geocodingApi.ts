import type { CityResult } from "../types/index";
const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";


type GeocodingResponse = {
  results?: CityResult[];
};

export async function searchCities(
  query: string,
): Promise<CityResult[]> {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmedQuery,
    count: "10",
    language: "da",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Kunne ikke søge efter byer.");
  }

  const data = (await response.json()) as GeocodingResponse;

  return data.results ?? [];
}
