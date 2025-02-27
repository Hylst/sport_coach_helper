
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Clock, Calendar, Users } from "lucide-react";
import { formatPrice } from "@/utils/format";

interface PackageCardProps {
  package: {
    name: string;
    description?: string | null;
    number_of_sessions: number;
    validity_days: number;
    price: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const PackageCard = ({ package: pkg, onEdit, onDelete }: PackageCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pkg.name}</CardTitle>
            {pkg.description && (
              <CardDescription className="mt-2">{pkg.description}</CardDescription>
            )}
          </div>
          <Badge variant="secondary" className="text-lg">
            {formatPrice(pkg.price)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-gray-500">Durée de validité</p>
              <p className="text-lg font-semibold">{pkg.validity_days} jours</p>
            </div>
          </div>
          {pkg.number_of_sessions > 0 && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-gray-500">Nombre de séances</p>
                <p className="text-lg font-semibold">{pkg.number_of_sessions}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
