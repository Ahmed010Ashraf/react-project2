import { useFormik } from "formik"
import * as YUP from "yup"
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Usercontext } from './../../context/UserContext';

export default function Login() {

  let {setusertoken}=useContext(Usercontext)

   const navigate = useNavigate()
  const [change,setchange]=useState(false)
  const validation = YUP.object().shape({
    email:YUP.string().required("you must enter email").email("enter valid email"),
    password:YUP.string().required("you must enter password").matches(/^[A-Za-z0-9@]{3,17}$/,"enter password correct"),
  })
   const user = {
    
    email:"",
    password:"",
   
   }
   async function loginnow(values){
    setchange(true);
    try{
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values);
      
      toast.success(res.data.message)
      localStorage.setItem("usertoken",res.data.token)
      setchange(false)
      setusertoken(res.data.token)
      navigate("/Products")
    }
    
    catch(err){
      toast.error(err.response.data.message)
      
      setchange(false)
    }
   }
  const formik = useFormik({
    initialValues:user,
    onSubmit:loginnow,
    validationSchema:validation
  })
  return (
    <div>
      <h2 className="mb-4 font-bold text-center text-5xl text-green-700">Login Now</h2>
      <form action="" onSubmit={formik.handleSubmit} className="md:w-[60%] mx-auto">
       

  {/* email */}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email?
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formik.errors.email}
</div>:""
  }
  {/* password */}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password?
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formik.errors.password}
</div>:""
  }
  
<button type="submit"className="py-2.5 px-5 me-2 mb-2 text-sm font-medium   bg-white rounded-lg    hover:text-green-700   dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200 ">{change==true?<i className="fa-solid fa-spinner fa-spin text-white"></i>:"Login"}</button>
<button onClick={()=>navigate("/Forgetpass")} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium   bg-white rounded-lg    hover:text-green-700   dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200 ">forget password</button>
      </form>
    </div>
  )
}

