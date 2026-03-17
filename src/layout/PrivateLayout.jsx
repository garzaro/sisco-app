import Header from "@/components/landig/Header.jsx";
import Footer from "@/components/landig/Footer.jsx";

export default function PrivateLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-32">
        { children }
      </main>
    </>
  );
}