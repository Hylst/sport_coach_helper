import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePayment } from "@/utils/paymentValidation";
import { prepareItemsForImport, removeDuplicates } from "@/utils/deduplication";

interface PaymentImporterProps {
  userId: string;
  onSuccess: () => void;
}

export const PaymentImporter = ({ userId, onSuccess }: PaymentImporterProps) => {
  const { toast } = useToast();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Starting import process');
      const text = await file.text();
      const data = JSON.parse(text);
      console.log('Parsed data:', data);

      if (data.payments?.length) {
        console.log('Validating payments');
        try {
          // Get existing payments for comparison
          const { data: existingPayments } = await supabase
            .from('payments')
            .select('*')
            .eq('coach_id', userId);

          // Validate all payments first
          const validatedPayments = data.payments.map((payment: any) => 
            validatePayment(payment, userId)
          );

          // Remove duplicates based on amount, payment_date, and client_id
          const uniquePayments = removeDuplicates(
            validatedPayments,
            existingPayments || [],
            ['amount', 'payment_date', 'client_id']
          );

          if (uniquePayments.length === 0) {
            toast({
              title: "Info",
              description: "No new payments to import - all payments already exist",
            });
            return;
          }

          // Prepare payments for import
          const preparedPayments = prepareItemsForImport(uniquePayments, userId);
          const paymentsToImport = preparedPayments.map(payment => ({
            ...payment,
            amount: payment.amount || 0,
            payment_date: payment.payment_date || new Date().toISOString(),
          }));

          console.log('Importing payments to Supabase');
          const { error: paymentsError } = await supabase
            .from('payments')
            .insert(paymentsToImport);

          if (paymentsError) {
            console.error('Payment import error:', paymentsError);
            throw paymentsError;
          }

          console.log('Successfully imported payments');
          onSuccess();
        } catch (validationError) {
          console.error('Validation error:', validationError);
          throw new Error(`Payment validation failed: ${validationError.message}`);
        }
      }

      toast({
        title: "Import réussi",
        description: "Les paiements ont été importés avec succès",
      });
    } catch (error: any) {
      console.error('Import error:', error);
      toast({
        title: "Erreur lors de l'import",
        description: error.message || "Une erreur est survenue lors de l'import des données",
        variant: "destructive",
      });
    }

    // Reset the input
    event.target.value = "";
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Button variant="outline">
        <Upload className="w-4 h-4 mr-2" />
        Importer des paiements
      </Button>
    </div>
  );
};