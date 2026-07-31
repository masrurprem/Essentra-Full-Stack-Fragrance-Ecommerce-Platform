import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import banner2 from "../../assets/images/banner2.jpg";
import banner1 from "../../assets/images/banner1.jpg";
import banner3 from "../../assets/images/banner3.jpg";

import "./HeroCarousel.css";

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({
      delay: 3500,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);
  return (
    <>
      <div className="embla">
        <div className="embla--viewport" ref={emblaRef}>
          <div className="embla--container">
            <div className="slider">
              <img src={banner2} alt="hero--image--perfume" />
            </div>
            <div className="slider">
              <img src={banner1} alt="hero--image--perfume" />
            </div>
            <div className="slider">
              <img src={banner3} alt="hero--image--perfume" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
