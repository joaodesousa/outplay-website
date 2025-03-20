"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X } from "lucide-react"

// Pre-generate random positions for dots to avoid hydration errors
const randomDots = Array.from({ length: 50 }).map(() => ({
  left: `${Math.floor(Math.random() * 100)}%`,
  top: `${Math.floor(Math.random() * 100)}%`,
  opacity: (Math.floor(Math.random() * 40) + 10) / 100,
}))

export default function ContactPage() {
  // Track conversation state
  const [conversation, setConversation] = useState<Array<{ type: "question" | "answer"; text: string }>>([
    { type: "question", text: "WHAT BRINGS YOU HERE?" },
  ])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [email, setEmail] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }) // Default center position

  // Reference for auto-scrolling
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Questions flow
  const questions = [
    "WHAT BRINGS YOU HERE?",
    "WHAT RULE DO YOU WANT TO BREAK?",
    "WHAT'S HOLDING YOU BACK?",
    "HOW SHOULD WE CONTACT YOU?",
  ]


  // Handle key presses
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentAnswer.trim() !== "") {
      submitAnswer()
    }
  }

  // Submit current answer and move to next question
  const submitAnswer = () => {
    // Add current answer to conversation
    setConversation((prev) => [...prev, { type: "answer", text: currentAnswer }])

    // Check if this was the email question
    if (currentQuestionIndex === questions.length - 1) {
      setEmail(currentAnswer)
    }

    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setConversation((prev) => [...prev, { type: "question", text: questions[currentQuestionIndex + 1] }])
        setCurrentQuestionIndex((prev) => prev + 1)
        setCurrentAnswer("")
      }, 500)
    } else {
      setIsComplete(true)
      setTimeout(() => {
        setShowConfirmation(true)
      }, 1000)
    }
  }

  // Reset the conversation
  const resetConversation = () => {
    setConversation([{ type: "question", text: questions[0] }])
    setCurrentQuestionIndex(0)
    setCurrentAnswer("")
    setIsComplete(false)
    setShowConfirmation(false)
    setShowSuccessMessage(false)
  }

  // Submit the form data
  const handleSubmit = () => {
    // In a real implementation, you would send the conversation data to your backend
    console.log("Submitting conversation:", conversation)
    console.log("Contact email:", email)

    // Show success message
    setShowSuccessMessage(true)

    // Reset after delay
    setTimeout(() => {
      resetConversation()
    }, 5000)
  }

  // Close success message
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false)
    resetConversation()
  }

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden" ref={containerRef}>
  

      <Navigation />

      <section className="min-h-[calc(100vh-200px)] flex flex-col relative z-10">
        {/* Conversation interface */}
        <div className="flex-1 pt-32 pb-8 px-6 md:px-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {!showConfirmation ? (
                <motion.div
                  key="conversation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {conversation.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className={`${item.type === "question" ? "text-left" : "text-right"}`}
                    >
                      <div
                        className={`inline-block px-6 py-4 max-w-[80%] ${
                          item.type === "question" ? "bg-white text-black" : "border border-white"
                        }`}
                      >
                        <p className={`text-lg ${item.type === "question" ? "font-bold" : ""}`}>{item.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Current answer input - only show if not complete */}
                  {!isComplete && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-right">
                      <div className="inline-block border border-gray-800 px-6 py-4 max-w-[80%] focus-within:border-white transition-colors duration-300">
                        <input
                          type="text"
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your answer..."
                          className="bg-transparent w-full focus:outline-none text-lg text-right"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}

                  <div ref={conversationEndRef} />
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
                >
                  <h2 className="text-5xl md:text-7xl font-bold mb-8">RULES WERE MEANT TO BE BROKEN</h2>
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                    Thank you for sharing your thoughts. We're excited to start breaking rules together.
                  </p>
                  <div className="space-x-6">
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                    >
                      SEND MESSAGE
                    </button>
                    <button
                      onClick={resetConversation}
                      className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors"
                    >
                      START OVER
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input area - only show if not in confirmation state */}
        {!isComplete && !showConfirmation && (
          <div className="border-t border-gray-900 py-6 px-6 md:px-12 bg-black bg-opacity-80 backdrop-blur-sm relative z-10">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
              <div className="text-sm text-gray-500">Press Enter to submit</div>
              <button
                onClick={submitAnswer}
                disabled={currentAnswer.trim() === ""}
                className={`px-6 py-3 ${
                  currentAnswer.trim() !== "" ? "bg-white text-black" : "bg-gray-900 text-gray-700 cursor-not-allowed"
                }`}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Custom success message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-black border-l-4 border-white p-8 max-w-xl w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button
                onClick={closeSuccessMessage}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <div className="w-16 h-1 bg-white mb-6" />
                <h3 className="text-3xl font-bold mb-4">MESSAGE SENT</h3>
                <p className="text-gray-400">
                  Your message has been received. We'll be in touch soon to start breaking rules together.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                  Automatically closing in a few seconds
                </div>
                <button
                  onClick={closeSuccessMessage}
                  className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}

