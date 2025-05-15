import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface PageProps {
  blok: {
    _uid: string;
    body: any[];
    component: string;
  };
}

const Page = ({ blok }: PageProps) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page; 