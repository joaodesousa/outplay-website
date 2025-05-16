"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Import Cursor dynamically with SSR disabled
const Cursor = dynamic(() => import("./cursor").then((mod) => ({ default: mod.Cursor })), {
  ssr: false,
})

export default function ClientCursor() {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Only render on client side after hydration and check if it's a mobile device
  useEffect(() => {
    setIsMounted(true)
    
    // Check if device is mobile
    const checkIfMobile = () => {
      const userAgent = window.navigator.userAgent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768)
    }
    
    checkIfMobile()
    
    // Recalculate on resize for tablets that can switch between portrait/landscape
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  if (!isMounted || isMobile) {
    return null
  }

  return <Cursor />
} 