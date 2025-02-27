import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface WorkshopFormValues {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  muscles?: string[];
  duration?: string;
  rest_time?: string;
  precautions?: string;
  equipment?: string[];
  locations?: string[];
  variations?: string[];
  media_urls?: string[];
}

interface WorkshopCardProps {
  workshop: WorkshopFormValues;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const WorkshopDetails = ({ workshop }: { workshop: WorkshopFormValues }) => {
  return (
    <div className="space-y-6">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src={workshop.media_urls?.[0] || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"}
          alt={workshop.title}
          className="object-cover w-full h-full rounded-lg"
        />
      </AspectRatio>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
            {workshop.category}
          </span>
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
            {workshop.difficulty}
          </span>
        </div>

        {workshop.description && (
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground">{workshop.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workshop.duration && (
            <div>
              <h4 className="font-semibold mb-2">Durée</h4>
              <p className="text-muted-foreground">{workshop.duration} minutes</p>
            </div>
          )}

          {workshop.rest_time && (
            <div>
              <h4 className="font-semibold mb-2">Temps de repos</h4>
              <p className="text-muted-foreground">{workshop.rest_time} minutes</p>
            </div>
          )}
        </div>

        {workshop.muscles && workshop.muscles.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Muscles ciblés</h4>
            <div className="flex flex-wrap gap-1">
              {workshop.muscles.map((muscle, index) => (
                <span
                  key={index}
                  className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-sm"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {workshop.equipment && workshop.equipment.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Équipement nécessaire</h4>
            <div className="flex flex-wrap gap-1">
              {workshop.equipment.map((item, index) => (
                <span
                  key={index}
                  className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {workshop.locations && workshop.locations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Lieux</h4>
            <div className="flex flex-wrap gap-1">
              {workshop.locations.map((location, index) => (
                <span
                  key={index}
                  className="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        )}

        {workshop.variations && workshop.variations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Variations</h4>
            <div className="flex flex-wrap gap-1">
              {workshop.variations.map((variation, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm"
                >
                  {variation}
                </span>
              ))}
            </div>
          </div>
        )}

        {workshop.precautions && (
          <div>
            <h4 className="font-semibold mb-2">Précautions</h4>
            <p className="text-muted-foreground">{workshop.precautions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const WorkshopCard = ({ workshop, onEdit, onDelete }: WorkshopCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const defaultImage = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800";

  return (
    <>
      <Card 
        className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
        onClick={() => setShowDetails(true)}
      >
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={workshop.media_urls?.[0] || defaultImage}
            alt={workshop.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{workshop.title}</CardTitle>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(workshop.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                {workshop.category}
              </span>
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                {workshop.difficulty}
              </span>
            </div>

            {workshop.description && (
              <p className="text-muted-foreground line-clamp-2">{workshop.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{workshop.title}</DialogTitle>
          </DialogHeader>
          <WorkshopDetails workshop={workshop} />
        </DialogContent>
      </Dialog>
    </>
  );
};