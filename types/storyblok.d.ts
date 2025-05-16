import { StoryblokStory } from "@storyblok/react";

// Add StoryblokBridge to the global Window interface
interface StoryblokBridgeConfig {
  initOnlyOnce?: boolean;
}

interface StoryblokBridgeV2 {
  new (config?: StoryblokBridgeConfig): StoryblokBridge;
}

interface StoryblokBridge {
  on: (event: string, callback: (event: any) => void) => void;
  setLanguage: (lang: string) => void;
}

declare global {
  interface Window {
    storyblokBridge: boolean;
    StoryblokBridge: StoryblokBridgeV2;
  }
}

// Other Storyblok type definitions can go here 