import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PaymentImporter } from "./PaymentImporter";
import { prepareItemsForImport, removeDuplicates } from "@/utils/deduplication";
import { Client } from "@/types/client";
import { Session } from "@/types/session";
import { Workshop } from "@/types/workshop";

interface DataImporterProps {
  userId: string;
}

export const DataImporter = ({ userId }: DataImporterProps) => {
  const { toast } = useToast();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Starting import process');
      const text = await file.text();
      const data = JSON.parse(text);
      console.log('Parsed data:', data);

      // Update profile
      if (data.profile) {
        console.log('Updating profile');
        const { error: profileError } = await supabase
          .from('profiles')
          .update(data.profile)
          .eq('id', userId);
          
        if (profileError) throw profileError;
      }

      // Update other data sequentially with deduplication
      if (data.clients?.length) {
        console.log('Importing clients');
        const { data: existingClients } = await supabase
          .from('clients')
          .select('*')
          .eq('coach_id', userId);

        const uniqueClients = removeDuplicates(
          data.clients,
          existingClients || [],
          ['first_name', 'last_name', 'email']
        );

        const preparedClients = prepareItemsForImport(uniqueClients, userId);
        const clientsToImport = preparedClients.map((client) => ({
          ...client,
          first_name: client.first_name || '',
          last_name: client.last_name || '',
        }));

        if (clientsToImport.length > 0) {
          const { error: clientsError } = await supabase
            .from('clients')
            .insert(clientsToImport);
          if (clientsError) throw clientsError;
        }
      }

      if (data.sessions?.length) {
        console.log('Importing sessions');
        const { data: existingSessions } = await supabase
          .from('sessions')
          .select('*')
          .eq('coach_id', userId);

        const uniqueSessions = removeDuplicates(
          data.sessions,
          existingSessions || [],
          ['title', 'start_time', 'end_time']
        );

        const preparedSessions = prepareItemsForImport(uniqueSessions, userId);
        const sessionsToImport = preparedSessions.map((session) => ({
          ...session,
          title: session.title || '',
          start_time: session.start_time || new Date().toISOString(),
          end_time: session.end_time || new Date().toISOString(),
        }));

        if (sessionsToImport.length > 0) {
          const { error: sessionsError } = await supabase
            .from('sessions')
            .insert(sessionsToImport);
          if (sessionsError) throw sessionsError;
        }
      }

      if (data.workshops?.length) {
        console.log('Importing workshops');
        const { data: existingWorkshops } = await supabase
          .from('workshops')
          .select('*')
          .eq('coach_id', userId);

        const uniqueWorkshops = removeDuplicates(
          data.workshops,
          existingWorkshops || [],
          ['title', 'category', 'difficulty']
        );

        const preparedWorkshops = prepareItemsForImport(uniqueWorkshops, userId);
        const workshopsToImport = preparedWorkshops.map((workshop) => ({
          ...workshop,
          title: workshop.title || '',
          category: workshop.category || '',
          difficulty: workshop.difficulty || '',
          duration: workshop.duration?.toString() || null,
        }));

        if (workshopsToImport.length > 0) {
          const { error: workshopsError } = await supabase
            .from('workshops')
            .insert(workshopsToImport);
          if (workshopsError) throw workshopsError;
        }
      }

      toast({
        title: "Import réussi",
        description: "Vos données ont été importées avec succès",
      });

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error: any) {
      console.error('Import error:', error);
      toast({
        title: "Erreur lors de l'import",
        description: error.message || "Une erreur est survenue lors de l'import des données",
        variant: "destructive",
      });
    }

    // Reset the input
    event.target.value = "";
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Importer des données
        </Button>
      </div>
      <PaymentImporter userId={userId} onSuccess={() => window.location.reload()} />
    </div>
  );
};