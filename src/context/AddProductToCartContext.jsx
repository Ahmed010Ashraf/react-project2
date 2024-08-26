import axios from 'axios'
import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
export const productToCart = createContext()
export default function AddProductToCartContextProvider({children}) {

    const [numofitems, setnumofitems] = useState(0)
    const [products, setproducts] = useState([])
    const [totalprice, settotalprice] = useState(0)
    const [cartid, setcartid] = useState("")
    const [load,setload] = useState({})
    const [load2,setload2] = useState({})

    async function AddToCart(id){
        
        try{
            let {data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
                productId:id
            },
            {
                headers:{
                    token:localStorage.getItem("usertoken")
                }
            })
            getlogedusercart()
            return data
            
        }catch(err){
            console.log(err);
            return null
        }
    }

    async function getlogedusercart(){
        
        try{
            let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token:localStorage.getItem("usertoken")
                }
            })
            setnumofitems(data.numOfCartItems)
            setproducts(data.data.products)
            settotalprice(data.data.totalCartPrice)
            setcartid(data.data._id)
            
        }catch(err){
            console.log(err);
            
        }
    }

    async function updataProduct(id , count){
        setload((prev)=>({...prev , [id] : true}))
        try{
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 

                {
                    count: count
                },
                {
                    headers:{
                        token:localStorage.getItem("usertoken")
                    }
                }
        
            
            )
            setnumofitems(data.numOfCartItems)
            setproducts(data.data.products)
            settotalprice(data.data.totalCartPrice)
            setcartid(data.data._id)
            setload((prev)=>({...prev , [id] : false}))
            return data
        }catch(err){
            console.log(Error , "can't acsess the data");
            setload((prev)=>({...prev , [id] : false}))
            
        }
    }

    async function deleteAll(){
        
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{
                    token:localStorage.getItem("usertoken")
                }
            })
            setnumofitems(0)
            setproducts([])
            settotalprice(0)

        } catch (error) {
            console.log(error, "can't delete");
            
        }
        
    }
    async function deleteproduct(id){
        setload2((prev)=>({...prev , [id] : true}))
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{
                    token:localStorage.getItem("usertoken")
                }
            })
            setnumofitems(data.numOfCartItems)
            setproducts(data.data.products)
            settotalprice(data.data.totalCartPrice)
            setcartid(data.data._id)

        } catch (error) {
            console.log(error, "can't delete");
            
        }
        setload2((prev)=>({...prev , [id] : false}))
    }

    useEffect(()=>{
        getlogedusercart()
    },[])

  return (
    <productToCart.Provider value={{AddToCart , totalprice ,products,numofitems , updataProduct , load , deleteproduct , load2 ,deleteAll , cartid ,settotalprice ,setproducts,setnumofitems}}>
            {children}
    </productToCart.Provider>
)
}
