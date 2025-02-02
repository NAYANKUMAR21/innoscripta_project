export default function Loader() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md p-4">
      <div className="animate-pulse space-y-4">
        {/* <!-- Image Placeholder --> */}
        <div className="h-40 w-full rounded-md bg-gray-600"></div>

        <div className="flex space-x-4">
          <div className="size-10 rounded-full bg-gray-600"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-600"></div>
                <div className="col-span-1 h-2 rounded bg-gray-600"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
