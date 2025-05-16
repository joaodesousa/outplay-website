'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function StoryblokNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    try {
      setStatus('loading')
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'storyblok_newsletter' }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setStatus('success')
      setMessage('Thanks for subscribing!')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    }
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay ahead of the curve</h2>
            <p className="text-gray-400 text-xl">
              Get latest insights, strategies, and unconventional wisdom delivered to your inbox.
            </p>
          </div>
          
          <div className="lg:col-span-6">
            {status === 'success' ? (
              <div className="p-8 border border-green-500 bg-green-500/10">
                <p className="text-green-400 font-medium text-xl">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-black border border-gray-800 text-white px-6 py-4 outline-none focus:border-white transition-colors duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex items-center bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
              </form>
            )}
            {status === 'error' && <p className="mt-2 text-red-400">{message}</p>}
            <p className="mt-4 text-gray-500 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 