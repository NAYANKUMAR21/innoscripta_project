import axios from 'axios';
import { GaurdianApi, NewsApi } from '../config/env.config';
import NormalizeNewsArticle from './NormalizationNews';

export default async function GetSourceData() {
  const dataGaurdian = await fetchDatafromSource(GaurdianApi);
  const dataNewsApi = await fetchDatafromSource(NewsApi);
  // const dataNewYork = await fetchDatafromSource(NewYorkApi);
  console.log(dataNewsApi);

  const GaurdianExtract = await ExtractArticlesDataFromSource(
    dataGaurdian,
    'gaurdianapi'
  );
  // const NewYorkExtract = await ExtractArticlesDataFromSource(
  //   dataNewYork,
  //   'newyorkapi'
  // );
  const NewsApiExtract = await ExtractArticlesDataFromSource(
    dataNewsApi,
    'newsapi'
  );
  // console.log(NewsApiExtract);
  console.log([...GaurdianExtract, ...NewsApiExtract]);

  return [...GaurdianExtract, ...NewsApiExtract];
}

async function fetchDatafromSource(APIArray: string[]) {
  // Create an array of promises for concurrent execution
  const result = APIArray.map(async (api) => {
    console.log(api);
    if (api.includes('q=technology')) {
      return { category: 'technology', result: await axios.get(api) };
    } else if (api.includes('q=business')) {
      return { category: 'business', result: await axios.get(api) };
    } else if (api.includes('q=politics')) {
      return { category: 'politics', result: await axios.get(api) };
    }
  });

  // Wait for all promises to resolve
  const data = await Promise.all(result);

  return data;
}

function NormalisedData(Data: any, source: string, category: string) {
  const mappedData = Data.map((element: any) =>
    NormalizeNewsArticle(element, source, category)
  );
  return mappedData;
}

async function ExtractArticlesDataFromSource(SourceData: any, source: string) {
  let result = [];

  if (source == 'newsapi') {
    console.log(SourceData);
    for (let i = 0; i < SourceData.length; i++) {
      const responseData = SourceData[i].result.data.articles.slice(1, 5);
      // result.push(...responseData);
      const NormalisedNewsData = await NormalisedData(
        [...responseData],
        'The News API',
        SourceData[i].category
      );
      result.push(...NormalisedNewsData);
    }
  } else if (source == 'gaurdianapi') {
    for (let i = 0; i < SourceData.length; i++) {
      const responseData = SourceData[i].result.data.response.results;
      const NormalisedGaurdData = await NormalisedData(
        [...responseData],
        'The Gaurdian',
        SourceData[i].category
      );
      result.push(...NormalisedGaurdData);
    }
  } else if (source == 'newyorkapi') {
    for (let i = 0; i < SourceData.length; i++) {
      const responseData = SourceData[i].result.data.response.docs;
      const NormalisedNYData = await NormalisedData(
        [...responseData],
        'The New York Times',
        SourceData[i].category
      );
      result.push(...NormalisedNYData);
    }
  }

  result = await Promise.all(result);
  console.log(result);

  return result;
}
