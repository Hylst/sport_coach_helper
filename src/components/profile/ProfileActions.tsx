import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProfileActionsProps {
  editMode: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileActions = ({ 
  editMode, 
  isLoading, 
  onCancel, 
  onSubmit 
}: ProfileActionsProps) => {
  if (!editMode) return null;

  return (
    <div className="flex justify-end space-x-4 mt-6 animate-fade-in">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="hover:shadow-md transition-shadow"
      >
        Annuler
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className="shadow-lg hover:shadow-xl transition-shadow"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enregistrement...
          </>
        ) : (
          'Enregistrer'
        )}
      </Button>
    </div>
  );
};