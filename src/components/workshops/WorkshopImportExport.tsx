import { JsonImportExport } from "@/components/shared/JsonImportExport";
import { useWorkshopMutations } from "@/hooks/useWorkshopMutations";
import { Workshop } from "@/types/workshop";

interface WorkshopImportExportProps {
  workshops: Workshop[];
}

export const WorkshopImportExport = ({ workshops }: WorkshopImportExportProps) => {
  const { importWorkshops } = useWorkshopMutations();

  return (
    <JsonImportExport
      data={workshops}
      onImport={importWorkshops.mutateAsync}
      filename="workshops-export.json"
      type="workshops"
    />
  );
};