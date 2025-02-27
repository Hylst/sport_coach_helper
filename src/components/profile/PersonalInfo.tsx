import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "@/types/profile";

interface PersonalInfoProps {
  formData: Partial<Profile>;
  editMode: boolean;
  onChange: (field: keyof Profile, value: any) => void;
}

export const PersonalInfo = ({ formData, editMode, onChange }: PersonalInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <Input
          type="text"
          value={formData.first_name || ''}
          onChange={(e) => onChange('first_name', e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <Input
          type="text"
          value={formData.last_name || ''}
          onChange={(e) => onChange('last_name', e.target.value)}
          disabled={!editMode}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <Textarea
          value={formData.bio || ''}
          onChange={(e) => onChange('bio', e.target.value)}
          disabled={!editMode}
          rows={4}
        />
      </div>
    </div>
  );
};
