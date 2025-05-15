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

  const youtubeVideoId = "rt3y8PR41DY"

  // Effect for initial loading screen
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Loading screen duration

    return () => clearTimeout(loadingTimer)
  }, []) // Runs once after initial mount

  // Effect to determine if it's a first visit and show video accordingly
  useEffect(() => {
    const hasVisitedStorage = localStorage.getItem("has-visited-before")
    const isFirstVisit = !hasVisitedStorage

    setHasVisitedBefore(!isFirstVisit) // Update state based on storage

    // If loading is complete, it's the first visit, and on desktop, show video
    if (!isLoading && isFirstVisit && isDesktop) {
      setShowVideo(true)
      localStorage.setItem("has-visited-before", "true")
    }
    // Do not show video if it's not the first visit or not on desktop, even if loading is done.
    // setShowVideo(false) should be handled by other interactions like handleCloseVideo

  }, [isLoading, isDesktop, hasVisitedBefore]) // Dependencies that control video visibility

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

