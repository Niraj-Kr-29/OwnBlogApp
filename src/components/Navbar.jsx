import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import {cn} from '../lib/utils'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const authStatus = useSelector((state)=>
    state.auth.status
  )
  
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
    {
      name: 'Contact',
      slug: '/contact',
      active: authStatus
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'Logout',
      slug: '/logout',
      active: authStatus
    },
  ]

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ",className )}>
      <Menu setActive={setActive} className = 'text-purple-600'>
        {navItems.map((item)=> item.active? (
          <Link key={`${item.slug}`} to={`${item.slug}`}>
            <MenuItem setActive={setActive} active={active} item={`${item.name}`} />
          </Link>
        ) : null)}

        {authStatus && <MenuItem setActive={setActive} active={active} item="All Categories">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to={'/posts/technology'}>Technology</HoveredLink>
            <HoveredLink to={"/posts/automobile"}>Automobile</HoveredLink>
            <HoveredLink to={"/posts/world-geography"}>World Geography</HoveredLink>
            <HoveredLink to={"/posts/psychology"}>Psychology</HoveredLink>
          </div>
        </MenuItem>}
      </Menu>
    </div>
  );
}

export default Navbar;
