import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/ghost"
import { BlogNewsletter } from "./components/newsletter"
import { Metadata } from "next"
import { GhostNewsletter } from "./components/ghost-newsletter"

// Define the Post interface here
interface Post {
    slug: string;
    title: string;
    feature_image?: string;
    custom_excerpt?: string;
    excerpt?: string;
    authors?: {
      name: string;
      profile_image?: string;
    }[];
    published_at: string;
    tags: { name: string }[];
  }

export const revalidate = 3600; // Revalidate the data at most every hour

export const metadata: Metadata = {
  title: 'Blog | OUTPLAY',
  description: 'Insights, strategies, and case studies on communicating scientific innovation effectively.',
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featuredPost = posts[0]; // Use the first post as featured

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
      {featuredPost && (
        <section className="pb-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {featuredPost.feature_image ? (
                     <Link
                     href={`/blog/${featuredPost.slug}`}
                   >
                    <Image
                      src={featuredPost.feature_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    </Link>
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="border-l-2 border-white pl-6 mb-4">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">
                    {featuredPost.primary_tag?.name || featuredPost.tags?.[0]?.name || "Featured"}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-gray-300 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-gray-400 mb-6">{featuredPost.custom_excerpt || featuredPost.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    {/* Author image with fallback */}
                    <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 overflow-hidden">
                        {featuredPost.authors && featuredPost.authors[0]?.profile_image ? (
                            <Image
                            src={featuredPost.authors[0].profile_image}
                            alt={featuredPost.authors[0].name || "Author"}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            {(featuredPost.authors && featuredPost.authors[0]?.name || "").charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {featuredPost.authors && featuredPost.authors[0]?.name || "Unknown Author"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {posts.slice(1).map((post: Post, index: number) => (
                <article key={index} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                    {post.feature_image ? (
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white border border-white px-4 py-2 text-sm">Read article</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {post.tags && post.tags[0]?.name || "General"}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mb-3">
                    <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">{post.title}</h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-6">{post.custom_excerpt || post.excerpt}</p>

                  <div className="flex items-center mt-auto">
                    {/* Author image with fallback */}
                    <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 overflow-hidden">
                      {post.authors && post.authors.length > 0 && post.authors[0]?.profile_image ? (
                        <Image 
                          src={post.authors[0].profile_image}
                          alt={post.authors[0].name || "Author"} 
                          width={32} 
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          {(post.authors && post.authors.length > 0 ? post.authors[0]?.name : "Unknown Author")?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        {post.authors && post.authors.length > 0 ? post.authors[0]?.name : "Unknown Author"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
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