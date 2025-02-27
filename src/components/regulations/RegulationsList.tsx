import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_REGULATIONS = [
  "Annulation 24h à l'avance minimum sous peine de décompte de la séance",
  "Tenue de sport propre et adaptée obligatoire pour toutes les séances",
  "Bouteille d'eau personnelle requise pour chaque entraînement",
  "Certificat médical de moins de 3 mois obligatoire pour toute inscription",
  "Paiement mensuel à effectuer avant le 5 du mois en cours",
  "Arriver 5 minutes avant le début de la séance pour l'échauffement",
  "Respect des consignes de sécurité et du matériel mis à disposition",
  "Signalement immédiat de toute blessure ou douleur pendant la séance",
  "Les séances manquées dans un forfait mensuel ne sont pas reportables",
  "Réservation obligatoire pour les séances de groupe via l'application"
];

export const RegulationsList = () => {
  const [regulations, setRegulations] = useState<string[]>([]);
  const [newRegulation, setNewRegulation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedRegulations = localStorage.getItem('regulations');
    if (savedRegulations) {
      setRegulations(JSON.parse(savedRegulations));
    } else {
      setRegulations(DEFAULT_REGULATIONS);
      localStorage.setItem('regulations', JSON.stringify(DEFAULT_REGULATIONS));
    }
  }, []);

  const handleDelete = (index: number) => {
    const newRegulations = regulations.filter((_, i) => i !== index);
    setRegulations(newRegulations);
    localStorage.setItem('regulations', JSON.stringify(newRegulations));
    toast({
      title: "Règlement supprimé",
      description: "Le règlement a été supprimé avec succès",
    });
  };

  const handleReset = () => {
    setRegulations(DEFAULT_REGULATIONS);
    localStorage.setItem('regulations', JSON.stringify(DEFAULT_REGULATIONS));
    toast({
      title: "Règlements réinitialisés",
      description: "Les règlements ont été réinitialisés avec succès",
    });
  };

  const handleAdd = () => {
    if (newRegulation.trim()) {
      const updatedRegulations = [...regulations, newRegulation.trim()];
      setRegulations(updatedRegulations);
      localStorage.setItem('regulations', JSON.stringify(updatedRegulations));
      setNewRegulation("");
      setIsDialogOpen(false);
      toast({
        title: "Règlement ajouté",
        description: "Le nouveau règlement a été ajouté avec succès",
      });
    }
  };

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Règlement Intérieur</h2>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau règlement</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  placeholder="Entrez le nouveau règlement..."
                  value={newRegulation}
                  onChange={(e) => setNewRegulation(e.target.value)}
                />
                <Button onClick={handleAdd}>Ajouter</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {regulations.map((regulation, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="flex-1">{regulation}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};