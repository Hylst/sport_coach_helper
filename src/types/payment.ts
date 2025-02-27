import { z } from "zod";

export const paymentSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  payment_date: z.string().min(1, "Payment date is required"),
  payment_method: z.enum(["cheque", "especes", "paypal", "virement", "cb"], {
    required_error: "Payment method is required",
  }),
  notes: z.string().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;