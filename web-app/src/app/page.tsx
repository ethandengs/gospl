import type { Metadata } from "next"
import { LandingNavbar } from "@/components/layout"
import { Footer } from "@/components/ui/footer"
import { GaitPatternViz } from "@/components/ui/GaitPatternViz"
import Link from "next/link"
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: "GOSPL: Preventing Elderly Falls with Intelligent Gait Monitoring",
  description: "GOSPL is fundamentally about enhancing everyday lives through thoughtful technology. More than sensors and data, it is designed around each individual's unique gait, continuously adapting and refining predictions to fit personal needs.",
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">Empowering Independent Living</span>
              <span className="block text-primary-blue dark:text-sky-400">Through Intelligent Care</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              GOSPL uses advanced gait monitoring technology to prevent falls and enhance the quality of life for elderly individuals, enabling confident and independent living.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary-blue to-primary-teal hover:from-[#1B8FAD] hover:to-[#43A695] transition-all duration-200 hover:scale-105"
              >
                Get Started
                <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                href="#learn-more"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose GOSPL?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our comprehensive solution combines cutting-edge technology with compassionate care
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <ShieldCheckIcon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Proactive Monitoring</h3>
              <p className="mt-2 text-gray-600">
                Advanced sensors and AI technology detect potential issues before they become problems
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Data-Driven Insights</h3>
              <p className="mt-2 text-gray-600">
                Real-time analytics and reporting to make informed healthcare decisions
              </p>
            </div>
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Connected Care</h3>
              <p className="mt-2 text-gray-600">
                Seamless communication between elderly individuals, caregivers, and healthcare providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-sky-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                GOSPL is dedicated to revolutionizing elderly care through innovative gait monitoring technology. We believe in creating a future where aging is supported by intelligent, caring technology that enhances independence and peace of mind.
              </p>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="text-primary-blue dark:text-sky-400 font-medium hover:text-sky-700 dark:hover:text-sky-300 inline-flex items-center"
                >
                  Learn about our impact
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <GaitPatternViz />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50" />
        
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-x-40 -top-40 -bottom-40 [mask-image:radial-gradient(farthest-side_at_center,white,transparent)] dark:[mask-image:radial-gradient(farthest-side_at_center,white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--button-from))] to-[hsl(var(--button-to))] opacity-10 dark:opacity-20 blur-3xl" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join us in revolutionizing elderly care and creating a safer future for our loved ones
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/login"
                className="btn-primary group"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#learn-more"
                className="btn-secondary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
