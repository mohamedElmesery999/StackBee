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
import ProtectedRoute from "./Auth/ProtectedRoute/ProtectedRoute"

const router = createBrowserRouter ([
  {path : '' , element:<Layout/> , children :[
    {index : true , element : <ProtectedRoute><Home/> </ProtectedRoute> },
    {path : "login" , element : <Login/>},
    {path : "register" , element : <Register/>},
    {path : "categories" , element :<ProtectedRoute><Categories/> </ProtectedRoute> },
    {path : "brands" , element : <ProtectedRoute><Brands/> </ProtectedRoute> },
    {path : "cart" , element : <ProtectedRoute><Cart/> </ProtectedRoute> },
    {path : "*" , element : <Notfound/>},
  ]}
])

export default function App() {
  return (
  <>
      <HeroUIProvider>
        <RouterProvider router={router}></RouterProvider>
      </HeroUIProvider>
  </>
  )
}