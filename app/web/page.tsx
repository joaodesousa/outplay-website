import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects" 
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Skills } from "@/components/skills"
import { CookieNotice } from "@/components/cookie-notice"
import { Marquee } from "@/components/marquee"
import { LoadingScreen } from "@/components/loading-screen"


export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <LoadingScreen />
        <Hero />
        <Projects />
        <Skills />
        <Marquee />
        <Contact />
        <Footer />
        <CookieNotice />
    </main>
  )
}