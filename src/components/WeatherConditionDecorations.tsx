import { getWeatherDescription } from "../utilities/weatherCodes";

type WeatherConditionDecorationsProps = {
  weatherCode: number;
  isDay: boolean;
};

export default function WeatherConditionDecorations({
  weatherCode,
  isDay,
}: WeatherConditionDecorationsProps) {
  const weather = getWeatherDescription(weatherCode, isDay);

  const condition =
    weather.condition === "sunny" || weather.condition === "clear-night"
      ? "clear"
      : weather.condition === "partly-cloudy" || weather.condition === "cloudy"
        ? "cloudy"
        : weather.condition === "drizzle" ||
            weather.condition === "rain" ||
            weather.condition === "showers"
          ? "rain"
          : weather.condition === "thunderstorm"
            ? "storm"
            : weather.condition;

  const symbolColor = isDay ? "#BAE6FD" : "#C4B5FD";
  const accentColor = "#FDE68A";
  const patternId = `weather-pattern-${condition}-${isDay ? "day" : "night"}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 320"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <g id="weather-star" strokeLinecap="round">
            <path d="M0 -7V7 M-7 0H7 M-5 -5L5 5 M5 -5L-5 5" />
          </g>
          <g id="weather-diamond-sparkle" strokeLinejoin="round">
            <path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z" />
          </g>

          <g id="weather-sun" strokeLinecap="round">
            <circle
              r="9"
              fill={accentColor}
              fillOpacity=".12"
              stroke={accentColor}
            />
            <path d="M0 -15V-12 M0 12V15 M-15 0H-12 M12 0H15" />
            <path d="M-11 -11L-9 -9 M11 11L9 9 M11 -11L9 -9 M-11 11L-9 9" />
          </g>

          <g id="weather-cloud" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="
      M-17 8
      C-27 8 -30 0 -27 -7
      C-26 -13 -22 -16 -17 -17
      C-15 -27 -2 -29 5 -20
      C15 -27 28 -20 27 -9
      C36 -7 36 7 24 8
      H-17
      Z
    "
            />
          </g>

          <g id="weather-snowflake" strokeLinecap="round">
            <path d="M0 -10V10 M-8.7 -5L8.7 5 M-8.7 5L8.7 -5" />
            <path d="M0 -10L-2.5 -7 M0 -10L2.5 -7 M0 10L-2.5 7 M0 10L2.5 7" />
          </g>

          <g
            id="weather-lightning"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 -17L-10 3H0L-5 20L13 -3H3L9 -17Z" />
          </g>

          <pattern
            id={patternId}
            width="190"
            height="155"
            patternUnits="userSpaceOnUse"
          >
            {/* CLEAR DAY: staggered suns and sparkles */}
            {condition === "clear" && isDay && (
              <g stroke={symbolColor} strokeWidth="1.5">
                <use
                  href="#weather-sun"
                  transform="translate(34 32) scale(.85)"
                />
                <use
                  href="#weather-star"
                  transform="translate(139 22) scale(.65)"
                />

                <use
                  href="#weather-star"
                  transform="translate(88 88) scale(.4)"
                />
                <use
                  href="#weather-sun"
                  transform="translate(164 125) scale(.48)"
                />

                <circle
                  cx="21"
                  cy="119"
                  r="2"
                  fill={accentColor}
                  stroke="none"
                />
                <circle
                  cx="115"
                  cy="47"
                  r="1.6"
                  fill={symbolColor}
                  stroke="none"
                />
                <circle
                  cx="55"
                  cy="140"
                  r="1.5"
                  fill={accentColor}
                  stroke="none"
                />
              </g>
            )}

            {/* CLOUDY: unevenly distributed cloud outlines */}
            {condition === "cloudy" && (
              <g stroke={symbolColor} strokeWidth="1.6">
                <use
                  href="#weather-cloud"
                  transform="translate(42 38) scale(.8)"
                />
                <use
                  href="#weather-cloud"
                  transform="translate(151 103) scale(.52)"
                />
                <use
                  href="#weather-cloud"
                  transform="translate(72 139) scale(.38)"
                />
                <use
                  href="#weather-star"
                  transform="translate(119 35) scale(.35)"
                />
                <circle
                  cx="23"
                  cy="100"
                  r="1.8"
                  fill={accentColor}
                  stroke="none"
                />
                <circle
                  cx="177"
                  cy="55"
                  r="1.6"
                  fill={symbolColor}
                  stroke="none"
                />
              </g>
            )}

            {/* FOG: short lines, offset rather than aligned */}
            {condition === "fog" && (
              <g stroke={symbolColor} strokeWidth="2" strokeLinecap="round">
                <path d="M17 30H47 M27 39H57" />
                <path d="M115 78H157 M103 87H138" opacity=".8" />
                <path d="M43 121H70 M52 130H87" opacity=".65" />
                <path d="M154 25H176" opacity=".55" />
                <circle
                  cx="86"
                  cy="51"
                  r="1.8"
                  fill={accentColor}
                  stroke="none"
                />
                <circle
                  cx="165"
                  cy="140"
                  r="1.6"
                  fill={symbolColor}
                  stroke="none"
                />
              </g>
            )}

            {/* RAIN: varied lengths and scattered diagonal drops */}
            {condition === "rain" && (
              <g stroke={symbolColor} strokeWidth="2" strokeLinecap="round">
                <path d="M28 23L23 34 M82 42L77 53 M154 20L149 31" />
                <path d="M53 91L47 104 M125 120L120 132 M177 72L172 84" />
                <path d="M92 137L89 144 M16 68L13 75" opacity=".65" />
                <circle
                  cx="112"
                  cy="19"
                  r="1.7"
                  fill={accentColor}
                  stroke="none"
                />
                <circle
                  cx="68"
                  cy="119"
                  r="1.6"
                  fill={symbolColor}
                  stroke="none"
                />
              </g>
            )}

            {/* SNOW: flakes with different sizes and spacing */}
            {condition === "snow" && (
              <g stroke={symbolColor} strokeWidth="1.6">
                <use
                  href="#weather-snowflake"
                  transform="translate(34 35) scale(1)"
                />
                <use
                  href="#weather-snowflake"
                  transform="translate(143 25) scale(.6)"
                />
                <use
                  href="#weather-snowflake"
                  transform="translate(90 101) scale(.8)"
                />
                <use
                  href="#weather-snowflake"
                  transform="translate(164 133) scale(.42)"
                />
                <use
                  href="#weather-snowflake"
                  transform="translate(22 132) scale(.45)"
                />
                <circle
                  cx="118"
                  cy="61"
                  r="2"
                  fill={accentColor}
                  stroke="none"
                />
                <circle
                  cx="58"
                  cy="76"
                  r="1.5"
                  fill={symbolColor}
                  stroke="none"
                />
              </g>
            )}

            {/* STORM: lightning bolts at varied positions */}
            {condition === "storm" && (
              <g strokeWidth="1.7">
                <use
                  href="#weather-lightning"
                  transform="translate(37 40) scale(.7)"
                  stroke={accentColor}
                  fill={accentColor}
                  fillOpacity=".15"
                />
                <use
                  href="#weather-lightning"
                  transform="translate(151 102) scale(.43)"
                  stroke={symbolColor}
                  fill={accentColor}
                  fillOpacity=".12"
                />
                <use
                  href="#weather-lightning"
                  transform="translate(83 139) scale(.35)"
                  stroke={accentColor}
                  fill={accentColor}
                  fillOpacity=".12"
                />
                <use
                  href="#weather-star"
                  transform="translate(117 36) scale(.4)"
                  stroke={symbolColor}
                />
                <circle
                  cx="20"
                  cy="100"
                  r="1.8"
                  fill={symbolColor}
                  stroke="none"
                />
              </g>
            )}

            {/* CLEAR NIGHT: outlined diamond sparkles */}
            {condition === "clear" && !isDay && (
              <g fill="none">
                {/* Larger gold sparkle */}
                <use
                  href="#weather-diamond-sparkle"
                  transform="translate(38 42) scale(.8)"
                  stroke={accentColor}
                  strokeWidth="1.5"
                />

                {/* Medium cyan sparkle */}
                <use
                  href="#weather-diamond-sparkle"
                  transform="translate(142 48) scale(.55)"
                  stroke={symbolColor}
                  strokeWidth="1.5"
                />

                {/* Smaller lavender sparkle */}
                <use
                  href="#weather-diamond-sparkle"
                  transform="translate(83 108) scale(.4)"
                  stroke={symbolColor}
                  strokeWidth="1.5"
                />

                {/* Another small gold accent */}
                <use
                  href="#weather-diamond-sparkle"
                  transform="translate(165 132) scale(.35)"
                  stroke={accentColor}
                  strokeWidth="1.5"
                />

                <circle cx="22" cy="125" r="1.8" fill={symbolColor} />
                <circle cx="112" cy="24" r="1.5" fill={accentColor} />
              </g>
            )}
          </pattern>
        </defs>

        {/* Low-contrast pattern, preserving symbol proportions */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          opacity={isDay ? 0.35 : 0.4}
        />

        {/* Additional night diamond sparkles */}
        <g fill="none" opacity=".3">
          <use
            href="#weather-diamond-sparkle"
            transform="translate(460 48) scale(.65)"
            stroke="#FDE68A"
            strokeWidth="1.5"
          />
          <use
            href="#weather-diamond-sparkle"
            transform="translate(550 105) scale(.4)"
            stroke="#DDD6FE"
            strokeWidth="1.5"
          />
          <use
            href="#weather-diamond-sparkle"
            transform="translate(475 120) scale(.3)"
            stroke="#DDD6FE"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
