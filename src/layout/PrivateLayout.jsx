import Header from "@/components/landig/Header.jsx";
import Footer from "@/components/landig/Footer.jsx";
import {Outlet} from "react-router-dom";

export default function PrivateLayout({ children }) {
  return (
    <>
      <Header />
      <main className="px-4 py-20 mt-12 items-center justify-center pt-32">
        { children }
        <Outlet />
      </main>
      {/*<Footer />*/}
    </>
  );
}