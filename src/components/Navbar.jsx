import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import {cn} from '../lib/utils'
import { Link } from "react-router-dom";

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ",className)}>
      <Menu setActive={setActive} className = 'text-purple-600'>
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home"/>
        </Link>
        <MenuItem setActive={setActive} active={active} item="All Categories">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/All Courses">Technology</HoveredLink>
            <HoveredLink href="/Basic Music Theory">Automobile</HoveredLink>
            <HoveredLink href="/Advanced Composition">World Geography</HoveredLink>
            <HoveredLink href="/Songwriting">Psychology</HoveredLink>
          </div>
        </MenuItem>
        <Link href="/AddPost">
          <MenuItem setActive={setActive} active={active} item="Add Post" />
        </Link>
        <Link href="/Contact">
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
