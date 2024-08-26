import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export let woshlist = createContext()
export default function WoshlistProvider({children}) {
    const [dataofwosh, setdataofwosh] = useState(null)
    const [loading, setloading] = useState(false)

    async function getwoshlist(){
        setloading(true)
        try {
            let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
                headers:{
                    token:localStorage.getItem("usertoken")
                }
            })
            // console.log(data);
            setdataofwosh(data.data)
            
        } catch (error) {
            console.log(error);
            
        }
        setloading(false)
    }

    useEffect(function (){
        getwoshlist()
    },[])

    function gip(){
        getwoshlist()
    }

   async function removefromwosh(id){
    try {
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers:{token:localStorage.getItem("usertoken")}
        })
        toast.success(data.status)
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
    getwoshlist()
   }


  return (
    <woshlist.Provider value = {{dataofwosh , loading , getwoshlist , removefromwosh , gip}}>
        {children}
    </woshlist.Provider>
  )
}
