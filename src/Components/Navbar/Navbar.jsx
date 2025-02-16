import React, { useContext, useState } from 'react'; 
import { Navbar as NavbarHeroUi, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Image } from "@heroui/react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import { AiFillHome, AiOutlineAppstore, AiOutlineTag, AiOutlineShoppingCart } from "react-icons/ai"; // Import icons
import Logo from '../../assets/logo.PNG';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const { isLoggedin, setIsLoggedin } = useContext(authContext);

  // Menu items with icons
  const menuItems = [
    { name: "Home", icon: <AiFillHome size={20} />, path: "/" },
    { name: "Categories", icon: <AiOutlineAppstore size={20} />, path: "/categories" },
    { name: "Brands", icon: <AiOutlineTag size={20} />, path: "/brands" },
    { name: "Cart", icon: <AiOutlineShoppingCart size={20} />, path: "/cart" },
  ];

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate("/login");
    setIsMenuOpen(false);
  }

  return (
    <NavbarHeroUi 
      shouldHideOnScroll 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        {/* Toggle button for mobile menu */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Link to="/">
          <NavbarBrand>
            <Image src={Logo} className="mt-3" />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* Desktop Menu with Icons and Green Selection */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isLoggedin &&
          menuItems.map((item, index) => (
            <NavbarItem key={index} className="flex items-center gap-2">
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  location.pathname === item.path ? "text-green-500 font-bold" : "text-gray-700"
                } hover:text-green-600`}
              >
                {item.icon} {item.name}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>

      {/* Right Side (Login/Logout) */}
      <NavbarContent justify="end">
        {isLoggedin ? (
          <NavbarItem className="hidden sm:flex">
            <Button onPress={logout} color="danger" variant="bordered">
              LogOut
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="border-2 rounded-xl px-4 py-2 hover:bg-green-400 hover:text-white transition-all">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu with Green Selection */}
      <NavbarMenu>
        {isLoggedin &&
          menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link 
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  location.pathname === item.path ? "text-green-500 font-bold" : "text-gray-700"
                } hover:text-green-600`}
              >
                {item.icon}
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        {isLoggedin && (
          <NavbarMenuItem>
            <Button 
              onPress={logout} 
              color="danger" 
              variant="bordered" 
              className="w-full"
            >
              LogOut
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NavbarHeroUi>
  );
}
