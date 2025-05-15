import { storyblokEditable } from "@storyblok/react";

interface ProjectProps {
  blok: {
    _uid: string;
    component: string;
    title: string;
    category: string[] | string;
    description: string;
    image: {
      id: number;
      alt: string;
      name: string;
      focus: string;
      title: string;
      filename: string;
      copyright: string;
      fieldtype: string;
    };
    client: string;
    year: string;
    url: {
      id: string;
      url: string;
      linktype: string;
      fieldtype: string;
      cached_url: string;
    };
  };
}

const Project = ({ blok }: ProjectProps) => {
  return (
    <div {...storyblokEditable(blok)}>
      {/* This component is just for Storyblok schema definition */}
      {/* The actual rendering is handled in the Projects component */}
    </div>
  );
};

export default Project; 