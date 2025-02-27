import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Client } from "@/types/client";

interface ClientHeaderProps {
  client: Client;
}

export const ClientHeader = ({ client }: ClientHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <Avatar className="h-20 w-20 flex-shrink-0">
        <AvatarImage src={client.photo_url || undefined} />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-semibold break-words">
          {client.first_name} {client.last_name}
        </h2>
      </div>
    </div>
  );
};