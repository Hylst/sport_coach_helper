import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Workshop } from "@/types/workshop";

export const useWorkshopMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const importWorkshops = useMutation({
    mutationFn: async (data: Workshop[]) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { error } = await supabase.from("workshops").insert(
        data.map((workshop) => ({
          ...workshop,
          coach_id: userData.user!.id,
        }))
      );

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });
      toast({
        title: "Succès",
        description: "Ateliers importés avec succès",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    importWorkshops,
  };
};