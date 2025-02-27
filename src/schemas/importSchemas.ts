import * as z from "zod";
import { clientImportSchema } from "./clientImportSchema";

// Schéma pour l'import des sessions
export const sessionImportSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullable(),
  start_time: z.string().min(1, "La date de début est requise"),
  end_time: z.string().min(1, "La date de fin est requise"),
  capacity: z.number().nullable(),
  price: z.number().nullable(),
  location: z.string().nullable(),
  periodicity: z.string().nullable(),
  equipment: z.array(z.string()).nullable(),
  workshop_list: z.array(z.string()).nullable(),
  illustration_url: z.string().nullable(),
});

// Schéma pour l'import des workshops
export const workshopImportSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullable(),
  category: z.string().min(1, "La catégorie est requise"),
  difficulty: z.string().min(1, "La difficulté est requise"),
  muscles: z.array(z.string()).nullable(),
  duration: z.string().nullable(),
  rest_time: z.string().nullable(),
  precautions: z.string().nullable(),
  equipment: z.array(z.string()).nullable(),
  locations: z.array(z.string()).nullable(),
  variations: z.array(z.string()).nullable(),
  media_urls: z.array(z.string()).nullable(),
});

// Schéma pour l'import des paiements
export const paymentImportSchema = z.object({
  client_id: z.string().min(1, "L'ID du client est requis"),
  amount: z.number().min(0.01, "Le montant doit être supérieur à 0"),
  payment_date: z.string().min(1, "La date de paiement est requise"),
  payment_method: z.enum(["cheque", "especes", "paypal", "virement", "cb"], {
    required_error: "La méthode de paiement est requise",
  }),
  notes: z.string().nullable(),
  billing_period_start: z.string().nullable(),
  billing_period_end: z.string().nullable(),
});

export type SessionImportData = z.infer<typeof sessionImportSchema>;
export type WorkshopImportData = z.infer<typeof workshopImportSchema>;
export type PaymentImportData = z.infer<typeof paymentImportSchema>;

// Fonction de validation pour les sessions
export const validateSessionImport = (data: unknown) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Le fichier doit contenir un tableau de sessions");
    }

    const validationResults = data.map((session, index) => {
      try {
        return {
          success: true,
          data: sessionImportSchema.parse(session),
          index,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            success: false,
            errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
            index,
          };
        }
        return {
          success: false,
          errors: ["Erreur de validation inconnue"],
          index,
        };
      }
    });

    const validSessions = validationResults.filter(
      (result): result is { success: true; data: SessionImportData; index: number } => 
      result.success
    ).map(result => result.data);

    const errors = validationResults.filter(
      (result): result is { success: false; errors: string[]; index: number } => 
      !result.success
    );

    return {
      validSessions,
      errors,
      totalCount: data.length,
      validCount: validSessions.length,
      errorCount: errors.length,
    };
  } catch (error) {
    throw new Error("Format de fichier invalide");
  }
};

// Fonction de validation pour les workshops
export const validateWorkshopImport = (data: unknown) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Le fichier doit contenir un tableau d'ateliers");
    }

    const validationResults = data.map((workshop, index) => {
      try {
        return {
          success: true,
          data: workshopImportSchema.parse(workshop),
          index,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            success: false,
            errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
            index,
          };
        }
        return {
          success: false,
          errors: ["Erreur de validation inconnue"],
          index,
        };
      }
    });

    const validWorkshops = validationResults.filter(
      (result): result is { success: true; data: WorkshopImportData; index: number } => 
      result.success
    ).map(result => result.data);

    const errors = validationResults.filter(
      (result): result is { success: false; errors: string[]; index: number } => 
      !result.success
    );

    return {
      validWorkshops,
      errors,
      totalCount: data.length,
      validCount: validWorkshops.length,
      errorCount: errors.length,
    };
  } catch (error) {
    throw new Error("Format de fichier invalide");
  }
};

// Fonction de validation pour les paiements
export const validatePaymentImport = (data: unknown) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Le fichier doit contenir un tableau de paiements");
    }

    const validationResults = data.map((payment, index) => {
      try {
        return {
          success: true,
          data: paymentImportSchema.parse(payment),
          index,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            success: false,
            errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
            index,
          };
        }
        return {
          success: false,
          errors: ["Erreur de validation inconnue"],
          index,
        };
      }
    });

    const validPayments = validationResults.filter(
      (result): result is { success: true; data: PaymentImportData; index: number } => 
      result.success
    ).map(result => result.data);

    const errors = validationResults.filter(
      (result): result is { success: false; errors: string[]; index: number } => 
      !result.success
    );

    return {
      validPayments,
      errors,
      totalCount: data.length,
      validCount: validPayments.length,
      errorCount: errors.length,
    };
  } catch (error) {
    throw new Error("Format de fichier invalide");
  }
};