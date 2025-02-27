
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkshopFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export const WorkshopFilters = ({
  search,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCategory,
  onCategoryChange,
}: WorkshopFiltersProps) => {
  const hasActiveFilters = selectedDifficulty || selectedCategory;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un atelier..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className={cn(
              "w-[160px]",
              selectedDifficulty && "border-primary"
            )}>
              <SelectValue placeholder="Difficulté" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="Débutant">Débutant</SelectItem>
              <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
              <SelectItem value="Avancé">Avancé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className={cn(
              "w-[160px]",
              selectedCategory && "border-primary"
            )}>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="Force">Force</SelectItem>
              <SelectItem value="Cardio">Cardio</SelectItem>
              <SelectItem value="Souplesse">Souplesse</SelectItem>
              <SelectItem value="Équilibre">Équilibre</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                onDifficultyChange("all");
                onCategoryChange("all");
              }}
              className="animate-fade-in"
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
