import { Formik } from 'formik'
import React, { useState } from 'react'
import * as YUP from "yup"
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function Forgetpass() {
  const [change,setchange]=useState(false)


  const validation = YUP.object().shape({
    email:YUP.string().required("you must enter email").email("enter valid email"),
  })
  const user = {
    email:"",
   }
   async function forget(values){
    setchange(true)
    
    try{
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values);
      
      toast.success(data.message)

      
    }
    
    catch(err){
      toast.error(err.response.data.message)
      console.log(err);
      
      
    }
    setchange(false)
   }

   const formik = useFormik({
    initialValues:user,
    onSubmit:forget,
    validationSchema:validation
  })
  return (
    <section className='w-[90%] md:w-[80%] mx-auto p-9'>
      <form onSubmit={formik.handleSubmit}>
          {/* email */}
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={Formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {formik.errors.email && formik.touched.email?
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formik.errors.email}
</div>:""
  }
<button type="submit"className="py-2.5 px-5 me-2 mb-2 text-sm font-medium   bg-white rounded-lg    hover:text-green-700   dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200 ">{change==true?<i className="fa-solid fa-spinner fa-spin text-white"></i>:"send"}</button>

      </form>
    </section>
  )
}
