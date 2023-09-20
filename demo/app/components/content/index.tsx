import InputBox from "../inputbox";
import PostOverview from "./overview";

function Content() {
  return (
    <>
      <div className="flex flex-col rounded shadow-lg border-solid border border-gray-200 h-full">
        <div className="w-full max-h-60 mb-8">
          <div className="relative">
            <div className="h-36 w-full rounded animate-pulse bg-slate-300">
            </div>
            <div className="w-32 h-32 left-4 -bottom-20 rounded absolute animate-pulse bg-slate-300 border-solid border-2 border-gray-200" />
          </div>
          <div className="w-full flex flex-col items-start justify-between pt-6 pl-40">
            <div className="min-w-[184px] h-5 rounded animate-pulse bg-slate-300 mb-3"></div>
            <div className="min-w-[100px] h-5 rounded animate-pulse bg-slate-300"></div>
          </div>
        </div>
        <div className="px-4">
          <div className="h-14 w-full py-3 px-4 rounded border-solid border border-gray-200 flex items-center justify-start">
            <div className="h-9 w-9 rounded-full animate-pulse bg-slate-300"></div>
            <div className="text-black px-3 h-full flex items-center justify-start" style={{width: 'calc(100% - 32px)'}}>
              <InputBox />
            </div>
          </div>
        </div>
        <div className="min-w-[120px] text-gray-300 text-base w-full mt-6 overflow-auto flex flex-col items-center">
          {
            [1,2,3,4].map((data, index) => (
              <PostOverview key={index} />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Content;