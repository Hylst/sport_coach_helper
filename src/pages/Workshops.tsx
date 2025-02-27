
import { Layout } from "@/components/layout/Layout";
import { WorkshopForm } from "@/components/workshops/WorkshopForm";
import { WorkshopFilters } from "@/components/workshops/WorkshopFilters";
import { WorkshopHeader } from "@/components/workshops/WorkshopHeader";
import { WorkshopList } from "@/components/workshops/WorkshopList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWorkshops } from "@/components/workshops/hooks/useWorkshops";

const Workshops = () => {
  const {
    workshops,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    selectedWorkshop,
    setSelectedWorkshop,
    search,
    setSearch,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useWorkshops();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <WorkshopHeader 
          onNewWorkshop={() => {
            setSelectedWorkshop(null);
            setIsDialogOpen(true);
          }}
          workshops={workshops || []}
        />

        <WorkshopFilters
          search={search}
          onSearchChange={setSearch}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <WorkshopList
          workshops={workshops}
          isLoading={isLoading}
          onEdit={(workshop) => {
            setSelectedWorkshop(workshop);
            setIsDialogOpen(true);
          }}
          onDelete={handleDelete}
          hasActiveFilters={Boolean(search || selectedCategory !== "all" || selectedDifficulty !== "all")}
        />

        <Dialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
        >
          <DialogContent className="max-w-4xl">
            <WorkshopForm
              defaultValues={selectedWorkshop || undefined}
              onSubmit={selectedWorkshop ? handleEdit : handleCreate}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Workshops;
