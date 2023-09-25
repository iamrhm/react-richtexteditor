import Profile from '../profile';
import Breadcrumb from '../breadcrumb';

function IntroPanel() {
  return (
    <>
      <div className="w-full h-full p-3 bg-white">
        <div className="w-full h-full rounded-md flex flex-col shadow-lg border-solid border border-gray-200">
          <Breadcrumb />
          <div className="w-full py-6 px-3">
            <Profile />
          </div>
          <div className="pt-0 px-3 pb-4 w-full max-h-36">
            <div className="flex items-center pb-3 overflow-x-auto">
            {
              [1,2,3,4].map((data, index) => (
                <div className="w-12 h-5 flex shrink-0 mr-3 rounded animate-pulse bg-slate-300" key={index} />
              ))
            }
            </div>
            <div className="w-full h-px bg-slate-200" />
          </div>
        <div className="flex flex-col px-3 overflow-auto">
          {
            [1,2,3,4].map((data, index) => (
              <div className="h-32 w-full mb-3 grow-0 shrink-0 rounded animate-pulse bg-slate-300" key={index}>
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </>
  );
}

export default IntroPanel;