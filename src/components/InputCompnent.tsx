export default function InputComponent({
  type,
  titleHandler,
  DateHandler,
}: {
  type: string;
  titleHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  DateHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full max-w-full min-w-[200px]">
      <label className="text-gray-700 font-medium mb-1 w-full">
        {type == 'Date' ? 'Date' : 'Text Input'}
      </label>
      <input
        onChange={type == 'text' ? titleHandler : DateHandler}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Type here..."
        type={type}
      />
    </div>
  );
}
