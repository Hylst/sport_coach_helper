import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Info, Plus, AlertCircle, Clock, FileText, Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export const QuickActions: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions = [
    {
      title: "Nouveau Client",
      icon: Plus,
      color: "text-blue-500",
      link: "/clients",
      variant: "default" as const,
      onClick: () => navigate("/clients")
    },
    {
      title: "Nouveau Forfait",
      icon: Package,
      color: "text-purple-500",
      link: "/packages",
      variant: "default" as const,
      onClick: () => navigate("/packages")
    },
    {
      title: "Nouvelle Séance",
      icon: Clock,
      color: "text-green-500",
      link: "/sessions",
      variant: "default" as const,
      onClick: () => navigate("/sessions")
    },
    {
      title: "Paiements en Retard",
      icon: AlertCircle,
      color: "text-red-500",
      link: "/payments?filter=late",
      variant: "destructive" as const,
      onClick: () => {
        navigate("/payments?filter=late");
        toast({
          title: "Filtrage des paiements",
          description: "Affichage des paiements en retard uniquement",
        });
      }
    },
    {
      title: "Timer",
      icon: Clock,
      color: "text-orange-500",
      link: "/timer",
      variant: "secondary" as const,
      onClick: () => navigate("/timer")
    },
    {
      title: "Guide",
      icon: FileText,
      color: "text-purple-500",
      link: "/guide",
      variant: "outline" as const,
      onClick: () => navigate("/guide")
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6 transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center gap-2">
        <Info className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        Actions Rapides
      </h2>
      <div className="flex flex-wrap gap-2 md:gap-4">
        {quickActions.map((action) => (
          <Button 
            key={action.title}
            onClick={action.onClick}
            variant={action.variant}
            className="shadow-sm hover:shadow-md transition-all duration-300 text-sm md:text-base py-2 px-3 md:py-2 md:px-4"
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.title}
          </Button>
        ))}
      </div>
    </section>
  );
};