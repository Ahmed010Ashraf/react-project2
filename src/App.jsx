
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Cart from './Components/Cart/Cart';
import Catigories from './Components/Catigories/Catigories';
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Toaster } from 'react-hot-toast';
import Usercontextprovider from './context/UserContext';
import ProtectedRoute from './Components/protectedroute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AddProductToCartContextProvider from './context/AddProductToCartContext';
import { Payment } from './Components/Payment/Payment';
import { Notfound } from './Components/Notfound/Notfound';
import { Allorders } from './Components/Allorders/Allorders';
import WoshlistProvider from './context/Woshlist';
import Woshlistcom from './Components/woshlist/Woshlistcom';
import Forgetpass from './Components/forgetpass/Forgetpass';

function App() {

  const routers = createBrowserRouter([
    { path: "",element:<Layout/> , children: [
      {index:true,element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"Catigories",element:<ProtectedRoute><Catigories/></ProtectedRoute>},
      {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"Payment",element:<ProtectedRoute><Payment/></ProtectedRoute>},
      {path:"allorders",element:<ProtectedRoute><Allorders/></ProtectedRoute>},
      {path:"Woshlistcom",element:<ProtectedRoute><Woshlistcom/></ProtectedRoute>},
      {path:"*",element:<ProtectedRoute><Notfound/></ProtectedRoute>},
      {path:"ProductDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"Login",element:<Login/>},
    {path:"Forgetpass",element:<Forgetpass/>},
    {path:"Register",element:<Register/>}]}
  ])
  const x = new QueryClient()
  return (
    <>
    <QueryClientProvider client={x}>
    <Usercontextprovider>
    <AddProductToCartContextProvider>
      <WoshlistProvider>
    <Toaster/>
    <RouterProvider router={routers}></RouterProvider>
      </WoshlistProvider>
    </AddProductToCartContextProvider>
    </Usercontextprovider>
    </QueryClientProvider>
    </>
  )
}

export default App
