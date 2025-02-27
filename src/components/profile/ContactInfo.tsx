import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "@/types/profile";

interface ContactInfoProps {
  formData: Partial<Profile>;
  editMode: boolean;
  onChange: (field: keyof Profile, value: any) => void;
}

export const ContactInfo = ({ formData, editMode, onChange }: ContactInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <Input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => onChange('phone', e.target.value)}
          disabled={!editMode}
          placeholder="06 12 34 56 78"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          value={formData.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          disabled={!editMode}
          placeholder="coach@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <Input
          type="text"
          value={formData.address || ''}
          onChange={(e) => onChange('address', e.target.value)}
          disabled={!editMode}
          placeholder="123 rue des Sports"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description des services</label>
        <Textarea
          value={formData.services_description || ''}
          onChange={(e) => onChange('services_description', e.target.value)}
          disabled={!editMode}
          placeholder="Décrivez vos services de coaching..."
          rows={4}
        />
      </div>
    </div>
  );
};
