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
            <h1 className="text-5xl md:text-6xl font-bold">Privacy Policy</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-32">
                <nav className="space-y-6">
                  <Link href="#introduction" className="block text-gray-400 hover:text-white transition-colors">
                    Introduction
                  </Link>
                  <Link href="#data-collection" className="block text-gray-400 hover:text-white transition-colors">
                    Data Collection
                  </Link>
                  <Link href="#data-usage" className="block text-gray-400 hover:text-white transition-colors">
                    Data Usage
                  </Link>
                  <Link href="#data-storage" className="block text-gray-400 hover:text-white transition-colors">
                    Data Storage
                  </Link>
                  <Link href="#your-rights" className="block text-gray-400 hover:text-white transition-colors">
                    Your Rights
                  </Link>
                  <Link href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                    Contact Information
                  </Link>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="prose prose-invert max-w-none">
                <section id="introduction" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Introduction</h2>
                  <p className="text-gray-300 mb-4">Last updated: March 18, 2025</p>
                  <p className="text-gray-300 mb-4">
                    OUTPLAY ("we", "our", or "us"), a company based in Portugal, is committed to protecting your
                    privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website or use our services.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We adhere to the General Data Protection Regulation (GDPR) and Portuguese Law No. 58/2019, which
                    implements the GDPR in Portugal. By accessing or using our services, you acknowledge that you have
                    read and understood this Privacy Policy.
                  </p>
                </section>

                <section id="data-collection" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Data Collection</h2>
                  <p className="text-gray-300 mb-4">We collect information that you provide directly to us when you:</p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Fill out forms on our website</li>
                    <li>Create an account or profile</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request information or services</li>
                    <li>Communicate with us via email, phone, or other methods</li>
                  </ul>

                  <p className="text-gray-300 mb-4">
                    We may also automatically collect certain information when you visit our website, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on those pages</li>
                    <li>Referral sources</li>
                    <li>Other browsing data</li>
                  </ul>
                </section>

                <section id="data-usage" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Data Usage</h2>
                  <p className="text-gray-300 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Providing and maintaining our services</li>
                    <li>Improving and personalizing user experience</li>
                    <li>Analyzing usage patterns and trends</li>
                    <li>Communicating with you about our services, updates, and promotions</li>
                    <li>Responding to your inquiries and requests</li>
                    <li>Complying with legal obligations</li>
                  </ul>
                </section>

                <section id="data-storage" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Data Storage</h2>
                  <p className="text-gray-300 mb-4">
                    Your information is stored on secure servers located within the European Economic Area (EEA). We
                    implement appropriate technical and organizational measures to protect your personal data against
                    unauthorized or unlawful processing, accidental loss, destruction, or damage.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We retain your personal data only for as long as necessary to fulfill the purposes for which it was
                    collected, including legal, accounting, or reporting requirements.
                  </p>
                </section>

                <section id="your-rights" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
                  <p className="text-gray-300 mb-4">
                    Under the GDPR and Portuguese data protection law, you have the following rights:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of inaccurate data</li>
                    <li>Right to erasure ("right to be forgotten")</li>
                    <li>Right to restriction of processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                    <li>Rights related to automated decision-making and profiling</li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    To exercise any of these rights, please contact us using the information provided in the Contact
                    Information section.
                  </p>
                </section>

                <section id="contact" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us at:
                  </p>
                  <div className="text-gray-300 mb-4">
                    <p>OUTPLAY</p>
                    <p>Email: privacy@outplay.pt</p>
                  </div>
                  <p className="text-gray-300 mb-4">
                    You also have the right to lodge a complaint with the Portuguese Data Protection Authority (Comissão
                    Nacional de Proteção de Dados - CNPD) if you believe that we have violated your data protection
                    rights.
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

