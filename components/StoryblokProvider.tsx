"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import components from '@/lib/storyblok-components';
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Important: Return same content structure on server and client
  return <>{children}</>;
} 