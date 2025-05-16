"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import components from '@/lib/storyblok-components';
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

// Initialize Storyblok outside component to avoid re-initialization
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
  bridge: true
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set the language for Storyblok content
  useEffect(() => {
    if (window.storyblokBridge) {
      // Set the language in the Storyblok instance
      const { StoryblokBridge } = window;
      const bridge = new StoryblokBridge();
      
      // Update Storyblok with current language
      bridge.on('input', (event) => {
        if (event?.story?.lang !== locale) {
          // bridge.setLanguage(locale); - Method doesn't exist on StoryblokBridgeV2 type
          console.log('Language mismatch between Storyblok and app:', event?.story?.lang, locale);
        }
      });
    }
  }, [locale]);

  // Important: Return same content structure on server and client
  return <>{children}</>;
} 