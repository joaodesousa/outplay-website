"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentRule, setCurrentRule] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const rules = [
    "RULE 01: PAGES EXIST WHERE WE DECIDE.",
    "RULE 02: ERRORS ARE JUST OPPORTUNITIES.",
    "RULE 03: BOUNDARIES ARE MEANT TO BE CROSSED.",
    "RULE 04: WE DEFINE THE EXPERIENCE.",
    "RULE 05: FOLLOW US, NOT THE CROWD.",
  ]

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Cycle through rules
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRule((prev) => (prev + 1) % rules.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [rules.length])

  // Reveal animation
  useEffect(() => {
    setIsRevealed(true)
  }, [])

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <div
        ref={containerRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={`v-${i}`} className="h-full w-px bg-gray-900" style={{ left: `${(i / 6) * 100}%` }} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={`h-${i}`} className="w-full h-px bg-gray-900" style={{ top: `${(i / 6) * 100}%` }} />
          ))}
        </div>

        {/* 404 with reveal animation */}
        <div className="relative mb-12 overflow-hidden">
          <motion.div
            className="relative z-10"
            initial={{ y: "100%" }}
            animate={{ y: isRevealed ? 0 : "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter">404</h1>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="absolute top-[-10%] right-[-5%] w-24 h-24 border border-white opacity-20" />
            <div className="absolute bottom-[-10%] left-[-5%] w-24 h-24 border border-white opacity-20" />
          </motion.div>
        </div>

        {/* Rules display */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 h-24 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRule}
              className="text-xl md:text-2xl font-bold uppercase tracking-wider"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {rules[currentRule]}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="w-24 h-px bg-white mt-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <p className="text-gray-400 text-lg mb-12">
            This page doesn't exist because we decided it shouldn't. But we've created something better for you to
            explore.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="group flex items-center border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300"
            >
              RETURN TO OUR WORLD
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>
          </div>
        </motion.div>

        {/* Interactive cursor effect */}
        <div
          className="absolute pointer-events-none w-[300px] h-[300px] rounded-full blur-[100px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0) 100%)",
            left: `calc(${mousePosition.x}% - 150px)`,
            top: `calc(${mousePosition.y}% - 150px)`,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />

        {/* Bottom text */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="text-xs text-gray-600 uppercase tracking-widest">
            OUTPLAY © {new Date().getFullYear()} — We make the rules you follow
          </div>
        </motion.div>
      </div>
    </main>
  )
}

