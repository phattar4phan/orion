import Benefits from "./components/Benefits";
import DatasetPreview from "./components/DatasetPreview";
import FAQs from "./components/FAQs";
import Features from "./components/Features";
import FinalAction from "./components/FinalAction";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ModelComparison from "./components/ModelComparison";
import PerformanceMetrics from "./components/PerformanceMetrics";
import SocialProof from "./components/SocialProof";
import Statistics from "./components/Statistics";
import TechStack from "./components/TechStack";
import Testimonials from "./components/Testimonials";
import Workflow from "./components/Workflow";

function App() {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Statistics />
        <Features />
        <Workflow />
        <DatasetPreview />
        <ModelComparison />
        <PerformanceMetrics />
        <Testimonials />
        <FAQs />
        <TechStack />
        <FinalAction />
      </main>
      <Footer />
    </div>
  )
}

export default App