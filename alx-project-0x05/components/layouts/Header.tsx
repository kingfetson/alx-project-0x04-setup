import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Update the import path below if your CountContext is located elsewhere
import { useCount } from "../../context/CountContext";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { count } = useCount();

  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        <Link href="/" className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Splash App
        </Link>
        <div className="flex gap-4">
          {
            !["/counter-app"].includes(pathname) ? (
              <>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Sign In</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
              </>
            ) : (
              <p className="font-semibold text-lg">Current count : {count}</p>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;