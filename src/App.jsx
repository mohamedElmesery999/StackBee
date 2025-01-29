import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layouts/Layout/Layout"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"

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
  <RouterProvider router={router}></RouterProvider>
  
  </>
  )
}