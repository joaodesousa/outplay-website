/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [ 
        {hostname:'images.unsplash.com'},
        {hostname:'a.storyblok.com'}
      ]
    },
    // ...other configs
  };
  
  module.exports = nextConfig;