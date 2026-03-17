import Header from "@/components/landig/Header.jsx";
import Footer from "@/components/landig/Footer.jsx";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}