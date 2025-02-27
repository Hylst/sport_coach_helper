
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { GroupDialog } from "@/components/groups/GroupDialog";
import { GroupList } from "@/components/groups/GroupList";
import { useToast } from "@/components/ui/use-toast";

const Groups = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Groupes</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Groupe
          </Button>
        </div>

        <GroupList />

        <GroupDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
          onSuccess={() => {
            setIsDialogOpen(false);
            toast({
              title: "Groupe créé",
              description: "Le groupe a été créé avec succès",
            });
          }}
        />
      </div>
    </Layout>
  );
};

export default Groups;
