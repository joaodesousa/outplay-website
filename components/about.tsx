"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={containerRef} className="py-32 relative px-10">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-5xl md:text-6xl font-bold tracking-tighter mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-gray-400 text-lg mb-8">
              OUTPLAY is a specialized communication agency dedicated to transforming complex scientific achievements
              into compelling narratives that resonate with diverse audiences.
            </p>
            <p className="text-gray-400 text-lg">
              We believe that great scientific breakthroughs deserve equally great communication. Our mission is to
              amplify the impact of science through strategic, creative, and accessible communication.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
            <p className="text-gray-400 text-lg mb-8">
              Our team of experts combines deep scientific knowledge with creative storytelling to bridge the gap
              between innovation and understanding.
            </p>
            <p className="text-gray-400 text-lg">
              We work closely with scientists, research institutions, and innovative companies to craft narratives that
              capture the essence of their work and communicate it effectively to their target audiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

