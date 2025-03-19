import DOMPurify from 'isomorphic-dompurify';

interface GhostContentRendererProps {
  content: string;
  className?: string;
}

export function GhostContentRenderer({ content, className = '' }: GhostContentRendererProps) {
  // Sanitize the HTML to prevent XSS attacks
  const sanitizedContent = content ? DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'div',
      // Add these for video embeds
      'iframe', 'video', 'source', 'embed', 'object'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'src', 'alt', 'width', 'height', 
      'class', 'style', 'data-*', 'id', 
      // Add attributes for video and iframe
      'allowfullscreen', 'frameborder', 'allow', 'type', 
      'controls', 'poster', 'preload'
    ],
    // Allow specific iframe sources
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?:)?\/\/)?(?:www\.)?(?:youtube\.com|vimeo\.com|player\.vimeo\.com|youtu\.be|loom\.com|wistia\.com|player\.wistia\.net|embed\.ted\.com|dailymotion\.com|player\.dailymotion\.com)/
  }) : '';

  return (
    <div 
      className={`ghost-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}