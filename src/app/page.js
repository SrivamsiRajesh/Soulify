import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
export default function Home() {
  return (
  <main>
    <Hero />
    <About />
    <FAQ />
    <Footer />
  </main>
  );
}
