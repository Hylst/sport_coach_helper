import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  delay: number;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  delay
}) => {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in"
      onClick={onClick}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <CardHeader className="flex flex-row items-center space-x-4 relative p-4 md:p-6">
        <div className={`p-2 md:p-3 rounded-lg ${color} bg-opacity-10 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
        </div>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute right-4 md:right-6 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </CardHeader>
      <CardContent className="pt-2 md:pt-4 p-4 md:p-6">
        <p className="text-sm md:text-base text-gray-600 break-words">{description}</p>
      </CardContent>
    </Card>
  );
};