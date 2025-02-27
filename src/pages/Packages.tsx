
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { usePackageMutations } from "@/hooks/usePackageMutations";
import { Layout } from "@/components/layout/Layout";
import { PackagesList } from "@/components/packages/PackagesList";
import { PackageHeader } from "@/components/packages/PackageHeader";
import { PackageDialog } from "@/components/packages/PackageDialog";

const Packages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const { toast } = useToast();
  const { createPackage, updatePackage, deletePackage } = usePackageMutations();

  const { data: packages, isLoading, error } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        console.error("Not authenticated");
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("session_packages")
        .select("*")
        .eq("coach_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      if (selectedPackage) {
        await updatePackage.mutateAsync({ id: selectedPackage.id, ...values });
        toast({
          title: "Succès",
          description: "Le forfait a été mis à jour",
        });
      } else {
        await createPackage.mutateAsync(values);
        toast({
          title: "Succès",
          description: "Le forfait a été créé",
        });
      }
      setIsDialogOpen(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error("Error saving package:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le forfait",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (importedPackages: any[]) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const packagesWithCoachId = importedPackages.map(pkg => ({
        ...pkg,
        coach_id: userData.user.id
      }));

      const { error } = await supabase
        .from("session_packages")
        .insert(packagesWithCoachId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `${importedPackages.length} forfaits ont été importés`,
      });
    } catch (error) {
      console.error("Error importing packages:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'importer les forfaits",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="p-8 text-red-500">
          Erreur lors du chargement des forfaits: {error.message}
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">Chargement...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-8">
        <PackageHeader
          packages={packages || []}
          onImport={handleImport}
          onNewPackage={() => {
            setSelectedPackage(null);
            setIsDialogOpen(true);
          }}
        />

        <PackagesList
          packages={packages || []}
          onEdit={(pkg) => {
            setSelectedPackage(pkg);
            setIsDialogOpen(true);
          }}
          onDelete={deletePackage.mutateAsync}
        />

        <PackageDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          selectedPackage={selectedPackage}
          onSubmit={handleSubmit}
          isSubmitting={createPackage.isPending || updatePackage.isPending}
        />
      </div>
    </Layout>
  );
};

export default Packages;
