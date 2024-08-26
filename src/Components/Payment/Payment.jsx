import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react';
import toast from "react-hot-toast";
import { productToCart } from './../../context/AddProductToCartContext';

export const Payment = () => {

    let {cartid , settotalprice,setproducts,setnumofitems} = useContext(productToCart)

    const [details, setdetails] = useState("")
    const [phone, setphone] = useState("")
    const [city, setcity] = useState("")
    const [errors, seterrors] = useState({details:"", phone:"", city:""})

    function validatae(){
      let valid = true;
      if(details == ""){
        errors.details = "details is required"
        valid = false;
      }

      let phonereg = /^01[0125][0-9]{8}$/
      if(!phonereg.test(phone)){
        errors.phone = "not valid egypt number"
        valid = false;
      }
      if(city == ""){
        errors.city = "city is required"
        valid = false;
      }

      seterrors(errors)
      return valid
    }

    


    async function onlinepayment() {
      if(!validatae())return;
       
        let CartData = {
            shippingAddress: {
                details,
                phone,
                city,
            }
        };
    
        // console.log(CartData);
    
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`, CartData, {
                headers: {
                    token: localStorage.getItem("usertoken")
                }
            });
    
            toast.success(data.status);
            setnumofitems(0);
            setproducts([]);
            settotalprice(0);
            window.open(data.session.url)
    
        } catch (error) {
            toast.error("Error creating order");
        }
    }
    async function cashpayment() {
      if(!validatae())return;
       
        let CartData = {
            shippingAddress: {
                details,
                phone,
                city,
            }
        };
    
        // console.log(CartData);
    
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, CartData, {
                headers: {
                    token: localStorage.getItem("usertoken")
                }
            });
    
            toast.success(data.status);
            setnumofitems(0);
            setproducts([]);
            settotalprice(0);
    
        } catch (error) {
            toast.error("Error creating order");
        }
    }

  return (
    <section className='py-10'>
        <h2 className='mb-4 text-center text-green-600 font-semibold text-4xl'>Payment</h2>
        <div className='w-[90%] mx-auto md:w-[60%]'>
       {/* city */}
       <div className="relative z-0 w-full mb-5 group">
          <input
          onChange={(e)=>setcity(e.target.value)}
            type="text"
            name="city"
            id="city"
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your city
          </label>
        </div>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
       {/* phone */}
       <div className="relative z-0 w-full mb-5 group">
          <input
          onChange={(e)=>setphone(e.target.value)}
            type="tel"
            name="phone"
            id="phone"
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your Phone
          </label>
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}

       {/* details */}
       <div className="relative z-0 w-full mb-5 group">
          <input
          onChange={(e)=>setdetails(e.target.value)}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your details
          </label>
        </div>
        {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}

        <button
        onClick={cashpayment}
        type="submit" className="py-2.5 px-5 me-2 mb-2 text-md font-medium bg-white rounded-lg hover:text-green-700 dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200">
        cash payment
        </button>
        <button
        onClick={onlinepayment}
        type="submit" className="py-2.5 px-5 me-2 mb-2 text-md font-medium bg-white rounded-lg hover:text-green-700 dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200">
        online payment
        </button>
        </div>


    </section>
  )
}
