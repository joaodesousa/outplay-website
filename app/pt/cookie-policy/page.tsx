import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CookiePolicy() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center mb-16">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h1 className="text-5xl md:text-6xl font-bold">Política de Cookies</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-32">
                <nav className="space-y-6">
                  <Link href="#introduction" className="block text-gray-400 hover:text-white transition-colors">
                    Introdução
                  </Link>
                  <Link href="#what-are-cookies" className="block text-gray-400 hover:text-white transition-colors">
                    O Que São Cookies
                  </Link>
                  <Link href="#types-of-cookies" className="block text-gray-400 hover:text-white transition-colors">
                    Tipos de Cookies
                  </Link>
                  <Link href="#cookie-management" className="block text-gray-400 hover:text-white transition-colors">
                    Gestão de Cookies
                  </Link>
                  <Link href="#updates" className="block text-gray-400 hover:text-white transition-colors">
                    Atualizações a Esta Política
                  </Link>
                  <Link href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                    Informações de Contacto
                  </Link>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="prose prose-invert max-w-none">
                <section id="introduction" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Introdução</h2>
                  <p className="text-gray-300 mb-4">Última atualização: 18 de março de 2025</p>
                  <p className="text-gray-300 mb-4">
                    Esta Política de Cookies explica como a OUTPLAY ("nós", "nosso" ou "nos"), uma empresa sediada em Portugal, utiliza
                    cookies e tecnologias semelhantes no nosso website. Esta política fornece informações sobre como
                    utilizamos cookies, que tipos de cookies utilizamos e como pode controlá-los.
                  </p>
                  <p className="text-gray-300 mb-4">
                    A nossa utilização de cookies cumpre o Regulamento Geral sobre a Proteção de Dados (RGPD), a Lei Portuguesa n.º
                    58/2019 e a Diretiva ePrivacy (Diretiva 2002/58/CE, conforme alterada pela Diretiva 2009/136/CE).
                  </p>
                </section>

                <section id="what-are-cookies" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">O Que São Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, tablet ou telemóvel) quando
                    visita um website. São amplamente utilizados para fazer os websites funcionarem de forma mais eficiente, proporcionar uma melhor
                    experiência ao utilizador e fornecer aos proprietários de websites informações sobre como o seu site está a ser utilizado.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Os cookies não são prejudiciais e não contêm vírus. Não conseguem aceder a outras informações no seu
                    dispositivo.
                  </p>
                </section>

                <section id="types-of-cookies" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Tipos de Cookies Que Utilizamos</h2>
                  <p className="text-gray-300 mb-4">Utilizamos os seguintes tipos de cookies no nosso website:</p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Cookies Essenciais</h3>
                  <p className="text-gray-300 mb-4">
                    Estes cookies são necessários para que o website funcione corretamente. Permitem funções básicas como
                    navegação de página, acesso a áreas seguras e memorização das suas preferências. O website não pode funcionar
                    corretamente sem estes cookies.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Cookies de Desempenho</h3>
                  <p className="text-gray-300 mb-4">
                    Estes cookies ajudam-nos a entender como os visitantes interagem com o nosso website, recolhendo e reportando
                    informações anonimamente. Ajudam-nos a melhorar a forma como o nosso website funciona.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Cookies de Funcionalidade</h3>
                  <p className="text-gray-300 mb-4">
                    Estes cookies permitem que o website memorize as escolhas que faz (como o seu nome de utilizador, idioma ou
                    região) e forneça funcionalidades melhoradas e mais personalizadas.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Cookies de Segmentação/Publicidade</h3>
                  <p className="text-gray-300 mb-4">
                    Estes cookies são utilizados para apresentar anúncios mais relevantes para si e para os seus interesses. São
                    também utilizados para limitar o número de vezes que vê um anúncio e ajudar a medir a eficácia
                    das campanhas publicitárias.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Cookies de Terceiros</h3>
                  <p className="text-gray-300 mb-4">
                    Alguns cookies são colocados por serviços de terceiros que aparecem nas nossas páginas. Estes cookies permitem
                    que funcionalidades de terceiros sejam fornecidas no ou através do website, como análises,
                    conteúdo interativo e partilha social.
                  </p>
                </section>

                <section id="cookie-management" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Gestão de Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    Quando visita o nosso website pela primeira vez, será apresentado um aviso de cookies que lhe permite
                    aceitar ou recusar cookies não essenciais.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Também pode gerir os cookies através das definições do seu navegador. A maioria dos navegadores web permite controlar
                    os cookies através das suas definições. Normalmente, pode encontrar estas definições no menu "Opções" ou
                    "Preferências" do seu navegador. Pode eliminar cookies existentes, permitir ou bloquear todos os cookies e
                    definir preferências para determinados websites.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Tenha em atenção que, se optar por bloquear ou eliminar cookies, poderá não conseguir aceder a determinadas
                    áreas ou funcionalidades do nosso website, e alguns serviços poderão não funcionar corretamente.
                  </p>
                </section>

                <section id="updates" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Atualizações a Esta Política</h2>
                  <p className="text-gray-300 mb-4">
                    Podemos atualizar esta Política de Cookies periodicamente para refletir alterações na tecnologia, regulamentação ou
                    nas nossas práticas comerciais. Quaisquer alterações serão publicadas nesta página com uma data de revisão atualizada. Nós
                    incentivamo-lo a rever periodicamente esta página para se manter informado sobre a nossa utilização de cookies.
                  </p>
                </section>

                <section id="contact" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Informações de Contacto</h2>
                  <p className="text-gray-300 mb-4">
                    Se tiver alguma questão ou preocupação sobre a nossa utilização de cookies ou esta Política de Cookies, por favor contacte-nos
                    em:
                  </p>
                  <div className="text-gray-300 mb-4">
                    <p>OUTPLAY</p>
                    <p>Email: privacy@outplay.pt</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

