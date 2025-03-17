"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Globe, Palette, Megaphone, Calendar } from "lucide-react"

const services = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Web Design",
    description:
      "Creating immersive digital experiences that communicate complex scientific concepts clearly and beautifully.",
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Brand Creation",
    description: "Developing distinctive visual identities that capture the essence of scientific innovation.",
  },
  {
    icon: <Megaphone className="w-10 h-10" />,
    title: "Dissemination Strategies",
    description: "Crafting targeted communication plans to share scientific achievements with the right audiences.",
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "Event Organization",
    description: "Designing and executing memorable events that showcase scientific breakthroughs.",
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="services" ref={containerRef} className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Our Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            We specialize in transforming complex scientific achievements into compelling narratives that resonate with
            your audience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black border border-gray-800 p-8 rounded-lg hover:border-white transition-colors duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="mb-6 text-gray-400 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <motion.div
                className="flex items-center text-sm font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="absolute inset-0 pointer-events-none z-[-1] opacity-20" style={{ y, opacity }}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 blur-3xl" />
      </motion.div>
    </section>
  )
}

