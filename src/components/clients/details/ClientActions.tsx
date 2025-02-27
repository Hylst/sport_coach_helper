import { Button } from "@/components/ui/button";

interface ClientActionsProps {
  onClose: () => void;
  onEdit: () => void;
  onAttendance: () => void;
}

export const ClientActions = ({ onClose, onEdit, onAttendance }: ClientActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
      <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
        Fermer
      </Button>
      <Button 
        variant="secondary" 
        onClick={onAttendance}
        className="w-full sm:w-auto"
      >
        Enregistrer présence
      </Button>
      <Button onClick={onEdit} className="w-full sm:w-auto">
        Modifier
      </Button>
    </div>
  );
};