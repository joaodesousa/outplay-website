"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ComingSoonPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const pageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lightControls = useAnimation();

  useEffect(() => {
    if (!pageRef.current) return;

    const updateDimensions = () => {
      if (pageRef.current) {
        const { width, height } = pageRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Check if device is mobile
        setIsMobile(window.innerWidth <= 768);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // For desktop: mouse tracking
    if (!isMobile) {
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
    } else {
      // For mobile: autonomous light movement
      const animateLight = async () => {
        // Start animation sequence
        await lightControls.start({
          x: dimensions.width * 0.7,
          y: dimensions.height * 0.3,
          transition: { duration: 4, ease: "easeInOut" }
        });
        
        await lightControls.start({
          x: dimensions.width * 0.3,
          y: dimensions.height * 0.7,
          transition: { duration: 4, ease: "easeInOut" }
        });
        
        await lightControls.start({
          x: dimensions.width * 0.8,
          y: dimensions.height * 0.8,
          transition: { duration: 4, ease: "easeInOut" }
        });
        
        await lightControls.start({
          x: dimensions.width * 0.2,
          y: dimensions.height * 0.2,
          transition: { duration: 4, ease: "easeInOut" }
        });
        
        // Repeat the animation
        animateLight();
      };
      
      animateLight();
      
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [dimensions.width, dimensions.height, isMobile, lightControls]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        // Send the email to Notion database using the Notion API
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
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
          console.error('Failed to submit email to Notion');
        }
      } catch (error) {
        console.error('Error submitting email:', error);
      } finally {
        setIsSubmitting(false);
      }
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