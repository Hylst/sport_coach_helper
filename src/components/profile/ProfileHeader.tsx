import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  onEdit: () => void;
}

export const ProfileHeader = ({ onEdit }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8 animate-fade-in">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Mon Profil
      </h1>
      <Button onClick={onEdit} className="shadow-lg hover:shadow-xl transition-shadow">
        Modifier le profil
      </Button>
    </div>
  );
};