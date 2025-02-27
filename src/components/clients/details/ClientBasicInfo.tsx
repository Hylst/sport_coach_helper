import { Client } from "@/types/client";

interface ClientBasicInfoProps {
  client: Client;
}

export const ClientBasicInfo = ({ client }: ClientBasicInfoProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Informations de base</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Âge</p>
          <p className="break-words">{client.age || "Non renseigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="break-all">{client.email || "Non renseigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Téléphone</p>
          <p className="break-words">{client.phone || "Non renseigné"}</p>
        </div>
      </div>
    </div>
  );
};