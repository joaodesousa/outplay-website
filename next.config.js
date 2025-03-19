/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {hostname:'cms.outplay.cloud'},  
        {hostname:'images.unsplash.com'},
        {hostname:'static.ghost.org'}
      ]
    },
    // ...other configs
  };
  
  module.exports = nextConfig;