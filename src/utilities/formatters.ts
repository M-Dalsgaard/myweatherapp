export function formatWindDirection(degrees: number | undefined): string {
  if (degrees === undefined || !Number.isFinite(degrees)) {
    return "Ukendt retning";
  }

  const directions = ["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"];
  const index = Math.round(degrees / 45) % 8;

  return directions[(index + 8) % 8];
}

export function formatTime(dateTime: string): string {
  return new Date(dateTime).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });
}

export const formatDate = (date: string) => {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Copenhagen",
  });

  return formatted.charAt(0).toLocaleUpperCase("da-DK") + formatted.slice(1);
};

export function getDenmarkNow(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}
