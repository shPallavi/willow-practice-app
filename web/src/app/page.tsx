import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="container">
        <h2>Latest Blogs</h2>
      </main>
      <Footer />
    </>
  );
}
