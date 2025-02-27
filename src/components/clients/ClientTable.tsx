import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Client } from "@/types/client";
import { TableActions } from "./table/TableActions";
import { FormattedCell } from "./table/TableCell";

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
  onView: (client: Client) => void;
}

export const ClientTable = ({ clients, onEdit, onDelete, onView }: ClientTableProps) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead className="w-20">Âge</TableHead>
              <TableHead className="hidden sm:table-cell">Date d'inscription</TableHead>
              <TableHead className="hidden md:table-cell">Programme</TableHead>
              <TableHead className="hidden lg:table-cell">Difficultés</TableHead>
              <TableHead className="text-center w-24">Séances</TableHead>
              <TableHead className="hidden xl:table-cell">Remarques</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow 
                key={client.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView(client)}
              >
                <TableCell className="font-medium">
                  <div className="break-words">
                    {client.first_name} {client.last_name}
                  </div>
                </TableCell>
                <TableCell>
                  <FormattedCell value={client.age} type="number" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <FormattedCell value={client.registration_date} type="date" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <FormattedCell value={client.program} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <FormattedCell value={client.difficulties} />
                </TableCell>
                <TableCell className="text-center">
                  <FormattedCell value={client.sessions_completed} type="number" />
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <div className="break-words max-w-[180px]">
                    <FormattedCell value={client.notes} />
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <TableActions 
                    client={client}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};