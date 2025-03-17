"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-6">newsletter</h3>
            <div className="flex items-center border-b border-gray-800">
              <input
                type="email"
                placeholder="enter your email"
                className="w-full bg-transparent py-3 focus:outline-none placeholder-gray-600"
              />
              <button className="text-white">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">sales</h3>
            <p className="text-gray-400 mb-2">+351 256 197 889</p>
            <p className="text-gray-400">commercial@outplay.agency</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">support</h3>
            <p className="text-gray-400 mb-2">+351 308 811 185</p>
            <p className="text-gray-400">support@outplay.agency</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-900">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-600">© 2023 OUTPLAY. All rights reserved.</p>
          </div>

          <div className="flex space-x-8">
            <Link href="#" className="text-sm text-gray-600 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

