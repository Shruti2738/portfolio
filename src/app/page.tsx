import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Toast from "@/components/Toast";
import EasterEggListener from "@/components/Confetti";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Wins from "@/components/Wins";
import Roles from "@/components/Roles";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Path from "@/components/Path";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* Custom Contextual Cursor */}
      <Cursor />

      {/* Intro Overlay (once per session) */}
      <Intro />

      {/* Easter Egg Listener ('hire' -> confetti) */}
      <EasterEggListener />

      {/* Global Toast Notifications */}
      <Toast />

      {/* Sticky Top Navigation */}
      <Nav />

      {/* Main Page Bands */}
      <main id="main-content" className="w-full flex flex-col">
        {/* Band A: Hero */}
        <Hero />

        {/* Band B: Marquee */}
        <Marquee />

        {/* Band C: About & Stats */}
        <About />

        {/* Band D: Wins / Achievements */}
        <Wins />

        {/* Band E: Roles / Positions */}
        <Roles />

        {/* Band F: Selected Work / Projects */}
        <Projects />

        {/* Band G: Skills */}
        <Skills />

        {/* Band H: Education / Path */}
        <Path />

        {/* Band I: Gallery / Moments */}
        <Gallery />

        {/* Band J: Split Contact */}
        <Contact />
      </main>

      {/* Band K: Footer */}
      <Footer />
    </SmoothScroll>
  );
}
