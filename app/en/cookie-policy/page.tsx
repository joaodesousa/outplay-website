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
            <h1 className="text-5xl md:text-6xl font-bold">Cookie Policy</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-32">
                <nav className="space-y-6">
                  <Link href="#introduction" className="block text-gray-400 hover:text-white transition-colors">
                    Introduction
                  </Link>
                  <Link href="#what-are-cookies" className="block text-gray-400 hover:text-white transition-colors">
                    What Are Cookies
                  </Link>
                  <Link href="#types-of-cookies" className="block text-gray-400 hover:text-white transition-colors">
                    Types of Cookies
                  </Link>
                  <Link href="#cookie-management" className="block text-gray-400 hover:text-white transition-colors">
                    Cookie Management
                  </Link>
                  <Link href="#updates" className="block text-gray-400 hover:text-white transition-colors">
                    Updates to This Policy
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
                    This Cookie Policy explains how OUTPLAY ("we", "our", or "us"), a company based in Portugal, uses
                    cookies and similar technologies on our website. This policy provides you with information about how
                    we use cookies, what types of cookies we use, and how you can control them.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our use of cookies complies with the General Data Protection Regulation (GDPR), Portuguese Law No.
                    58/2019, and the ePrivacy Directive (Directive 2002/58/EC as amended by Directive 2009/136/EC).
                  </p>
                </section>

                <section id="what-are-cookies" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">What Are Cookies</h2>
                  <p className="text-gray-300 mb-4">
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you
                    visit a website. They are widely used to make websites work more efficiently, provide a better user
                    experience, and give website owners information about how their site is being used.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Cookies are not harmful and do not contain viruses. They cannot access other information on your
                    device.
                  </p>
                </section>

                <section id="types-of-cookies" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Types of Cookies We Use</h2>
                  <p className="text-gray-300 mb-4">We use the following types of cookies on our website:</p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Essential Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    These cookies are necessary for the website to function properly. They enable basic functions like
                    page navigation, secure areas access, and remembering your preferences. The website cannot function
                    properly without these cookies.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Performance Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously. They help us improve the way our website works.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Functionality Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    These cookies allow the website to remember choices you make (such as your username, language, or
                    region) and provide enhanced, more personal features.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Targeting/Advertising Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    These cookies are used to deliver advertisements more relevant to you and your interests. They are
                    also used to limit the number of times you see an advertisement and help measure the effectiveness
                    of advertising campaigns.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Third-Party Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    Some cookies are placed by third-party services that appear on our pages. These cookies enable
                    third-party features or functionality to be provided on or through the website, such as analytics,
                    interactive content, and social sharing.
                  </p>
                </section>

                <section id="cookie-management" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Cookie Management</h2>
                  <p className="text-gray-300 mb-4">
                    When you first visit our website, you will be presented with a cookie notice that allows you to
                    accept or decline non-essential cookies.
                  </p>
                  <p className="text-gray-300 mb-4">
                    You can also manage cookies through your browser settings. Most web browsers allow you to control
                    cookies through their settings. You can usually find these settings in the "Options" or
                    "Preferences" menu of your browser. You can delete existing cookies, allow or block all cookies, and
                    set preferences for certain websites.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Please note that if you choose to block or delete cookies, you may not be able to access certain
                    areas or features of our website, and some services may not function properly.
                  </p>
                </section>

                <section id="updates" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Updates to This Policy</h2>
                  <p className="text-gray-300 mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or
                    our business practices. Any changes will be posted on this page with an updated revision date. We
                    encourage you to periodically review this page to stay informed about our use of cookies.
                  </p>
                </section>

                <section id="contact" className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact
                    us at:
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

