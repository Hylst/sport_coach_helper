import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Euro, Dumbbell, List } from "lucide-react";
import { Session } from "@/types/session";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SessionCardProps {
  session: Session;
  onClick?: () => void;
}

export const SessionCard = ({ session, onClick }: SessionCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-all"
      onClick={onClick}
    >
      {session.illustration_url && (
        <AspectRatio ratio={16 / 9} className="bg-muted mb-4 rounded-lg overflow-hidden">
          <img
            src={session.illustration_url}
            alt={session.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      )}
      <h3 className="font-semibold text-lg mb-2 break-words">{session.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2 break-words">{session.description}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 w-4 h-4 mr-2" />
            <span className="break-words">{format(new Date(session.start_time), "PPP")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="flex-shrink-0 w-4 h-4 mr-2" />
            <span className="break-words">
              {format(new Date(session.start_time), "p")} -{" "}
              {format(new Date(session.end_time), "p")}
            </span>
          </div>
          {session.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="flex-shrink-0 w-4 h-4 mr-2" />
              <span className="break-words">{session.location}</span>
            </div>
          )}
          {session.capacity && (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="flex-shrink-0 w-4 h-4 mr-2" />
              <span>{session.capacity} participants</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          {session.price && (
            <div className="flex items-center text-sm text-gray-500">
              <Euro className="flex-shrink-0 w-4 h-4 mr-2" />
              <span>{session.price}€</span>
            </div>
          )}
          {session.equipment && session.equipment.length > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <Dumbbell className="flex-shrink-0 w-4 h-4 mr-2" />
              <span className="break-words">{session.equipment.join(", ")}</span>
            </div>
          )}
          {session.workshop_list && session.workshop_list.length > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <List className="flex-shrink-0 w-4 h-4 mr-2" />
              <span className="break-words">{session.workshop_list.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};