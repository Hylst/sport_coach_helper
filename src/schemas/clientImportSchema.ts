import * as z from "zod";

export const clientImportSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  age: z.number().nullable(),
  birth_date: z.string().nullable(),
  registration_date: z.string(),
  program: z.string().nullable(),
  difficulties: z.string().nullable(),
  sessions_completed: z.number().default(0),
  sessions_paid: z.number().default(0),
  course_location: z.string().nullable(),
  notes: z.string().nullable(),
  price_per_session: z.number().nullable(),
  photo_url: z.string().nullable(),
});

export type ClientImportData = z.infer<typeof clientImportSchema>;

export const validateClientImport = (data: unknown) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Le fichier doit contenir un tableau de clients");
    }

    const validationResults = data.map((client, index) => {
      try {
        return {
          success: true,
          data: clientImportSchema.parse(client),
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

    const validClients = validationResults.filter(
      (result): result is { success: true; data: ClientImportData; index: number } => 
      result.success
    ).map(result => result.data);

    const errors = validationResults.filter(
      (result): result is { success: false; errors: string[]; index: number } => 
      !result.success
    );

    return {
      validClients,
      errors,
      totalCount: data.length,
      validCount: validClients.length,
      errorCount: errors.length,
    };
  } catch (error) {
    throw new Error("Format de fichier invalide");
  }
};