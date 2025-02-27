import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentTableProps {
  payments: any[];
  onEdit: (payment: any) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  searchQuery: string;
  isPaymentLate: (payment: any) => boolean;
}

export const PaymentTable = ({
  payments,
  onEdit,
  onDelete,
  isLoading,
  isPaymentLate,
}: PaymentTableProps) => {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Client</th>
            <th className="text-left py-3 px-4">Montant</th>
            <th className="text-left py-3 px-4 hidden sm:table-cell">Méthode</th>
            <th className="text-left py-3 px-4">Statut</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Notes</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                Chargement des paiements...
              </td>
            </tr>
          ) : payments && payments.length > 0 ? (
            payments.map((payment) => {
              const isLate = isPaymentLate(payment);
              return (
                <tr 
                  key={payment.id} 
                  className={cn(
                    "border-b hover:bg-gray-50",
                    isLate && "bg-red-50 hover:bg-red-100"
                  )}
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    {format(new Date(payment.payment_date), "dd/MM/yyyy")}
                    <span className="block text-xs text-gray-500 sm:hidden">
                      {format(new Date(payment.payment_date), "HH:mm")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {payment.clients?.first_name} {payment.clients?.last_name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{Number(payment.amount).toFixed(2)}€</td>
                  <td className="py-3 px-4 hidden sm:table-cell capitalize">{payment.payment_method}</td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-sm whitespace-nowrap",
                        payment.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : isLate
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      )}
                    >
                      {payment.status === "paid" 
                        ? "Payé" 
                        : isLate 
                        ? "En retard" 
                        : "En attente"}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {payment.notes}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(payment)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(payment.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Aucun paiement trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};