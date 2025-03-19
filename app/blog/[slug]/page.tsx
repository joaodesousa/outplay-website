import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Facebook, Twitter, Linkedin, Copy, ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/ghost"
import { BlogNewsletter } from "../components/newsletter"
import { GhostContentRenderer } from "@/components/GhostContentRenderer"

interface Post {
    slug: string;
    title: string;
    feature_image?: string;
    custom_excerpt?: string;
    excerpt?: string;
    html?: string;
    primary_tag?: {
      id: string;
      name: string;
      slug: string;
    };
    primary_author?: {
      name: string;
      bio?: string;
      profile_image?: string;
    };
    published_at: string;
    tags: { 
      id: string;
      name: string; 
      slug: string;
    }[];
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    // Handle not found case
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">The post you're looking for doesn't exist or may have been moved.</p>
          <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to all articles
          </Link>
        </div>
      </main>
    );
  }

  // Fetch related posts (e.g., with same tag)
  let relatedPosts: Post[] = [];
  if (post.primary_tag) {
    const allPosts = await getAllPosts();
    relatedPosts = allPosts
      .filter((p: Post) => 
        p.slug !== post.slug && 
        p.tags?.some((tag: { id: string }) => tag.id === post.primary_tag?.id)
      )
      .slice(0, 3);
  }

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
                {post.primary_tag?.name || "General"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{post.title}</h1>

            <p className="text-xl text-gray-300 mb-12">{post.custom_excerpt || post.excerpt}</p>

            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 overflow-hidden">
                  {post.primary_author?.profile_image && (
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{post.primary_author?.name}</p>
                  <p className="text-sm text-gray-500">{post.primary_author?.bio?.substring(0, 60) || "Author"}</p>
                </div>
              </div>

              <div className="text-gray-500 text-sm">
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {post.feature_image && (
            <div className="relative aspect-[21/9] mb-16 overflow-hidden">
              <Image src={post.feature_image} alt={post.title} fill className="object-cover" />
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
              <article>
                <GhostContentRenderer 
                  content={post.html || ''} 
                  className="max-w-none" 
                />
              </article>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-900">
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag: { id: string; slug: string; name: string }) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        className="px-4 py-2 text-sm border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              {post.primary_author && (
                <div className="mt-12 pt-12 border-t border-gray-900">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
                      {post.primary_author.profile_image && (
                        <Image
                          src={post.primary_author.profile_image}
                          alt={post.primary_author.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{post.primary_author.name}</h3>
                      <p className="text-gray-400 mb-4">{post.primary_author.bio}</p>
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
              {relatedPosts.map((relatedPost, index) => (
                <article key={index} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                    <Image
                      src={relatedPost.feature_image || "/placeholder.svg?height=600&width=800"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {relatedPost.primary_tag?.name || "General"}
                    </span>
                  </div>

                  <Link href={`/blog/${relatedPost.slug}`} className="mb-3">
                    <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-6">{relatedPost.excerpt}</p>

                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 overflow-hidden">
                      {relatedPost.primary_author?.profile_image ? (
                        <Image
                          src={relatedPost.primary_author.profile_image}
                          alt={relatedPost.primary_author.name || "Author"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          {relatedPost.primary_author?.name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        {relatedPost.primary_author?.name || "Unknown Author"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
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
          </div>
        </section>
      )}
      <BlogNewsletter />
      <Footer />
    </main>
  );
}