import { JsonImportExport } from "@/components/shared/JsonImportExport";
import { useSessionMutations } from "@/hooks/useSessionMutations";
import { Session } from "@/types/session";

interface SessionImportExportProps {
  sessions: Session[];
}

export const SessionImportExport = ({ sessions }: SessionImportExportProps) => {
  const { importSessions } = useSessionMutations();

  return (
    <JsonImportExport
      data={sessions}
      onImport={importSessions.mutateAsync}
      filename="sessions-export.json"
      type="sessions"
    />
  );
};