"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-8 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg py-4" : ""
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          OUTPLAY<sup className="text-xs align-super">®</sup>
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <nav className="flex space-x-12">
            {["news", "skills", "portfolio", "team"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="text-gray-400 hover:text-white transition-colors duration-300 lowercase"
              >
                {item}
              </Link>
            ))}
          </nav>
          <button aria-label="Search" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Search size={20} />
          </button>
          <button
            aria-label="Menu"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mr-2">menu</span>
            <Menu size={20} />
          </button>
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <button aria-label="Search" className="text-gray-400 hover:text-white transition-colors duration-300">
            <Search size={20} />
          </button>
          <button
            aria-label="Menu"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-8 right-8 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
            <nav className="flex flex-col items-center space-y-8">
              {["news", "skills", "portfolio", "team", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-3xl font-light hover:text-gray-400 transition-colors duration-300 lowercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

