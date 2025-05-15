"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    
    // Initial check
    checkMobile()
    
    // Listen for resize events
    window.addEventListener("resize", checkMobile)

    // Only add cursor events if not mobile
    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
        setHidden(false)
      }

      const handleMouseDown = () => setClicked(true)
      const handleMouseUp = () => setClicked(false)

      const handleLinkHoverStart = () => setLinkHovered(true)
      const handleLinkHoverEnd = () => setLinkHovered(false)

      window.addEventListener("mousemove", updatePosition)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("mouseleave", () => setHidden(true))
      window.addEventListener("mouseenter", () => setHidden(false))

      const links = document.querySelectorAll("a, button")
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHoverStart)
        link.addEventListener("mouseleave", handleLinkHoverEnd)
      })

      return () => {
        window.removeEventListener("mousemove", updatePosition)
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mouseleave", () => setHidden(true))
        window.removeEventListener("mouseenter", () => setHidden(false))
        window.removeEventListener("resize", checkMobile)

        links.forEach((link) => {
          link.removeEventListener("mouseenter", handleLinkHoverStart)
          link.removeEventListener("mouseleave", handleLinkHoverEnd)
        })
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  const cursorVariants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      x: position.x - 12,
      y: position.y - 12,
    },
    link: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      x: position.x - 18,
      y: position.y - 18,
    },
    clicked: {
      width: 18,
      height: 18,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      x: position.x - 9,
      y: position.y - 9,
    },
  }

  // For mobile devices, render an empty div with the same className to maintain DOM structure
  if (isMobile) {
    return <div className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference" style={{opacity: 0}} suppressHydrationWarning />
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={cursorVariants}
      animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ opacity: hidden ? 0 : 1 }}
      suppressHydrationWarning
    />
  )
}

