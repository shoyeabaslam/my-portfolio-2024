import Projects from "@/components/Projects/Projects";
import About from "../components/About/About";
import Home from "../components/Home/Home";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Navbar from "@/components/Navbar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar>
        <Home />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
        <Chatbot />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </Navbar>
    </main>
  );
}
