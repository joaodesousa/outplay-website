"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: any) => any;
      PlayerState: {
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoIntroductionProps {
  onClose: () => void
  youtubeVideoId: string
}

export function VideoIntroduction({ onClose, youtubeVideoId }: VideoIntroductionProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [player, setPlayer] = useState<any>(null)

  // Initialize YouTube API
  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    const onYouTubeIframeAPIReady = () => {
      if (!youtubeVideoId) return
      
      const newPlayer = new window.YT.Player(`youtube-player-${youtubeVideoId}`, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
          vq: 'hd1080'
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target)
            setIsVideoLoaded(true)
            event.target.playVideo()
          },
          onStateChange: (event: any) => {
            // Video ended
            if (event.data === window.YT.PlayerState.ENDED) {
              setTimeout(onClose, 1500)
            }
          }
        }
      })
    }

    // Setup YouTube API callback
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady()
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
    }

    return () => {
      // Cleanup
      if (player) {
        player.destroy()
      }
    }
  }, [youtubeVideoId, onClose])

  // Toggle mute
  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
        setIsMuted(false)
      } else {
        player.mute()
        setIsMuted(true)
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    
    setIsFullscreen(!isFullscreen)
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullscreen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, isFullscreen])

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div ref={containerRef} className="relative w-full max-w-5xl aspect-video">
          {/* Loading indicator */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* YouTube Video */}
          <motion.div 
            className="relative w-full h-full overflow-hidden rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative w-full h-full">
              <div id={`youtube-player-${youtubeVideoId}`} className="absolute inset-0 w-full h-full"></div>
            </div>
            
            {/* Cinematic letterbox effect */}
            <div className="absolute inset-0 box-border border-y-[5vh] sm:border-y-[10vh] border-black pointer-events-none"></div>
            
            {/* Controls overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              {/* Top controls */}
              <div className="flex justify-between items-center">
                <motion.div 
                  className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <span className="text-white font-medium">OUTPLAY Presentation</span>
                </motion.div>
                
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors"
                  aria-label="Close video"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Bottom controls */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={toggleMute}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <button 
                  onClick={toggleFullscreen}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Skip button */}
          <motion.button
            className="absolute bottom-4 right-4 px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors z-10"
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Skip to site
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
