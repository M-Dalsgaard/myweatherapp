import { Check, MapPin, Trash2 } from "lucide-react";
import type { CityResult } from "../types/index";

type SavedLocationsProps = {
  locations: CityResult[];
  selectedCityId: number | null;
  onSelect: (city: CityResult) => void;
  onRemove: (city: CityResult) => void;
  onSelectActual: () => void;
  isActualSelected: boolean;
};

const SavedLocations = ({
  locations,
  selectedCityId,
  onSelect,
  onRemove,
  onSelectActual,
  isActualSelected,
}: SavedLocationsProps) => {
  return (
    <section
      aria-labelledby="saved-locations-heading"
      className="rounded-3xl border border-sky-300/20 bg-[#1d3560]/90 p-5 shadow-xl backdrop-blur-sm sm:p-6"
    >
      <header className="mb-4 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/15"
        >
          <MapPin size={20} className="text-cyan-200" />
        </div>
        <div>
          <h2 id="saved-locations-heading" className="font-semibold text-white">
            Dine gemte steder
          </h2>
          <p className="text-sm text-sky-200">Vælg et sted for at se vejret</p>
        </div>
      </header>

      <button
        type="button"
        onClick={onSelectActual}
        aria-pressed={isActualSelected}
        className={`mb-3 flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left transition ${
          isActualSelected
            ? "border-cyan-300/50 bg-cyan-400/20"
            : "border-sky-300/20 bg-[#162b50] hover:bg-[#294875]"
        }`}
      >
        <span className="min-w-0">
          <span className="block font-medium text-white">
            Din nuværende placering
          </span>
          <span className="block text-sm text-sky-200">
            Brug vejret dér, hvor jeg befinder mig
          </span>
        </span>
        {isActualSelected && (
          <Check
            size={18}
            aria-hidden="true"
            className="shrink-0 text-cyan-200"
          />
        )}
      </button>

      {locations.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-sky-300/25 p-4 text-sm text-sky-200">
          Du har ikke gemt nogen steder endnu. Søg efter en by ovenfor for at
          tilføje den.
        </p>
      ) : (
        <ul aria-label="Gemte steder" className="space-y-2">
          {locations.map((city) => {
            const isSelected = selectedCityId === city.id;

            return (
              <li
                key={`${city.id}-${city.latitude}-${city.longitude}`}
                className={`flex items-center gap-2 rounded-2xl border p-3 transition ${
                  isSelected
                    ? "border-cyan-300/50 bg-cyan-400/20 shadow-lg shadow-cyan-950/15"
                    : "border-sky-300/20 bg-[#294875] hover:bg-[#35588a]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(city)}
                  aria-pressed={isSelected}
                  className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-white">
                      {city.name}
                    </span>
                    <span className="block truncate text-sm text-sky-200">
                      {[city.admin1, city.country].filter(Boolean).join(", ")}
                    </span>
                  </span>
                  {isSelected && (
                    <Check
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-cyan-200"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onRemove(city)}
                  aria-label={`Fjern ${city.name} fra gemte steder`}
                  title="Fjern gemt sted"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-sky-300/20 text-sky-200 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default SavedLocations;
