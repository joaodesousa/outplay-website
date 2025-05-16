'use client';

import Image, { ImageProps, StaticImageData } from 'next/image';
import { useState } from 'react';

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Make alt required
  fallbackSrc?: string;
  lazyLoading?: boolean;
  caption?: string;
}

export function SEOImage({
  alt,
  fallbackSrc = '/og-image.png',
  lazyLoading = true,
  caption,
  ...props
}: SEOImageProps) {
  const [imgSrc, setImgSrc] = useState<any>(props.src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative">
      <div className={`image-container ${isLoaded ? 'is-loaded' : 'is-loading'}`}>
        <Image
          {...props}
          src={imgSrc}
          alt={alt} // Always use descriptive alt text
          loading={lazyLoading ? 'lazy' : 'eager'}
          onError={() => {
            setImgSrc(fallbackSrc);
          }}
          onLoad={() => setIsLoaded(true)}
          // For SEO enhancement, we add structured metadata
          itemProp="image"
          // Ensure images are sized appropriately
          sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center" itemProp="caption">
          {caption}
        </figcaption>
      )}
      <style jsx>{`
        .image-container {
          position: relative;
          overflow: hidden;
          transition: opacity 0.3s ease;
        }
        .is-loading {
          opacity: 0.5;
        }
        .is-loaded {
          opacity: 1;
        }
      `}</style>
    </figure>
  );
}