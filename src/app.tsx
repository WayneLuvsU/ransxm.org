import { About } from "@/components/about";
import { Archives } from "@/components/archives";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Story } from "@/components/story";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <Story />
        <Archives />
      </main>

      <Footer />
    </div>
  );
};
export default App;
