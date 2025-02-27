import { Layout } from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { useProfile } from "@/components/profile/useProfile";
import { Profile as ProfileType } from "@/types/profile";

const Profile = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileType>>({});
  const { profile, isLoading, error, updateProfile } = useProfile();

  // Initialize form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleFormChange = useCallback((field: keyof ProfileType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePhotoChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
    setEditMode(false);
  };

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">Une erreur est survenue lors du chargement du profil</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader onEdit={() => setEditMode(true)} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileGrid
            profile={profile}
            formData={formData}
            editMode={editMode}
            onPhotoChange={handlePhotoChange}
            onChange={handleFormChange}
          />
          
          <ProfileActions
            editMode={editMode}
            isLoading={updateProfile.isPending}
            onCancel={() => {
              setEditMode(false);
              setFormData(profile || {});
            }}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Profile;