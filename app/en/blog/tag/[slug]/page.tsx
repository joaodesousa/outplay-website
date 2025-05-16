import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { getStoryblokStories } from "@/lib/storyblok"
import { StoryblokNewsletter } from "../../components/storyblok-newsletter"
import { Metadata } from "next"
import { format } from "date-fns"

interface Post {
  uuid: string;
  slug: string;
  content: {
    title: string;
    featured_image?: { filename: string };
    excerpt?: string;
    publication_date: string;
    author?: { 
      name: string;
      content?: {
        avatar?: { filename: string }
      }
    };
    tags?: string[];
  };
}

export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the page
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await props.params;
  const { slug } = resolvedParams;
  const tagName = decodeURIComponent(slug);
  
  return {
    title: `${tagName} | OUTPLAY Blog`,
    description: `Articles tagged with ${tagName}`,
  };
}

export default async function BlogTagPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const tagName = decodeURIComponent(slug);
  
  // Get posts with this tag
  const posts = await getStoryblokStories({
    starts_with: "blog/",
    sort_by: "content.publication_date:desc",
    filter_query: {
      tags: {
        in_array: tagName
      }
    }
  } as any);

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
              {posts.map((post: Post) => (
                <article key={post.uuid} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                    <Image
                      src={post.content.featured_image?.filename || "/placeholder.svg?height=600&width=800"}
                      alt={post.content.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white border border-white px-4 py-2 text-sm">Read article</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mb-3">
                    <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">{post.content.title}</h3>
                  </Link>

                  <p className="text-gray-400 text-sm mb-6">{post.content.excerpt}</p>

                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 overflow-hidden">
                      {post.content.author?.content?.avatar && (
                        <Image 
                          src={post.content.author.content.avatar.filename}
                          alt={post.content.author.name || "Author"} 
                          width={32} 
                          height={32}
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div>
                      {post.content.author ? (
                        <>
                          <p className="text-xs font-medium">{post.content.author.name}</p>
                          <p className="text-xs text-gray-500">
                            {post.content.publication_date && format(
                              new Date(post.content.publication_date),
                              "MMMM dd, yyyy"
                            )}
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
      <StoryblokNewsletter />
      <Footer />
    </main>
  )
}