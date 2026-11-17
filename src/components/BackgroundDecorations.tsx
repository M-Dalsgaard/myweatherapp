const BackgroundDecorations = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Upper-left large rings */}
      <svg
        className="absolute -left-32 top-[3%] h-72 w-72 opacity-[0.035] sm:-left-28 sm:top-[5%] sm:h-96 sm:w-96"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="112" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="84" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="56" stroke="#DDD6FE" strokeWidth="1.5" />
      </svg>

      {/* Existing upper-right rings */}
      <svg
        className="absolute -right-32 top-[25%] h-72 w-72 opacity-[0.05] sm:-right-24 sm:top-[18%] sm:h-96 sm:w-96"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="112" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="84" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="56" stroke="#DDD6FE" strokeWidth="1.5" />
      </svg>

      {/* Middle-right smaller rings */}
      <svg
        className="absolute -right-20 top-[55%] h-48 w-48 opacity-[0.035] sm:-right-12 sm:top-[48%] sm:h-64 sm:w-64"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="105" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="70" stroke="#DDD6FE" strokeWidth="1.5" />
      </svg>

      {/* Existing lower-left rings */}
      <svg
        className="absolute -left-32 bottom-[18%] h-64 w-64 opacity-[0.035] sm:-left-28 sm:bottom-[12%] sm:h-80 sm:w-80"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="112" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="84" stroke="#DDD6FE" strokeWidth="1.5" />
      </svg>

      {/* Lower-right small rings */}
      <svg
        className="absolute -right-24 bottom-[-3%] h-56 w-56 opacity-[0.03] sm:-right-16 sm:bottom-[-5%] sm:h-72 sm:w-72"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#CFFAFE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="105" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="70" stroke="#CFFAFE" strokeWidth="1.5" />
      </svg>

      {/* Upper-middle dot pattern */}
      <svg
        className="absolute left-[35%] top-[13%] h-32 w-32 opacity-[0.06] sm:left-[38%] sm:top-[12%] sm:h-40 sm:w-40"
        viewBox="0 0 120 120"
        fill="none"
      >
        <defs>
          <pattern
            id="background-dots-top"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#CFFAFE" />
          </pattern>
          <linearGradient
            id="background-dots-top-fade"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="background-dots-top-mask">
            <rect
              width="120"
              height="120"
              fill="url(#background-dots-top-fade)"
            />
          </mask>
        </defs>
        <rect
          width="120"
          height="120"
          fill="url(#background-dots-top)"
          mask="url(#background-dots-top-mask)"
        />
      </svg>

      {/* Lower-middle dot pattern */}
      <svg
        className="absolute bottom-[28%] right-[8%] h-28 w-28 opacity-[0.05] sm:bottom-[25%] sm:right-[18%] sm:h-36 sm:w-36"
        viewBox="0 0 120 120"
        fill="none"
      >
        <defs>
          <pattern
            id="background-dots-bottom"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#DDD6FE" />
          </pattern>
          <linearGradient
            id="background-dots-bottom-fade"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="background-dots-bottom-mask">
            <rect
              width="120"
              height="120"
              fill="url(#background-dots-bottom-fade)"
            />
          </mask>
        </defs>
        <rect
          width="120"
          height="120"
          fill="url(#background-dots-bottom)"
          mask="url(#background-dots-bottom-mask)"
        />
      </svg>
    </div>
  );
};

export default BackgroundDecorations;
