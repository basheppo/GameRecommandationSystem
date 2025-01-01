import React from "react";
import Link from "next/link";
import Image from "next/image";
function Navbar() {
  return (
    <nav className="flex items-center border-4 border-white">
      <Image
        src="/images/gamefy.png"
        alt="logo image"
        width={100}
        height={100}
        className="border-r-2 border-black h-40 w-40 "
      />
      <div className="  grid grid-cols-4 border-2 mx-auto border-black ">
        <Link
          className="hover:bg-white hover:text-black border-2 text-center p-4 "
          href="/"
        >
          Home
        </Link>
        <Link
          className="hover:bg-white hover:text-black border-2  text-center p-4 "
          href="/recommendations"
        >
          Recommendations
        </Link>
        <Link
          className="hover:bg-white hover:text-black border-2 text-center p-4 "
          href="/search"
        >
          Search
        </Link>
        <Link
          className="hover:bg-white hover:text-black border-2  text-center p-4 "
          href="/about"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
