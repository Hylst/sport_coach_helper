
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PackageForm } from "./PackageForm";

interface PackageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPackage: any;
  onSubmit: (values: any) => Promise<void>;
  isSubmitting: boolean;
}

export const PackageDialog = ({
  isOpen,
  onOpenChange,
  selectedPackage,
  onSubmit,
  isSubmitting,
}: PackageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedPackage ? "Modifier le forfait" : "Nouveau forfait"}
          </DialogTitle>
        </DialogHeader>
        <PackageForm
          defaultValues={selectedPackage}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
