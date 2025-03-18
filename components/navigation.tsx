"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

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
          <Image src="/logo_white.png" width={120} height={120} alt="OUTPLAY" />
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <nav className="flex space-x-12">
            {["about", "blog"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="text-gray-400 hover:text-white transition-colors duration-300 lowercase"
              >
                {item}
              </Link>
            ))}
          </nav>
          <button
            aria-label="Menu"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mr-2">menu</span>
            <span className="text-white">•</span>
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
            className="fixed inset-0 bg-white text-black z-40 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
              <Image src="/logo.png" width={120} height={120} alt="OUTPLAY" />
              </Link>

              <button
                className="text-black hover:text-gray-700 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">close</span>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <nav className="text-center">
                {[
                  { name: "news", href: "#news" },
                  { name: "portfolio", href: "#portfolio" },
                  { name: "skills", href: "#skills" },
                  { name: "european projects", href: "#projects" },
                  { name: "clients", href: "#clients" },
                  { name: "about", href: "#about" },
                  { name: "blog", href: "/blog" },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-5xl md:text-7xl lg:text-8xl font-bold py-2 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
              <div className="flex space-x-6">
                {["facebook", "instagram", "twitter", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`https://${social}.com`}
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social}</span>
                    {social === "facebook" && <Facebook size={20} />}
                    {social === "instagram" && <Instagram size={20} />}
                    {social === "twitter" && <Twitter size={20} />}
                    {social === "linkedin" && <Linkedin size={20} />}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-black transition-colors duration-300">pt</button>
                <span className="text-gray-400">•</span>
                <button className="text-black font-medium">en</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

