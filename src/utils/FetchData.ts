import axios from 'axios';
import {
  AllGaurdianApis,
  AllNewYorkApis,
  AllNewsApis,
} from '../config/env.config';
import NormalizeNewsArticle from './NormalizationNews';
import { categories } from './Category_and_SourceData';

async function fetchDataAndExtract(APIs: string[], sourceType: string) {
  const data = await fetchDatafromSource(APIs);
  return await ExtractArticlesDataFromSource(data, sourceType);
}

export default async function GetSourceData() {
  const GaurdianExtract = await fetchDataAndExtract(
    AllGaurdianApis,
    'gaurdianapi'
  );
  const NewYorkExtract = await fetchDataAndExtract(
    AllNewYorkApis,
    'newyorkapi'
  );
  const NewsApiExtract = await fetchDataAndExtract(AllNewsApis, 'newsapi');

  const SourceData = [...GaurdianExtract, ...NewsApiExtract, ...NewYorkExtract];
  console.log(SourceData);
  localStorage.setItem('NewsSource', JSON.stringify(SourceData));

  return SourceData;
}

async function fetchDatafromSource(APIArray: string[]) {
  try {
    const result = APIArray.map(async (api) => {
      const category = Object.keys(categories).find((key) =>
        api.includes(key)
      ) as keyof typeof categories;
      console.log(category);
      if (category) {
        const response = await axios.get(api);
        console.log(response);
        if (response.status !== 200) {
          return { category: categories[category], result: {} };
        }
        return { category: categories[category], result: response };
      }
    });

    const data = await Promise.all(result);

    return data;
  } catch (er: unknown) {
    if (er instanceof Error) {
      console.log(er.message);
    }
    return console.log('Something went wrong');
  }
}

function NormalisedData(Data: any, source: string, category: string) {
  const mappedData = Data.map((element: any) =>
    NormalizeNewsArticle(element, source, category)
  );
  return mappedData;
}

async function ExtractArticlesDataFromSource(SourceData: any, source: string) {
  let result: any[] = [];

  if (!Array.isArray(SourceData) || SourceData.length === 0) {
    console.error('SourceData is undefined or not an array');
    return result;
  }

  if (source == 'newsapi') {
    console.log(SourceData);
    for (let i = 0; i < SourceData.length; i++) {
      const responseData =
        SourceData[i] && SourceData[i].result.data.articles.slice(1, 5);

      const NormalisedNewsData = await NormalisedData(
        [...responseData],
        'The News API',
        SourceData[i].category
      );
      result.push(...NormalisedNewsData);
    }
  } else if (source == 'gaurdianapi') {
    for (let i = 0; i < SourceData.length; i++) {
      const responseData =
        SourceData[i] && SourceData[i].result.data.response.results;
      const NormalisedGaurdData = await NormalisedData(
        [...responseData],
        'The Gaurdian',
        SourceData[i].category
      );
      result.push(...NormalisedGaurdData);
    }
  } else if (source == 'newyorkapi') {
    for (let i = 0; i < SourceData.length; i++) {
      const responseData =
        SourceData[i] && SourceData[i].result.data.response.docs;
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
