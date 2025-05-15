"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Import Cursor dynamically with SSR disabled
const Cursor = dynamic(() => import("./cursor").then((mod) => ({ default: mod.Cursor })), {
  ssr: false,
})

export default function ClientCursor() {
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client side after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Cursor />
} 