import { FC } from 'react';
import { Users, Calendar, DollarSign, Dumbbell, Package } from "lucide-react";
import { FeatureCard } from './FeatureCard';
import { useNavigate } from 'react-router-dom';

export const FeaturesGrid: FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Gestion des Clients",
      description: "Gérez efficacement vos clients et leur progression",
      icon: Users,
      color: "text-blue-500",
      link: "/clients"
    },
    {
      title: "Planning des Séances",
      description: "Organisez vos séances et suivez votre emploi du temps",
      icon: Calendar,
      color: "text-green-500",
      link: "/sessions"
    },
    {
      title: "Forfaits & Prestations",
      description: "Gérez vos offres et tarifs",
      icon: Package,
      color: "text-purple-500",
      link: "/packages"
    },
    {
      title: "Catalogue d'Exercices",
      description: "Accédez à votre bibliothèque d'exercices personnalisée",
      icon: Dumbbell,
      color: "text-orange-500",
      link: "/workshops"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          color={feature.color}
          onClick={() => navigate(feature.link)}
          delay={index * 100}
        />
      ))}
    </section>
  );
};