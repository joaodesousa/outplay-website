import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// Sample blog post data
const featuredPost = {
  slug: "science-communication-digital-age",
  title: "Science Communication in the Digital Age",
  excerpt:
    "How emerging technologies are transforming the way we communicate complex scientific concepts to diverse audiences.",
  date: "March 15, 2025",
  author: "Dr. Sofia Almeida",
  category: "Digital Strategy",
  image: "/placeholder.svg?height=800&width=1200",
}

const posts = [
  {
    slug: "visualizing-quantum-mechanics",
    title: "Visualizing Quantum Mechanics: Beyond the Equation",
    excerpt:
      "Innovative approaches to making quantum physics accessible through visual storytelling and interactive experiences.",
    date: "March 10, 2025",
    author: "João Santos",
    category: "Visualization",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    slug: "biotech-communication-strategies",
    title: "Effective Communication Strategies for Biotech Innovations",
    excerpt:
      "How to translate complex biotechnology research into compelling narratives that resonate with stakeholders and the public.",
    date: "March 5, 2025",
    author: "Ana Ferreira",
    category: "Strategy",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    slug: "climate-research-public-engagement",
    title: "Bridging the Gap: Climate Research and Public Engagement",
    excerpt:
      "Strategies for communicating climate science in ways that drive understanding and action across diverse audiences.",
    date: "February 28, 2025",
    author: "Mariana Silva",
    category: "Public Engagement",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    slug: "interactive-data-visualization",
    title: "The Power of Interactive Data Visualization in Scientific Communication",
    excerpt: "How interactive visualizations can transform complex datasets into intuitive, engaging experiences.",
    date: "February 20, 2025",
    author: "Tiago Oliveira",
    category: "Data Visualization",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    slug: "science-storytelling-techniques",
    title: "Advanced Storytelling Techniques for Scientific Content",
    excerpt:
      "Narrative structures and storytelling approaches that make scientific concepts more engaging and memorable.",
    date: "February 15, 2025",
    author: "Miguel Costa",
    category: "Content Creation",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    slug: "accessibility-scientific-communication",
    title: "Making Scientific Communication Accessible Without Oversimplification",
    excerpt:
      "Strategies for creating inclusive scientific content that maintains accuracy while reaching diverse audiences.",
    date: "February 8, 2025",
    author: "Dr. Sofia Almeida",
    category: "Accessibility",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function BlogPage() {
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
              Insights, strategies, and case studies on communicating scientific innovation effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="border-l-2 border-white pl-6 mb-4">
                <span className="text-sm text-gray-400 uppercase tracking-wider">{featuredPost.category}</span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-gray-300 transition-colors duration-300">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-800 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">{featuredPost.author}</p>
                    <p className="text-xs text-gray-500">{featuredPost.date}</p>
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

      {/* All Posts */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {posts.map((post, index) => (
              <article key={index} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white border border-white px-4 py-2 text-sm">Read article</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{post.category}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="mb-3">
                  <h3 className="text-xl font-bold hover:text-gray-300 transition-colors duration-300">{post.title}</h3>
                </Link>

                <p className="text-gray-400 text-sm mb-6">{post.excerpt}</p>

                <div className="flex items-center mt-auto">
                  <div className="w-8 h-8 rounded-full bg-gray-800 mr-3"></div>
                  <div>
                    <p className="text-xs font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-gray-400 mb-8">
              Stay updated with the latest insights and strategies in scientific communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-gray-800 px-4 py-3 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

