import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-red-500"></div>
      </div>
    </>
  );
};

export default Loading;
