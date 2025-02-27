import { Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Profile } from "@/types/profile";

interface CertificationsProps {
  formData: Partial<Profile>;
  editMode: boolean;
  onChange: (field: keyof Profile, value: any) => void;
}

export const Certifications = ({ formData, editMode, onChange }: CertificationsProps) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Award className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Certifications et Spécialités</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications
          </label>
          <Input
            type="text"
            value={formData.certifications?.join(', ') || ''}
            onChange={(e) => onChange('certifications', e.target.value.split(',').map(s => s.trim()))}
            disabled={!editMode}
            placeholder="Séparées par des virgules"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spécialités
          </label>
          <Input
            type="text"
            value={formData.specialties?.join(', ') || ''}
            onChange={(e) => onChange('specialties', e.target.value.split(',').map(s => s.trim()))}
            disabled={!editMode}
            placeholder="Séparées par des virgules"
          />
        </div>
      </div>
    </div>
  );
};
