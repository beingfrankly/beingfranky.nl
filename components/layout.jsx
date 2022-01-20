import Navigation from "./navigation";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navigation></Navigation>
      <main className="w-full h-full" id="main">{children}</main>
      <Footer></Footer>
    </>
  );
}
