"use client";

import { storyblokInit, apiPlugin, storyblokEditable } from "@storyblok/react";
import components from '@/lib/storyblok-components';
import { useEffect, useState } from "react";

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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure init runs only once on client side
    setIsInitialized(true);
  }, []);

  if (!isInitialized && typeof window !== 'undefined') {
    return null;
  }

  return children;
} 