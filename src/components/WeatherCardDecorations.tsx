const WeatherCardDecorations = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Full-card colour glows */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <radialGradient id="weather-purple-glow">
            <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="weather-cyan-glow">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="600" cy="0" r="190" fill="url(#weather-purple-glow)" />
        <circle cx="0" cy="500" r="190" fill="url(#weather-cyan-glow)" />
      </svg>

      {/* Large rings: frame the weather icon from the right */}
      <svg
        className="absolute -right-12 top-[7%] size-72"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g strokeWidth="1.5">
          <circle
            cx="150"
            cy="100"
            r="95"
            stroke="#CFFAFE"
            strokeOpacity="0.10"
          />
          <circle
            cx="150"
            cy="100"
            r="73"
            stroke="#DDD6FE"
            strokeOpacity="0.12"
          />
          <circle
            cx="150"
            cy="100"
            r="52"
            stroke="white"
            strokeOpacity="0.06"
            strokeWidth="2"
          />
        </g>
      </svg>

      {/* Small ring: upper-left open space */}
      <svg
        className="absolute left-[7%] top-[19%] size-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="#FDE68A" strokeOpacity="0.15" />
      </svg>

      {/* Small ring: lower-left background */}
      <svg
        className="absolute bottom-[23%] left-[8%] size-16"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="#CFFAFE" strokeOpacity="0.10" />
      </svg>

      {/* Dots: open space between the temperature and weather icon */}
      <svg
        className="absolute left-[43%] top-[17%] h-40 w-36 opacity-20"
        viewBox="0 0 128 144"
        fill="none"
      >
        <defs>
          <pattern
            id="weather-dots-main"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
          <linearGradient
            id="weather-dots-fade-main"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="weather-dots-mask-main">
            <rect
              width="128"
              height="144"
              fill="url(#weather-dots-fade-main)"
            />
          </mask>
        </defs>
        <rect
          width="128"
          height="144"
          fill="url(#weather-dots-main)"
          mask="url(#weather-dots-mask-main)"
        />
      </svg>

      {/* Additional large rings */}
      <svg
        className="absolute -left-10 top-[38%] size-56"
        viewBox="0 0 200 200"
        fill="none"
      >
        <g strokeWidth="1.5">
          <circle
            cx="100"
            cy="100"
            r="95"
            stroke="#CFFAFE"
            strokeOpacity="0.08"
          />
          <circle
            cx="100"
            cy="100"
            r="73"
            stroke="#DDD6FE"
            strokeOpacity="0.10"
          />
        </g>
      </svg>

      {/* Additional small rings */}
      <svg
        className="absolute right-[36%] top-[14%] size-16"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="#FDE68A" strokeOpacity="0.15" />
      </svg>

      <svg
        className="absolute right-[15%] bottom-[12%] size-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="40" stroke="#CFFAFE" strokeOpacity="0.10" />
      </svg>

      {/* Additional dotted patch */}
      <svg
        className="absolute right-[38%] bottom-[8%] h-36 w-32 opacity-20"
        viewBox="0 0 128 144"
        fill="none"
      >
        <defs>
          <pattern
            id="weather-dots-left"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
          <linearGradient
            id="weather-dots-fade-left"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="weather-dots-mask-left">
            <rect
              width="128"
              height="144"
              fill="url(#weather-dots-fade-left)"
            />
          </mask>
        </defs>
        <rect
          width="128"
          height="144"
          fill="url(#weather-dots-left)"
          mask="url(#weather-dots-mask-left)"
        />
      </svg>

      {/* Additional dotted patch */}
      <svg
        className="absolute left-[7%] top-[45%] h-36 w-32 opacity-20"
        viewBox="0 0 128 144"
        fill="none"
      >
        <defs>
          <pattern
            id="weather-dots-right"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
          <linearGradient
            id="weather-dots-fade-right"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="weather-dots-mask-right">
            <rect
              width="128"
              height="144"
              fill="url(#weather-dots-fade-right)"
            />
          </mask>
        </defs>
        <rect
          width="128"
          height="144"
          fill="url(#weather-dots-right)"
          mask="url(#weather-dots-mask-right)"
        />
      </svg>
    </div>
  );
};

export default WeatherCardDecorations;
