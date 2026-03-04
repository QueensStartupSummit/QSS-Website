import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonial from './components/Testimonial';
import GetInvolved from './components/GetInvolved';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy load heavy components
const Gallery = lazy(() => import('./components/Gallery'));

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Testimonial />
      <GetInvolved />
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58baba]"></div>
        </div>
      }>
        <Gallery />
      </Suspense>
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;