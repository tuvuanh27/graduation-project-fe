import React from "react";
import Slider from "./components/slider/Slider";
import Search from "./components/search/Search";
import Shop from "./components/shop/Shop";
import { ExploreTools } from "./components/explore-tools";
import { Footer } from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <Search />
      <Shop />
      <ExploreTools />
      {/*<Footer />*/}
    </div>
  );
};

export default Home;
