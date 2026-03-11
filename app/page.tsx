import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Solutions from '@/components/sections/Solutions'
import HowItWorks from '@/components/sections/HowItWorks'
import CaseExamples from '@/components/sections/CaseExamples'
import ForExperts from '@/components/sections/ForExperts'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Solutions />
      <HowItWorks />
      <CaseExamples />
      <ForExperts />
      <CTASection />
      <Footer />
    </main>
  )
}
