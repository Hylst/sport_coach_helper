import { DataImporter } from "@/components/import-export/DataImporter";
import { DataExporter } from "@/components/import-export/DataExporter";

interface ImportExportSectionProps {
  userId: string;
}

export const ImportExportSection = ({ userId }: ImportExportSectionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Import / Export des données</h2>
      <div className="flex gap-4">
        <DataExporter userId={userId} />
        <DataImporter userId={userId} />
      </div>
    </div>
  );
};