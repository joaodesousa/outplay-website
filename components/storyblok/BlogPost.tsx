import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import { format } from "date-fns";
import RichText from "./RichText";

interface BlogPostProps {
  blok: {
    _uid: string;
    title: string;
    featured_image: {
      filename: string;
      alt?: string;
    };
    publication_date: string;
    excerpt: string;
    content: any; // Rich text content
    author: any; // Reference to Author
    tags: string[];
    component: string;
  };
}

const BlogPost = ({ blok }: BlogPostProps) => {
  // Format publication date
  const formattedDate = blok.publication_date
    ? format(new Date(blok.publication_date), "MMMM dd, yyyy")
    : "";
    
  return (
    <article {...storyblokEditable(blok)} className="blog-post">
      <h1 className="text-4xl font-bold mb-4">{blok.title}</h1>
      
      {formattedDate && (
        <div className="text-gray-500 mb-4">{formattedDate}</div>
      )}
      
      {blok.author && (
        <div className="mb-6 flex items-center">
          {blok.author.content && blok.author.content.avatar && (
            <div className="mr-3">
              <Image 
                src={blok.author.content.avatar.filename}
                alt={`Avatar of ${blok.author.content.name}`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          )}
          <span className="font-medium">
            {blok.author.content?.name || "Unknown Author"}
          </span>
        </div>
      )}
      
      {blok.featured_image && (
        <div className="mb-8">
          <Image
            src={blok.featured_image.filename}
            alt={blok.featured_image.alt || blok.title}
            width={800}
            height={450}
            className="rounded-lg"
          />
        </div>
      )}
      
      {blok.excerpt && (
        <div className="text-xl text-gray-600 mb-8">
          {blok.excerpt}
        </div>
      )}
      
      {blok.content && (
        <div className="prose max-w-none mb-8">
          <RichText content={blok.content} />
        </div>
      )}
      
      {blok.tags && blok.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blok.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPost; 