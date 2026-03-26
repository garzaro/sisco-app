import Header from "@/components/landig/Header.jsx";
import Footer from "@/components/landig/Footer.jsx";
import {Outlet} from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="px-4 py-4 mt-12 items-center justify-center pt-16">
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}