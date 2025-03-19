import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Facebook, Twitter, Linkedin, Copy, ArrowLeft } from "lucide-react"

// This would normally come from a CMS or API
const post = {
  slug: "science-communication-digital-age",
  title: "Science Communication in the Digital Age",
  subtitle:
    "How emerging technologies are transforming the way we communicate complex scientific concepts to diverse audiences",
  date: "March 15, 2025",
  author: {
    name: "Dr. Sofia Almeida",
    role: "Founder & Scientific Director",
    image: "/placeholder.svg?height=200&width=200",
  },
  category: "Digital Strategy",
  image: "/placeholder.svg?height=1200&width=2000",
  content: `
    <p>The landscape of scientific communication is undergoing a profound transformation in the digital age. As technology evolves, so do the methods and platforms through which complex scientific concepts can be shared with diverse audiences. This evolution presents both challenges and opportunities for scientists, research institutions, and science communicators.</p>
    
    <h2>The Changing Landscape of Scientific Communication</h2>
    
    <p>Traditionally, scientific findings were primarily disseminated through academic journals, conferences, and specialized publications. While these channels remain important, digital platforms have democratized access to scientific information and created new possibilities for engagement.</p>
    
    <p>Social media, interactive websites, data visualizations, virtual reality, and other digital tools now allow for more dynamic and accessible presentations of scientific concepts. These tools can break down barriers to understanding and reach audiences that might otherwise be excluded from scientific discourse.</p>
    
    <blockquote>
      <p>The greatest challenge in communication is the illusion that it has been accomplished. The scientist may believe they have communicated clearly, while the audience walks away with a completely different understanding—or none at all.</p>
    </blockquote>
    
    <h2>Emerging Technologies in Scientific Communication</h2>
    
    <p>Several emerging technologies are particularly promising for advancing scientific communication:</p>
    
    <h3>Interactive Data Visualization</h3>
    
    <p>Interactive visualizations allow users to explore complex datasets in intuitive ways. Rather than presenting static graphs or charts, interactive visualizations enable users to filter, sort, and examine data from multiple perspectives. This approach can make patterns and relationships more apparent and engaging.</p>
    
    <h3>Virtual and Augmented Reality</h3>
    
    <p>VR and AR technologies offer immersive experiences that can make abstract concepts tangible. For example, users can "walk through" a cell, explore geological formations, or witness astronomical phenomena. These experiences can create emotional connections to scientific concepts that might otherwise seem distant or abstract.</p>
    
    <h3>Artificial Intelligence</h3>
    
    <p>AI tools can personalize scientific content based on a user's background knowledge, interests, and learning style. They can also help translate technical jargon into more accessible language without sacrificing accuracy.</p>
    
    <h2>Balancing Accessibility and Accuracy</h2>
    
    <p>One of the central challenges in scientific communication is making complex concepts accessible without oversimplification. Digital tools can help address this challenge by providing layered information—allowing users to start with basic concepts and progressively explore more complex details as their understanding grows.</p>
    
    <p>This approach respects both the integrity of the science and the diverse needs of different audiences. It acknowledges that accessibility is not about "dumbing down" content but about creating multiple pathways to understanding.</p>
    
    <h2>The Future of Scientific Communication</h2>
    
    <p>As we look to the future, several trends are likely to shape scientific communication:</p>
    
    <ul>
      <li>Increased collaboration between scientists, designers, and communication specialists</li>
      <li>Greater emphasis on storytelling and narrative techniques</li>
      <li>More participatory approaches that involve audiences in scientific exploration</li>
      <li>Continued innovation in visualization and interactive technologies</li>
      <li>More attention to cultural context and diverse perspectives</li>
    </ul>
    
    <p>By embracing these trends and the possibilities offered by digital technologies, we can create more engaging, accessible, and impactful scientific communication. The goal is not simply to transmit information but to foster understanding, curiosity, and critical thinking about scientific concepts and their implications for society.</p>
  `,
  tags: ["Science Communication", "Digital Strategy", "Technology", "Accessibility", "Public Engagement"],
}

// Related posts
const relatedPosts = [
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the post data based on the slug
  // const { slug } = params;

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
              <span className="text-sm text-gray-400 uppercase tracking-wider">{post.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{post.title}</h1>

            <p className="text-xl text-gray-300 mb-12">{post.subtitle}</p>

            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 mr-4 overflow-hidden">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>

              <div className="text-gray-500 text-sm">{post.date}</div>
            </div>
          </div>

          <div className="relative aspect-[21/9] mb-16 overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
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
              <article className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* Tags */}
              <div className="mt-12 pt-12 border-t border-gray-900">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-4 py-2 text-sm border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 pt-12 border-t border-gray-900">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
                    <Image
                      src={post.author.image || "/placeholder.svg"}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                    <p className="text-gray-400 mb-4">{post.author.role}</p>
                    <p className="text-gray-500">
                      Dr. Sofia Almeida is the founder of OUTPLAY and has over 15 years of experience in scientific
                      research and communication. She specializes in developing strategies that bridge the gap between
                      complex scientific concepts and public understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 border-l border-gray-800 pl-6">
                <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                <nav className="space-y-3">
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                    The Changing Landscape of Scientific Communication
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                    Emerging Technologies in Scientific Communication
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors pl-4">
                    Interactive Data Visualization
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors pl-4">
                    Virtual and Augmented Reality
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors pl-4">
                    Artificial Intelligence
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                    Balancing Accessibility and Accuracy
                  </a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                    The Future of Scientific Communication
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <article key={index} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden group">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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

