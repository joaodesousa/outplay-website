"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    // Always show cursor and set up listeners
    setHidden(false)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)
    const handleMouseLeaveWindow = () => setHidden(true)
    const handleMouseEnterWindow = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeaveWindow)
    window.addEventListener("mouseenter", handleMouseEnterWindow)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeaveWindow)
      window.removeEventListener("mouseenter", handleMouseEnterWindow)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
    }
  }, []) // Empty dependency array: runs once on mount, cleans up on unmount

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

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={cursorVariants}
      animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ opacity: hidden ? 0 : 1 }} // Controlled by mouse enter/leave
    />
  )
}

