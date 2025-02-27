import { Client } from "@/types/client";

interface ClientNotesProps {
  client: Client;
}

export const ClientNotes = ({ client }: ClientNotesProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Notes</h3>
      <p className="whitespace-pre-wrap break-words">{client.notes || "Aucune note"}</p>
    </div>
  );
};