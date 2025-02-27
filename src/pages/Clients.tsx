import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { UserPlus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ClientDialog } from "@/components/clients/ClientDialog";
import { ClientTable } from "@/components/clients/ClientTable";
import { ClientDetails } from "@/components/clients/ClientDetails";
import { Client } from "@/types/client";
import { JsonImportExport } from "@/components/shared/JsonImportExport";
import { validateClientImport } from "@/schemas/clientImportSchema";

const Clients = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("coach_id", user.id);

      if (error) throw error;
      return data as Client[];
    },
  });

  const importClients = useMutation({
    mutationFn: async (importedClients: any[]) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Add coach_id to each client
      const clientsWithCoachId = importedClients.map(client => ({
        ...client,
        coach_id: user.id,
        // Remove id to let Supabase generate new ones
        id: undefined,
        created_at: undefined,
        updated_at: undefined
      }));

      const { error } = await supabase
        .from("clients")
        .insert(clientsWithCoachId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const deleteClient = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le client: " + error.message,
        variant: "destructive",
      });
    },
  });

  const filteredClients = clients?.filter(
    (client) =>
      client.first_name.toLowerCase().includes(search.toLowerCase()) ||
      client.last_name.toLowerCase().includes(search.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.toLowerCase()) ||
      client.phone?.includes(search)
  );

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsViewDialogOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Mes Clients</h1>
          <div className="flex gap-4">

<JsonImportExport
  data={clients}
  onImport={importClients.mutateAsync}
  filename="clients.json"
  type="clients"
/>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nouveau Client
                </Button>
              </DialogTrigger>
              <ClientDialog
                client={selectedClient}
                onClose={() => {
                  setIsDialogOpen(false);
                  setSelectedClient(undefined);
                }}
              />
            </Dialog>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <ClientTable
                clients={filteredClients || []}
                onEdit={handleEdit}
                onDelete={(clientId) => deleteClient.mutate(clientId)}
                onView={handleView}
              />
            )}
          </div>
        </Card>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedClient && (
          <ClientDetails
            client={selectedClient}
            onClose={() => {
              setIsViewDialogOpen(false);
              setSelectedClient(undefined);
            }}
            onEdit={() => {
              setIsViewDialogOpen(false);
              setIsDialogOpen(true);
            }}
          />
        )}
      </Dialog>
    </Layout>
  );
};

export default Clients;
