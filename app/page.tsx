"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { CookieNotice } from "@/components/cookie-notice"
import { VideoIntroduction } from "@/components/video-introduction"
import { LoadingScreen } from "@/components/loading-screen"
import { Manifesto } from "@/components/manifesto"

// Custom hook to detect if we're on desktop
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768) // 768px is a common breakpoint for desktop
    }

    // Initial check
    checkIsDesktop()

    // Add event listener
    window.addEventListener('resize', checkIsDesktop)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  return isDesktop
}

export default function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisitedBefore, setHasVisitedBefore] = useState(true)
  const isDesktop = useIsDesktop()

  // Replace with your actual YouTube video ID
  const youtubeVideoId = "rt3y8PR41DY" // Example: Replace with your actual YouTube video ID

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("has-visited-before")
    const newVisitor = !hasVisited

    setHasVisitedBefore(!newVisitor)

    // Set loading state
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Show video for new visitors after loading completes, but only on desktop
      if (newVisitor && isDesktop) {
        setShowVideo(true)
        localStorage.setItem("has-visited-before", "true")
      }
    }, 3000) // Match this with your loading screen duration

    return () => clearTimeout(timer)
  }, [isDesktop])

  const handleCloseVideo = () => {
    setShowVideo(false)
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {isLoading && <LoadingScreen />}

      {showVideo && isDesktop && <VideoIntroduction onClose={handleCloseVideo} youtubeVideoId={youtubeVideoId} />}

      <Navigation />
      <Hero />
      <Projects />

      {/* <Manifesto /> */}
      <Skills />
      <Contact />
      <Footer />
      <CookieNotice />
    </main>
  )
}

