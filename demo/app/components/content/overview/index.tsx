function PostOverview() {
  return (
    <>
      <div className="w-full flex flex-col lg:w-11/12 border-solid border-0 lg:border border-gray-200 rounded p-4 mb-5">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full animate-pulse bg-slate-300"></div>
          <div className="flex flex-col items-start justify-start ml-3">
            <div className="min-w-[124px] h-4 rounded animate-pulse bg-slate-300"></div>
            <div className="min-w-[80px] mt-2 h-4 rounded animate-pulse bg-slate-300"></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm py-4">
          Do eu sint adipisicing sunt eiusmod. Id ullamco labore cillum culpa sit do Lorem ex ad.
          Velit enim occaecat tempor fugiat nulla anim. Sint sunt Lorem ea amet eiusmod.
          Velit quis nostrud incididunt dolore et irure irure anim veniam elit commodo magna.
          Culpa non irure proident amet cupidatat eiusmod Lorem. Non magna duis id Lorem officia id.
        </p>
        <div className="flex flex-col">
          <div className="h-56 w-full rounded animate-pulse bg-slate-300">
          </div>
          <div className="rounded pt-3 w-full flex flex-col justify-between">
            <div className="h-6 max-w-[180px] mb-2 rounded animate-pulse bg-slate-300"></div>
            <div className="h-6 max-w-[100px] rounded animate-pulse bg-slate-300"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostOverview;