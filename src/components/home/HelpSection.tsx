import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export const HelpSection: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGuideClick = () => {
    navigate("/guide");
    toast({
      title: "Guide d'utilisation",
      description: "Accès au guide d'utilisation de l'application",
    });
  };

  return (
    <section className="text-center space-y-4 py-6 md:py-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-2">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Besoin d'aide ?</h2>
      </div>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
        Consultez notre guide d'utilisation pour tirer le meilleur parti de votre Assistant Coaching Sportif
      </p>
      <Button 
        variant="outline" 
        className="mt-2 md:mt-4 group"
        onClick={handleGuideClick}
      >
        Guide d'utilisation
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </section>
  );
};