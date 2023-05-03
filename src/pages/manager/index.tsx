import React from "react";
import { LeftSide } from "./components/LeftSide";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

const Manager: React.FC = () => {
  return (
    <>
      <ScrollToTop smooth />
      <div className="flex">
        <div className="flex flex-row w-1/6">
          <LeftSide />
        </div>

        <div className="w-5/6 pt-4 pr-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Manager;
