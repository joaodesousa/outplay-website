"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem("cookie-preference")

    if (!cookieChoice) {
      // Delay showing the notice for a better user experience
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-preference", "all")
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookie-preference", "necessary")
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black border-l-2 border-white p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm uppercase tracking-wider font-medium">Cookie Notice</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-6">This website uses cookies to enhance your browsing experience.</p>

            <div className="flex items-center space-x-6">
              <button
                onClick={handleAcceptNecessary}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Necessary only
              </button>

              <button
                onClick={handleAcceptAll}
                className="text-sm border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

