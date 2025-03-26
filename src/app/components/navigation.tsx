"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { SignedIn, SignUpButton, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white shadow-lg shadow-gray-800"
          : "bg-white text-gray-800 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          {theme === "dark" ? "🌙 Logo Dark" : "☀️ Logo Light"}
        </Link>

        {/* Search Bar */}
        <div
          className="hidden md:flex items-center border rounded-lg px-3 py-1 w-1/3 transition-all duration-300"
          style={{
            borderColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
            backgroundColor: theme === "dark" ? "#1F2937" : "transparent",
          }}
        >
          <Search className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 outline-none bg-transparent"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/shop" className="hover:text-blue-600 dark:hover:text-blue-400">Shop</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
        </nav>

        {/* Auth Buttons & Theme Toggle */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
            }}
          >
            {mounted && theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>

          {/* Authentication Buttons */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          }`}
        >
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full mt-2"
              style={{
                backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
              }}
            >
              {mounted && theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
