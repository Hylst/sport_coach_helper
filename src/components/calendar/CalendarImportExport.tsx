import { JsonImportExport } from "@/components/shared/JsonImportExport";
import { useSessionMutations } from "@/hooks/useSessionMutations";
import { Session } from "@/types/session";

interface CalendarImportExportProps {
  sessions: Session[];
}

export const CalendarImportExport = ({ sessions }: CalendarImportExportProps) => {
  const { importSessions } = useSessionMutations();

  return (
    <JsonImportExport
      data={sessions}
      onImport={importSessions.mutateAsync}
      filename="calendar-sessions-export.json"
      type="sessions"
    />
  );
};