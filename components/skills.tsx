"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "branding and technologies",
    heading: "sustainability",
    description: "Software and communication solutions for every step of your scientific narrative journey",
  },
  {
    title: "great brand experiences",
    heading: "science, strategy, and promotion",
    tags: ["brand strategy", "digital", "design"],
  },
  {
    title: "great digital experiences",
    heading: "design, implementation, and technology",
    tags: ["webdesign", "website development", "development of apps", "ecommerce"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              skills
            </motion.h2>
            <motion.p
              className="text-2xl font-light text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              an excellent scientific experience
              <br />
              is designed in many ways.
            </motion.p>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-white rounded-full mr-6" />
                <h3 className="font-bold text-xl">Solutions, communication, relationship, and transaction services.</h3>
              </div>
              <p className="text-gray-400 ml-9">
                With the help of our teams of consultants, creatives, and technology experts, we create experiences that
                have a positive impact on your scientific communication or brand.
              </p>
            </motion.div>
          </div>

          <div className="space-y-24">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <p className="text-gray-400 mb-2">{category.title}</p>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{category.heading}</h3>
                {category.description && <p className="text-gray-300">{category.description}</p>}
                {category.tags && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {category.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-5 py-2 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-white hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

