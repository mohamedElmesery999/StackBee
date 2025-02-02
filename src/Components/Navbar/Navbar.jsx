import React from 'react'
import { Navbar as NavbarHeroUi, NavbarBrand, NavbarContent,  NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button,} from "@heroui/react";
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [ "Home", "Categories", "Brands", "Cart"];

  return (
    <NavbarHeroUi onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
       <Link to="/">
        <NavbarBrand>
          <p className="font-bold text-inherit">StackBee</p>
        </NavbarBrand>
       </Link>
      </NavbarContent>

    {localStorage.getItem("token") && <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {menuItems.map((item, index) => (
        <NavbarItem key={index}>
            <Link color='foreground' to={item == menuItems[0] ? "/" : "/" + item}>
               {item}
             </Link>
            </NavbarItem>
        ))}
      </NavbarContent> }

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </NavbarHeroUi>
  );
}
