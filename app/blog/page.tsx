import { getStoryblokStories } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { GhostNewsletter } from "./components/ghost-newsletter"

export const revalidate = 3600; // Revalidate the data at most every hour

export const metadata: Metadata = {
  title: 'Blog | OUTPLAY',
  description: 'Insights, strategies, and case studies on communicating scientific innovation effectively.',
}

export default async function BlogPage() {
  // Get all blog posts
  const posts = await getStoryblokStories({
    starts_with: "blog/",
    sort_by: "content.publication_date:desc",
  } as any); // Use type assertion for now

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center mb-16">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">blog</h1>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            The rule-breaker's guide to what's next.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && (
        <section className="pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {posts[0].content.featured_image && (
                    <Link
                      href={`/blog/${posts[0].slug}`}
                    >
                      <Image
                        src={posts[0].content.featured_image.filename}
                        alt={posts[0].content.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </Link>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="border-l-2 border-white pl-6 mb-4">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">
                    {posts[0].content.tags && posts[0].content.tags.length > 0 ? posts[0].content.tags[0] : "Featured"}
                  </span>
                </div>

                <Link href={`/blog/${posts[0].slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-gray-300 transition-colors duration-300">
                    {posts[0].content.title}
                  </h2>
                </Link>

                <p className="text-gray-400 mb-6">{posts[0].content.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    {/* Author image with fallback */}
                    <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 overflow-hidden">
                      {posts[0].content.author && posts[0].content.author.content && posts[0].content.author.content.avatar ? (
                        <Image
                          src={posts[0].content.author.content.avatar.filename}
                          alt={posts[0].content.author.name || "Author"}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          {(posts[0].content.author ? posts[0].content.author.name : "Unknown Author")?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {posts[0].content.author ? posts[0].content.author.name : "Unknown Author"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {posts[0].content.publication_date
                          ? format(new Date(posts[0].content.publication_date), "MMMM dd, yyyy")
                          : ""}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${posts[0].slug}`}
                    className="text-sm border-b border-transparent hover:border-white transition-all duration-300"
                  >
                    Read article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          {posts.length <= 1 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">More articles coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post: any) => {
                const formattedDate = post.content.publication_date
                  ? format(new Date(post.content.publication_date), "MMMM dd, yyyy")
                  : "";
                
                return (
                  <Link href={`/blog/${post.slug}`} key={post.uuid} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out group-hover:shadow-lg">
                      {post.content.featured_image && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={post.content.featured_image.filename}
                            alt={post.content.title}
                            width={600}
                            height={340}
                            className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-105"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition duration-300">
                          {post.content.title}
                        </h2>
                        
                        {formattedDate && (
                          <div className="text-sm text-gray-500 mb-2">
                            {formattedDate}
                          </div>
                        )}
                        
                        {post.content.excerpt && (
                          <p className="text-gray-600 line-clamp-3">
                            {post.content.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {posts.length > 4 && (
            <div className="flex justify-center mt-16">
              <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <GhostNewsletter />

      <Footer />
    </main>
  )
}