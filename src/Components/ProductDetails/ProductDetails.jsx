import { useParams } from "react-router-dom"
import static2 from "../../assets/images/grocery-banner-2.jpeg"
import axios from "axios"
import { useQuery } from "react-query"
import { ColorRing } from 'react-loader-spinner';
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productToCart } from './../../context/AddProductToCartContext';
export default function ProductDetails() {

  let {id} = useParams()

  const [check, setcheck] = useState(false)

      let {AddToCart} = useContext(productToCart)
  
    async function specificaddtocart(id){
      setcheck(true)
      let data = await AddToCart(id)
      if(data){
        toast.success(data.message)
      }
      else {
        toast.error("error")
      }
      setcheck(false)
    }
  
  
    
    // another way to get data 
    // const [data, setdata] = useState(null)
    
    // async function getData  ()  {
    //     try {
    //          let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    //          setdata(data)
    //          console.log(data);
             
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }
    
    // useEffect(()=>{
    //     getData();
    // },[])
    

    async function getDetails(){
        return await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let {data , isLoading} = useQuery(`productDetails${id}`,getDetails)

    // console.log(data);

if(isLoading){
    return <div className="h-screen  bg-green-400 flex justify-center items-center">
       <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
       </div> 
}
  return (
    <section className="py-10">
        <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/3 p-5">
            <img src={data?.data.data.imageCover} className="w-full" alt="" />
            </div>
            <div className="w-full md:w-2/3 p-5">
            <h2 className="p-3 text-3xl font-bold text-green-600">{data?.data.data.title}</h2>
            <p className="p-3 font-mono text-2xl">{data?.data.data.description}</p>
            <p className="p-3 text-slate-600 text-2xl">{data?.data.data.category.name}</p>
            <div className="flex p-3 text-xl justify-between items-center">
              <div>{data?.data.data.price}</div>
              <div><i className="fa fa-star text-yellow-500 mr-2"></i> <span>{data?.data.data.ratingsAverage}</span></div>
            </div>
          <button onClick={()=>specificaddtocart(id)} className="py-3 px-6 w-full bg-green-600 rounded-2xl group-hover:bg-green-800 duration-500 text-white my-2"> {check?<i className="fa-solid fa-spinner fa-spin"></i>:"Add to cart"}</button>
            </div>
        </div>
        </div>
    </section>
  )
}
