"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"

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
        isScrolled && !isMenuOpen ? "bg-black/90 backdrop-blur-md shadow-lg py-4" : ""
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
         <Image src="/logo_white.png" alt="OUTPLAY" width={130} height={150} />
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <nav className="flex space-x-12">
            {[
              { name: "manifesto", href: "/#manifesto" },
              { name: "what we do", href: "/#skills" },
              { name: "blog", href: "/blog" },
              { name: "about", href: "/about" },
              { name: "contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 lowercase"
              >
                {item.name}
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
            className="fixed inset-0 bg-white text-black z-40 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
         <Image src="/logo.png" alt="OUTPLAY" width={130} height={150} />
              </Link>

              <button
                className="text-black hover:text-gray-700 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">close</span>
                <X size={20} />
              </button>
            </div>

            <div className="container mx-auto px-6 md:px-12">
              {/* Mobile layout - single column with menu first, then contact/social */}
              <div className="md:hidden flex flex-col min-h-[80vh]">
                {/* Menu Items */}
                <nav className="py-8">
                  <ul className="space-y-6">
                    {[
                     { name: "about", href: "/about" },
                     { name: "manifesto", href: "/#manifesto" },
                     { name: "what we do", href: "/#skills" },
                     { name: "blog", href: "/blog" },
                     { name: "contact", href: "/contact" },
                    ].map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block text-4xl font-bold hover:text-gray-600 transition-colors duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Contact & Social - at the bottom on mobile */}
                <div className="mt-auto py-8 border-t border-gray-200">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <a href="mailto:hello@outplay.pt" className="hover:text-gray-600 transition-colors">
                          hello@outplay.pt
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="mr-3 text-gray-500" />
                        <a href="tel:+351969179179" className="hover:text-gray-600 transition-colors">
                          +351 969 179 179
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Follow Us</h3>
                    <div className="flex space-x-6">
                      {[
                        { name: "instagram", handle:"outplaypt", icon: <Instagram size={20} /> },
                        { name: "linkedin", handle:"company/outplaypt", icon: <Linkedin size={20} /> },
                      ].map((social) => (
                        <Link
                          key={social.name}
                          href={`https://${social.name}.com/${social.handle}`}
                          className="text-gray-600 hover:text-black transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">{social.name}</span>
                          {social.icon}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-4">
                      {/* <button className="text-gray-600 hover:text-black transition-colors duration-300">pt</button>
                      <span className="text-gray-400">•</span> */}
                      <button className="text-black font-medium">en</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop layout - side by side with left panel for contact/social */}
              <div className="hidden md:flex md:flex-row min-h-[80vh]">
                {/* Left side - Contact & Social */}
                <div className="w-1/3 py-20 pr-12 border-r border-gray-200 flex flex-col justify-end">
                  <div className="mb-16">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <a href="mailto:hello@outplay.pt" className="hover:text-gray-600 transition-colors">
                          hello@outplay.pt
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="mr-3 text-gray-500" />
                        <a href="tel:+351969179179" className="hover:text-gray-600 transition-colors">
                          +351 969 179 179
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Follow Us</h3>
                    <div className="flex space-x-6">
                      {[
                        { name: "instagram", handle:"", icon: <Instagram size={20} /> },
                        { name: "linkedin", handle:"company/outplaypt", icon: <Linkedin size={20} /> },
                      ].map((social) => (
                        <Link
                          key={social.name}
                          href={`https://${social.name}.com/${social.handle}`}
                          className="text-gray-600 hover:text-black transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">{social.name}</span>
                          {social.icon}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      {/* <button className="text-gray-600 hover:text-black transition-colors duration-300">pt</button>
                      <span className="text-gray-400">•</span> */}
                      <button className="text-black font-medium">en</button>
                    </div>
                  </div>
                </div>

                {/* Right side - Menu Items */}
                <div className="w-2/3 py-20 pl-12">
                  <nav>
                    <ul className="space-y-8">
                      {[
                        { name: "about", href: "/about" },
                        { name: "manifesto", href: "/#manifesto" },
                        { name: "what we do", href: "/#skills" },
                        { name: "blog", href: "/blog" },
                        { name: "contact", href: "/contact" },
                      ].map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block text-6xl lg:text-7xl font-bold hover:text-gray-600 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

