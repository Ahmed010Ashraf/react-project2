import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "./../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Usercontext } from "../../context/UserContext";
import { productToCart } from './../../context/AddProductToCartContext';

export default function Navbar() {
  const [visib, setvisib] = useState(false);
  const navigate = useNavigate();
  let { usertoken, setusertoken } = useContext(Usercontext);
  let { numofitems, products } = useContext(productToCart);

  function logout() {
    localStorage.removeItem("usertoken");
    setusertoken(null);
    navigate("/Login");
  }

  return (
    <nav className="z-50 bg-slate-200 static md:fixed top-0 left-0 right-0">
      <div className="md:w-[90%] mx-auto py-4 flex justify-between items-center flex-wrap">
        
        <div className="flex justify-between items-center w-full md:w-auto">
          <NavLink to="" className="text-3xl">
            <img src={logo} alt="logo" className="  md:w-auto" />
          </NavLink>
          <i
            onClick={() => setvisib(!visib)}
            className="fa-solid text-3xl cursor-pointer md:hidden"
          >
            <i className={`fa-bars ${visib ? "fa-xmark" : "fa-bars"}`}></i>
          </i>
        </div>

        
        <div
          className={`${
            visib ? "block" : "hidden"
          } md:flex justify-center items-center w-full md:w-auto mt-4 md:mt-0`}
        >
          {usertoken !== null ? (
            <ul className="flex flex-col md:flex-row gap-2">
              
              <li className="text-center relative">
                <NavLink to="Cart">
                  Cart
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full md:-top-3 -top-1 md:-right-3 right-34">
                    {numofitems === 0 && products?.length !== 0 ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      numofitems
                    )}
                  </div>
                </NavLink>
              </li>
              <li className="text-center">
                <NavLink to="Catigories">Categories</NavLink>
              </li>
              <li className="text-center">
                <NavLink to="Products">Products</NavLink>
              </li>
              <li className="text-center">
                <NavLink to="Brands">Brands</NavLink>
              </li>
              <li className="text-center">
                <NavLink to="allorders">All Orders</NavLink>
              </li>
              <li className="text-center">
                <NavLink to="Woshlistcom">Wishlist</NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        
        <div
          className={`${
            visib ? "block" : "hidden"
          } md:flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0`}
        >
          <div className="icons text-center">
            <i className="fa-brands mr-1 cursor-pointer fa-linkedin-in"></i>
            <i className="fa-brands mr-1 cursor-pointer fa-facebook-f"></i>
            <i className="fa-brands mr-1 cursor-pointer fa-youtube"></i>
            <i className="fa-brands cursor-pointer fa-instagram"></i>
          </div>
          <ul className="flex flex-col md:flex-row items-center gap-2">
            {usertoken === null ? (
              <>
                <li className="text-center">
                  <NavLink to="Login">Login</NavLink>
                </li>
                <li className="text-center">
                  <NavLink to="Register">Register</NavLink>
                </li>
              </>
            ) : (
              <li
                className="text-center cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
