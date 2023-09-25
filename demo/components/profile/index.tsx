import Socials from '../socials';

function Profile() {
  return (
    <>
      <div className="flex items-end">
        <div className="w-32 h-32 rounded-full animate-pulse bg-slate-300">
        </div>
        <div className="flex flex-col pl-3" style={{width: 'calc(100% - 124px)'}}>
          <div className="h-6 w-full rounded animate-pulse bg-slate-300">
          </div>
          <div className="user-inspiration h-20 w-full mt-2 rounded animate-pulse bg-slate-300">
          </div>
        </div>
      </div>
      <Socials />
    </>
  );
}

export default Profile;