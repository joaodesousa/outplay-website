import Page from '../components/storyblok/Page';
import BlogPost from '../components/storyblok/BlogPost';
import Author from '../components/storyblok/Author';
import Project from '../components/storyblok/Project';

// Export all components that should be registered with Storyblok
const components = {
  page: Page,
  blog_post: BlogPost,
  author: Author,
  project: Project,
};

export default components; 