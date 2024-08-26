import axios from "axios";
import { useContext,useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import TopSlider from './../slider/TopSlider';
import CategorySlider from './../slider/catigorySlider/CategorySlider';
import { Link } from "react-router-dom";
import { productToCart } from './../../context/AddProductToCartContext';
import toast from "react-hot-toast";
import { woshlist } from "../../context/Woshlist";

export default function Products() {


  
  let {dataofwosh,getwoshlist,gip}=useContext(woshlist)
  const [loading, setLoading] = useState({});
  let [lod , setlod] = useState({})

  const { AddToCart } = useContext(productToCart);
  
  async function specificaddtocart(id) {
    setLoading((prev) => ({ ...prev, [id]: true }));
    let data = await AddToCart(id);
    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
    setLoading((prev) => ({ ...prev, [id]: false }));
  }

  async function getAllData() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("products", getAllData, {
    refetchOnMount: false
  });
  useEffect(function (){
    gip()
},[])


  if (isLoading) {
    return (
      <div className="h-screen bg-green-400 flex justify-center items-center">
        <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
      </div>
    );
  }

  async function addtowish(e, id) {
    setlod((prev) => ({ ...prev, [id]: true }))
    e.target.classList.replace("fa-regular", "fa-solid");
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId: id
      }, { 
        headers: { 
          token: localStorage.getItem("usertoken")
        }
      });
      toast.success(data.message);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    setlod((prev) => ({ ...prev, [id]: false }))
  }

  function isInWishlist(productId) {
    // getwoshlist()
    return dataofwosh?.some(data => data.id === productId);
  }

  // if(lod){
  //   return (
  //     <div className="h-screen bg-green-400 flex justify-center items-center">
  //       <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
  //     </div>
  //   );
  // }
  
  return (
    <div className="py-4">
      <div className="w-full md:w-[90%] mx-auto">
        <TopSlider />
        <CategorySlider />
        <div className="flex justify-center flex-wrap items-center">
          {data.data.data.map((product, index) => (
            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
              <div className="bg-slate-200 cursor-pointer group">
                <Link to={`/ProductDetails/${product.id}`}>
                  <div className="inner p-4 bg-slate-200 cursor-pointer group">
                    <img src={product.imageCover} alt="img" className="w-full" />
                    <div>{product.category.name}</div>
                    <div>{product.title.split(" ").slice(0, 2).join(" ")}</div>
                    <div className="flex justify-between items-center">
                      <div>{product.price}</div>
                      <div>
                        <i className="fa fa-star text-yellow-500 mr-2"></i>
                        <span>{product.ratingsAverage}</span>
                      </div>
                    </div>
                    <div className="text-right special">
                     <i
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); addtowish(e, product.id); }}
                        className={`${isInWishlist(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-2xl text-right`}
                      ></i>
                      {lod[product.id]?<i className="fa-solid fa-spinner fa-spin"></i>:""}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => specificaddtocart(product.id)}
                  className="py-3 px-6 w-full bg-green-600 rounded-2xl group-hover:bg-green-800 duration-500 text-white my-2"
                >
                  {loading[product.id] ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
