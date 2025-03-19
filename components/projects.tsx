"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "veto",
    category: "webdesign, webdevelopment",
    description:
      "Platform using Portugal's Parliament open data to improve citizen access to legislative information.",
    image: "/projects/veto.png",
    client: "OUTPLAY",
    year: "2025",
    url: "https://veto.pt",
  },
  {
    title: "pérola de esmalte",
    category: "webdesign, webdevelopment",
    description:
      "A dental clinic with a touch of elegance and sophistication based in Lousada, Porto.",
    image: "/projects/perola.png",
    client: "Pérola de Esmalte",
    year: "2025",
    url: "https://veto.pt",
  },
  {
    title: "reculture",
    category: "communication, dissemination, webdesign",
    description:
      "Taking advantage of sports as an universal language for the integration of young migrants.",
    image: "/placeholder.svg?height=800&width=1200",
    client: "Erasmus+",
    year: "2020",
    url: "https://reculture-project.eu",
  },
  {
    title: "rural jump-start",
    category: "communication, dissemination, webdesign",
    description:
      "Empowering young entrepreneurs in rural areas to help them create their own businesses.",
    image: "/placeholder.svg?height=800&width=1200",
    client: "Erasmus+",
    year: "2021",
    url: "https://ruraljumpstart.eu",
  },
]

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="portfolio" className="py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">things we did</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Project list on the left */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-12">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? "pl-6 border-l-2 border-white"
                      : "pl-6 border-l-2 border-transparent hover:border-gray-700 hover:pl-6"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setActiveIndex(index)}
                >
                  <h3
                    className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      activeIndex === index ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`transition-colors duration-300 ${
                      activeIndex === index ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project details on the right */}
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <div className="relative aspect-[16/9] mb-8 overflow-hidden">
                  <Image
                    src={projects[activeIndex].image || "/placeholder.svg"}
                    alt={projects[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <h3 className="text-3xl font-bold mb-4">{projects[activeIndex].title}</h3>
                    <p className="text-gray-300 text-lg mb-6">{projects[activeIndex].description}</p>
                    <motion.button
                      className="flex items-center space-x-2 text-white group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link href={projects[activeIndex].url}>
                      <span>View project</span>
                      </Link>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </div>

                  <div className="md:col-span-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Client</h4>
                        <p className="text-white">{projects[activeIndex].client}</p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Year</h4>
                        <p className="text-white">{projects[activeIndex].year}</p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Category</h4>
                        <p className="text-white">{projects[activeIndex].category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

