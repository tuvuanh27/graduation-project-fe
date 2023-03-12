import Button from "../../../../components/common/Button";
import { splashInfo } from "../slider/fake-data";

const Search = () => {
  const explore = () => {
    console.log("explore");
  };

  const getRandomPhoto = () => {
    const random = Math.floor(Math.random() * 4);
    return splashInfo[random].photoUrls[0];
  };

  return (
    <section id="search">
      <div className="min-h-screen flex justify-center content-center items-center bg-yellow-200">
        <div className="relative w-1/2">
          <div className=" flex justify-center content-center items-center">
            <div className="mx-auto">
              <img
                src="	https://s.pinimg.com/webapp/left-511a9304.png"
                alt="random"
                className="w-60 h-80 rounded-[50px] ml-7 mb-10"
              />
            </div>
            <div className="mx-auto">
              <img
                src="https://s.pinimg.com/webapp/topRight-d0230035.png"
                alt="random"
                className="w-48 rounded-[35px] mb-24"
              />
              <img
                src="https://s.pinimg.com/webapp/right-88044782.png"
                alt="random"
                className="w-52 h-72 rounded-[40px]"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img
              src="https://s.pinimg.com/webapp/center-77497603.png"
              alt="random"
              className="w-72 h-[30rem]  rounded-[50px] ml-10 mt-10"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white text-red-900 font-bold rounded-[3rem] h-24 w-72 cursor-pointer">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center px-4 py-2 bg-white text-red-900 font-bold rounded-[3rem] h-24 w-72 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <span className="text-center ml-2 text-2xl">
                  easy chicken dinner
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-center">
          <h3 className="text-rose-700 text-6xl font-bold block m-10">
            Search for an idea
          </h3>
          <h4 className="mx-auto w-3/5 text-rose-700 text-2xl font-md block text-justify m-6">
            What do you want to try next? Think of something you’re into — like
            “easy chicken dinner” — and see what you find.
          </h4>
          <Button onClick={explore} bgColor="red">
            <span className="text-yellow-200 font-semibold">Explore</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Search;
