import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SessionForm } from "@/components/sessions/SessionForm";
import { SessionTable } from "@/components/sessions/SessionTable";
import { Session } from "@/types/session";
import { SessionCard } from "@/components/sessions/SessionCard";
import { SessionImportExport } from "@/components/sessions/SessionImportExport";

const Sessions = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | undefined>();
  const [viewMode, setViewMode] = useState<"create" | "view" | "edit">("create");

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("coach_id", user.id);

      if (error) throw error;
      return data as Session[];
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      if (viewMode === "edit" && selectedSession) {
        const { error } = await supabase
          .from("sessions")
          .update({ ...values, coach_id: user.id })
          .eq("id", selectedSession.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Session modifiée avec succès",
        });
      } else {
        const { error } = await supabase
          .from("sessions")
          .insert([{ ...values, coach_id: user.id }]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Session créée avec succès",
        });
      }
      
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleView = (session: Session) => {
    setSelectedSession(session);
    setViewMode("view");
    setIsDialogOpen(true);
  };

  const handleEdit = (session: Session) => {
    setSelectedSession(session);
    setViewMode("edit");
    setIsDialogOpen(true);
  };

  const handleDelete = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from("sessions")
        .delete()
        .eq("id", sessionId);

      if (error) throw error;

      toast({
        title: "Session supprimée",
        description: "La session a été supprimée avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Mes Sessions</h1>
          <div className="flex gap-4">
            <SessionImportExport sessions={sessions || []} />
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setSelectedSession(undefined);
                setViewMode("create");
              }
            }}>
              <Button onClick={() => {
                setSelectedSession(undefined);
                setViewMode("create");
                setIsDialogOpen(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Session
              </Button>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {viewMode === "create" ? "Nouvelle Session" : 
                     viewMode === "view" ? "Détails de la Session" : 
                     "Modifier la Session"}
                  </DialogTitle>
                  <DialogDescription>
                    {viewMode === "view" ? 
                      "Consultez les détails de la session" : 
                      "Remplissez les informations de la session"}
                  </DialogDescription>
                </DialogHeader>
                {viewMode === "view" && selectedSession ? (
                  <SessionCard session={selectedSession} />
                ) : (
                  <SessionForm 
                    onSubmit={handleSubmit} 
                    defaultValues={viewMode === "edit" ? selectedSession : undefined}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <SessionTable
                sessions={sessions || []}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Sessions;