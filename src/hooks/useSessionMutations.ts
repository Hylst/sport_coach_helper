import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SessionFormValues } from "@/components/sessions/SessionForm";
import { Session } from "@/types/session";
import { prepareItemsForImport, removeDuplicates } from "@/utils/deduplication";

type Periodicity = "once" | "daily" | "weekly" | "monthly";

export const useSessionMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createSession = useMutation({
    mutationFn: async (values: SessionFormValues) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const sessionData = {
        coach_id: userData.user.id,
        title: values.title,
        description: values.description,
        start_time: values.start_time,
        end_time: values.end_time,
        capacity: values.capacity,
        price: values.price,
        location: values.location,
        periodicity: values.periodicity as Periodicity,
        equipment: values.equipment,
        workshop_list: values.workshop_list,
      };

      const { error } = await supabase.from("sessions").insert(sessionData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast({
        title: "Success",
        description: "Session created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const importSessions = useMutation({
    mutationFn: async (data: Session[]) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data: existingSessions } = await supabase
        .from("sessions")
        .select("*")
        .eq("coach_id", userData.user.id);

      const uniqueSessions = removeDuplicates(
        data,
        existingSessions || [],
        ["title", "start_time", "end_time"]
      );

      const sessionsToImport = prepareItemsForImport(uniqueSessions, userData.user.id)
        .map(session => ({
          ...session,
          title: session.title || '',
          start_time: session.start_time || new Date().toISOString(),
          end_time: session.end_time || new Date().toISOString(),
          periodicity: (session.periodicity || 'once') as Periodicity,
        }));

      if (sessionsToImport.length === 0) {
        toast({
          title: "Info",
          description: "No new sessions to import - all sessions already exist",
        });
        return;
      }

      const { error } = await supabase.from("sessions").insert(sessionsToImport);
      if (error) throw error;

      toast({
        title: "Success",
        description: `Imported ${sessionsToImport.length} new sessions (${data.length - sessionsToImport.length} duplicates skipped)`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createSession,
    importSessions,
  };
};