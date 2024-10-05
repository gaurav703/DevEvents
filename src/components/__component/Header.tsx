"use client";
import { useEffect, useState } from "react"; // Import useState and useEffect
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";

// NavItems component now accepts isLoggedIn as a prop
const NavItems = ({ isLoggedIn }: any) => {
  const pathname = usePathname();
  const headerLinks = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "Create Event",
      route: "/events/CreateEvents",
    },
    // Conditionally add the "My Profile" link if the user is logged in
    ...(isLoggedIn
      ? [
          {
            label: "My Profile",
            route: "/profile",
          },
        ]
      : []),
  ];

  return (
    <ul className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-primary-500" : "text-gray-700"
            } hover:text-primary-500 transition duration-200`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const MobileNav = ({ isLoggedIn }: any) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            DevEvents
          </Link>
          <Separator className="border border-gray-50" />
          <NavItems isLoggedIn={isLoggedIn} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check both localStorage and sessionStorage for userId and token
    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (userId && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="border-b">
      {" "}
      {/* Changed footer to header */}
      <div className="flex-center wrapper flex-between flex flex-col max-md:flex-row gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          DevEvents
        </Link>

        <nav className="hidden md:flex">
          <NavItems isLoggedIn={isLoggedIn} />
        </nav>

        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <MobileNav isLoggedIn={isLoggedIn} />
          </div>

          {/* Conditionally render the Login button based on isLoggedIn state */}
          {!isLoggedIn && (
            <a href="/login">
              <Button size="lg" className="max-md:hidden">
                Login
              </Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
