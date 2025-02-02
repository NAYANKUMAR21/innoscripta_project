import {
  buildGuardianURL,
  buildNewsApiURL,
  buildNewYorkURL,
} from '../utils/BuildUrl';
import { CategoryData } from '../utils/Category_and_SourceData';

const AllGaurdianApis: string[] = [];
const AllNewYorkApis: string[] = [];
const AllNewsApis: string[] = [];
for (let i = 0; i < CategoryData.length; i++) {
  AllGaurdianApis.push(buildGuardianURL(CategoryData[i].value));
}
for (let i = 0; i < CategoryData.length; i++) {
  AllNewYorkApis.push(buildNewYorkURL(CategoryData[i].value));
}
for (let i = 0; i < CategoryData.length; i++) {
  AllNewsApis.push(buildNewsApiURL(CategoryData[i].value));
}
console.log(AllGaurdianApis, AllNewYorkApis, AllNewsApis);

export { AllGaurdianApis, AllNewYorkApis, AllNewsApis };
