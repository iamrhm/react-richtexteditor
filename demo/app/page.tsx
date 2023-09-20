import IntroPanel from "./components/intro";
import Content from "./components/content";

function Landing() {
  return (
    <>
      <div className="outer-box w-full relative h-screen my-0 mx-auto max-w-6xl">
        <div className="w-full relative h-screen flex flex-col lg:flex-row">
          <div className="flex flex-col w-full h-screen relative lg:w-2/5 lg:flex-row">
            <IntroPanel />
          </div>
          <div className="h-screen p-3 relative w-full lg:w-3/5 lg:pl-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;