import { Input } from "@/components/ui/input";
import { Profile } from "@/types/profile";

interface WebsiteSocialInfoProps {
  formData: Partial<Profile>;
  editMode: boolean;
  onChange: (field: keyof Profile, value: any) => void;
}

export const WebsiteSocialInfo = ({ formData, editMode, onChange }: WebsiteSocialInfoProps) => {
  const socialMedia = formData.social_media || {};

  const handleSocialMediaChange = (platform: string, value: string) => {
    onChange('social_media', {
      ...socialMedia,
      [platform]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Site Web</label>
        <Input
          type="url"
          value={formData.website || ''}
          onChange={(e) => onChange('website', e.target.value)}
          disabled={!editMode}
          placeholder="https://monsite.com"
        />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Réseaux Sociaux</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="url"
            value={socialMedia.instagram || ''}
            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
            disabled={!editMode}
            placeholder="Instagram"
          />
          <Input
            type="url"
            value={socialMedia.facebook || ''}
            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
            disabled={!editMode}
            placeholder="Facebook"
          />
          <Input
            type="url"
            value={socialMedia.linkedin || ''}
            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
            disabled={!editMode}
            placeholder="LinkedIn"
          />
          <Input
            type="url"
            value={socialMedia.youtube || ''}
            onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
            disabled={!editMode}
            placeholder="YouTube"
          />
        </div>
      </div>
    </div>
  );
};
