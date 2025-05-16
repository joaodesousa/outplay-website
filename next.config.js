/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [ 
        {hostname:'images.unsplash.com'},
        {hostname:'a.storyblok.com'}
      ],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment'
    },
    // ...other configs
  };
  
  module.exports = nextConfig;