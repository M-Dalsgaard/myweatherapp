
const REVERSE_GEOCODING_URL =
  "https://nominatim.openstreetmap.org/reverse";

const LOCATION_CACHE_KEY = "weather-app-location-name-cache";
const CACHE_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

type ReverseGeocodingResult = {
  name?: string;
  address?: {
    town?: string;
    city?: string;
    village?: string;
    hamlet?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
};

type CachedLocation = {
  name: string;
  cachedAt: number;
};

type LocationCache = Record<string, CachedLocation>;

const inFlightRequests = new Map<string, Promise<string | null>>();

function getCacheKey(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
}

function readPersistentCache(key: string): string | null {
  try {
    const stored = localStorage.getItem(LOCATION_CACHE_KEY);

    if (!stored) return null;

    const cache = JSON.parse(stored) as LocationCache;
    const entry = cache[key];

    if (!entry) return null;

    if (Date.now() - entry.cachedAt > CACHE_DURATION_MS) {
      delete cache[key];
      localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cache));
      return null;
    }

    return entry.name;
  } catch {
    return null;
  }
}

function writePersistentCache(key: string, name: string): void {
  try {
    const stored = localStorage.getItem(LOCATION_CACHE_KEY);
    const cache = stored ? (JSON.parse(stored) as LocationCache) : {};

    cache[key] = {
      name,
      cachedAt: Date.now(),
    };

    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // The lookup still works if browser storage is unavailable.
  }
}

export function fetchLocationName(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  const key = getCacheKey(latitude, longitude);

  const existingRequest = inFlightRequests.get(key);
  if (existingRequest) return existingRequest;

  const cachedName = readPersistentCache(key);

  if (cachedName) {
    return Promise.resolve(cachedName);
  }

  const request = fetchLocationNameFromApi(latitude, longitude)
    .then((name) => {
      if (name) {
        writePersistentCache(key, name);
      }

      return name;
    })
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, request);

  return request;
}

async function fetchLocationNameFromApi(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "jsonv2",
    addressdetails: "1",
    zoom: "12",
  });

  const response = await fetch(
    `${REVERSE_GEOCODING_URL}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Kunne ikke finde stedets navn.");
  }

  const data = (await response.json()) as ReverseGeocodingResult;
  const address = data.address;

  return (
    address?.town ??
    address?.city ??
    address?.village ??
    address?.hamlet ??
    data.name ??
    address?.municipality ??
    address?.county ??
    address?.state ??
    address?.country ??
    null
  );
}
