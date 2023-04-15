import Button from "../../../../components/common/Button";
import shopImage from "../../../../assets/shop.png";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const explore = () => {
    navigate("/manager/explore");
  };

  return (
    <section id="shop">
      <div className="min-h-screen flex justify-center content-center items-center bg-rose-100">
        <div
          className="relative w-1/2 min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${shopImage})` }}
        ></div>

        <div className="w-1/2 text-center">
          <h3 className="text-rose-700 text-6xl font-bold block w-4/5 mx-auto leading-normal">
            See it, make it, try it, do it
          </h3>
          <h4 className="mx-auto w-3/5 text-rose-700 text-2xl font-md block text-center m-6">
            The best part of NiftyMint is discovering new things and ideas from
            people around the world.
          </h4>
          <Button onClick={explore} bgColor="red">
            <span className="text-rose-100 font-semibold">Explore</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
