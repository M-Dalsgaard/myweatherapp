import { useState } from "react";
import { Search, MapPinSearch, Plus, LoaderCircle, Check } from "lucide-react";

import { searchCities } from "../services/geocodingApi";
import type { CityResult } from "../types/index";

type LocationSearchProps = {
  onSave: (city: CityResult) => void;
  savedCityIds: number[];
};

const LocationSearch = ({ onSave, savedCityIds }: LocationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setResults(await searchCities(query));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Der opstod en fejl under søgningen.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="location-search-heading"
      className="rounded-3xl border border-sky-300/20 bg-[#1d3560]/90 p-5 shadow-xl backdrop-blur-sm sm:p-6"
    >
      <header className="mb-4 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/15"
        >
          <MapPinSearch size={20} className="text-cyan-200" />
        </div>
        <div>
          <h2 id="location-search-heading" className="font-semibold text-white">
            Find nye steder
          </h2>
          <p className="text-sm text-sky-200">
            Søg efter en by og gem den til senere
          </p>
        </div>
      </header>

      <form onSubmit={handleSearch} className="flex gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Søg efter en by</span>
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-200"
          />
          <input
            type="search"
            name="city"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Søg efter en by..."
            className="w-full rounded-xl border border-sky-300/25 bg-[#122443] py-3 pl-10 pr-3 text-white outline-none placeholder:text-sky-200/60 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <button
          type="submit"
          disabled={loading || query.trim().length < 2}
          aria-label={loading ? "Søger efter byer" : "Søg efter byer"}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/15 px-4 py-3 font-semibold text-white transition hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <LoaderCircle
              size={18}
              aria-hidden="true"
              className="animate-spin"
            />
          ) : (
            <Search size={18} aria-hidden="true" />
          )}
          <span className="hidden sm:inline">Søg</span>
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm text-amber-200">
          {error}
        </p>
      )}

      <div aria-live="polite" aria-busy={loading}>
        {!loading && results.length > 0 && (
          <ul aria-label="Søgeresultater for byer" className="mt-4 space-y-2">
            {results.map((city) => {
              const alreadySaved = savedCityIds.includes(city.id);

              return (
                <li
                  key={`${city.id}-${city.latitude}-${city.longitude}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-sky-300/20 bg-[#294875] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {city.name}
                    </p>
                    <p className="truncate text-sm text-sky-200">
                      {[city.admin1, city.country].filter(Boolean).join(", ")}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={alreadySaved}
                    onClick={() => onSave(city)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#101b3c] ${
                      alreadySaved
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 shadow-emerald-950/20 cursor-default"
                        : "border-cyan-300/30 bg-linear-to-r from-sky-600 to-cyan-600 text-white shadow-sky-950/30 hover:from-sky-500 hover:to-cyan-500 hover:shadow-cyan-500/20 active:scale-95"
                    }`}
                  >
                    {alreadySaved ? (
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    ) : (
                      <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
                    )}
                    <span>{alreadySaved ? "Gemt" : "Gem sted"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!loading &&
          query.trim().length >= 2 &&
          results.length === 0 &&
          !error && (
            <p className="mt-4 text-sm text-sky-200">
              Ingen søgeresultater endnu. Prøv et andet bynavn.
            </p>
          )}
      </div>
    </section>
  );
};

export default LocationSearch;
