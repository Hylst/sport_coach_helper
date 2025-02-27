import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { JsonImportExport } from "@/components/shared/JsonImportExport";
import { PaymentDialog } from "@/components/payments/PaymentDialog";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { PaymentList } from "@/components/payments/PaymentList";
import { PaymentFormValues } from "@/types/payment";

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLatePayments, setShowLatePayments] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          clients (
            first_name,
            last_name
          )
        `)
        .eq("coach_id", userData.user.id)
        .order("payment_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("clients")
        .select("id, first_name, last_name")
        .eq("coach_id", userData.user.id)
        .order("last_name", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createPayment = useMutation({
    mutationFn: async (values: PaymentFormValues) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const paymentData = {
        client_id: values.client_id,
        coach_id: userData.user.id,
        amount: Number(values.amount),
        payment_date: values.payment_date,
        payment_method: values.payment_method,
        notes: values.notes || null,
      };

      const { error } = await supabase.from("payments").insert([paymentData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast({
        title: "Succès",
        description: "Paiement enregistré avec succès",
      });
      setIsDialogOpen(false);
    },
  });

  const updatePayment = useMutation({
    mutationFn: async (values: PaymentFormValues) => {
      const paymentData = {
        client_id: values.client_id,
        amount: Number(values.amount),
        payment_date: values.payment_date,
        payment_method: values.payment_method,
        notes: values.notes || null,
      };

      const { error } = await supabase
        .from("payments")
        .update(paymentData)
        .eq("id", selectedPayment.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast({
        title: "Succès",
        description: "Paiement mis à jour avec succès",
      });
      setIsDialogOpen(false);
      setSelectedPayment(null);
    },
  });

  const deletePayment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("payments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast({
        title: "Succès",
        description: "Paiement supprimé avec succès",
      });
    },
  });

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: PaymentFormValues) => {
    if (selectedPayment) {
      updatePayment.mutate(values);
    } else {
      createPayment.mutate(values);
    }
  };

  const totalAmount = payments?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Suivi des paiements</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <JsonImportExport
              data={payments}
              onImport={createPayment.mutateAsync}
              filename="payments.json"
              type="payments"
            />
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="w-full sm:w-auto"
            >
              Enregistrer un paiement
            </Button>
          </div>
        </div>

        <Card className="p-4 sm:p-6">
          <PaymentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showLatePayments={showLatePayments}
            onToggleLatePayments={() => setShowLatePayments(!showLatePayments)}
            totalAmount={totalAmount}
          />

          <PaymentList
            payments={payments || []}
            onEdit={handleEdit}
            onDelete={(id) => deletePayment.mutate(id)}
            isLoading={paymentsLoading}
            searchQuery={searchQuery}
            showLatePayments={showLatePayments}
          />
        </Card>

        <PaymentDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={onSubmit}
          clients={clients}
          selectedPayment={selectedPayment}
          title={selectedPayment ? "Modifier le paiement" : "Enregistrer un paiement"}
        />
      </div>
    </Layout>
  );
};

export default Payments;
