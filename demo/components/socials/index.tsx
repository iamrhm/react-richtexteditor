function Socials() {
  return (
    <>
      <div className="flex pt-6 px-2">
        {[1,2,3,4].map((data, index) => (
          <div className="w-6 h-6 mr-3 animate-pulse bg-slate-700 rounded-full" key={index}>
          </div>
        ))}
      </div>
    </>
  );
}

export default Socials;