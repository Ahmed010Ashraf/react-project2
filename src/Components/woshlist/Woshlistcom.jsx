import React, { useContext, useEffect } from 'react'
import { woshlist } from '../../context/Woshlist'
import { InfinitySpin } from 'react-loader-spinner';
import { productToCart } from '../../context/AddProductToCartContext';

export default function Woshlistcom() {
    let {AddToCart} = useContext(productToCart)

    let {loading , dataofwosh ,gip , removefromwosh} = useContext(woshlist)

    useEffect(function (){
        gip()
    },[])
    if(loading){
        return (
            <div className="h-screen bg-green-400 flex justify-center items-center">
              <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
            </div>
          );
    }
    // console.log(dataofwosh);
    
    if(dataofwosh?.length <=0){
        return <div className='text-center text-2xl text-green-600  h-screen'>woshlist is empty </div>
    }
  return (
    <>
    <div className="w-[90%] md:w-[80%] mx-auto py-9">
    {dataofwosh?.map((item , idx)=>{
          return <div key={idx} className="border-2 border-b-green-400 flex p-4 bg-slate-200 flex-wrap justify-center items-center"> 
          <div className="md:w-1/6 w-full">
          <img src={item.imageCover} className="w-full" alt="" />
          </div>
          <div className="md:w-4/6 w-full">
          <h2 className="p-3 text-green-600 text-xl">title : {item.title.split(" ").slice(0.2).join(" ")}</h2>
          <p className="p-3 text-xl">price : {item.price} EGP</p>
          
          <button onClick={()=>removefromwosh(item.id)} className='p-1 md:ml-3 md:mb-0 mb-3 w-full md:w-fit bg-red-700 text-white  text-2xl rounded-lg '>remove</button>
         
          </div>
          <div onClick={()=>{AddToCart(item.id); removefromwosh(item.id); }} className="md:w-1/6 w-full p-3 border-2 border-green-600 text-center cursor-pointer rounded-lg duration-500 hover:bg-green-500 hover:text-white ">
          
            add to cart
          </div>
        </div>
        })}

    </div>
    </>
  )
}
