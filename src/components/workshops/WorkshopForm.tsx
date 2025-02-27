
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./BasicInfoFields";
import { DetailFields } from "./DetailFields";
import { LocationEquipmentFields } from "./LocationEquipmentFields";
import { ImageUploadField } from "./ImageUploadField";
import { Workshop } from "@/types/workshop";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  category: z.string().min(1, "La catégorie est requise"),
  difficulty: z.string().min(1, "La difficulté est requise"),
  muscles: z.array(z.string()).optional().default([]),
  duration: z.string().optional(),
  rest_time: z.string().optional(),
  precautions: z.string().optional(),
  equipment: z.array(z.string()).optional().default([]),
  locations: z.array(z.string()).optional().default([]),
  variations: z.array(z.string()).optional().default([]),
  media_urls: z.array(z.string()).optional().default([]),
});

export type WorkshopFormValues = z.infer<typeof formSchema>;

interface WorkshopFormProps {
  defaultValues?: Workshop;
  onSubmit: (data: WorkshopFormValues) => void;
  onCancel: () => void;
}

export const WorkshopForm = ({ defaultValues, onSubmit, onCancel }: WorkshopFormProps) => {
  const form = useForm<WorkshopFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      category: defaultValues?.category || "",
      difficulty: defaultValues?.difficulty || "",
      muscles: defaultValues?.muscles || [],
      duration: defaultValues?.duration?.toString() || "",
      rest_time: defaultValues?.rest_time?.toString() || "",
      precautions: defaultValues?.precautions || "",
      equipment: defaultValues?.equipment || [],
      locations: defaultValues?.locations || [],
      variations: defaultValues?.variations || [],
      media_urls: defaultValues?.media_urls || [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Modifier l'atelier" : "Créer un nouvel atelier"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations de base</h3>
              <BasicInfoFields form={form} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Détails de l'atelier</h3>
              <DetailFields form={form} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lieu et équipement</h3>
              <LocationEquipmentFields form={form} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Médias</h3>
              <ImageUploadField form={form} />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-end gap-2 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {defaultValues ? "Mettre à jour" : "Créer"} l'atelier
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
