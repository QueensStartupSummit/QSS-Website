import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonial from './components/Testimonial';
import GetInvolved from './components/GetInvolved';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';

// Lazy load below-the-fold components
const Gallery = lazy(() => import('./components/Gallery'));
const Contact = lazy(() => import('./components/Contact'));

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
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58baba]"></div>
        </div>
      }>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;