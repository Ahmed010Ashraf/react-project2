import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import static1 from "../../assets/images/grocery-banner.png"
import static2 from "../../assets/images/grocery-banner-2.jpeg"
export default function TopSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
  return (
    <section className="py-8 px-5">
        <div className="flex flex-wrap justify-center items-center">
            <div className=" w-full md:w-2/3">
            <Slider {...settings} >
                
                <div>
                    <img src={slider1} className="w-full h-[400px]  " alt="" />
                </div>
                <div>
                    <img src={slider2} className="w-full h-[400px] " alt="" />
                </div>
                <div>
                    <img src={slider3} className="w-full h-[400px] " alt="" />
                </div>
                
            </Slider>
            </div>
            <div className="w-full md:w-1/3 hidden md:block">
                <img src={static1} className="w-full block h-[200px]" alt="" />
                <img src={static2} className="w-full block h-[200px]" alt="" />
            </div>
        </div>
    </section>
  );
}