
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Workshop, WorkshopFormValues } from "@/types/workshop";
import { useToast } from "@/components/ui/use-toast";

export const useWorkshops = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const { data: workshops, isLoading } = useQuery({
    queryKey: ["workshops"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .eq("coach_id", user.id);

      if (error) throw error;
      return data as Workshop[];
    },
  });

  const handleCreate = async (values: WorkshopFormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const workshopData = {
        ...values,
        coach_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("workshops")
        .insert([workshopData]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Atelier créé avec succès",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (values: WorkshopFormValues) => {
    try {
      if (!selectedWorkshop) return;

      const { error } = await supabase
        .from("workshops")
        .update({
          ...values,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedWorkshop.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Atelier mis à jour avec succès",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workshops")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Atelier supprimé avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredWorkshops = workshops?.filter((workshop) => {
    const matchesSearch = search === "" || 
      workshop.title.toLowerCase().includes(search.toLowerCase()) ||
      workshop.description?.toLowerCase().includes(search.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === "all" || 
      workshop.difficulty === selectedDifficulty;
    
    const matchesCategory = selectedCategory === "all" || 
      workshop.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return {
    workshops: filteredWorkshops,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    selectedWorkshop,
    setSelectedWorkshop,
    search,
    setSearch,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
