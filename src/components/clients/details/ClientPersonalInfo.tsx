import { Client } from "@/types/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ClientPersonalInfoProps {
  client: Client;
}

export const ClientPersonalInfo = ({ client }: ClientPersonalInfoProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Détails personnels</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Adresse</p>
          <p className="break-words">{client.address || "Non renseignée"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date de naissance</p>
          <p>{client.birth_date ? format(new Date(client.birth_date), 'dd/MM/yyyy', { locale: fr }) : "Non renseignée"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date d'inscription</p>
          <p>{client.registration_date ? format(new Date(client.registration_date), 'dd/MM/yyyy', { locale: fr }) : "Non renseignée"}</p>
        </div>
      </div>
    </div>
  );
};