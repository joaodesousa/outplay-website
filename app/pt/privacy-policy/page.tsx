import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center mb-16">
            <div className="w-3 h-3 bg-white rounded-full mr-8" />
            <h1 className="text-5xl md:text-6xl font-bold">Política de Privacidade</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-32">
                <nav className="space-y-6">
                  <Link href="#introduction" className="block text-gray-400 hover:text-white transition-colors">
                    Introdução
                  </Link>
                  <Link href="#data-collection" className="block text-gray-400 hover:text-white transition-colors">
                    Recolha de Dados
                  </Link>
                  <Link href="#data-usage" className="block text-gray-400 hover:text-white transition-colors">
                    Utilização de Dados
                  </Link>
                  <Link href="#data-storage" className="block text-gray-400 hover:text-white transition-colors">
                    Armazenamento de Dados
                  </Link>
                  <Link href="#your-rights" className="block text-gray-400 hover:text-white transition-colors">
                    Os Seus Direitos
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
                    A OUTPLAY ("nós", "nosso" ou "nos"), uma empresa sediada em Portugal, está empenhada em proteger a sua
                    privacidade. Esta Política de Privacidade explica como recolhemos, usamos, divulgamos e protegemos as suas informações
                    quando visita o nosso website ou utiliza os nossos serviços.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Cumprimos o Regulamento Geral sobre a Proteção de Dados (RGPD) e a Lei Portuguesa n.º 58/2019, que
                    implementa o RGPD em Portugal. Ao aceder ou utilizar os nossos serviços, reconhece que leu
                    e compreendeu esta Política de Privacidade.
                  </p>
                </section>

                <section id="data-collection" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Recolha de Dados</h2>
                  <p className="text-gray-300 mb-4">Recolhemos informações que nos fornece diretamente quando:</p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Preenche formulários no nosso website</li>
                    <li>Cria uma conta ou perfil</li>
                    <li>Subscreve a nossa newsletter</li>
                    <li>Solicita informações ou serviços</li>
                    <li>Comunica connosco por email, telefone ou outros métodos</li>
                  </ul>

                  <p className="text-gray-300 mb-4">
                    Também podemos recolher automaticamente certas informações quando visita o nosso website, incluindo:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Endereço IP e informações do dispositivo</li>
                    <li>Tipo e versão do navegador</li>
                    <li>Sistema operativo</li>
                    <li>Páginas visitadas e tempo despendido nessas páginas</li>
                    <li>Fontes de referência</li>
                    <li>Outros dados de navegação</li>
                  </ul>
                </section>

                <section id="data-usage" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Utilização de Dados</h2>
                  <p className="text-gray-300 mb-4">
                    Utilizamos as informações que recolhemos para diversos fins, incluindo:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Fornecer e manter os nossos serviços</li>
                    <li>Melhorar e personalizar a experiência do utilizador</li>
                    <li>Analisar padrões e tendências de utilização</li>
                    <li>Comunicar consigo sobre os nossos serviços, atualizações e promoções</li>
                    <li>Responder às suas perguntas e solicitações</li>
                    <li>Cumprir obrigações legais</li>
                  </ul>
                </section>

                <section id="data-storage" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Armazenamento de Dados</h2>
                  <p className="text-gray-300 mb-4">
                    As suas informações são armazenadas em servidores seguros localizados no Espaço Económico Europeu (EEE).
                    Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra
                    processamento não autorizado ou ilegal, perda acidental, destruição ou dano.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Conservamos os seus dados pessoais apenas durante o tempo necessário para cumprir os fins para os quais foram
                    recolhidos, incluindo requisitos legais, contabilísticos ou de relatórios.
                  </p>
                </section>

                <section id="your-rights" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Os Seus Direitos</h2>
                  <p className="text-gray-300 mb-4">
                    Ao abrigo do RGPD e da lei portuguesa de proteção de dados, tem os seguintes direitos:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Direito de aceder aos seus dados pessoais</li>
                    <li>Direito de retificação de dados incorretos</li>
                    <li>Direito ao apagamento ("direito a ser esquecido")</li>
                    <li>Direito à limitação do processamento</li>
                    <li>Direito à portabilidade dos dados</li>
                    <li>Direito de oposição ao processamento</li>
                    <li>Direitos relacionados com a tomada de decisões automatizada e definição de perfis</li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    Para exercer qualquer um destes direitos, entre em contacto connosco utilizando as informações fornecidas na secção Informações de Contacto.
                  </p>
                </section>

                <section id="contact" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Informações de Contacto</h2>
                  <p className="text-gray-300 mb-4">
                    Se tiver alguma dúvida, preocupação ou solicitação relativamente a esta Política de Privacidade ou às nossas práticas de dados,
                    entre em contacto connosco através de:
                  </p>
                  <div className="text-gray-300 mb-4">
                    <p>OUTPLAY</p>
                    <p>Email: privacy@outplay.pt</p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Também tem o direito de apresentar uma queixa à autoridade portuguesa de proteção de dados (Comissão
                    Nacional de Proteção de Dados - CNPD) se considerar que violámos os seus direitos de proteção de dados.
                  </p>
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

