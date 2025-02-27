import { Card } from "@/components/ui/card";
import { Profile } from "@/types/profile";
import { ProfilePhoto } from "./ProfilePhoto";
import { PersonalInfo } from "./PersonalInfo";
import { Certifications } from "./Certifications";
import { ContactInfo } from "./ContactInfo";
import { WebsiteSocialInfo } from "./WebsiteSocialInfo";
import { ImportExportSection } from "./ImportExportSection";
import { RegulationsList } from "../regulations/RegulationsList";
import { useUser } from "@supabase/auth-helpers-react";

interface ProfileGridProps {
  profile: Profile | undefined;
  formData: Partial<Profile>;
  editMode: boolean;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (field: keyof Profile, value: any) => void;
}

export const ProfileGrid = ({ 
  profile, 
  formData, 
  editMode, 
  onPhotoChange, 
  onChange 
}: ProfileGridProps) => {
  const user = useUser();
  const alias = formData.first_name && formData.last_name 
    ? `${formData.first_name.toLowerCase()}.${formData.last_name.toLowerCase()}`
    : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1 p-6 hover:shadow-lg transition-shadow">
        <ProfilePhoto
          photoUrl={profile?.photo_url}
          editMode={editMode}
          onPhotoChange={onPhotoChange}
          email={user?.email}
          alias={alias}
        />
      </Card>
      
      <Card className="col-span-2 p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Informations Personnelles
        </h2>
        <PersonalInfo
          formData={formData}
          editMode={editMode}
          onChange={onChange}
        />
      </Card>

      <Card className="col-span-3 p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Contact et Services
        </h2>
        <ContactInfo
          formData={formData}
          editMode={editMode}
          onChange={onChange}
        />
      </Card>
      
      <Card className="col-span-3 p-6 hover:shadow-lg transition-shadow">
        <Certifications
          formData={formData}
          editMode={editMode}
          onChange={onChange}
        />
      </Card>

      <Card className="col-span-3 p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Site Web et Réseaux Sociaux
        </h2>
        <WebsiteSocialInfo
          formData={formData}
          editMode={editMode}
          onChange={onChange}
        />
      </Card>

      <div className="col-span-3">
        <RegulationsList />
      </div>

      <Card className="col-span-3 p-6 hover:shadow-lg transition-shadow">
        <ImportExportSection userId={profile?.id || ''} />
      </Card>
    </div>
  );
};