export default function InputComponent({
  type,
  titleHandler,
  DateHandler,
}: {
  type: string;
  titleHandler?: React.ChangeEventHandler<HTMLInputElement>;
  DateHandler?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="w-full max-w-full min-w-[200px] ">
      <label className="text-white font-medium mb-1 w-full">
        {type === 'Date' ? 'Date' : 'Text Input'}
      </label>
      <input
        onChange={type === 'text' ? titleHandler : DateHandler}
        className="w-full bg-transparent placeholder:text-white text-white text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type={type}
        placeholder={type === 'date' ? 'dd/mm/yyyy' : 'Type Here..'}
      />
    </div>
  );
}
