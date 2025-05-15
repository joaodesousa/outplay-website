import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import RichText from "./RichText";

interface AuthorProps {
  blok: {
    _uid: string;
    name: string;
    avatar: {
      filename: string;
      alt?: string;
    };
    bio: any; // Rich text content
    component: string;
  };
}

const Author = ({ blok }: AuthorProps) => {
  return (
    <div {...storyblokEditable(blok)} className="author-profile py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {blok.avatar && (
          <div className="shrink-0">
            <Image
              src={blok.avatar.filename}
              alt={`Avatar of ${blok.name}`}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        )}
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{blok.name}</h1>
          
          {blok.bio && (
            <div className="prose max-w-none">
              <RichText content={blok.bio} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author; 