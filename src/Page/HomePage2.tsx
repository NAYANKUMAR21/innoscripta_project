import { useEffect, useState } from 'react';
import GetSourceData from '../utils/FetchData';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import SelectComponent from '../components/SelectComponent';
import InputComponent from '../components/InputCompnent';
import { CategoryData, SourceData } from '../utils/SelectData';
interface ResponseObjectType {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
  category?: string;
}
export function HomePage2() {
  const [loading, setloading] = useState<boolean>(false);
  const [Skeleton] = useState(new Array(10).fill(0));
  const [NewsData, setNewData] = useState<{
    CopyData: ResponseObjectType[];
    responseData: ResponseObjectType[];
  }>({
    CopyData: [],
    responseData: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'title' | 'date' | 'category' | 'source'
  ) => {
    const DataCopy = [...NewsData.CopyData];
    const InputValue = e.target.value.toLocaleLowerCase();
    let SearhData;

    if (type === 'title') {
      SearhData = DataCopy.filter((ele) =>
        ele.title.toLocaleLowerCase().includes(InputValue)
      );
    } else if (type === 'date') {
      SearhData = DataCopy.filter((ele) =>
        new Date(ele.publishedAt)
          .toISOString()
          .split('T')[0]
          .includes(InputValue)
      );
    } else if (type === 'category') {
      SearhData = DataCopy.filter((ele) =>
        ele.category?.toLocaleLowerCase().includes(InputValue)
      );
    } else if (type === 'source') {
      SearhData = DataCopy.filter((ele) =>
        ele.source.toLocaleLowerCase().includes(InputValue)
      );
    }

    if (InputValue === '') {
      return setNewData({ ...NewsData, responseData: DataCopy });
    }
    return setNewData({ ...NewsData, responseData: SearhData || [] });
  };

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      const SourceNews = localStorage.getItem('NewsSource');
      const ParsedNews = SourceNews ? JSON.parse(SourceNews) : '';
      console.log('ParsedNews', SourceNews, ParsedNews);
      if (ParsedNews) {
        setNewData({ responseData: ParsedNews, CopyData: ParsedNews });
        setloading(false);
        console.log('ParsedNews2', SourceNews, ParsedNews);
        return;
      }
      setloading(true);
      const response = await GetSourceData();
      setNewData({ responseData: response, CopyData: response });
      setloading(false);
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full bg-black rounded-lg p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center mb-10">
            {!loading && (
              <>
                <div className="flex flex-col w-full">
                  <InputComponent
                    type="text"
                    titleHandler={(e) => handleInputChange(e, 'title')}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <InputComponent
                    type="Date"
                    DateHandler={(e) => handleInputChange(e, 'date')}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={CategoryData}
                    type="Category"
                    CategoryHandler={(e) => handleInputChange(e, 'category')}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={SourceData}
                    type="Source"
                    SourceHandler={(e) => handleInputChange(e, 'source')}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading &&
            Skeleton.map(() => {
              return <Loader />;
            })}

          {!loading &&
            NewsData.responseData.map((ele, index) => {
              return <NewsCard key={index} article={ele} />;
            })}
        </div>
      </div>
    </>
  );
}
