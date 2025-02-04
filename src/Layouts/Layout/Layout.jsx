import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
  return (
    <div>
        <Navbar/>
              <div className="container py-10">
                 <Outlet/>
              </div>
        <Footer/>
    </div>
  )
}
