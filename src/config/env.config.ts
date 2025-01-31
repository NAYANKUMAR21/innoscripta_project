const GaurdianApiTechnology: string =
  import.meta.env.VITE_GUARDIAN_API_TECHNOLOGY +
  import.meta.env.VITE_GUARDIAN_API_KEY;
const GaurdianApiPolitics: string =
  import.meta.env.VITE_GUARDIAN_API_POLITICS +
  import.meta.env.VITE_GUARDIAN_API_KEY;
const GaurdianApiBusiness: string =
  import.meta.env.VITE_GUARDIAN_API_BUSINESS +
  import.meta.env.VITE_GUARDIAN_API_KEY;

const NewYorkTimeApiTechnology =
  import.meta.env.VITE_NYT_API_TECHNOLOGY + import.meta.env.VITE_NYT_API_KEY;
const NewYorkTimeApiPolitics =
  import.meta.env.VITE_NYT_API_POLITICS + import.meta.env.VITE_NYT_API_KEY;
const NewYorkTimeApiBusiness =
  import.meta.env.VITE_NYT_API_BUSINESS + import.meta.env.VITE_NYT_API_KEY;

const NewsApiTechnology =
  import.meta.env.VITE_NEWS_API_TECHNOLOGY + import.meta.env.VITE_NEWS_API_KEY;
const NewsApiPolitics =
  import.meta.env.VITE_NEWS_API_POLITICS + import.meta.env.VITE_NEWS_API_KEY;
const NewsApiBusiness =
  import.meta.env.VITE_NEWS_API_BUSINESS + import.meta.env.VITE_NEWS_API_KEY;

export const GaurdianApi = [
  GaurdianApiTechnology,
  GaurdianApiPolitics,
  GaurdianApiBusiness,
];

export const NewYorkApi = [
  NewYorkTimeApiTechnology,
  NewYorkTimeApiPolitics,
  NewYorkTimeApiBusiness,
];

export const NewsApi = [NewsApiTechnology, NewsApiPolitics, NewsApiBusiness];
