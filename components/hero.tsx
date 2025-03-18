"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const updateDimensions = () => {
      if (heroRef.current) {
        const { width, height } = heroRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    window.addEventListener("scroll", handleScroll)

    // Use RAF for smoother cursor tracking
    let rafId: number | null = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top } = heroRef.current.getBoundingClientRect()
        targetX = e.clientX - left
        targetY = e.clientY - top
      }
    }

    const updateLightPosition = () => {
      // Smooth interpolation for cursor movement
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1

      setMousePosition({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(updateLightPosition)
    }

    updateLightPosition()
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Calculate relative position for parallax effect
  const calcParallaxValue = (strength = 0.05) => {
    if (dimensions.width === 0) return { x: 0, y: 0 }

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    const deltaX = (mousePosition.x - centerX) * strength
    const deltaY = (mousePosition.y - centerY) * strength

    return { x: deltaX, y: deltaY }
  }

  const textParallax = calcParallaxValue(0.02)
  const dotParallax = calcParallaxValue(0.04)
  const subtitleParallax = calcParallaxValue(0.01)

  // Calculate opacity based on scroll position
  const calculateOpacity = () => {
    if (dimensions.height === 0) return 1
    const fadeStart = dimensions.height * 0.5
    const fadeEnd = dimensions.height * 0.8

    if (scrollY <= fadeStart) return 1
    if (scrollY >= fadeEnd) return 0

    return 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
  }

  const contentOpacity = calculateOpacity()

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("portfolio")
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section ref={heroRef} className="min-h-screen pt-12 pb-20 flex items-center relative overflow-hidden">
      {/* Light effect that follows cursor */}
      <div 
        className="absolute pointer-events-none opacity-60 rounded-full blur-[100px] w-[500px] h-[500px]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: "transform, left, top",
          background:
            "radial-gradient(circle, rgba(77,171,247,0.7) 0%, rgba(41,121,255,0.4) 40%, rgba(28,85,179,0.1) 70%, rgba(11,50,96,0) 100%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div className="flex flex-col items-center" style={{ opacity: contentOpacity }}>
          <motion.div
            className="w-3 h-3 bg-white rounded-full mb-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: dotParallax.x,
              y: dotParallax.y,
            }}
            transition={{
              duration: 0.5,
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
            }}
          />

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-light text-center max-w-5xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              x: textParallax.x,
            }}
            style={{
              rotateX: textParallax.y * 0.05,
              rotateY: -textParallax.x * 0.05,
              willChange: "transform"
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              x: { type: "spring", stiffness: 50, damping: 20 },
            }}
          >
            <span className="font-light">we</span> <span className="font-bold">write the rules</span>{" "}
            <span className="font-light">you</span> <span className="font-bold">follow</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl mx-auto mt-12 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              x: subtitleParallax.x,
            }}
            style={{
              y: subtitleParallax.y,
              willChange: "transform"
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              x: { type: "spring", stiffness: 50, damping: 20 },
            }}
          >
           the impossible was never our style
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={scrollToNextSection}
        style={{ opacity: contentOpacity }}
      >
        <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <ChevronDown className="text-white" size={24} />
        </motion.div>
      </motion.div>

      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}