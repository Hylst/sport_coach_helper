
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Pencil, Eye, Trash2, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GroupDialog } from "./GroupDialog";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Group {
  id: string;
  name: string;
  description: string | null;
  photo_url: string | null;
  location: string | null;
  created_at: string;
  session_group_members: {
    clients: {
      id: string;
    }
  }[];
}

export function GroupList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Utiliser React Query pour gérer les données et l'état de chargement
  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("session_groups")
        .select("*, session_group_members(clients(id, first_name, last_name))");

      if (error) throw error;
      return data as Group[];
    },
    staleTime: 30000, // Cache les résultats pendant 30 secondes
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("session_groups")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Groupe supprimé",
        description: "Le groupe a été supprimé avec succès",
      });
      
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groups?.map((group) => (
        <Card key={group.id} className="overflow-hidden">
          <div 
            className="h-32 bg-center bg-cover bg-gray-100" 
            style={{ backgroundImage: group.photo_url ? `url(${group.photo_url})` : 'none' }}
          >
            {!group.photo_url && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User className="w-12 h-12" />
              </div>
            )}
          </div>
          <CardHeader className="p-4">
            <CardTitle>{group.name}</CardTitle>
            <CardDescription className="flex items-center text-xs">
              {group.location && (
                <>
                  <MapPin className="w-3 h-3 mr-1" />
                  {group.location}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="mb-4 text-sm text-gray-600 line-clamp-2">
              {group.description || "Aucune description"}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">
                {group.session_group_members?.length || 0} membre(s)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setSelectedGroup(group);
                  setIsViewDialogOpen(true);
                }}
              >
                <Eye className="w-4 h-4 mr-1" /> Voir
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => {
                  setSelectedGroup(group);
                  setIsEditDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4 mr-1" /> Modifier
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleDelete(group.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {groups?.length === 0 && (
        <div className="col-span-3 text-center py-10">
          <p className="text-muted-foreground">Aucun groupe trouvé. Créez votre premier groupe!</p>
        </div>
      )}

      {selectedGroup && (
        <>
          <GroupDialog
            open={isViewDialogOpen}
            onOpenChange={setIsViewDialogOpen}
            group={selectedGroup}
            mode="view"
            onSuccess={() => setIsViewDialogOpen(false)}
          />

          <GroupDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            group={selectedGroup}
            onSuccess={() => {
              setIsEditDialogOpen(false);
              queryClient.invalidateQueries({ queryKey: ["groups"] });
              toast({
                title: "Groupe mis à jour",
                description: "Le groupe a été mis à jour avec succès",
              });
            }}
          />
        </>
      )}
    </div>
  );
}
