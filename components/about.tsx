"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useLocale } from "@/lib/i18n"

// Team members remain hardcoded for now
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
  const [windowWidth, setWindowWidth] = useState(0)
  const { t } = useLocale()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const statsData = [
    { value: "10+", labelKey: "about.statsSection.yearsExperience" },
    { value: "50+", labelKey: "about.statsSection.scientificProjects" },
    { value: "30+", labelKey: "about.statsSection.researchPartners" },
    { value: "15+", labelKey: "about.statsSection.industryAwards" },
  ]

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
          <h2 className="text-5xl md:text-6xl font-bold">{t("about.mainTitle")}</h2>
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
                <Image src="/placeholder.svg?height=800&width=800" alt={t("about.mainTitle")} fill className="object-cover" />
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
              {["mission", "approach", "values"].map((tabKey) => (
                <button
                  key={tabKey}
                  className={`pb-4 relative ${activeTab === tabKey ? "text-white" : "text-gray-500"}`}
                  onClick={() => setActiveTab(tabKey)}
                >
                  {t(`about.tabs.${tabKey}`)}
                  {activeTab === tabKey && (
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
                  <h3 className="text-3xl font-bold mb-6">{t("about.missionContent.title")}</h3>
                  <p className="text-gray-400 mb-6">
                    {t("about.missionContent.p1")}
                  </p>
                  <p className="text-gray-400">
                    {t("about.missionContent.p2")}
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
                  <h3 className="text-3xl font-bold mb-6">{t("about.approachContent.title")}</h3>
                  <p className="text-gray-400 mb-6">
                    {t("about.approachContent.p1")}
                  </p>
                  <p className="text-gray-400">
                    {t("about.approachContent.p2")}
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
                  <h3 className="text-3xl font-bold mb-6">{t("about.valuesContent.title")}</h3>
                  <p className="text-gray-400 mb-6">
                    {t("about.valuesContent.p1")}
                  </p>
                  <p className="text-gray-400">
                    {t("about.valuesContent.p2")}
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
          {statsData.map((stat, index) => (
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
              <div className="text-gray-400">{t(stat.labelKey)}</div>
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
          <h3 className="text-3xl font-bold mb-12">{t("about.teamSection.title")}</h3>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8 pb-8"
            drag="x"
            dragConstraints={{ right: 0, left: -(teamMembers.length * 320 - windowWidth + 48) }}
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

