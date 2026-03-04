import Header from "@/components/landig/Header.jsx";
import Hero from "@/components/landig/Hero.jsx";
import Services from "@/components/landig/Services.jsx";
import About from "@/components/landig/About.jsx";
import Contact from "@/components/landig/Contact.jsx";
import Footer from "@/components/landig/Footer.jsx";




export default function LandingPage() {
  return (
    // boxed - meu boxed - flex flex-1 flex-col min-h-screen
    <div className="min-h-screen bg-zinc-800">
      <Header />
      <main className="pt-16">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer/>
    </div>
  );
}