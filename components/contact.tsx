"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Success and error messages
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Form input handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setShowErrorMessage(true);
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setShowErrorMessage(true);
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Convert form data to the conversation format expected by our API
      const conversation = [
        { type: "question", text: "WHAT SHOULD WE CALL YOU?" },
        { type: "answer", text: formData.name },
        { type: "question", text: "WHAT'S YOUR EMAIL?" },
        { type: "answer", text: formData.email },
        { type: "question", text: "HOW CAN WE HELP YOU?" },
        { type: "answer", text: formData.message }
      ];
      
      // Prepare the data for submission
      const contactData = {
        conversation,
        email: formData.email,
        source: 'homepage_form'
      };
      
      // Submit to the API
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Show success message
        setShowSuccessMessage(true);
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        // Show error message
        setShowErrorMessage(true);
        setErrorMessage(result.error || 'Failed to submit message. Please try again.');
      }
    } catch (error) {
      // Handle unexpected errors
      setShowErrorMessage(true);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Close message handlers
  const closeSuccessMessage = () => setShowSuccessMessage(false);
  const closeErrorMessage = () => setShowErrorMessage(false);
  
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
              Let's craft <span className="font-bold">your</span>
              <br />
              <span className="font-bold">perfect</span>
              <br />
              <span className="font-bold">story</span>?
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <h3 className="text-xl font-bold mb-8">talk to us</h3>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="insert your name here"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="type your email here"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="start typing"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-gray-800 py-4 focus:outline-none focus:border-white transition-colors duration-300 placeholder-gray-600"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </form>
            
            {/* Success message */}
            <AnimatePresence>
              {showSuccessMessage && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative border-l-4 border-white p-8 w-full max-w-md">
                    <button 
                      onClick={closeSuccessMessage}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                    <div className="w-12 h-1 bg-white mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Message Sent</h4>
                    <p className="text-gray-300">
                      Thanks for reaching out. We'll get back to you soon!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Error message */}
            <AnimatePresence>
              {showErrorMessage && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative border-l-4 border-red-500 p-8 w-full max-w-md">
                    <button 
                      onClick={closeErrorMessage}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                    <div className="w-12 h-1 bg-red-500 mb-4" />
                    <h4 className="text-2xl font-bold mb-2">Error</h4>
                    <p className="text-gray-300">
                      {errorMessage || "Something went wrong. Please try again."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}