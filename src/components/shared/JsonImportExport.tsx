import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { downloadJson, readJsonFile } from "@/utils/jsonUtils";
import { useToast } from "@/components/ui/use-toast";
import { validateClientImport } from "@/schemas/clientImportSchema";
import { validateSessionImport, validateWorkshopImport, validatePaymentImport } from "@/schemas/importSchemas";
import { removeDuplicates, deduplicationCriteria } from "@/utils/deduplication";

export type ValidationType = "clients" | "sessions" | "workshops" | "payments" | "groups";

export interface JsonImportExportProps {
  data: any;
  onImport: (data: any) => Promise<void>;
  filename: string;
  type: ValidationType;
  existingData?: any[];
}

export const JsonImportExport = ({ 
  data, 
  onImport, 
  filename,
  type,
  existingData = []
}: JsonImportExportProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    downloadJson(data, filename);
    toast({
      title: "Export réussi",
      description: "Les données ont été exportées avec succès",
    });
  };

  const validateData = (data: unknown, type: ValidationType) => {
    switch (type) {
      case "clients":
        return validateClientImport(data);
      case "sessions":
        return validateSessionImport(data);
      case "workshops":
        return validateWorkshopImport(data);
      case "payments":
        return validatePaymentImport(data);
      default:
        throw new Error("Type de validation non supporté");
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const jsonData = await readJsonFile(file);
      const validation = validateData(jsonData, type);
      
      if (validation.errorCount > 0) {
        const errorMessage = validation.errors.map(
          err => `Ligne ${err.index + 1}: ${err.errors.join(", ")}`
        ).join("\n");
        
        toast({
          title: `Import partiellement réussi (${validation.validCount}/${validation.totalCount})`,
          description: `Certaines entrées n'ont pas pu être importées:\n${errorMessage}`,
          variant: "destructive",
        });
        
        if (validation.validCount > 0) {
          const validData = validation[`valid${type.charAt(0).toUpperCase() + type.slice(1)}s`];
          const criteria = deduplicationCriteria[type];
          const deduplicatedData = removeDuplicates(
            validData,
            existingData,
            [...criteria]
          );
          
          if (deduplicatedData.length === 0) {
            toast({
              title: "Aucune nouvelle donnée à importer",
              description: "Toutes les entrées existent déjà dans la base de données",
              variant: "destructive",
            });
            return;
          }
          
          await onImport(deduplicatedData);
          
          toast({
            title: "Import réussi",
            description: `${deduplicatedData.length} nouvelles entrées ont été importées`,
          });
        }
        return;
      }
      
      const validData = validation[`valid${type.charAt(0).toUpperCase() + type.slice(1)}s`];
      const criteria = deduplicationCriteria[type];
      const deduplicatedData = removeDuplicates(
        validData,
        existingData,
        [...criteria]
      );
      
      if (deduplicatedData.length === 0) {
        toast({
          title: "Aucune nouvelle donnée à importer",
          description: "Toutes les entrées existent déjà dans la base de données",
          variant: "destructive",
        });
        return;
      }
      
      await onImport(deduplicatedData);
      
      toast({
        title: "Import réussi",
        description: `${deduplicatedData.length} nouvelles entrées ont été importées`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'import",
        variant: "destructive",
      });
    }

    event.target.value = "";
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleExport}>
        <Download className="w-4 h-4 mr-2" />
        Exporter
      </Button>
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Importer
        </Button>
      </div>
    </div>
  );
};