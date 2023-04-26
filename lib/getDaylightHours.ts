export default function getDaylightHours(sunriseUnix: number, sunsetUnix: number): string {

  const sunriseDate = new Date(sunriseUnix * 1000);
  const sunsetDate = new Date(sunsetUnix * 1000);

  const daylightMinutes = (sunsetDate.getTime() - sunriseDate.getTime()) / (1000 * 60);
  const daylightHours = (daylightMinutes / 60).toFixed(2);

  return daylightHours;
}