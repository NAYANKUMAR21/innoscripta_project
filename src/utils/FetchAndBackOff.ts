import axios from 'axios';

export async function fetchWithBackoff(api: string, attempt = 1): Promise<any> {
  const maxAttempts = 5;
  const delay = Math.min(5000 * Math.pow(2, attempt - 1), 60000); // 5s, 10s, 20s, 40s, max 60s

  try {
    const response = await axios.get(api);
    return response;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn(`Rate limited! Retrying in ${delay / 1000} seconds...`);

      if (attempt >= maxAttempts) {
        throw new Error('Max retry attempts reached for API: ' + api);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithBackoff(api, attempt + 1); // Retry with backoff
    }

    throw error;
  }
}
