import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SessionBasicInfo } from "./SessionBasicInfo";
import { SessionDateTime } from "./SessionDateTime";
import { SessionCapacityPrice } from "./SessionCapacityPrice";
import { SessionAdditionalInfo } from "./SessionAdditionalInfo";
import { RecurrenceSettings } from "./RecurrenceSettings";
import { PricingRules } from "./PricingRules";
import { LevelSettings } from "./LevelSettings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Periodicity } from "@/types/session";

const sessionSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  start_time: z.string().min(1, "L'heure de début est requise"),
  end_time: z.string().min(1, "L'heure de fin est requise"),
  capacity: z.coerce.number().min(1, "La capacité doit être d'au moins 1"),
  price: z.coerce.number().min(0, "Le prix doit être positif"),
  location: z.string().optional(),
  periodicity: z.enum(["once", "daily", "weekly", "monthly"] as const).optional(),
  equipment: z.array(z.string()).optional(),
  workshop_list: z.array(z.string()).optional(),
  illustration_url: z.string().optional(),
  recurrence_end_date: z.string().optional(),
  recurrence_days: z.array(z.number()).optional(),
  excluded_dates: z.array(z.string()).optional(),
  min_level: z.string().optional(),
  max_level: z.string().optional(),
  waitlist_capacity: z.number().optional(),
  pricing_rules: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      start_date: z.string().optional(),
      end_date: z.string().optional(),
      max_spots: z.number().nullable(),
    })
  ).optional(),
});

export type SessionFormValues = z.infer<typeof sessionSchema>;

interface SessionFormProps {
  onSubmit: (values: SessionFormValues) => void;
  defaultValues?: Partial<SessionFormValues>;
}

export const SessionForm = ({ onSubmit, defaultValues }: SessionFormProps) => {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      start_time: defaultValues?.start_time || "",
      end_time: defaultValues?.end_time || "",
      capacity: defaultValues?.capacity || 1,
      price: defaultValues?.price || 0,
      location: defaultValues?.location || "",
      periodicity: (defaultValues?.periodicity as Periodicity) || "once",
      equipment: defaultValues?.equipment || [],
      workshop_list: defaultValues?.workshop_list || [],
      recurrence_days: defaultValues?.recurrence_days || [],
      excluded_dates: defaultValues?.excluded_dates || [],
      pricing_rules: defaultValues?.pricing_rules || [],
      waitlist_capacity: defaultValues?.waitlist_capacity || 5,
      illustration_url: defaultValues?.illustration_url || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <SessionBasicInfo control={form.control} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Photo et média</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de l'illustration</label>
                    <Input {...form.register("illustration_url")} placeholder="URL de l'image" />
                  </div>
                </div>
              </div>

              <SessionDateTime control={form.control} />
              
              <SessionCapacityPrice control={form.control} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Périodicité</h3>
                <div>
                  <Select
                    onValueChange={(value) => form.setValue("periodicity", value as any)}
                    defaultValue={form.getValues("periodicity")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la périodicité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Une fois</SelectItem>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Matériel requis</h3>
                <div>
                  <Input
                    placeholder="Entrez le matériel requis (séparé par des virgules)"
                    onChange={(e) => {
                      const equipment = e.target.value.split(',').map(item => item.trim());
                      form.setValue("equipment", equipment);
                    }}
                    defaultValue={form.getValues("equipment")?.join(", ")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ateliers associés</h3>
                <div>
                  <Input
                    placeholder="Entrez les ateliers (séparés par des virgules)"
                    onChange={(e) => {
                      const workshops = e.target.value.split(',').map(item => item.trim());
                      form.setValue("workshop_list", workshops);
                    }}
                    defaultValue={form.getValues("workshop_list")?.join(", ")}
                  />
                </div>
              </div>

              <SessionAdditionalInfo control={form.control} />
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Paramètres de récurrence</h3>
                <RecurrenceSettings form={form} />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Règles de tarification</h3>
                <PricingRules form={form} />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Niveaux et capacité</h3>
                <LevelSettings form={form} />
              </div>
            </div>
          </div>
        </ScrollArea>
        <Button type="submit" className="w-full">
          {defaultValues ? "Mettre à jour" : "Créer"} la séance
        </Button>
      </form>
    </Form>
  );
};
