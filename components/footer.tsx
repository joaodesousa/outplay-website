"use client";

import { useState } from "react";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail(""); // Clear input
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 3000); // Reset status after 3s
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="text-white"
                onClick={handleSubscribe}
                disabled={status === "loading"}
              >
                <ArrowRight size={20} />
              </button>
            </div>
            {status === "success" && <p className="text-green-500 text-sm mt-2">Subscribed successfully!</p>}
            {status === "error" && <p className="text-red-500 text-sm mt-2">Subscription failed. Try again.</p>}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">contact</h3>
            <p className="text-gray-400 mb-2">+351 969 179 179</p>
            <p className="text-gray-400">hello@outplay.pt</p>
          </div>

          <div className="flex flex-col justify-between h-full">
            <h3 className="text-lg font-medium mb-6">social media</h3>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/outplay.pt" target="_blank"><Instagram strokeWidth={1.5} /></Link>
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
