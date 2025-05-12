'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const NavItems = [
    { label: "Home", href: "/" },
    { label: "Tabs", href: "/tabs" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];

  const pathname = usePathname();

  console.log("pathname :", pathname);
  

  return (
    <div>
      <ul className="flex gap-5 py-6">
        {NavItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className={ pathname === `${item.href}` ? 'text-blue-500' : '' }>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
