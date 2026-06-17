import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>
      <Footer />
    </div>
  );
}
