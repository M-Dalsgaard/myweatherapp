import { useCallback, useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { RefreshCw, MapPinSearch, MapPinned, X } from "lucide-react";

import { fetchWeather } from "../services/weatherApi";
import type { WeatherData } from "../types/index";
import { fetchLocationName } from "../services/locationApi";
import { getWeatherDescription } from "../utilities/weatherCodes";

import WeatherPreviewControl, {
  type WeatherPreview,
} from "../components/WeatherPreview";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import LocationSearch from "../components/LocationSearch";
import type { CityResult } from "../types/index";
import SavedLocations from "../components/SavedLocations";
import BackgroundDecorations from "../components/BackgroundDecorations";

const previewConditions: Record<
  Exclude<WeatherPreview, "actual">,
  { code: number; isDay: boolean }
> = {
  sunny: { code: 0, isDay: true },
  cloudy: { code: 3, isDay: true },
  fog: { code: 45, isDay: true },
  rain: { code: 61, isDay: true },
  snow: { code: 71, isDay: true },
  storm: { code: 95, isDay: true },
  night: { code: 0, isDay: false },
};

const getBackgroundGradient = (
  weatherCode: number | undefined,
  isDay: boolean,
): string => {
  if (weatherCode === undefined) {
    return "from-slate-950 via-indigo-950 to-violet-950";
  }

  if (!isDay) {
    return "from-slate-950 via-blue-950 to-slate-950";
  }

  if ([0, 1].includes(weatherCode)) {
    return "from-slate-900 via-blue-950 to-indigo-900";
  }

  if ([2, 3].includes(weatherCode)) {
    return "from-slate-900 via-indigo-950 to-violet-950";
  }

  if ([45, 48].includes(weatherCode)) {
    return "from-slate-900 via-slate-950 to-indigo-950";
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  ) {
    return "from-sky-950 via-blue-950 to-indigo-950";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "from-slate-950 via-sky-950 to-indigo-950";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "from-purple-950 via-slate-950 to-indigo-950";
  }

  return "from-slate-950 via-indigo-950 to-violet-950";
};

const getHeroGradient = (
  weatherCode: number | undefined,
  isDay: boolean,
): string => {
  if (weatherCode === undefined) {
    return "from-blue-500 via-indigo-600 to-violet-700";
  }

  if (!isDay) {
    return "from-indigo-950 via-blue-950 to-slate-900";
  }

  if ([0, 1].includes(weatherCode)) {
    return "from-amber-600 via-sky-500 to-indigo-600";
  }

  if ([2, 3].includes(weatherCode)) {
    return "from-slate-500 via-indigo-700 to-violet-900";
  }

  if ([45, 48].includes(weatherCode)) {
    return "from-slate-500 via-slate-700 to-indigo-900";
  }

  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  ) {
    return "from-sky-600 via-blue-800 to-indigo-950";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "from-sky-800 via-sky-400 to-indigo-400";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "from-violet-700 via-purple-900 to-slate-950";
  }

  return "from-blue-500 via-indigo-600 to-violet-700";
};

type SavedLocation = CityResult;

const SAVED_LOCATIONS_KEY = "weather-app-saved-locations";

const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSavedCity, setSelectedSavedCity] = useState<CityResult | null>(
    null,
  );

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [savedLocations, setSavedLocations] = useState<CityResult[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_LOCATIONS_KEY);
      return stored ? (JSON.parse(stored) as CityResult[]) : [];
    } catch {
      return [];
    }
  });

  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const activeLatitude = selectedSavedCity?.latitude ?? coordinates?.latitude;

  const activeLongitude =
    selectedSavedCity?.longitude ?? coordinates?.longitude;
  const [actualLocationName, setActualLocationName] = useState<string | null>(
    null,
  );

  const locationName = selectedSavedCity
    ? selectedSavedCity.name
    : (actualLocationName ?? "Grenaa");

  const [weatherPreview, setWeatherPreview] =
    useState<WeatherPreview>("actual");

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(activeLatitude, activeLongitude);
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Der opstod en fejl under hentning af vejret.",
      );
    } finally {
      setLoading(false);
    }
  }, [activeLatitude, activeLongitude]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoordinates(null);
      return;
    }

    let hasReceivedLocation = false;
    let latestLookupId = 0;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const nextCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoordinates(nextCoordinates);

        if (!hasReceivedLocation) {
          hasReceivedLocation = true;

          void fetchLocationName(
            nextCoordinates.latitude,
            nextCoordinates.longitude,
          )
            .then((name) => {
              if (name) {
                setActualLocationName(name);
              }
            })
            .catch((err) => {
              console.error("Kunne ikke finde bynavnet:", err);
            });
        }
      },
      () => {
        if (!hasReceivedLocation) {
          setCoordinates(null);
        }
      },
      {
        enableHighAccuracy: false,
        maximumAge: 10000,
        timeout: 15000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    void loadWeather();
  }, [loadWeather]);

  const saveLocation = (city: CityResult) => {
    setSavedLocations((previous) => {
      if (previous.some((saved) => saved.id === city.id)) {
        return previous;
      }

      return [...previous, city];
    });
  };

  const removeLocation = (city: CityResult) => {
    setSavedLocations((previous) =>
      previous.filter((saved) => saved.id !== city.id),
    );

    if (selectedSavedCity?.id === city.id) {
      setSelectedSavedCity(null);
    }
  };

  useEffect(() => {
    localStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  const current = weather?.current;

  const previewCondition =
    weatherPreview === "actual" ? null : previewConditions[weatherPreview];

  const previewCurrent =
    current && previewCondition
      ? {
          ...current,
          weather_code: previewCondition.code,
          is_day: previewCondition.isDay ? 1 : 0,
        }
      : current;

  const backgroundWeatherCode = previewCondition?.code ?? current?.weather_code;

  const backgroundIsDay = previewCondition?.isDay ?? current?.is_day === 1;

  const today = previewCurrent
    ? getWeatherDescription(
        previewCurrent.weather_code,
        previewCurrent.is_day === 1,
      )
    : null;

  const backgroundGradientClass = getBackgroundGradient(
    backgroundWeatherCode,
    backgroundIsDay,
  );

  const heroGradientClass = getHeroGradient(
    backgroundWeatherCode,
    backgroundIsDay,
  );

  return (
    <IonPage>
      <IonContent fullscreen className="[--background:transparent]">
        <main
          className={`relative isolate min-h-full bg-linear-to-br px-4 py-6 text-white transition-colors duration-1000 sm:px-8 sm:py-10 ${backgroundGradientClass}`}
        >
          <BackgroundDecorations />

          <div className="relative z-10 mx-auto w-full max-w-5xl space-y-8">
            {weather && (
              <WeatherPreviewControl
                value={weatherPreview}
                onChange={setWeatherPreview}
              />
            )}

            {loading && !weather ? (
              <section
                role="status"
                aria-label="Indlæser vejrdata"
                className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <IonSpinner name="crescent" aria-hidden="true" />
                <p className="text-indigo-100">Henter det nyeste vejr …</p>
              </section>
            ) : error && !weather ? (
              <section
                aria-labelledby="weather-error-heading"
                className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <span aria-hidden="true" className="text-5xl">
                  🌧️
                </span>
                <h2 id="weather-error-heading" className="text-xl font-bold">
                  Vejret kunne ikke hentes
                </h2>
                <p className="max-w-md text-sm text-indigo-100">{error}</p>
                <button
                  type="button"
                  onClick={() => void loadWeather()}
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-indigo-950 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-950"
                >
                  Prøv igen
                </button>
              </section>
            ) : weather && current && today ? (
              <>
                {/* Location manager button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  >
                    <span aria-hidden="true">
                      <MapPinSearch className="text-indigo-200" />
                    </span>
                    <span>Steder</span>
                  </button>
                </div>

                {/* Location manager modal */}
                <IonModal
                  isOpen={isLocationModalOpen}
                  onDidDismiss={() => setIsLocationModalOpen(false)}
                  className="location-manager-modal"
                >
                  <IonHeader className="border-b border-violet-300/15 shadow-lg">
                    <IonToolbar className="--background:transparent bg-indigo-950">
                      <header className="flex items-center gap-3 border-b border-violet-300/20 bg-linear-to-l from-[#1d3560] via-[#24547a] to-[#287e98] px-5 py-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-linear-to-br from-sky-400/15 to-cyan-400/15 text-xl shadow-lg shadow-sky-950/30">
                          <span aria-hidden="true">
                            <MapPinned className="text-indigo-200" />
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg font-bold tracking-wide text-white">
                            Administrer steder
                          </h2>
                          <p className="mt-1 text-sm text-indigo-200/75">
                            Find byer og administrer dine gemte steder
                          </p>
                        </div>

                        <IonButtons className="shrink-0">
                          <IonButton
                            aria-label="Luk stedvælger"
                            onClick={() => setIsLocationModalOpen(false)}
                            fill="clear"
                            className="location-modal-close"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-400/10 text-sky-100 transition-colors duration-200 hover:bg-sky-400/25">
                              <X size={20} strokeWidth={2} aria-hidden="true" />
                            </span>
                          </IonButton>
                        </IonButtons>
                      </header>
                    </IonToolbar>
                  </IonHeader>

                  <IonContent className="ion-padding bg-linear-to-br from-slate-800 via-indigo-950 to-violet-950">
                    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-2">
                      <LocationSearch
                        onSave={saveLocation}
                        savedCityIds={savedLocations.map((city) => city.id)}
                      />
                      <SavedLocations
                        locations={savedLocations}
                        selectedCityId={selectedSavedCity?.id ?? null}
                        onSelect={(city) => {
                          setSelectedSavedCity(city);
                          setIsLocationModalOpen(false);
                        }}
                        onRemove={removeLocation}
                        onSelectActual={() => {
                          setSelectedSavedCity(null);
                          setIsLocationModalOpen(false);
                        }}
                        isActualSelected={selectedSavedCity === null}
                      />
                    </div>
                  </IonContent>
                </IonModal>

                {previewCurrent && (
                  <CurrentWeather
                    current={previewCurrent}
                    sunrise={weather.daily.sunrise[0]}
                    sunset={weather.daily.sunset[0]}
                    heroGradientClass={heroGradientClass}
                    locationName={locationName}
                  />
                )}

                <HourlyForecast hourly={weather.hourly} />

                <DailyForecast daily={weather.daily} />

                {error && (
                  <p
                    role="status"
                    className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100"
                  >
                    Opdateringen mislykkedes: {error}. Viser de senest hentede
                    vejrdata.
                  </p>
                )}

                <footer className="flex flex-col items-center gap-3 pb-4 pt-1">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => void loadWeather()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <IonSpinner name="crescent" aria-hidden="true" />
                        Opdaterer …
                      </>
                    ) : (
                      <>
                        <RefreshCw size={18} aria-hidden="true" />
                        Opdater vejret
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-indigo-300">
                    Vejrdata fra Open-Meteo
                  </p>

                  <p className="text-center text-xs text-indigo-300/80">
                    Kortdata ©{" "}
                    <a
                      href="https://www.openstreetmap.org/copyright"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      OpenStreetMap-bidragsydere
                    </a>
                  </p>
                  <p className="text-center text-xs text-indigo-300/80">
                    Weather app icon designed by{" "}
                    <a
                      href="https://www.flaticon.com/free-icon/weather-app_9502364"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      Kliwir Art
                    </a>{" "}
                    from Flaticon.
                  </p>
                </footer>
              </>
            ) : (
              <section
                aria-label="Vejrstatus"
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <p className="text-indigo-100">
                  Der er ingen vejrdata tilgængelige.
                </p>
                <button
                  type="button"
                  onClick={() => void loadWeather()}
                  className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-950"
                >
                  Prøv igen
                </button>
              </section>
            )}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
