import { useContext } from "react"
import { productToCart } from './../../context/AddProductToCartContext';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {


  let {products , totalprice , updataProduct , load , deleteproduct , load2 ,deleteAll} = useContext(productToCart)
  // console.log(products);
  // if(products==null){
  //   return (
  //     <div className="h-screen bg-green-400 flex justify-center items-center">
  //       <InfinitySpin visible={true} width="200" color="red" ariaLabel="infinity-spin-loading" />
  //     </div>
  //   );
  // }
  return (
    <section>
      {products?.length != 0 ?<>
        <div className="w-[90%] md:w-[80%] mx-auto py-9">
        <h2 className="p-4 text-green-600 text-2xl font-mono text-center">total price : {totalprice}</h2>
        <button
        onClick={()=>deleteAll()}
        className="p-2 mb-4 rounded-lg text-white text-2xl font-bold text-center mx-auto block w-full bg-red-500 ">delete all</button>
        <Link
        to = "/Payment"
        className="p-2 mb-4 rounded-lg text-white text-2xl font-bold text-center mx-auto block bg-green-500 ">payment</Link>
        {products?.map((item , idx)=>{
          return <div key={idx} className="border-2 border-b-green-400 flex p-4 bg-slate-200 flex-wrap justify-center items-center"> 
          <div className="md:w-1/6 w-full">
          <img src={item.product.imageCover} className="w-full" alt="" />
          </div>
          <div className="md:w-4/6 w-full">
          <h2 className="p-3 text-green-600 text-xl">title : {item.product.title.split(" ").slice(0.2).join(" ")}</h2>
          <p className="p-3 text-xl">price : {item.price} EGP</p>
          <button
          onClick={()=>deleteproduct(item.product.id)}
                  className="py-3 mb-5 md:mb-0 px-4 w-[50%] mx-auto block bg-red-600 rounded-2xl group-hover:bg-green-800 duration-500 text-white my-2"
                >
                  {load2[item.product.id]?<i className="fa-solid fa-spinner fa-spin"></i>:"remove"}
                </button>
          </div>
          <div className="md:w-1/6 w-full flex md:justify-between justify-center items-center">
          <button className="p-2 text-xl mr-3 md:mr-0 text-white bg-green-600 rounded-lg"
          onClick={()=>updataProduct(item.product.id , item.count + 1)}
          >+</button>
          <p className="p-2 text-xl text-white mr-3 md:mr-0 bg-green-600 rounded-lg">{load[item.product.id]?<i className="fa-solid fa-spinner fa-spin"></i>:item.count}</p>
          <button className={`${item.count==0 ? "opacity-25":""} p-2 text-xl text-white bg-green-600 rounded-lg`}
          onClick={()=>updataProduct(item.product.id , item.count - 1)}
          disabled={ item.count==0 ?true : false}
          >-</button>
          </div>
        </div>
        })}
        
      </div>
      </>:<div className="pt-20 text-center text-2xl text-green-600 h-screen">NO Products on the Cart</div>}
    </section>
  )
}
