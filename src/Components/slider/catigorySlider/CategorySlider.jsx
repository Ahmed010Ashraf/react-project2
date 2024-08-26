import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { useEffect, useState } from "react";

export default function CategorySlider() {
  const [slidesToShow, setSlidesToShow] = useState(7);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSlidesToShow(1); 
      } else {
        setSlidesToShow(7); 
      }
    }

    window.addEventListener("resize", handleResize);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 1000,
  };

  async function GetAllCategoryToSlider() {
    return await axios("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("categorySliderData", GetAllCategoryToSlider);


  return (
    <section className="hidden md:block py-8 px-4">
      <Slider {...settings}>
        {data?.data.data.map((item, inx) => {
          return (
            <div key={inx}>
              <img src={item.image} className="w-full h-[200px]" alt="" />
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
