import axios from "axios"
import { InfinitySpin } from "react-loader-spinner";
import { useQueries, useQuery } from "react-query";
import Model from "../Model/Model";
import { useState } from "react";

export default function Brands() {

  const [spebrand, setspebrand] = useState("unknown")
  const [toload, settoload] = useState(false)

  async function getspebrand(id){
    settoload(true)
    try {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      setspebrand(data.data.name)
      // console.log(data.data.name);
      
    } catch (error) {
      console.log(error);
      
    }
    settoload(false)
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  async function getbrands (){
   return   await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
     
  }

  let {data , isLoading} = useQuery("brands" , getbrands)

  // console.log(data);
  

  if(isLoading) {
    return (
      <div className="h-screen bg-green-400 flex justify-center items-center">
        <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
      </div>
    );
  }

  return (

    <>
    <Model load={toload} name={spebrand} modeltoggle={isModalVisible} setIsModalVisible={setIsModalVisible}/>

    <section className="p-9">
      <h2 className="text-center text-green-700 font-mono text-3xl mb-3 ">All brands</h2>
      <div className="flex justify-center items-center flex-wrap">
        {data?.data.data.map(function(item , idx){
          return <div key={idx} className="w-full md:w-1/4 p-2  ">
          <div onClick={()=>{toggleModal() ; getspebrand(item._id);}} className="inner p-2 border-2 hover:drop-shadow-2xl cursor-pointer duration-300">
            <img src={item.image} className="w-full" alt="" />
            <h2 className="text-center p-3">{item.name}</h2>
          </div>
          </div>
        })}
      </div>
    </section>
    </>
  )
}
