import { PaymentTable } from "./PaymentTable";

interface PaymentListProps {
  payments: any[];
  onEdit: (payment: any) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  searchQuery: string;
  showLatePayments: boolean;
}

export const PaymentList = ({
  payments,
  onEdit,
  onDelete,
  isLoading,
  searchQuery,
  showLatePayments,
}: PaymentListProps) => {
  const isPaymentLate = (payment: any) => {
    const paymentDate = new Date(payment.payment_date);
    const today = new Date();
    const daysDifference = Math.floor(
      (today.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return payment.status !== "paid" && daysDifference > 7;
  };

  const filteredPayments = payments?.filter((payment) => {
    const clientName = `${payment.clients?.first_name} ${payment.clients?.last_name}`.toLowerCase();
    const matchesSearch = clientName.includes(searchQuery.toLowerCase());
    const matchesLateFilter = showLatePayments ? isPaymentLate(payment) : true;
    return matchesSearch && (showLatePayments ? matchesLateFilter : true);
  });

  return (
    <PaymentTable
      payments={filteredPayments || []}
      onEdit={onEdit}
      onDelete={onDelete}
      isLoading={isLoading}
      searchQuery={searchQuery}
      isPaymentLate={isPaymentLate}
    />
  );
};