import { Client } from "@/types/client";

interface ClientProgramInfoProps {
  client: Client;
}

export const ClientProgramInfo = ({ client }: ClientProgramInfoProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Programme et suivi</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Programme</p>
          <p className="break-words">{client.program || "Non renseigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Difficultés</p>
          <p className="break-words">{client.difficulties || "Aucune difficulté notée"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lieu du cours</p>
          <p className="break-words">{client.course_location || "Non renseigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Prix par séance</p>
          <p>{client.price_per_session ? `${client.price_per_session}€` : "Non renseigné"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Séances effectuées</p>
          <p>{client.sessions_completed || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Séances réglées</p>
          <p>{client.sessions_paid || 0}</p>
        </div>
      </div>
    </div>
  );
};