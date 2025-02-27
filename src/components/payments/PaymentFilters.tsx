import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PaymentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showLatePayments: boolean;
  onToggleLatePayments: () => void;
  totalAmount: number;
}

export const PaymentFilters = ({
  searchQuery,
  onSearchChange,
  showLatePayments,
  onToggleLatePayments,
  totalAmount,
}: PaymentFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant={showLatePayments ? "destructive" : "outline"}
          onClick={onToggleLatePayments}
          className="whitespace-nowrap w-full sm:w-auto"
        >
          {showLatePayments ? "Tous les paiements" : "Paiements en retard"}
        </Button>
      </div>
      <div className="text-lg font-semibold mt-4 sm:mt-0">
        Total: {totalAmount.toFixed(2)}€
      </div>
    </div>
  );
};