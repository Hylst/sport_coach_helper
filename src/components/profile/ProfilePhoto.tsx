import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProfilePhotoProps {
  photoUrl: string | null;
  editMode: boolean;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email?: string;
  alias?: string;
}

export const ProfilePhoto = ({ photoUrl, editMode, onPhotoChange, email, alias }: ProfilePhotoProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full mb-4 overflow-hidden bg-gray-200">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      {email && (
        <div className="text-sm text-gray-600 mb-1 text-center break-all">
          {email}
        </div>
      )}
      {alias && (
        <div className="text-xs text-gray-500 mb-4 text-center">
          @{alias}
        </div>
      )}
      {editMode && (
        <Input
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          className="w-full"
        />
      )}
    </div>
  );
};