
export type WeatherPreview =
  | "actual"
  | "sunny"
  | "cloudy"
  | "fog"
  | "rain"
  | "snow"
  | "storm"
  | "night";

type WeatherPreviewProps = {
  value: WeatherPreview;
  onChange: (value: WeatherPreview) => void;
};

const WeatherPreviewControl = ({
  value,
  onChange,
}: WeatherPreviewProps) => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <label
        htmlFor="weather-preview"
        className="text-sm font-medium text-indigo-100"
      >
        Forhåndsvis baggrund
      </label>

      <select
        id="weather-preview"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as WeatherPreview)
        }
        className="max-w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-violet-400"
      >
        <option value="actual">Aktuelt vejr</option>
        <option value="sunny">Solskin</option>
        <option value="cloudy">Overskyet</option>
        <option value="fog">Tåge</option>
        <option value="rain">Regn</option>
        <option value="snow">Sne</option>
        <option value="storm">Tordenvejr</option>
        <option value="night">Nat</option>
      </select>
    </div>
  );
};

export default WeatherPreviewControl;
