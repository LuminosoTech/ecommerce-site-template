import { useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import cx from "classnames";

import { ChevronLeft } from "../../res/ChevronLeft";
import { ChevronRight } from "../../res/ChevronRight";
import { NTText, TText } from "..//text/Text";

interface Slide {
  picture: string;
  text: string;
}

interface SlideshowProps {
  initialIndex: number;
  slides: Slide[];
}

export const Slideshow = (props: SlideshowProps) => {
  const { initialIndex, slides } = props;

  const sliderRef = useRef(null);

  const [slideIndex, setSlideIndex] = useState<number>(initialIndex);

  const renderSlides = useMemo(() => {
    return slides.map((slide, index) => {
      return (
        <div key={index} className="w-full h-500 md:h-350 lg:h-350">
          <div
            className="w-full transition-all delay-1000 bg-center bg-no-repeat bg-cover h-500 md:h-200 lg:h-200"
            style={{
              backgroundImage: `url("${slide.picture}")`,
            }}
          />
        </div>
      );
    });
  }, [slides]);

  const renderMobileFooter = useMemo(() => {
    return (
      <div className="flex items-center justify-center w-full" style={{ transform: "translateY(-30%)" }}>
        <div className="flex flex-col items-center w-5/6 px-4 py-2 bg-white">
          <div className="flex items-center justify-between w-full">
            <ChevronLeft className="w-7 h-7" />
            <div className="flex">
              {slides.map((slide, index) => {
                const classNames = cx({
                  "bg-black": index === slideIndex,
                  "bg-gray-400": index !== slideIndex,
                });

                return (
                  <div key={index} className={`w-2 h-2 mx-1 transition-colors delay-300 rounded-full ${classNames}`} />
                );
              })}
            </div>
            <ChevronRight className="w-7 h-7" />
          </div>
          <div className="pt-10 text-center">
            <NTText element="h1" text={slides[slideIndex].text} className="text-gray-500" />
          </div>
        </div>
      </div>
    );
  }, [slideIndex, slides]);

  return (
    <div className="">
      <Slider
        ref={sliderRef}
        fade
        infinite
        speed={500}
        autoplay
        afterChange={(index) => {
          setSlideIndex(index);
        }}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={undefined}
        lazyLoad="progressive"
      >
        {renderSlides}
      </Slider>
      {renderMobileFooter}
    </div>
  );
};

Slideshow.defaultProps = {
  initialIndex: 0,
};
