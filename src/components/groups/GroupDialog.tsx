
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GroupForm } from "./form/GroupForm";
import { useState } from "react";

interface GroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  group?: any;
  mode?: 'view' | 'edit';
}

export function GroupDialog({ 
  open, 
  onOpenChange, 
  onSuccess, 
  group,
  mode = 'edit'
}: GroupDialogProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Utilisateur non connecté");
      }
      
      if (group) {
        // Update existing group
        const { error: groupError } = await supabase
          .from("session_groups")
          .update({
            name: values.name,
            description: values.description,
            photo_url: values.photo_url,
            location: values.location,
          })
          .eq("id", group.id);

        if (groupError) throw groupError;

        // Delete existing members
        const { error: deleteError } = await supabase
          .from("session_group_members")
          .delete()
          .eq("group_id", group.id);

        if (deleteError) throw deleteError;

        // Add new members
        if (values.members?.length) {
          const membersToAdd = values.members.map((clientId: string) => ({
            group_id: group.id,
            client_id: clientId,
          }));

          const { error: membersError } = await supabase
            .from("session_group_members")
            .insert(membersToAdd);

          if (membersError) throw membersError;
        }
      } else {
        // Create new group
        const { data: newGroup, error: groupError } = await supabase
          .from("session_groups")
          .insert([
            {
              name: values.name,
              description: values.description,
              photo_url: values.photo_url,
              location: values.location,
              coach_id: user.id,
            },
          ])
          .select()
          .single();

        if (groupError) throw groupError;

        if (values.members?.length && newGroup) {
          const membersToAdd = values.members.map((clientId: string) => ({
            group_id: newGroup.id,
            client_id: clientId,
          }));

          const { error: membersError } = await supabase
            .from("session_group_members")
            .insert(membersToAdd);

          if (membersError) throw membersError;
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      onSuccess();
    } catch (error) {
      console.error("Error saving group:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'view' ? (group?.name || "Détails du groupe") : (group ? "Modifier le groupe" : "Créer un nouveau groupe")}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' ? 
              "Détails du groupe" :
              (group 
                ? "Modifiez les informations du groupe et ses membres."
                : "Créez un nouveau groupe et ajoutez des membres.")}
          </DialogDescription>
        </DialogHeader>
        <GroupForm 
          group={group}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
