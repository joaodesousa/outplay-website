import { ISbStoryData, renderRichText } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

interface RichTextProps {
  content: any;
}

interface LinkMarkProps {
  attrs: {
    href: string;
    linktype?: string;
    target?: string;
    anchor?: string;
  };
  children: React.ReactNode;
}

const RichText = ({ content }: RichTextProps) => {
  const customResolvers = {
    // Add custom resolvers for any components that can be embedded in rich text
    // For example:
    // youtube_video: (props) => <YouTube {...props} />,
  };

  const customMarkResolvers = {
    // Add custom resolvers for marks like links
    link: (props: LinkMarkProps) => {
      // Handle external or internal links properly
      const { href, linktype, target, anchor } = props.attrs;
      let url = href;

      if (linktype === 'email') {
        url = `mailto:${href}`;
      } else if (linktype === 'asset') {
        // Handle asset links
        url = href;
      } else if (anchor) {
        // Handle anchors
        url = `${href}#${anchor}`;
      }

      return (
        <Link
          href={url}
          target={target}
          className="text-blue-600 hover:underline"
        >
          {props.children}
        </Link>
      );
    },
  };

  return (
    <div className="prose max-w-none">
      {renderRichText(content)}
    </div>
  );
};

export default RichText; 