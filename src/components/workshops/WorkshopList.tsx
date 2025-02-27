
import { Workshop } from "@/types/workshop";
import { WorkshopCard } from "./WorkshopCard";
import { Loader2, BookOpen } from "lucide-react";

interface WorkshopListProps {
  workshops: Workshop[] | undefined;
  isLoading: boolean;
  onEdit: (workshop: Workshop) => void;
  onDelete: (id: string) => void;
  hasActiveFilters: boolean;
}

export const WorkshopList = ({
  workshops,
  isLoading,
  onEdit,
  onDelete,
  hasActiveFilters,
}: WorkshopListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!workshops?.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg mt-8">
        <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-xl mb-2">Aucun atelier trouvé</h3>
        <p className="text-muted-foreground max-w-sm">
          {hasActiveFilters
            ? "Essayez de modifier vos filtres de recherche"
            : "Commencez par créer votre premier atelier"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
      {workshops.map((workshop) => (
        <WorkshopCard
          key={workshop.id}
          workshop={workshop}
          onEdit={() => onEdit(workshop)}
          onDelete={() => onDelete(workshop.id)}
        />
      ))}
    </div>
  );
};
