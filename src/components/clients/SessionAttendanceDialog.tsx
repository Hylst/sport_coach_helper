import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types/client";
import { Session } from "@/types/session";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SessionAttendanceDialogProps {
  client: Client;
  onClose: () => void;
}

export const SessionAttendanceDialog = ({ client, onClose }: SessionAttendanceDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  const loadSessions = async () => {
    const { data: sessionsData, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("coach_id", client.coach_id);

    if (error) throw error;
    setSessions(sessionsData);
  };

  const recordAttendance = useMutation({
    mutationFn: async () => {
      if (!selectedSession) throw new Error("Aucune séance sélectionnée");

      const { error } = await supabase.from("session_attendance").insert({
        client_id: client.id,
        session_id: selectedSession.id,
        price: client.price_per_session || selectedSession.price || 0,
        attendance_date: new Date().toISOString(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Présence enregistrée",
        description: "La présence a été enregistrée avec succès.",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enregistrer une présence</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Séance
          </label>
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={(e) => {
              const session = sessions.find(s => s.id === e.target.value);
              setSelectedSession(session || null);
            }}
            value={selectedSession?.id || ""}
          >
            <option value="">Sélectionner une séance</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.title} - {format(new Date(session.start_time), "dd/MM/yyyy HH:mm", { locale: fr })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <Input
            type="number"
            value={client.price_per_session || ""}
            disabled
            className="bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            Prix personnalisé du client
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={() => recordAttendance.mutate()}
            disabled={!selectedSession || recordAttendance.isPending}
          >
            Enregistrer la présence
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};