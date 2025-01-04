"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

interface MenuProps {
  showCatMenu: boolean;
  setShowCatMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuMobileProps extends MenuProps {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [showCatMenu, setShowCatMenu] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, mobileMenu]);

  const cartCount =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")?.length || 0
      : 0;

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <Image
            className="w-[40px] md:w-[60px]"
            src="/logo.svg"
            width={60}
            height={500}
            alt="Logo"
          />
        </Link>

        <Menu />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* Wishlist Icon */}
          {/* <div className="w-8 md:w-12 h-8 md:h-12 flex rounded-full justify-center items-center cursor-pointer relative hover:bg-black/[0.05]">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
              5
            </div>
          </div> */}

          {/* Cart Icon */}
          <div className="w-8 md:w-12 h-8 md:h-12 flex rounded-full justify-center items-center cursor-pointer relative hover:bg-black/[0.05]">
            <Link href="/Cart">
              <BsCart className="text-[19px] md:text-[24px]" />
            </Link>
            {/* <div className="h-[14px] md:h-[18px] min-w-[14px]  md:min-w-[18px] rounded-full bg-red-600 absolute top-1  left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
              {cartCount}
            </div> */}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="w-8 md:w-12 h-8 md:h-12 flex rounded-full justify-center items-center cursor-pointer relative hover:bg-black/[0.05] md:hidden">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
