
import { PackageCard } from "./PackageCard";

interface PackagesListProps {
  packages: any[];
  onEdit: (pkg: any) => void;
  onDelete: (id: string) => void;
}

export const PackagesList = ({ packages, onEdit, onDelete }: PackagesListProps) => {
  if (!packages.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Aucun forfait trouvé. Créez votre premier forfait en cliquant sur le bouton "Nouveau forfait".
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          onEdit={() => onEdit(pkg)}
          onDelete={() => onDelete(pkg.id)}
        />
      ))}
    </div>
  );
};
