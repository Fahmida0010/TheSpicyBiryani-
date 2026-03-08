"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-pink-200 text-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/items" className="hover:text-yellow-400 transition">Menu</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>

          {/* Show only when logged in */}
          {session && (
            <>
              <Link href="/add-item" className="hover:text-yellow-400 transition">
                Add item
              </Link>

              <Link href="/manage-items" className="hover:text-yellow-400 transition">
                Manage Items
              </Link>
            </>
          )}

          {!session ? (
            <>
              <Link href="/login" className="hover:text-yellow-400">Login</Link>

              <Link
                href="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-md"
              >
                {session.user?.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56
                 bg-white text-black
                 rounded-md shadow-lg p-4 space-y-3">

                  <p className="text-sm border-b pb-2">
                    {session.user?.email}
                  </p>

                  <button
                    onClick={() => signOut()}
                    className="text-red-500 text-sm hover:text-red-600"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4
        text-black pb-4 flex flex-col gap-3">

          <Link className="hover:text-yellow-500" href="/">Home</Link>
          <Link className="hover:text-yellow-500" href="/items">Menu</Link>
          <Link className="hover:text-yellow-500" href="/about">About</Link>
          <Link className="hover:text-yellow-500" href="/contact">Contact</Link>

          {session && (
            <>
              <Link className="hover:text-yellow-500" href="/add-item">Add Item</Link>
              <Link className="hover:text-yellow-500" href="/manage-items">Manage Items</Link>
            </>
          )}

          {!session ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <p className="text-sm border-t pt-2">{session.user?.email}</p>

              <button
                onClick={() => signOut()}
                className="text-red-400 font-bold  text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;