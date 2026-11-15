import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Testimonial from "./components/Testimonial";
import GetInvolved from "./components/GetInvolved";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";

// Lazy load below-the-fold components
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem("qss-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return "light";
};

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111827" : "#ddc946");
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("qss-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen">
      <Header isDarkMode={theme === "dark"} onToggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Testimonial />
      <GetInvolved />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58baba]"></div>
          </div>
        }
      >
        <Gallery />
      </Suspense>
      <Sponsors />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58baba]"></div>
          </div>
        }
      >
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
