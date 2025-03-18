"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Scientific Projects" },
  { value: "30+", label: "Research Partners" },
  { value: "15+", label: "Industry Awards" },
]

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Scientific Director",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Michael Roberts",
    role: "Creative Lead",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Dr. James Wilson",
    role: "Technology Director",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("mission")
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={containerRef} className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">About Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-blue-500 opacity-50" />
              <div className="relative aspect-square overflow-hidden">
                <Image src="/placeholder.svg?height=800&width=800" alt="OUTPLAY Team" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-blue-500 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex space-x-8 mb-8 border-b border-gray-800">
              {["mission", "approach", "values"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 relative ${activeTab === tab ? "text-white" : "text-gray-500"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" layoutId="activeTab" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[200px]">
              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                  <p className="text-gray-400 mb-6">
                    OUTPLAY is a specialized communication agency dedicated to transforming complex scientific
                    achievements into compelling narratives that resonate with diverse audiences.
                  </p>
                  <p className="text-gray-400">
                    We believe that great scientific breakthroughs deserve equally great communication. Our mission is
                    to amplify the impact of science through strategic, creative, and accessible communication.
                  </p>
                </motion.div>
              )}

              {activeTab === "approach" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
                  <p className="text-gray-400 mb-6">
                    We combine deep scientific knowledge with creative storytelling to bridge the gap between innovation
                    and understanding.
                  </p>
                  <p className="text-gray-400">
                    Our interdisciplinary team works closely with scientists, research institutions, and innovative
                    companies to craft narratives that capture the essence of their work and communicate it effectively.
                  </p>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold mb-6">Our Values</h3>
                  <p className="text-gray-400 mb-6">
                    Accuracy, creativity, and accessibility are at the core of everything we do. We are committed to
                    maintaining scientific integrity while making complex concepts understandable.
                  </p>
                  <p className="text-gray-400">
                    We value collaboration, innovation, and continuous learning, staying at the forefront of both
                    scientific advancements and communication strategies.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold text-blue-400 mb-2"
                whileInView={{
                  opacity: [0, 1],
                  scale: [0.5, 1],
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team section with horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-12">Our Team</h3>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8 pb-8"
            drag="x"
            dragConstraints={{ right: 0, left: -(teamMembers.length * 320 - window.innerWidth + 48) }}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[300px]"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square mb-4 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-[300px] flex items-center justify-center">
              <motion.button
                className="px-6 py-3 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-black transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Team Members
              </motion.button>
            </div>
          </motion.div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

