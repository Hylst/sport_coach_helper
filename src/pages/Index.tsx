import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { QuickActions } from "@/components/home/QuickActions";
import { HelpSection } from "@/components/home/HelpSection";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 p-4 md:p-8 animate-fade-in">
        <HeroSection />
        <FeaturesGrid />
        <QuickActions />
        <HelpSection />
        
        <footer className="text-center py-4 md:py-6 text-gray-500 text-sm">
          <p>Créé par Geoffroy Streit</p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;