import { getStoryblokStories } from "@/lib/storyblok";

export default async function sitemap() {
  // Base URL - update this to your production domain
  const baseUrl = "https://outplay.pt";
  
  // Get all blog posts from Storyblok
  const blogPosts = await getStoryblokStories({
    starts_with: "blog/",
  } as any);
  
  // Get all pages from Storyblok (excluding blog posts)
  const pages = await getStoryblokStories({
    excluding_startswith: "blog/",
  } as any);

  // Static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic blog post routes
  const blogRoutes = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at || post.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Dynamic page routes from Storyblok (if you have any)
  const pageRoutes = pages.map((page: any) => {
    // Convert storyblok path to URL path
    const path = page.full_slug.replace(/^\//, "");
    return {
      url: `${baseUrl}/${path}`,
      lastModified: new Date(page.published_at || page.created_at),
      changeFrequency: "monthly", 
      priority: 0.7,
    };
  });

  return [...routes, ...blogRoutes, ...pageRoutes];
} 