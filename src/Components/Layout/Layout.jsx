
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return <>
  <Navbar/>
  <div className='md:pt-[65px]'>
  <Outlet/>
  </div>
  <Footer/>
  </>
}
