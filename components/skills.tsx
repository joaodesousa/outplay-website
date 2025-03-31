"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Plus } from "lucide-react"

const skillCategories = [
  {
    id: "funding",
    title: "Funding Acquisition",
    description:
      "Every journey begins with resources. We find the angles others miss, turning technically sound proposals into compelling narratives that stand out to evaluators and secure the funding that fuels your vision.",
    skills: [
      "Erasmus+ proposals",
      "Horizon Europe submissions",
      "Portugal 2030 funding",
      "Project conceptualization",
      "Budget development",
      "Impact assessment",
    ],
  },
  {
    id: "branding",
    title: "Brand Identity",
    description:
      "We create identities that reject the expected and embrace the distinctive, crafting visual and verbal languages that capture your unique approach to changing the game.",
    skills: [
      "Visual identity development",
      "Brand positioning",
      "Brand guidelines",
      "Logo design",
      "Typography systems",
      "Brand storytelling",
    ],
  },
  {
    id: "digital",
    title: "Digital Experiences",
    description:
      "Your identity deserves a digital presence that breaks the mold. We create experiences that feel both surprising and intuitive—because standing out doesn't mean sacrificing clarity or function.",
    skills: [
      "Website design & development",
      "Platform creation",
      "User experience design",
      "Digital product development",
      "Data visualization",
      "Interactive solutions",
    ],
  },
  {
    id: "transformation",
    title: "Digital Transformation",
    description:
      "Breaking free from outdated processes isn't just about new tools—it's about new thinking. We guide organizations through digital evolution, finding the right mix of technology and strategy to transform how you work without losing what makes you unique.",
    skills: [
      "Process digitalization",
      "Workflow optimization",
      "Digital tools integration",
      "Legacy system modernization",
      "Team adaptation support",
      "Digital maturity assessment",
    ],
  },
  {
    id: "communication",
    title: "Communication Strategy",
    description:
      "With your foundation established, it's time to be heard. We develop communication approaches that sidestep convention, creating messages that resonate with the people who matter to your mission.",
    skills: [
      "Strategic messaging",
      "Content development",
      "Social media strategy",
      "Project dissemination",
      "Audience engagement",
      "Communication planning",
    ],
  },
  {
    id: "experiential",
    title: "Event Design",
    description:
      "The journey culminates in real-world impact. We create experiences where your audiences aren't just passive observers but active participants in something meaningful—the ultimate expression of your vision.",
    skills: [
      "Event planning",
      "Experience design",
      "Hybrid event solutions",
      "Space utilization",
      "Event branding",
      "Participant engagement",
    ],
  },
];

export function Skills() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const toggleSkill = (id: string) => {
    if (expandedSkill === id) {
      setExpandedSkill(null)
    } else {
      setExpandedSkill(id)
    }
  }

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">what we do</h2>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-b border-gray-800 pb-16 last:border-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white mr-4">
                      <span className="text-xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{category.title}</h3>
                  </motion.div>
                </div>

                <div className="lg:col-span-8">
                  <motion.p
                    className="text-gray-400 text-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {category.description}
                  </motion.p>

                  <motion.button
                    className={`flex items-center text-sm space-x-2 ${expandedSkill === category.id ? "text-blue-400" : "text-white"}`}
                    onClick={() => toggleSkill(category.id)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.6, delay: 0.4  }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="uppercase tracking-wider font-medium">
                      {expandedSkill === category.id ? "Hide Capabilities" : "View Capabilities"}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedSkill === category.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedSkill === category.id ? <ChevronRight /> : <Plus size={18} />}
                    </motion.div>
                  </motion.button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedSkill === category.id ? "auto" : 0,
                      opacity: expandedSkill === category.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-gray-300">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

