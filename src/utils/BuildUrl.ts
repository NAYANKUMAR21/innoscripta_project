export function buildGuardianURL(topic: string): string {
  const apiKey = import.meta.env.VITE_GUARDIAN_API_KEY;
  const baseUrl = import.meta.env.VITE_GUARDIAN_API_BASE_URL;
  return `${baseUrl}?q=${topic}&from-date=2025-01-25&api-key=${apiKey}`;
}
export function buildNewYorkURL(topic: string): string {
  const apiKey = import.meta.env.VITE_NYT_API_KEY;
  const baseUrl = import.meta.env.VITE_NYT_API_BASE_URL;
  return `${baseUrl}?q=${topic}&api-key=${apiKey}`;
}
export function buildNewsApiURL(topic: string): string {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const baseUrl = import.meta.env.VITE_NEWS_API_BASE_URL;
  return `${baseUrl}?q=${topic}&from-date=2025-01-25&apikey=${apiKey}`;
}
