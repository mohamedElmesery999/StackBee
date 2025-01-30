import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layouts/Layout/Layout"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import { HeroUIProvider } from "@heroui/react"

const router = createBrowserRouter ([
  {path : '' , element:<Layout/> , children :[
    {index : true , element : <Home/>},
    {path : "login" , element : <Login/>},
    {path : "register" , element : <Register/>},
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