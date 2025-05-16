"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Plus } from "lucide-react"
import { useLocale } from "@/lib/i18n"

export function Skills() {
  const { t } = useLocale()
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const toggleSkill = (id: string) => {
    if (expandedSkill === id) {
      setExpandedSkill(null)
    } else {
      setExpandedSkill(id)
    }
  }

  const skillCategories = [
    {
      id: "funding",
      titleKey: "skills.categories.funding.title",
      descriptionKey: "skills.categories.funding.description",
      skillsKeys: [
        "skills.categories.funding.skills.0",
        "skills.categories.funding.skills.1",
        "skills.categories.funding.skills.2",
        "skills.categories.funding.skills.3",
        "skills.categories.funding.skills.4",
        "skills.categories.funding.skills.5",
      ],
    },
    {
      id: "branding",
      titleKey: "skills.categories.branding.title",
      descriptionKey: "skills.categories.branding.description",
      skillsKeys: [
        "skills.categories.branding.skills.0",
        "skills.categories.branding.skills.1",
        "skills.categories.branding.skills.2",
        "skills.categories.branding.skills.3",
        "skills.categories.branding.skills.4",
        "skills.categories.branding.skills.5",
      ],
    },
    {
      id: "digital",
      titleKey: "skills.categories.digital.title",
      descriptionKey: "skills.categories.digital.description",
      skillsKeys: [
        "skills.categories.digital.skills.0",
        "skills.categories.digital.skills.1",
        "skills.categories.digital.skills.2",
        "skills.categories.digital.skills.3",
        "skills.categories.digital.skills.4",
        "skills.categories.digital.skills.5",
      ],
    },
    {
      id: "transformation",
      titleKey: "skills.categories.transformation.title",
      descriptionKey: "skills.categories.transformation.description",
      skillsKeys: [
        "skills.categories.transformation.skills.0",
        "skills.categories.transformation.skills.1",
        "skills.categories.transformation.skills.2",
        "skills.categories.transformation.skills.3",
        "skills.categories.transformation.skills.4",
        "skills.categories.transformation.skills.5",
      ],
    },
    {
      id: "communication",
      titleKey: "skills.categories.communication.title",
      descriptionKey: "skills.categories.communication.description",
      skillsKeys: [
        "skills.categories.communication.skills.0",
        "skills.categories.communication.skills.1",
        "skills.categories.communication.skills.2",
        "skills.categories.communication.skills.3",
        "skills.categories.communication.skills.4",
        "skills.categories.communication.skills.5",
      ],
    },
    {
      id: "experiential",
      titleKey: "skills.categories.experiential.title",
      descriptionKey: "skills.categories.experiential.description",
      skillsKeys: [
        "skills.categories.experiential.skills.0",
        "skills.categories.experiential.skills.1",
        "skills.categories.experiential.skills.2",
        "skills.categories.experiential.skills.3",
        "skills.categories.experiential.skills.4",
        "skills.categories.experiential.skills.5",
      ],
    },
  ];

  return (
    <section id="skills" className="py-16" style={{ scrollMarginTop: '10rem' }}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">{t("skills.mainTitle")}</h2>
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
                    <h3 className="text-2xl md:text-3xl font-bold">{t(category.titleKey)}</h3>
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
                    {t(category.descriptionKey)}
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
                      {expandedSkill === category.id ? t("skills.hideCapabilities") : t("skills.viewCapabilities")}
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
                      {category.skillsKeys.map((skillKey, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-gray-300">{t(skillKey)}</span>
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

