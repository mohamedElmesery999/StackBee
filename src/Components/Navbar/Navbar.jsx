import React, { useContext } from 'react'; 
import { Navbar as NavbarHeroUi, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Image } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import Logo from '../../assets/logo.PNG';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["Home", "Categories", "Brands", "Cart"];
  const navigate = useNavigate();
  const { isLoggedin, setIsLoggedin } = useContext(authContext);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate("/login");
    setIsMenuOpen(false); // Close menu after logout
  }

  return (
    <NavbarHeroUi 
      shouldHideOnScroll 
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen} // Ensure menu state is controlled
    >
      <NavbarContent>
        {/* Toggle button to open/close menu */}
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

      {/* Desktop Menu */}
      {isLoggedin && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link to={item === "Home" ? "/" : "/" + item}>{item}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

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

      {/* Mobile Menu */}
      {isLoggedin && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link 
                to={item === "Home" ? "/" : "/" + item} 
                onClick={() => setIsMenuOpen(false)} // Close menu on item click
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
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
        </NavbarMenu>
      )}
    </NavbarHeroUi>
  );
}
