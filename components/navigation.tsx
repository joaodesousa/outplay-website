"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { Locale, locales, useLocale } from "@/lib/i18n"
import { useRouter } from 'next/navigation'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { locale, setLocale, t } = useLocale()
  const router = useRouter()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf("/#");
    if (hashIndex !== -1 && typeof window !== 'undefined') {
      const targetId = href.substring(hashIndex + 2);
      if (targetId) { // Ensure targetId is not empty
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setLocale(newLocale);
    
    // Get the current path
    const currentPath = window.location.pathname;
    
    // Remove the current locale from the path if it exists
    let pathWithoutLocale = currentPath;
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length > 0 && locales.includes(pathSegments[0] as Locale)) {
      pathSegments.shift();
      pathWithoutLocale = '/' + pathSegments.join('/');
    }
    
    // if pathWithoutLocale became '//' (e.g. from /en/ or /pt/), make it '/'
    if (pathWithoutLocale === '//') {
      pathWithoutLocale = '/';
    }
    
    // Navigate to the same page with the new locale
    // Ensure leading slash for the base path if it's not just the root
    const basePath = (pathWithoutLocale === '/' || pathWithoutLocale === '') ? '' : pathWithoutLocale;
    const newPath = `/${newLocale}${basePath}`;
      
    router.push(newPath);
  }

  const navItems = [
    { name: t("navigation.projects"), href: `/${locale}/#projects` },
    { name: t("navigation.whatWeDo"), href: `/${locale}/#skills` },
    { name: t("navigation.blog"), href: `/${locale}/blog`  },
    { name: t("navigation.about"), href: `/${locale}/about`  },
    { name: t("navigation.contactLink"), href: `/${locale}/contact` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-8 transition-all duration-300 ${
        isScrolled && !isMenuOpen ? "bg-black/90 backdrop-blur-md shadow-lg py-4" : ""
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href={`/${locale}/`} className="text-2xl font-bold">
         <Image src="/logo_white.png" alt="OUTPLAY" width={130} height={150} />
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          <nav className="flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-300 lowercase"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <button
            aria-label={t("navigation.menu")}
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mr-2">{t("navigation.menu")}</span>
            <span className="text-white">•</span>
          </button>
        </div>

        <div className="flex md:hidden items-center space-x-4">
          <button
            aria-label={t("navigation.menu")}
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
              <Link href={`/${locale}/`} className="text-2xl font-bold">
         <Image src="/logo.png" alt="OUTPLAY" width={130} height={150} />
              </Link>

              <button
                className="text-black hover:text-gray-700 transition-colors duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{t("navigation.close")}</span>
                <X size={20} />
              </button>
            </div>

            <div className="container mx-auto px-6 md:px-12">
              {/* Mobile layout - single column with menu first, then contact/social */}
              <div className="md:hidden flex flex-col min-h-[80vh]">
                {/* Menu Items */}
                <nav className="py-8">
                  <ul className="space-y-6">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block text-4xl font-bold hover:text-gray-600 transition-colors duration-300"
                          onClick={(e) => {
                            handleLinkClick(e, item.href);
                            setIsMenuOpen(false);
                          }}
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
                    <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">
                      {t("navigation.contactTitle")}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <a href="mailto:hello@outplay.pt" className="hover:text-gray-600 transition-colors">
                          hello@outplay.pt
                        </a>
                      </div>
                     
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">
                      {t("navigation.followUs")}
                    </h3>
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
                      {locale === 'en' ? (
                        <>
                          <button 
                            className="text-gray-600 hover:text-black transition-colors duration-300"
                            onClick={() => switchLanguage('pt')}
                          >
                            pt
                          </button>
                          <span className="text-gray-400">•</span>
                          <button className="text-black font-medium">
                            en
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-black font-medium">
                            pt
                          </button>
                          <span className="text-gray-400">•</span>
                          <button 
                            className="text-gray-600 hover:text-black transition-colors duration-300"
                            onClick={() => switchLanguage('en')}
                          >
                            en
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop layout - side by side with left panel for contact/social */}
              <div className="hidden md:flex md:flex-row min-h-[80vh]">
                {/* Left side - Contact & Social */}
                <div className="w-1/3 py-20 pr-12 border-r border-gray-200 flex flex-col justify-end">
                  <div className="mb-16">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                      {t("navigation.contactTitle")}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <a href="mailto:hello@outplay.pt" className="hover:text-gray-600 transition-colors">
                          hello@outplay.pt
                        </a>
                      </div>
                      
                    </div>
                  </div>

                  <div className="mb-16">
                    <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                      {t("navigation.followUs")}
                    </h3>
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

                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      {locale === 'en' ? (
                        <>
                          <button 
                            className="text-gray-600 hover:text-black transition-colors duration-300"
                            onClick={() => switchLanguage('pt')}
                          >
                            pt
                          </button>
                          <span className="text-gray-400">•</span>
                          <button className="text-black font-medium">
                            en
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-black font-medium">
                            pt
                          </button>
                          <span className="text-gray-400">•</span>
                          <button 
                            className="text-gray-600 hover:text-black transition-colors duration-300"
                            onClick={() => switchLanguage('en')}
                          >
                            en
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Menu Items */}
                <div className="w-2/3 py-20 pl-12">
                  <nav>
                    <ul className="space-y-8">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block text-6xl lg:text-7xl font-bold hover:text-gray-600 transition-colors duration-300"
                            onClick={(e) => {
                              handleLinkClick(e, item.href);
                              setIsMenuOpen(false);
                            }}
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

