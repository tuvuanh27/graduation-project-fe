import React from "react";
import Slider from "./components/slider/Slider";
import Search from "./components/search/Search";

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <Search />
    </div>
  );
};

export default Home;
