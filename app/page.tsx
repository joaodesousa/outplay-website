"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ComingSoonPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const pageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Honeypot field value
  const [honeypot, setHoneypot] = useState("");
  // Submission timestamp to prevent rapid submissions
  const [lastSubmission, setLastSubmission] = useState(0);
  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!pageRef.current) return;

    const updateDimensions = () => {
      if (pageRef.current) {
        const { width, height } = pageRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Use RAF for smoother cursor tracking
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const { left, top } = pageRef.current.getBoundingClientRect();
        targetX = e.clientX - left;
        targetY = e.clientY - top;
      }
    };

    const updateLightPosition = () => {
      // Smooth interpolation for cursor movement
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      setMousePosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateLightPosition);
    };

    updateLightPosition();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Calculate relative position for parallax effect
  const calcParallaxValue = (strength = 0.05) => {
    if (dimensions.width === 0) return { x: 0, y: 0 };

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const deltaX = (mousePosition.x - centerX) * strength;
    const deltaY = (mousePosition.y - centerY) * strength;

    return { x: deltaX, y: deltaY };
  };

  const textParallax = calcParallaxValue(0.02);
  const dotParallax = calcParallaxValue(0.04);
  const subtitleParallax = calcParallaxValue(0.01);

  // Email regex for better validation
  const validateEmail = (email: string): boolean => {
    // Basic validation
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicPattern.test(email)) return false;
    
    // Validate domain has at least two parts and TLD is 2+ characters
    const parts = email.split('@');
    const domain = parts[1];
    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;
    if (domainParts[domainParts.length - 1].length < 2) return false;
    
    // Disallow certain temporary email domains (add more as needed)
    const suspiciousDomains = [
      'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com',
      'sharklasers.com', 'yopmail.com', 'throwawaymail.com', 'getnada.com'
    ];
    
    if (suspiciousDomains.some(d => domain.includes(d))) return false;
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Anti-spam checks
    // 1. Check if honeypot field is filled (bots often fill hidden fields)
    if (honeypot) {
      console.log("Honeypot triggered - likely bot");
      // Fake success message to fool bots
      setSubmitted(true);
      setEmail("");
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      return;
    }
    
    // 2. Rate limiting - prevent submissions more frequent than 3 seconds apart
    const now = Date.now();
    if (now - lastSubmission < 3000) {
      setErrorMessage("Please wait a moment before submitting again");
      return;
    }
    
    // 3. Improved email validation
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    
    // If we pass all checks, proceed with submission
    setIsSubmitting(true);
    setLastSubmission(now);
    
    try {
      // Send the email to Notion database using the Notion API
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          // Adding timestamp helps track submission patterns
          timestamp: new Date().toISOString(),
          // Add a source for analytics
          source: 'coming-soon-page' 
        }),
      });

      if (response.ok) {
        console.log(`Subscribed with email: ${email}`);
        setSubmitted(true);
        // Clear the email field immediately on success
        setEmail("");
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to submit email. Please try again.');
        console.error('Failed to submit email to Notion');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden px-6"
    >
      {/* Light effect that follows cursor */}
      <div
        className="absolute pointer-events-none opacity-60 rounded-full blur-[100px] w-[500px] h-[500px]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(77,171,247,0.7) 0%, rgba(41,121,255,0.4) 40%, rgba(28,85,179,0.1) 70%, rgba(11,50,96,0) 100%)",
        }}
      />

      <div className="container max-w-5xl mx-auto z-10 flex flex-col items-center">
        <motion.div 
          className="w-3 h-3 bg-white rounded-full mb-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: dotParallax.x,
            y: dotParallax.y,
          }}
          transition={{
            duration: 0.5,
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
          }}
        />

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light text-center max-w-5xl mx-auto leading-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: textParallax.x,
          }}
          style={{
            rotateX: textParallax.y * 0.05,
            rotateY: -textParallax.x * 0.05,
            willChange: "transform",
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            x: { type: "spring", stiffness: 50, damping: 20 },
          }}
        >
          <span className="font-light">coming</span> <span className="font-bold">soon</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-16 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: subtitleParallax.x,
          }}
          style={{
            y: subtitleParallax.y,
            willChange: "transform",
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            x: { type: "spring", stiffness: 50, damping: 20 },
          }}
        >
          we are working on something extraordinary
        </motion.p>

        {/* Spacer div to replace countdown */}
        <div className="mb-20"></div>

        {/* Subscription Form */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-lg font-medium mb-6 text-center">get notified when we launch</h3>
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center border-b border-gray-800">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                className="w-full bg-transparent py-3 focus:outline-none placeholder-gray-600"
                required
              />
              <button 
                type="submit" 
                className="text-white p-2"
                aria-label="Subscribe"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                ) : (
                  <ArrowRight size={20} />
                )}
              </button>
            </div>
            
            {/* Hidden honeypot field to catch bots */}
            <div className="opacity-0 absolute top-0 left-0 h-0 w-0 overflow-hidden">
              <label>
                Leave this empty:
                <input
                  type="text"
                  name="honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {submitted && (
              <motion.div 
                className="absolute left-0 -bottom-8 text-green-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thank you! We'll keep you updated.
              </motion.div>
            )}
            
            {errorMessage && (
              <motion.div 
                className="absolute left-0 -bottom-8 text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errorMessage}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 w-full text-center text-sm text-gray-600">
        © {new Date().getFullYear()} OUTPLAY. All rights reserved.
      </div>
    </div>
  );
};

export default ComingSoonPage;