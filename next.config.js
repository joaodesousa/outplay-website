/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {hostname:'cms.outplay.cloud'},  
        {hostname:'images.unsplash.com'},
        {hostname:'a.storyblok.com'}
      ]
    },
    // ...other configs
  };
  
  module.exports = nextConfig;