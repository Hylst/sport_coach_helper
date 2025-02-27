import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, Calendar, DollarSign, Dumbbell, Timer, 
  UserCircle, ClipboardList 
} from "lucide-react";

export const UserGuide = () => {
  const sections = [
    {
      title: "Gestion du Profil Coach",
      icon: UserCircle,
      content: [
        "Accédez à votre profil via l'onglet 'Profil'",
        "Personnalisez vos informations : photo, bio, spécialités, certifications",
        "Ajoutez vos coordonnées et liens réseaux sociaux",
        "Importez/exportez vos données de profil"
      ]
    },
    {
      title: "Gestion des Clients",
      icon: Users,
      content: [
        "Créez des fiches clients détaillées",
        "Suivez leur progression (séances effectuées)",
        "Gérez les tarifs personnalisés",
        "Consultez l'historique des séances",
        "Importez/exportez votre base clients"
      ]
    },
    {
      title: "Planification des Séances",
      icon: ClipboardList,
      content: [
        "Créez des séances individuelles ou collectives",
        "Définissez la capacité, le lieu, et le tarif",
        "Gérez la périodicité des séances",
        "Associez des ateliers aux séances",
        "Visualisez votre planning hebdomadaire",
        "Importez/exportez vos séances"
      ]
    },
    {
      title: "Suivi des Paiements",
      icon: DollarSign,
      content: [
        "Enregistrez les paiements clients",
        "Suivez les règlements en attente",
        "Gérez différents modes de paiement",
        "Générez des rapports de paiement",
        "Importez/exportez les données de paiement"
      ]
    },
    {
      title: "Bibliothèque d'Ateliers",
      icon: Dumbbell,
      content: [
        "Créez une base d'exercices personnalisée",
        "Catégorisez par type et niveau",
        "Ajoutez des illustrations et descriptions",
        "Réutilisez les ateliers dans vos séances",
        "Importez/exportez votre catalogue"
      ]
    },
    {
      title: "Calendrier",
      icon: Calendar,
      content: [
        "Vue d'ensemble de votre planning",
        "Gestion des séances récurrentes",
        "Visualisation rapide des disponibilités",
        "Importez/exportez les données du calendrier"
      ]
    },
    {
      title: "Chronomètre",
      icon: Timer,
      content: [
        "Minutez vos séances d'entraînement",
        "Gérez les temps de repos",
        "Notifications sonores"
      ]
    }
  ];

  return (
    <ScrollArea className="h-[80vh] pr-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Guide d'utilisation</h1>
          <p className="text-muted-foreground">
            Découvrez toutes les fonctionnalités de votre Assistant Coaching Sportif
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-primary" />
                  <span>{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="ml-9 space-y-2 list-disc text-muted-foreground">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};