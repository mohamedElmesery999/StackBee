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
  }

  return (
    <NavbarHeroUi shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      
      {/* M. Logo on the Left */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link to="/">
          <NavbarBrand>
            <Image src={Logo} className="mt-3" />
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* M. Menu Items in the Center */}
      {isLoggedin && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link to={item === "Home" ? "/" : "/" + item}>
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {/* M. Logout / Login Buttons on the Right */}
      <NavbarContent justify="end">
        {isLoggedin ? (
          <NavbarItem className="hidden sm:flex">
            <Button onClick={logout} color="danger" variant="bordered">
              LogOut
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
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

      {/* M. Mobile Menu (Dropdown) */}
      {isLoggedin && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link to={item === "Home" ? "/" : "/" + item}>{item}</Link>
            </NavbarMenuItem>
          ))}
          {/* M. Logout Button in Mobile Menu */}
          <NavbarMenuItem>
            <Button onClick={logout} color="danger" variant="bordered" className="w-full">
              LogOut
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      )}
    </NavbarHeroUi>
  );
}
