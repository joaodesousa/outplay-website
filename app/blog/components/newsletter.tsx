"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Reset previous states
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter-resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'blog_newsletter' }),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setEmail('') // Clear the input
        
        // Auto-reset success message after 3 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Subscription failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An unexpected error occurred')
      console.error('Newsletter subscription error:', error)
    }
  }

  return (
    <section className="py-20 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-8">
          Be the first to know what's next, not what's now.
          </p>
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === 'submitting'}
                className="flex-1 bg-transparent border border-gray-800 px-4 py-3 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                ) : (
                  <>Subscribe <ArrowRight size={18} className="ml-2" /></>
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 -bottom-8 text-green-400 text-sm mt-2"
                >
                  Thank you for subscribing!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 -bottom-8 text-red-400 text-sm mt-2"
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  )
}