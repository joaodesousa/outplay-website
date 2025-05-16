import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
// import { StoryblokNewsletter } from "../blog/components/storyblok-newsletter"
import { BlogNewsletter } from "@/app/en/blog/components/newsletter"

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tighter mb-12">
              Nós não
              <br />
              seguimos regras.
              <br />
              <span className="text-gray-500">Nós fazemo-las.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold mb-6">A Nossa Filosofia</h2>
              <div className="w-16 h-1 bg-white mb-8" />
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl">
                  Num mundo de seguidores, a OUTPLAY escolhe um caminho diferente. Não estamos aqui para nos
                  encaixarmos ou para seguir manuais estabelecidos. Estamos aqui para criar os nossos.
                </p>

                <p className="mt-4">
                  As regras existem por um motivo. Criam ordem, estabelecem expectativas e tornam as coisas
                  previsíveis. Mas o previsível não é memorável. O previsível não se destaca. O previsível não muda o
                  jogo.
                </p>

                <p>
                  Compreendemos que as ideias mais poderosas surgem frequentemente quando se questionam os próprios
                  alicerces que outros tomam como garantidos. Não se trata de quebrar regras por uma questão de
                  rebelião — trata-se de reconhecer quando essas regras já não servem o propósito maior.
                </p>

                <p>
                  Nunca nos vais ouvir dizer que algo não pode ser feito. Essa frase não está no nosso vocabulário.
                  Onde outros veem obstáculos impossíveis, nós vemos perguntas que ainda não encontraram as suas
                  respostas.
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
            O futuro pertence a quem o define, não a quem o aceita.
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
              <h2 className="text-3xl font-bold mb-6">Para Quem Somos</h2>
              <div className="w-16 h-1 bg-white mb-8" />
            </div>

            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl">
                  A OUTPLAY não é para todos. Somos para os outliers, os questionadores, os que se sentem
                  limitados pela forma como as coisas "devem" ser feitas.
                </p>

                <p>
                  Se alguma vez pensaste que deve haver uma abordagem diferente, se alguma vez quiseste contornar o
                  convencional e tentar algo que nunca foi feito antes — podemos ser os parceiros que procuras.
                </p>

                <p>
                  Porque, no fundo, é isso que nos move: a crença de que os caminhos mais interessantes são os que
                  ainda estão por percorrer. As regras ainda por escrever.
                </p>
              </div>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="group inline-flex items-center border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors duration-300"
                >
                  COMEÇAR A CONVERSA
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <BlogNewsletter />

      <Footer />
    </main>
  )
}

