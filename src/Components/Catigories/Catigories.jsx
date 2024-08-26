import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import Catchield from "../Catchield/Catchield";

export default function Catigories() {

  const [load, setload] = useState(false)
  const [loader, setloader] = useState(false)
  const [cat , setcat] = useState(null)
  const [subcat , setsubcat] = useState(null)

  async function getCategory(){
    setload(true)
    try {
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setcat(data.data)
      // console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
    setload(false)
  }

  async function getsubcat(id){
    setloader(true)
    try {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      // console.log(data);
      setsubcat(data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    setloader(false)
  }

  useEffect(function(){
    getCategory()
  },[])

  if(load){
    return (
      <div className="h-screen bg-green-400 flex justify-center items-center">
        <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
      </div>
    );
  }

  if(loader){
    return (
      <div className="h-screen bg-green-200 flex justify-center items-center">
        <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
      </div>
    );
  }
  return (
    <section className="md:p-9 p-5">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex justify-center items-center flex-wrap">
          {cat?.map(function(ca , idx){
            return <div onClick={()=>getsubcat(ca._id)} key={idx} className="w-full  md:w-1/2 lg:w-1/3 p-2 ">
            <div className="inner border-2 p-2">
              <img style={{objectFit: "cover"}} src={ca.image} className="w-full h-[300px]" alt="" />
              <h2 className="p-3 text-center text-2xl text-green-700">{ca.name}</h2>
            </div>
            </div>
          })}
        </div>
        <div className="py-4">
          <h2 className="text-green-600 text-center font-mono text-3xl mb-3">sub catigories</h2>
          <Catchield sub={subcat} />
        </div>
      </div>
    </section>
  )
}
