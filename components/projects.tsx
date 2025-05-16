"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getStoryblokApi } from "@storyblok/react"
import { useLocale } from "@/lib/i18n"

interface Project {
  title: string
  category: string[] | string
  description: string
  image: string
  client: string
  year: string
  url: string
}

export function Projects() {
  const { locale, t } = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = async () => {
    console.log("[Projects] Fetching projects for locale:", locale); // Debug log
    try {
      setIsLoading(true)
      const storyblokApi = getStoryblokApi()
      
      if (!storyblokApi) {
        console.error("[Projects] Storyblok API is not initialized");
        setIsLoading(false)
        return
      }
      
      const startsWith = `${locale}/projects/`;
      console.log("[Projects] Storyblok API call params:", { version: "published", starts_with: startsWith, language: locale }); // Debug log

      const { data } = await storyblokApi.get("cdn/stories", {
        version: "published",
        starts_with: startsWith,
        language: locale,
      })

      console.log("[Projects] Storyblok API response data:", data); // Debug log

      if (data && data.stories && data.stories.length > 0) {
        const formattedProjects = data.stories.map((story: any) => {
          const content = story.content;
          
          return {
            title: content.title || "",
            // Handle category as either string or array
            category: Array.isArray(content.category) 
              ? content.category.join(", ") 
              : content.category || "",
            description: content.description || "",
            // Handle image format from Storyblok
            image: content.image?.filename || "/placeholder.svg?height=800&width=1200",
            client: content.client || "",
            year: content.year || "",
            // Handle URL object structure
            url: content.url?.cached_url || content.url?.url || "#",
          }
        });
        
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error("[Projects] Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [locale])

  if (isLoading) {
    return (
      <section id="projects" className="py-32" style={{ scrollMarginTop: '10rem' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center mb-24">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h2 className="text-5xl md:text-6xl font-bold">{t("projects.title")}</h2>
          </div>
          <p className="text-center text-gray-300">{t("projects.loading")}</p>
        </div>
      </section>
    )
  }

  // If no projects are found
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-32" style={{ scrollMarginTop: '10rem' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center mb-24">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h2 className="text-5xl md:text-6xl font-bold">{t("projects.title")}</h2>
          </div>
          <p className="text-center text-gray-300">{t("projects.notFound")}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-32" style={{ scrollMarginTop: '10rem' }}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-3 h-3 bg-white rounded-full mr-8" />
          <h2 className="text-5xl md:text-6xl font-bold">{t("projects.title")}</h2>
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
            {projects.length > 0 && (
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
                      src={projects[activeIndex].image}
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
                        <span>{t("projects.viewProject")}</span>
                        </Link>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </motion.button>
                    </div>

                    <div className="md:col-span-4">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">{t("projects.clientLabel")}</h4>
                          <p className="text-white">{projects[activeIndex].client}</p>
                        </div>
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">{t("projects.yearLabel")}</h4>
                          <p className="text-white">{projects[activeIndex].year}</p>
                        </div>
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">{t("projects.categoryLabel")}</h4>
                          <p className="text-white">{projects[activeIndex].category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

