"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeRule, setActiveRule] = useState<number | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track mouse position for interactive effects - only on desktop
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      // Random glitch effect
      if (Math.random() > 0.995) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  // Optimize scroll animations for mobile
  const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 50 : 100, isMobile ? -50 : -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Manifesto rules - our philosophical statements
const rules = [
    {
      number: "01",
      title: "Question everything, especially the obvious.",
      description:
        "The most interesting solutions often begin with asking why things are done a certain way, and wondering if there's another approach worth exploring.",
    },
    {
      number: "02",
      title: "There's always another angle.",
      description:
        "When a path seems blocked, it's an invitation to look at the challenge from a different perspective. New viewpoints reveal new possibilities.",
    },
    {
      number: "03",
      title: "Conventional thinking has conventional limits.",
      description: "Breaking patterns means finding possibilities that weren't visible before. The most interesting ideas live just beyond what's expected.",
    },
    {
      number: "04",
      title: "Make the complex accessible, not simplistic.",
      description:
        "Clarity doesn't mean oversimplification. It means finding the essence of something complex and making it understandable without losing its depth.",
    },
    {
      number: "05",
      title: "Stay curious, stay hungry.",
      description:
        "The moment you think you've figured it all out is the moment you stop growing. We embrace the uncertainty of exploration over the comfort of knowing.",
    },
  ]

  return (
    <section id="manifesto" ref={containerRef} className="min-h-screen py-32 relative overflow-hidden">
      {/* Background elements - simplified for mobile */}
      <motion.div className="absolute inset-0 pointer-events-none z-[-1] opacity-20" style={{ y, opacity }}>
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gray-800 ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gray-800 ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">Our Manifesto</h2>
        </motion.div>

        {/* Rules list */}
        <div className="space-y-16 md:space-y-24">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: index * (isMobile ? 0.05 : 0.1) }}
            >
              <div
                className={`cursor-pointer group transition-all duration-500 ${
                  activeRule === index ? "scale-105" : "hover:scale-[1.02]"
                }`}
                onClick={() => setActiveRule(activeRule === index ? null : index)}
              >
                {/* Rule number */}
                <div className="flex items-start gap-6 md:gap-12">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="text-7xl md:text-9xl font-bold text-white opacity-10 select-none"
                      animate={!isMobile ? {
                        x: isGlitching ? Math.random() * 10 - 5 : 0,
                        y: isGlitching ? Math.random() * 10 - 5 : 0,
                      } : undefined}
                    >
                      {rule.number}
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    {/* Rule title */}
                    <motion.h3
                      className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                      animate={!isMobile ? {
                        x: isGlitching ? Math.random() * 5 - 2.5 : 0,
                        y: isGlitching ? Math.random() * 5 - 2.5 : 0,
                      } : undefined}
                    >
                      {rule.title}
                    </motion.h3>

                    {/* Rule description - only shown when active */}
                    <AnimatePresence>
                      {activeRule === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xl text-gray-400 mb-6">{rule.description}</p>

                         
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Animated underline */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-full mt-8 opacity-20"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl md:text-3xl font-light mb-8 max-w-3xl mx-auto">
            Ready to break rules with us and transform how your science is communicated?
          </p>

          <Link href="/contact">
            <motion.button
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

