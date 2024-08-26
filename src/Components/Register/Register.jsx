import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../context/UserContext";

export default function Register() {
  let { setusertoken } = useContext(Usercontext);
  const navigate = useNavigate();
  const [change, setchange] = useState(false);

  const validation = YUP.object().shape({
    name: YUP.string()
      .required("you must enter the name")
      .min(3, "min is 3")
      .max(10, "max is 10"),
    email: YUP.string()
      .required("you must enter email")
      .email("enter valid email"),
    phone: YUP.string()
      .required("you must enter phone ")
      .matches(/^01[0125][0-9]{8}$/, "enter egyption phone"),
    password: YUP.string()
      .required("you must enter password")
      .matches(/^[A-Za-z0-9@]{3,17}$/, "enter password correct"),
    rePassword: YUP.string() // Changed from repassword to rePassword
      .required("you must enter repassword")
      .oneOf([YUP.ref("password")], "repass must be like pass"),
  });
  

  async function Rejesternow(values) {
    setchange(true);
    try {
      let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      toast.success(res.data.message);
      localStorage.setItem("usertoken", res.data.token);
      setusertoken(res.data.token);
      navigate("/Login");
    } catch (err) {
      toast.error(err.response.data.message);
      
    } finally {
      setchange(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "" // Changed from repassword to rePassword
    },
    onSubmit: Rejesternow,
    validationSchema: validation,
  });
  

  return (
    <div>
      <h2 className="mb-4 font-bold text-center text-5xl text-green-700">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="md:w-[60%] mx-auto">
        {/* name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Full Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.name}
          </div>
        )}
        
        {/* phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Your Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.phone}
          </div>
        )}
        
        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.email}
          </div>
        )}
        
        {/* password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.password}
          </div>
        )}
        
        {/* re password */}
        <div className="relative z-0 w-full mb-5 group">
        <input
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  value={formik.values.rePassword} // Changed from formik.values.repassword to formik.values.rePassword
  type="password"
  name="rePassword" // Changed from repassword to rePassword
  id="rePassword"
  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
  placeholder=""
/>

          <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Repassword
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Error!</span> {formik.errors.rePassword}
          </div>
        )}
        
        <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-white rounded-lg hover:text-green-700 dark:bg-green-800 dark:text-white dark:hover:text-white dark:hover:bg-green-600 duration-200">
          {change ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
