import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { StoryblokNewsletter } from "../blog/components/storyblok-newsletter"

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tighter mb-12">
              We don't
              <br />
              follow rules.
              <br />
              <span className="text-gray-500">We make them.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
              <div className="w-16 h-1 bg-white mb-8" />
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl">
                  In a world of followers, OUTPLAY chooses a different path. We're not here to fit in or to follow
                  established playbooks. We're here to create our own.
                </p>

                <p className="mt-4">
                  Rules exist for a reason. They create order, establish expectations, and make things predictable. But
                  predictable isn't memorable. Predictable doesn't stand out. Predictable doesn't change the game.
                </p>

                <p>
                  We understand that the most powerful ideas often emerge when you question the very foundations others
                  take for granted. It's not about breaking rules for the sake of rebellion—it's about recognizing when
                  those rules no longer serve the greater purpose.
                </p>

                <p>
                  You'll never hear us say something can't be done. That phrase isn't in our vocabulary. Where others
                  see impossible hurdles, we see questions that haven't found their answers yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-bold text-center max-w-4xl mx-auto">
            The future belongs to those who define it, not those who merely accept it as it comes.
          </h2>
        </div>
      </section>

      {/* Team Section - Simplified
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold mb-6">The Rule Makers</h2>
              <div className="w-16 h-1 bg-white mb-8" />
              <p className="text-gray-400 mb-8">
                We're a team of outliers, questioners, and innovators who believe in challenging the status quo. We come
                from diverse backgrounds but share a common belief: the most interesting paths are the ones yet to be
                traveled.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold text-white mb-2">8+</p>
                  <p className="text-gray-400">Years Redefining</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">50+</p>
                  <p className="text-gray-400">Rules Broken</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">30+</p>
                  <p className="text-gray-400">Game Changers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-2">∞</p>
                  <p className="text-gray-400">Possibilities</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=400&width=400`}
                      alt="Team member"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* For Who Section */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold mb-6">Who We're For</h2>
              <div className="w-16 h-1 bg-white mb-8" />
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl">
                  OUTPLAY isn't for everyone. We're for the outliers, the questioners, the ones who feel constrained by
                  how things "should" be done.
                </p>

                <p>
                  If you've ever found yourself thinking there must be a different approach, if you've ever wanted to
                  bypass convention and try something that hasn't been done before—we might be the partners you've been
                  looking for.
                </p>

                <p>
                  Because ultimately, that's what drives us: the belief that the most interesting paths are the ones yet
                  to be traveled. The rules yet to be written.
                </p>
              </div>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="group inline-flex items-center border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300"
                >
                  START THE CONVERSATION
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <StoryblokNewsletter />

      <Footer />
    </main>
  )
}

