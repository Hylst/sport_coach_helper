import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Client, ClientFormData } from "@/types/client";
import { ClientForm } from "./form/ClientForm";

interface ClientDialogProps {
  client?: Client;
  onClose: () => void;
}

export const ClientDialog = ({ client, onClose }: ClientDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createClient = useMutation({
    mutationFn: async (data: ClientFormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data: newClient, error } = await supabase
        .from("clients")
        .insert([{ ...data, coach_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return newClient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Client ajouté",
        description: "Le nouveau client a été ajouté avec succès.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le client: " + error.message,
        variant: "destructive",
      });
    },
  });

  const updateClient = useMutation({
    mutationFn: async (data: ClientFormData) => {
      if (!client) throw new Error("No client to update");

      const { error } = await supabase
        .from("clients")
        .update(data)
        .eq("id", client.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Client mis à jour",
        description: "Les informations du client ont été mises à jour avec succès.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le client: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: ClientFormData) => {
    if (client) {
      updateClient.mutate(data);
    } else {
      createClient.mutate(data);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {client ? "Modifier le client" : "Nouveau client"}
        </DialogTitle>
      </DialogHeader>
      <ClientForm
        client={client}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={createClient.isPending || updateClient.isPending}
      />
    </DialogContent>
  );
};