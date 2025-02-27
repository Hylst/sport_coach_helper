import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "@/types/client";
import { useState } from "react";
import { SessionAttendanceDialog } from "./SessionAttendanceDialog";
import { ClientHeader } from "./details/ClientHeader";
import { ClientBasicInfo } from "./details/ClientBasicInfo";
import { ClientPersonalInfo } from "./details/ClientPersonalInfo";
import { ClientProgramInfo } from "./details/ClientProgramInfo";
import { ClientNotes } from "./details/ClientNotes";
import { ClientActions } from "./details/ClientActions";

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
  onEdit: () => void;
}

export const ClientDetails = ({ client, onClose, onEdit }: ClientDetailsProps) => {
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);

  return (
    <>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du client</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 px-1">
          <ClientHeader client={client} />
          <ClientBasicInfo client={client} />
          <ClientPersonalInfo client={client} />
          <ClientProgramInfo client={client} />
          <ClientNotes client={client} />
          <ClientActions 
            onClose={onClose}
            onEdit={onEdit}
            onAttendance={() => setShowAttendanceDialog(true)}
          />
        </div>
      </DialogContent>

      <Dialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <SessionAttendanceDialog 
          client={client}
          onClose={() => setShowAttendanceDialog(false)}
        />
      </Dialog>
    </>
  );
};