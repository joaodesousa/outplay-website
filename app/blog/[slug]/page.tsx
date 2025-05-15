import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Facebook, Twitter, Linkedin, Copy, ArrowLeft } from "lucide-react"
import { BlogNewsletter } from "../components/newsletter"
import { Metadata } from "next"
import { getStoryblokContent, getStoryblokStories } from "@/lib/storyblok"
import { StoryblokComponent } from "@storyblok/react"
import { richTextResolver } from "@storyblok/richtext"
import { notFound } from "next/navigation"
import { format } from "date-fns"

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getStoryblokStories({
    starts_with: "blog/",
  } as any);
  
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Ensure params are awaited by using Promise.resolve
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const story = await getStoryblokContent(`blog/${slug}`);
  
  if (!story) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for could not be found.',
    };
  }
  
  return {
    title: `${story.content.title} | OUTPLAY Blog`,
    description: story.content.excerpt || '',
    openGraph: story.content.featured_image ? {
      images: [{ url: story.content.featured_image.filename }],
    } : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Ensure params are awaited by using Promise.resolve
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const story = await getStoryblokContent(`blog/${slug}`);
  
  if (!story) {
    notFound();
  }

  // Create richtext renderer with the correct type
  const { render } = richTextResolver<string>();

  // Fetch related posts (e.g., with same tag)
  let relatedPosts: any[] = [];
  if (story.content.tags && story.content.tags.length > 0) {
    const allPosts = await getStoryblokStories({
      starts_with: "blog/",
      excluding_slugs: `blog/${slug}`,
    } as any);
    
    relatedPosts = allPosts
      .filter((p: any) => 
        p.content.tags && 
        p.content.tags.some((tag: string) => 
          story.content.tags.includes(tag)
        )
      )
      .slice(0, 3);
  }

  const formattedDate = story.content.publication_date
    ? format(new Date(story.content.publication_date), "MMMM dd, yyyy")
    : "";

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </Link>

            <div className="mb-8">
              <span className="text-sm text-gray-400 uppercase tracking-wider">
                {story.content.tags && story.content.tags.length > 0 ? story.content.tags[0] : "General"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{story.content.title}</h1>

            <p className="text-xl text-gray-300 mb-12">{story.content.excerpt}</p>

            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 overflow-hidden">
                  {story.content.author && story.content.author.content && story.content.author.content.avatar ? (
                    <Image
                      src={story.content.author.content.avatar.filename}
                      alt={story.content.author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      {(story.content.author ? story.content.author.name : "Unknown Author")?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{story.content.author ? story.content.author.name : "Unknown Author"}</p>
                  <p className="text-xs text-gray-500">
                    {story.content.author && story.content.author.content && 
                     story.content.author.content.bio ? 
                     render(story.content.author.content.bio).replace(/<[^>]*>?/gm, '').substring(0, 60) + '...' : "Author"}
                  </p>
                </div>
              </div>

              <div className="text-gray-500 text-sm">
                {formattedDate}
              </div>
            </div>
          </div>

          {story.content.featured_image && (
            <div className="relative aspect-[21/9] mb-16 overflow-hidden">
              <Image 
                src={story.content.featured_image.filename} 
                alt={story.content.title} 
                fill 
                className="object-cover" 
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Social Sharing Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
                <button className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors">
                  <Linkedin size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Render just the content field, not the entire blok */}
              {story.content.content && (
                <div className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: render(story.content.content) 
                  }}></div>
                </div>
              )}

              {/* Tags */}
              {story.content.tags && story.content.tags.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-900">
                  <div className="flex flex-wrap gap-3">
                    {story.content.tags.map((tag: string, index: number) => (
                      <Link
                        key={index}
                        href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-4 py-2 text-sm border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              {story.content.author && (
                <div className="mt-12 pt-12 border-t border-gray-900">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
                      {story.content.author.content && story.content.author.content.avatar ? (
                        <Image
                          src={story.content.author.content.avatar.filename}
                          alt={story.content.author.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                          {story.content.author.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{story.content.author.name}</h3>
                      {story.content.author.content && 
                       story.content.author.content.bio && (
                        <div className="text-gray-400 mb-4 prose prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: render(story.content.author.content.bio) 
                          }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Table of Contents or Sidebar */}
            <div className="lg:col-span-3">
              {/* Add table of contents if needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 border-t border-gray-900">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const postDate = relatedPost.content.publication_date
                  ? format(new Date(relatedPost.content.publication_date), "MMMM dd, yyyy")
                  : "";
                
                return (
                  <article key={index} className="flex flex-col h-full">
                    <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                      {relatedPost.content.featured_image ? (
                        <Image
                          src={relatedPost.content.featured_image.filename}
                          alt={relatedPost.content.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-600">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {relatedPost.content.tags && relatedPost.content.tags.length > 0 
                          ? relatedPost.content.tags[0] 
                          : "General"}
                      </span>
                    </div>

                    <Link href={`/blog/${relatedPost.slug}`} className="mb-3">
                      <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">
                        {relatedPost.content.title}
                      </h3>
                    </Link>

                    <p className="text-gray-400 text-sm mb-6">{relatedPost.content.excerpt}</p>

                    <div className="flex items-center mt-auto">
                      <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 overflow-hidden">
                        {relatedPost.content.author && relatedPost.content.author.content && 
                         relatedPost.content.author.content.avatar ? (
                          <Image
                            src={relatedPost.content.author.content.avatar.filename}
                            alt={relatedPost.content.author.name || "Author"}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            {relatedPost.content.author?.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium">
                          {relatedPost.content.author?.name || "Unknown Author"}
                        </p>
                        <p className="text-xs text-gray-500">{postDate}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <BlogNewsletter />
      <Footer />
    </main>
  );
}