import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ToolsMarquee from "@/components/home/ToolsMarquee";
import JourneySection from "@/components/home/JourneySection";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import OfferSection from "@/components/home/OfferSection";
import WhyMeSection from "@/components/home/WhyMeSection";
import ProcessSection from "@/components/PipelineSection";
import ProductsSection from "@/components/home/ProductsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/home/MobileCTABar";
import CursorFollower from "@/components/motion/CursorFollower";

const Index = () => {
  const { hash } = useLocation();

  // Arriving from another page via /#section: scroll to it once the page has rendered.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background text-foreground min-h-screen overflow-x-clip pb-20 md:pb-0">
        <Navbar />
        <main>
          <HeroSection />
          <ToolsMarquee />
          <JourneySection />
          <ServicesSection />
          <CaseStudiesSection />
          <OfferSection />
          <WhyMeSection />
          <ProcessSection />
          <ProductsSection />
          <ContactSection />
        </main>
        <Footer />
        <MobileCTABar />
        <CursorFollower />
      </div>
    </MotionConfig>
  );
};

export default Index;
