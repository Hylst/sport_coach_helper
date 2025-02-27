
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonImportExport } from "@/components/shared/JsonImportExport";

interface PackageHeaderProps {
  packages: any[];
  onImport: (data: any[]) => Promise<void>;
  onNewPackage: () => void;
}

export const PackageHeader = ({ packages, onImport, onNewPackage }: PackageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Forfaits
      </h1>
      <div className="flex gap-4">
        <JsonImportExport
          data={packages}
          onImport={onImport}
          filename="forfaits.json"
          type="sessions"
          existingData={packages}
        />
        <Button
          onClick={onNewPackage}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau forfait
        </Button>
      </div>
    </div>
  );
};
