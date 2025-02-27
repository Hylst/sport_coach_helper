import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Session } from "@/types/session";
import { format, differenceInMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SessionTableProps {
  sessions: Session[];
  onView: (session: Session) => void;
  onEdit: (session: Session) => void;
  onDelete: (sessionId: string) => void;
}

export const SessionTable = ({ sessions, onView, onEdit, onDelete }: SessionTableProps) => {
  const queryClient = useQueryClient();

  const handleDelete = async (sessionId: string) => {
    await onDelete(sessionId);
    queryClient.invalidateQueries({ queryKey: ['sessions'] });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Informations</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow 
              key={session.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onView(session)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.illustration_url || ''} alt={session.title} />
                  <AvatarFallback>{session.title.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Lieu:</span> {session.location}
                    </div>
                    <div>
                      <span className="font-medium">Horaire:</span> {format(new Date(session.start_time), "HH:mm")}
                    </div>
                    <div>
                      <span className="font-medium">Périodicité:</span> {session.periodicity}
                    </div>
                    <div>
                      <span className="font-medium">Durée:</span> {differenceInMinutes(new Date(session.end_time), new Date(session.start_time))} min
                    </div>
                    <div>
                      <span className="font-medium">Tarif:</span> {session.price}€
                    </div>
                    <div>
                      <span className="font-medium">Capacité:</span> {session.capacity}
                    </div>
                    {session.equipment && session.equipment.length > 0 && (
                      <div className="col-span-full">
                        <span className="font-medium">Matériel:</span> {session.equipment.join(", ")}
                      </div>
                    )}
                    {session.workshop_list && session.workshop_list.length > 0 && (
                      <div className="col-span-full">
                        <span className="font-medium">Ateliers:</span> {session.workshop_list.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()} className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(session)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(session)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(session.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};