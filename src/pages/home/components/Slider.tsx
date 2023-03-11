import React, { useEffect } from "react";
import { splashInfo } from "./fake-data";
import SliderPage from "./SliderPage";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [updateInterval, setUpdateInterval] = React.useState(0);

  const arrowRef = React.useRef<HTMLDivElement>(null);
  const pageButtons = ["0", "1", "2", "3"];

  const handleArrow = () => {
    arrowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageNav = (page: string) => {
    setCurrentSlide(parseInt(page));
    setUpdateInterval((prev) => (prev % 3) + 1);
  };

  let interval: NodeJS.Timer;
  useEffect(() => {
    interval = setInterval(() => {
      setCurrentSlide((prevPage) => prevPage + 1);
    }, 6000);
  }, []);

  useEffect(() => {
    if (updateInterval > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prevPage) => prevPage + 1);
      }, 6000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [updateInterval]);

  return (
    <React.Fragment>
      <section className="splash-page-container">
        <div className="splash-text">
          <h1> Get your next</h1>
        </div>
        <div className="page-nav-buttons">
          {pageButtons.map((pageButton) => (
            <div
              key={pageButton}
              onClick={() => handlePageNav(pageButton)}
              className={
                currentSlide % 4 === parseInt(pageButton)
                  ? `${
                      splashInfo[parseInt(pageButton)].title.split(" ")[0]
                    }-page-button`
                  : ""
              }
            ></div>
          ))}
        </div>
        <div className="splash-page-carousel">
          {splashInfo.map((page, i) => (
            <SliderPage
              title={page.title}
              handleArrow={handleArrow}
              photoUrls={page.photoUrls}
              key={i}
              shouldShow={currentSlide % 4 === i}
              shouldLeave={(currentSlide - 1) % 4 === i}
            />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Slider;
