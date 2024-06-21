"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  title: string;
  path: string;
};

type NavLink = {
  link: LinkType;
  className: string;
  onMenu:any
};

const NavLink = ({ link, className, onMenu }: NavLink) => {
  const pathName = usePathname();
  const isActive = pathName === link.path;
  return (
    <div className={`${className}`} onClick={onMenu}>
      <Link
        href={link.path}
        className={`h-[30px] w-[80px] tablet:w-[120px] tablet:h-[40px] rounded-3xl text-[15px] tablet:text-[22px] flex justify-center items-center ${isActive ? "text-gray-900 bg-white " : ""}`}
      >
        {link.title}
      </Link>
    </div>
  );
};
export default NavLink;
