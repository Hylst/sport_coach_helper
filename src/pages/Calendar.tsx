import { Layout } from "@/components/layout/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SessionForm } from "@/components/sessions/SessionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSessionMutations } from "@/hooks/useSessionMutations";
import { toast } from "sonner";
import { format, isEqual, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@/types/session";
import { CalendarImportExport } from "@/components/calendar/CalendarImportExport";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createSession } = useSessionMutations();

  const { data: sessions = [], isLoading } = useQuery({
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

  const filteredSessions = sessions.filter((session) => 
    date && isEqual(startOfDay(new Date(session.start_time)), startOfDay(date))
  );

  const handleCreateSession = async (values: any) => {
    try {
      await createSession.mutateAsync(values);
      setIsDialogOpen(false);
      toast.success("Séance créée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création de la séance");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Calendrier des Séances</h1>
          <div className="flex gap-4">
            <CalendarImportExport sessions={sessions} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Séance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle séance</DialogTitle>
                </DialogHeader>
                <SessionForm 
                  onSubmit={handleCreateSession}
                  defaultValues={date ? {
                    start_time: format(date, "yyyy-MM-dd'T'HH:mm"),
                    end_time: format(new Date(date.getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
                  } : undefined}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sélectionner une date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={fr}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Séances du {date ? format(date, "d MMMM yyyy", { locale: fr }) : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-muted-foreground">Chargement des séances...</p>
              ) : filteredSessions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Horaire</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Capacité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          {format(new Date(session.start_time), "HH:mm")} - {format(new Date(session.end_time), "HH:mm")}
                        </TableCell>
                        <TableCell>{session.title}</TableCell>
                        <TableCell>{session.description}</TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>{session.capacity} personne(s)</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">
                  Aucune séance programmée pour cette date
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;