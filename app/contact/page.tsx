"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X } from "lucide-react"
import { ConversationItem } from "@/types/notion" // Import the type from your types file

interface ContactPageProps {}

export default function ContactPage({}: ContactPageProps) {
  // Track conversation state
  const [conversation, setConversation] = useState<ConversationItem[]>([
    { type: "question", text: "WHAT BRINGS YOU HERE?" },
  ])
  const [currentAnswer, setCurrentAnswer] = useState<string>("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 }) // Default center position
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Reference for auto-scrolling
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Questions flow
  const questions: string[] = [
    "WHAT BRINGS YOU HERE?",
    "WHAT RULE DO YOU WANT TO BREAK?",
    "WHAT'S HOLDING YOU BACK?",
    "WHAT SHOULD WE CALL YOU?",
    "WHAT'S YOUR EMAIL?",
  ]

  // Track mouse position for background effect - client-side only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Add this new useEffect to ensure page starts at the top
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

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

    // Check if this was the email question (last question)
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
    setShowErrorMessage(false)
    setErrorMessage("")
  }

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    // Only auto-scroll if conversation has more than the initial question
    if (conversation.length > 1) {
      conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [conversation])

  // Submit the form data to the API
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      
      // Prepare the data for submission
      const contactData = {
        conversation,
        email,
        source: 'contact_page'
      }
      
      // Submit to our new API endpoint
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Show success message
        setShowSuccessMessage(true)
        
        // Reset after delay
        setTimeout(() => {
          resetConversation()
        }, 5000)
      } else {
        // Show error message
        setShowErrorMessage(true)
        setErrorMessage(result.error || 'Failed to submit contact information. Please try again.')
      }
    } catch (error) {
      // Handle any unexpected errors
      setShowErrorMessage(true)
      setErrorMessage('An unexpected error occurred. Please try again later.')
      console.error('Error submitting contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Close success message
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false)
    resetConversation()
  }
  
  // Close error message
  const closeErrorMessage = () => {
    setShowErrorMessage(false)
  }

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden" ref={containerRef}>
      <Navigation />

      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-800"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-800"
              style={{ top: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Animated circles - client-side only */}
        <div className="hidden md:block">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full border border-gray-800"
            style={{
              left: `calc(${mousePosition.x}% - 400px)`,
              top: `calc(${mousePosition.y}% - 400px)`,
              opacity: 0.1,
              transition: "left 2s ease-out, top 2s ease-out",
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full border border-gray-800"
            style={{
              left: `calc(${mousePosition.x}% - 300px)`,
              top: `calc(${mousePosition.y}% - 300px)`,
              opacity: 0.15,
              transition: "left 1.5s ease-out, top 1.5s ease-out",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-gray-800"
            style={{
              left: `calc(${mousePosition.x}% - 200px)`,
              top: `calc(${mousePosition.y}% - 200px)`,
              opacity: 0.2,
              transition: "left 1s ease-out, top 1s ease-out",
            }}
          />
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-[20%] left-[10%] w-40 h-40 border border-gray-800 opacity-30 rotate-45" />
        <div className="absolute bottom-[30%] right-[15%] w-60 h-60 border border-gray-800 opacity-20 -rotate-12" />
        <div className="absolute top-[60%] left-[70%] w-20 h-20 border border-gray-800 opacity-40 rotate-12" />
      </div>

      <section className="min-h-[calc(100vh-200px)] flex flex-col relative z-10">
        {/* Conversation interface */}
        <div className="flex-1 pt-32 pb-8 px-6 md:px-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="flex items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-3 h-3 bg-white rounded-full mr-8" />
              <h1 className="text-5xl md:text-6xl font-bold">Let's Talk</h1>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {!showConfirmation ? (
                <motion.div
                  key="conversation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
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
                  <h2 className="text-5xl md:text-6xl font-bold mb-8">RULES WERE MEANT TO BE BROKEN</h2>
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                    Thank you for sharing your thoughts. We're excited to start breaking rules together.
                  </p>
                  <div className="space-x-6">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                    <button
                      onClick={resetConversation}
                      disabled={isSubmitting}
                      className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Success message */}
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

      {/* Error message */}
      <AnimatePresence>
        {showErrorMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-black border-l-4 border-red-500 p-8 max-w-xl w-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button
                onClick={closeErrorMessage}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <div className="w-16 h-1 bg-red-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4">ERROR</h3>
                <p className="text-gray-400">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeErrorMessage}
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