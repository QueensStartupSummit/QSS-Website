import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonial from './components/Testimonial';
import GetInvolved from './components/GetInvolved';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Testimonial />
      <GetInvolved />
      <Gallery />
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;