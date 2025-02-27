import { Button } from "@/components/ui/button";
import { Library, Plus } from "lucide-react";
import { Workshop } from "@/types/workshop";
import { WorkshopImportExport } from "./WorkshopImportExport";

interface WorkshopHeaderProps {
  onNewWorkshop: () => void;
  workshops: Workshop[];
}

export const WorkshopHeader = ({ onNewWorkshop, workshops }: WorkshopHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Library className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Bibliothèque d'Ateliers</h1>
      </div>
      <div className="flex gap-4">
        <WorkshopImportExport workshops={workshops} />
        <Button onClick={onNewWorkshop}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel Atelier
        </Button>
      </div>
    </div>
  );
};