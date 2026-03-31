import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhoIAmSection from "@/components/WhoIAmSection";
import AboutSection from "@/components/AboutSection";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProcessSection from "@/components/PipelineSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <WhoIAmSection />
      <AboutSection />
      <PhilosophySection />
      <ProcessSection />
      <ServicesSection />
      <CaseStudiesSection />
      <IndustriesSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
