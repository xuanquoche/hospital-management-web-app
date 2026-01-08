import {
  Navbar,
  Hero,
  Features,
  Statistics,
  Testimonials,
  CTASection,
  Footer,
} from '@/components/modules/landing/hospital';

export default function HospitalLandingPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
