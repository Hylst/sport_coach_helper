
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { FormActions } from "@/components/clients/form/FormActions";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types/client";
import { ImagePlus, X, Loader2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const groupFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().nullable(),
  members: z.array(z.string()).default([]),
  photo_url: z.string().nullable(),
  location: z.string().nullable(),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

interface GroupFormProps {
  onSubmit: (data: GroupFormValues) => void;
  onCancel: () => void;
  group?: {
    id: string;
    name: string;
    description: string | null;
    photo_url: string | null;
    location: string | null;
    session_group_members?: Array<{
      clients: {
        id: string;
      };
    }>;
  };
  isSubmitting?: boolean;
  mode?: 'view' | 'edit';
}

export const GroupForm = ({ 
  onSubmit, 
  onCancel, 
  group,
  isSubmitting = false,
  mode = 'edit'
}: GroupFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [clientOptions, setClientOptions] = useState<Array<{label: string, value: string}>>([]);
  
  // Extraire les membres du groupe pour les valeurs par défaut
  const defaultMembers = group?.session_group_members 
    ? group.session_group_members.map(member => member.clients.id) 
    : [];
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      members: defaultMembers,
      photo_url: group?.photo_url || null,
      location: group?.location || null,
    },
  });

  // Utiliser useQuery avec une clé stable
  const { data: clients = [], isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        const { data, error } = await supabase
          .from("clients")
          .select("id, first_name, last_name")
          .eq("coach_id", user.id);

        if (error) throw error;
        return data as Client[];
      } catch (error) {
        console.error("Error fetching clients:", error);
        return [];
      }
    },
    staleTime: 30000, // Cache les résultats pendant 30 secondes
    gcTime: 300000, // Garde les résultats en cache pendant 5 minutes
  });

  // Créer les options de clients séparément pour éviter les problèmes de rendu
  useEffect(() => {
    if (clients && clients.length > 0) {
      const options = clients.map((client) => ({
        label: `${client.first_name} ${client.last_name}`,
        value: client.id,
      }));
      setClientOptions(options);
    }
  }, [clients]);

  // Logging pour le débogage
  useEffect(() => {
    console.log("Group members:", defaultMembers);
    console.log("Form values:", form.getValues());
    console.log("Client options:", clientOptions);
  }, [defaultMembers, clientOptions, form]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Le fichier doit être une image",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('workshop-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('workshop-images')
        .getPublicUrl(filePath);

      form.setValue('photo_url', publicUrl);

      toast({
        title: "Succès",
        description: "Image téléchargée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    form.setValue('photo_url', null);
  };

  const isViewMode = mode === 'view';

  // Fonction pour gérer le submit en sécurisant les données
  const handleSafeSubmit = (values: GroupFormValues) => {
    // Assurez-vous que tous les champs sont correctement formatés
    const safeValues = {
      ...values,
      members: Array.isArray(values.members) ? values.members : [],
      description: values.description || null,
      photo_url: values.photo_url || null,
      location: values.location || null,
    };
    
    onSubmit(safeValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSafeSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du groupe</FormLabel>
              <Input {...field} disabled={isViewMode} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea 
                {...field} 
                value={field.value || ""} 
                onChange={(e) => field.onChange(e.target.value || null)}
                disabled={isViewMode} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo du groupe</FormLabel>
              <div className="space-y-4">
                {field.value && (
                  <div className="relative group w-32">
                    <img
                      src={field.value}
                      alt="Group photo"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    {!isViewMode && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
                {!isViewMode && !field.value && (
                  <div className="w-32 h-32 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isUploading}
                    />
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      ) : (
                        <ImagePlus className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu</FormLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  {...field} 
                  value={field.value || ""} 
                  onChange={(e) => field.onChange(e.target.value || null)}
                  className="pl-10" 
                  placeholder="Entrez le lieu du groupe"
                  disabled={isViewMode}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membres</FormLabel>
              {isLoadingClients ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Chargement des membres...</p>
                </div>
              ) : clientOptions.length > 0 ? (
                <MultiSelect
                  options={clientOptions}
                  value={field.value || []}
                  onChange={(value) => {
                    console.log("Changing members to:", value);
                    field.onChange(value);
                  }}
                  placeholder="Sélectionner des membres..."
                  disabled={isViewMode}
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun client disponible pour ce groupe
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {!isViewMode && (
          <FormActions
            onCancel={onCancel}
            isSubmitting={isSubmitting}
            isEditing={!!group}
          />
        )}
      </form>
    </Form>
  );
};
