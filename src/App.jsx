import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layouts/Layout/Layout"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import { HeroUIProvider } from "@heroui/react"
import Brands from "./Pages/Brands/Brands"
import Categories from "./Pages/Categories/Categories"
import Cart from "./Pages/Cart/Cart"
import Notfound from "./Pages/Notfound/Notfound"
import ProtectedRoute from "./Auth/ProtectedRoute"
import AuthContextProvider from "./Contexts/AuthContext"
import ProtectedAuthRoute from "./Auth/ProtectedAuthRoute"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import { ToastContainer } from 'react-toastify';
import FormCheck from "./Pages/FormCheck/FormCheck"
import Orders from "./Pages/Orders/Orders"



const router = createBrowserRouter([
  {
    path: '', element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // M. Home is now public
      { path: "login", element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
      { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "formcheck/:cartId", element: <ProtectedRoute><FormCheck /></ProtectedRoute> },
      { path: "product/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> }, 
      { path: "*", element: <Notfound /> },
    ]
  }
]);

export default function App() {
  return (
  <>
      <AuthContextProvider>  
          <HeroUIProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer/>
          </HeroUIProvider>
      </AuthContextProvider>
  </>
  )
}