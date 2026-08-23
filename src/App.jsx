import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Nav />

      <main id="main-content">
        <Hero />

        {/* Visual separator */}
        <div className="section-divider" aria-hidden="true" />

        <Projects />

        <div className="section-divider" aria-hidden="true" />

        <Skills />

        <div className="section-divider" aria-hidden="true" />

        <About />

        <div className="section-divider" aria-hidden="true" />

        <GitHub />

        <div className="section-divider" aria-hidden="true" />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
