import { useEffect, useState } from 'react';
import GetSourceData from '../utils/FetchData';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import SelectComponent from '../components/SelectComponent';
import InputComponent from '../components/InputCompnent';
interface ResponseObjectType {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
  category?: string;
}
export function HomePage2() {
  const CategoryData = [
    { label: 'Technology', value: 'technology' },
    { label: 'Busines', value: 'business' },
    { label: 'Politics', value: 'politics' },
  ];
  const SourceData = [
    { label: 'The News API', value: 'The News API' },
    { label: 'The Gaurdian', value: 'The Gaurdian' },
  ];
  const [loading, setloading] = useState<boolean>(false);
  const [Skeleton] = useState(new Array(10).fill(0));
  const [NewsData, setNewData] = useState<{
    CopyData: ResponseObjectType[];
    responseData: ResponseObjectType[];
  }>({
    CopyData: [],
    responseData: [],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const DataCopy = [...NewsData.CopyData];
    const InputValue = e.target.value.toLocaleLowerCase();
    const SearhData = DataCopy.filter((ele) => {
      return ele.title.toLocaleLowerCase().includes(InputValue);
    });
    if (InputValue == '') {
      return setNewData({ ...NewsData, responseData: DataCopy });
    }
    return setNewData({ ...NewsData, responseData: SearhData });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const DataCopy = [...NewsData.CopyData];
    const InputValue = e.target.value.toLocaleLowerCase();
    const SearhData = DataCopy.filter((ele) => {
      return new Date(ele.publishedAt)
        .toISOString()
        .split('T')[0]
        .includes(e.target.value);
    });
    if (InputValue == '') {
      return setNewData({ ...NewsData, responseData: DataCopy });
    }
    return setNewData({ ...NewsData, responseData: SearhData });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const DataCopy = [...NewsData.CopyData];
    const InputValue = e.target.value.toLocaleLowerCase();
    const SearhData = DataCopy.filter((ele) => {
      return ele.category?.toLocaleLowerCase().includes(InputValue);
    });
    if (InputValue == '') {
      return setNewData({ ...NewsData, responseData: DataCopy });
    }
    return setNewData({ ...NewsData, responseData: SearhData });
  };
  const handleSourecChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const DataCopy = [...NewsData.CopyData];
    const InputValue = e.target.value.toLocaleLowerCase();
    const SearhData = DataCopy.filter((ele) => {
      return ele.source.toLocaleLowerCase().includes(InputValue);
    });
    if (InputValue == '') {
      return setNewData({ ...NewsData, responseData: DataCopy });
    }
    return setNewData({ ...NewsData, responseData: SearhData });
  };
  useEffect(() => {
    const fetchData = async () => {
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
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
            {!loading && (
              <>
                <div className="flex flex-col w-full">
                  <InputComponent
                    type="text"
                    titleHandler={handleTitleChange}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <InputComponent type="Date" DateHandler={handleDateChange} />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={CategoryData}
                    type="Category"
                    CategoryHandler={handleCategoryChange}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <SelectComponent
                    category={SourceData}
                    type="Source"
                    SourceHandler={handleSourecChange}
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
