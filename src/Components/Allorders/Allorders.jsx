import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';

export const Allorders = () => {

    const [load, setload] = useState(false)
    const [allorders, setallorders] = useState([])

    const {id} = jwtDecode(localStorage.getItem('usertoken'))
    // console.log(id);
    
    async function getAllorders(){
        setload(true)
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            // console.log(data);
            
            setallorders(data)
            setload(false)
        } catch (error) {
            console.log(error);
            setload(false)
        }
    }
    useEffect(function (){
        getAllorders()
    },[])


    if (load) {
        return (
          <div className="h-screen bg-green-400 flex justify-center items-center">
            <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
          </div>
        );
      }

      if(allorders.length <= 0 ){
        return <div className='text-2xl text-center h-screen text-green-800 p-4'>no orders</div>
      }

  return <>
  <section className='py-9'>
    <div className='w-full md:w-[80%] mx-auto '>
    {allorders? allorders.map((order , idx)=>{
    return <div key={idx} className='p-5 mb-3 bg-slate-200'>
        <div className='flex justify-center items-center flex-wrap'>
            {order.cartItems.map(function(item , idx){
                return <div key={idx} className='w-full md:w-1/6'>
                <img src={item.product.imageCover} alt="" />
            </div>
            })}
        </div>
        <h2>order price : {order.totalOrderPrice} EGP</h2>
        <h2>order type : {order.paymentMethodType}</h2>
    </div>
  }): "no order"}
    </div>
  </section>
  </>
  
}