import React from "react";

export const Explore: React.FC = () => {
  return (
    <div className="columns-4 gap-8 w-full">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 10, 11, 12, 13, 14,
        15,
      ].map((item, index) => {
        const randomHeight = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
        const randomImageLink = `https://source.unsplash.com/random/${randomHeight}x${randomHeight}`;
        return (
          <div className="w-full aspect-video pb-7" key={index}>
            <div
              className="bg-white rounded-[20px] shadow-lg overflow-hidden"
              style={{ height: randomHeight }}
            >
              <img
                className="object-cover w-full h-full"
                src={randomImageLink}
                alt="Random image"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
