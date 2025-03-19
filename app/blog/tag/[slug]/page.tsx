import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { getPostsByTag } from "@/lib/ghost"
import { BlogNewsletter } from "../../components/newsletter"
import { Metadata } from "next"

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

export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the page
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  // Properly await the slug parameter
  const slug = await params.slug;
  const posts = await getPostsByTag(slug);
  const tagName = posts.length > 0 ? posts[0].tags[0]?.name : slug;

  return {
    title: `${tagName} | OUTPLAY Blog`,
    description: `Articles tagged with ${tagName}`,
  };
}

export default async function BlogTagPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // Properly await the slug parameter
  const slug = params.slug;
  const posts = await getPostsByTag(slug);
  const tagName = posts.length > 0 ? posts[0].tags[0]?.name : slug;

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all articles
          </Link>

          <div className="flex items-center mb-16">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h1 className="text-5xl md:text-6xl font-bold">{tagName.toLowerCase()}</h1>
          </div>

          <div className="mb-12">
            <p className="text-xl text-gray-300">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No articles found with this tag.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {posts.map((post: Post, index: number) => (
                <article key={index} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                    <Image
                      src={post.feature_image || "/placeholder.svg?height=600&width=800"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white border border-white px-4 py-2 text-sm">Read article</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mb-3">
                    <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">{post.title}</h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-6">{post.custom_excerpt || post.excerpt}</p>

                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 overflow-hidden">
                      {post.authors && post.authors.length > 0 && post.authors[0]?.profile_image && (
                        <Image 
                          src={post.authors[0]?.profile_image}
                          alt={post.authors[0]?.name} 
                          width={32} 
                          height={32}
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div>
                      {post.authors && post.authors.length > 0 ? (
                        <>
                          <p className="text-xs font-medium">{post.authors[0]?.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(post.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs font-medium">Unknown Author</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <BlogNewsletter />
      <Footer />
    </main>
  )
}