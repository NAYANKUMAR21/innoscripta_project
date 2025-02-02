import { useEffect, useMemo, useState } from 'react';
import GetSourceData from '../utils/FetchData';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import SelectComponent from '../components/SelectComponent';
import InputComponent from '../components/InputCompnent';
import { CategoryData, SourceData } from '../utils/Category_and_SourceData';

interface ResponseObjectType {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
  category?: string;
}
export function HomePage2() {
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [CategoryFilter, setCategoryFilter] = useState<string>('');
  const [SourceFilter, setSourceFilter] = useState<string>('');

  const [loading, setloading] = useState<boolean>(false);
  const [Skeleton] = useState(new Array(10).fill(0));
  const [NewsData, setNewData] = useState<{
    CopyData: ResponseObjectType[];
    responseData: ResponseObjectType[];
  }>({
    CopyData: [],
    responseData: [],
  });

  useMemo(() => {
    let DataCopy = [...NewsData.CopyData];

    console.log(titleFilter, dateFilter, SourceFilter, CategoryFilter);

    if (titleFilter.trim() !== '') {
      DataCopy = DataCopy.filter((ele) =>
        ele.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())
      );
      console.log(titleFilter, DataCopy);
    }
    if (dateFilter.trim() !== '') {
      DataCopy = DataCopy.filter((ele) =>
        new Date(ele.publishedAt)
          .toISOString()
          .split('T')[0]
          .includes(dateFilter.trim())
      );
    }
    if (CategoryFilter.trim() !== '') {
      DataCopy = DataCopy.filter((ele) =>
        ele.category
          ?.toLocaleLowerCase()
          .includes(CategoryFilter.trim().toLocaleLowerCase())
      );
    }
    if (SourceFilter.trim() !== '') {
      DataCopy = DataCopy.filter((ele) =>
        ele.source
          .toLocaleLowerCase()
          .includes(SourceFilter.trim().toLocaleLowerCase())
      );
    }
    console.log(DataCopy);

    return setNewData({ ...NewsData, responseData: DataCopy || [] });
  }, [titleFilter, dateFilter, CategoryFilter, SourceFilter]);

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
                    titleHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTitleFilter(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <InputComponent
                    type="Date"
                    DateHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setDateFilter(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={CategoryData}
                    type="Category"
                    CategoryHandler={(
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                      setCategoryFilter(e.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={SourceData}
                    type="Source"
                    SourceHandler={(
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                      setSourceFilter(e.target.value);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading == true ? (
            Skeleton.map(() => {
              return <Loader />;
            })
          ) : NewsData.responseData.length == 0 ? (
            <div className="w-52 m-auto text-center border border-gray-600 flex justify-center items-center rounded-md p-5">
              <p className="text-white ">No results found</p>
            </div>
          ) : null}

          {!loading &&
            NewsData.responseData.map((ele, index) => {
              return <NewsCard key={index} article={ele} />;
            })}
        </div>
      </div>
    </>
  );
}
