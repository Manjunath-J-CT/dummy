"use client";
import { useState } from "react";
import NavLink from "./navlink/Navlink";
import Image from "next/image";
import menu from "@/../public/menu.svg";

type LinkType = {
  title: string;
  path: string;
};

const links: LinkType[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Products",
    path: "/product",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  const onMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="w-1/4 flex justify-center tablet:hidden" onClick={onMenu}>
        <Image
          src={menu}
          alt="menu"
          loading="lazy"
          width={100}
          height={100}
        ></Image>
      </div>
      {open && (
        <div className="absolute mt-2.5 left-0 bg-gray-900 gap-12 tablet:hidden w-1/4 h-screen">
          <div className="py-8 flex flex-col justify-center items-center gap-8">
            {links.map((link) => (
              <NavLink
                link={link}
                key={link.title}
                className="w-full flex justify-center cursor-pointer "
                onMenu={onMenu}
              />
            ))}
          </div>
        </div>
      )}
      <div className="hidden tablet:flex gap-40">
        {links.map((link) => (
          <NavLink
            link={link}
            key={link.title}
            className="cursor-pointer "
            onMenu={()=>{}}
          />
        ))}
      </div>
    </div>
  );
};
export default Links;
