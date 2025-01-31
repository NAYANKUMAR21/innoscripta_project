export default function SelectComponent({
  category,
  type,
  CategoryHandler,
  SourceHandler,
}: {
  category: { label: string; value: string }[];
  type: string;
  CategoryHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  SourceHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  console.log(SourceHandler);
  return (
    <div className="w-full max-w-full min-w-[200px] ">
      <label className="text-gray-700 font-medium mb-1">
        {type == 'Source' ? 'Source' : 'Category'}
      </label>
      <select
        className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        onChange={type == 'Source' ? SourceHandler : CategoryHandler}
      >
        <option value="">Select {type}</option>
        {category.map(({ label, value }: { label: string; value: string }) => {
          return <option value={label}>{value}</option>;
        })}
      </select>
    </div>
  );
}
