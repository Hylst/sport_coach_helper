import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DataExporterProps {
  userId: string;
}

export const DataExporter = ({ userId }: DataExporterProps) => {
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      // Fetch profile with explicit Accept header
      let profileData;
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // No profile found, create an empty one
          const emptyProfile = {
            id: userId,
            first_name: null,
            last_name: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([emptyProfile]);
          
          if (insertError) throw insertError;
          profileData = emptyProfile;
        } else {
          throw profileError;
        }
      } else {
        profileData = profile;
      }

      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('coach_id', userId);

      if (clientsError) throw clientsError;

      const { data: sessions, error: sessionsError } = await supabase
        .from('sessions')
        .select('*')
        .eq('coach_id', userId);

      if (sessionsError) throw sessionsError;

      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('coach_id', userId);

      if (paymentsError) throw paymentsError;

      const { data: workshops, error: workshopsError } = await supabase
        .from('workshops')
        .select('*')
        .eq('coach_id', userId);

      if (workshopsError) throw workshopsError;

      const exportData = {
        profile: profileData || {},
        clients: clients || [],
        sessions: sessions || [],
        payments: payments || [],
        workshops: workshops || [],
        exportDate: new Date().toISOString()
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `coach-data-export-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export réussi",
        description: "Vos données ont été exportées avec succès",
      });
    } catch (error: any) {
      console.error('Export error:', error);
      toast({
        title: "Erreur lors de l'export",
        description: error.message || "Une erreur est survenue lors de l'export des données",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="w-4 h-4 mr-2" />
      Exporter toutes les données
    </Button>
  );
};