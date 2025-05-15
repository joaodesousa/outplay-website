"use client";

import { useState } from "react";
import { ArrowRight, Instagram, Linkedin, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Reset status if they start typing again after an error or success
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubscribe = async () => {
    if (!email.trim()) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter-resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website_footer" }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Subscribed successfully!");
        setEmail(""); // Clear input for new subscriptions
      } else {
        setStatus("error");
        setMessage(result.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again later.");
      console.error("Newsletter subscription error:", error);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      if (status === "success" || status === "error") {
        setStatus("idle");
        setMessage("");
      }
    }, 5000);
  };

  // Handle keyboard submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubscribe();
    }
  };

  return (
    <footer className="py-16 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-lg font-medium mb-6">newsletter</h3>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-gray-800 focus-within:border-white transition-duration-300">
                <input
                  type="email"
                  placeholder="enter your email"
                  className="w-full bg-transparent py-3 focus:outline-none placeholder-gray-600"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  disabled={status === "loading"}
                />
                <button
                  className="text-white focus:outline-none"
                  onClick={handleSubscribe}
                  disabled={status === "loading"}
                  aria-label="Subscribe to newsletter"
                >
                  {status === "loading" ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
              
              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center text-green-500 text-sm mt-2">
                  <CheckCircle size={16} className="mr-1" />
                  <span>{message}</span>
                </div>
              )}
              
              {status === "error" && (
                <div className="flex items-center text-red-500 text-sm mt-2">
                  <AlertCircle size={16} className="mr-1" />
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">contact</h3>
            <p className="text-gray-400 mb-2">+351 969 179 179</p>
            <p className="text-gray-400">hello@outplay.pt</p>
          </div>

          <div className="flex flex-col justify-between h-full">
            <h3 className="text-lg font-medium mb-6">social media</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/outplaypt" target="_blank"><Instagram strokeWidth={1.5} /></Link>
              <Link href="https://linkedin.com/company/outplaypt" target="_blank"><Linkedin strokeWidth={1.5} /></Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-900">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} OUTPLAY. All rights reserved.</p>
          </div>

          <div className="flex space-x-8">
            <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-sm text-gray-600 hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}