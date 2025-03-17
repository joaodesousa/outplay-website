"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              Let's create the <span className="font-bold">best</span>
              <br />
              <span className="font-bold">scientific</span>
              <br />
              <span className="font-bold">experience</span> for your
              <br />
              business?
            </h2>

            <div className="flex items-center mt-12 space-x-4">
              <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Award" className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Award" className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-8">talk to us</h3>
            <form className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="insert your name here"
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="type your email here"
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                />
              </div>
              <div>
                <textarea
                  placeholder="start typing"
                  rows={3}
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
                >
                  <span>Send message</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

