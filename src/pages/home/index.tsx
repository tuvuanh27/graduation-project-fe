import React from "react";
import Slider from "./components/slider/Slider";
import Search from "./components/search/Search";
import Shop from "./components/shop/Shop";

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <Search />
      <Shop />
    </div>
  );
};

export default Home;
