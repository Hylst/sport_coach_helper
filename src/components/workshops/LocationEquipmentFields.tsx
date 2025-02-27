import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { WorkshopFormValues } from "./WorkshopForm";

interface LocationEquipmentFieldsProps {
  form: UseFormReturn<WorkshopFormValues>;
}

export const LocationEquipmentFields = ({ form }: LocationEquipmentFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="equipment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Équipement</FormLabel>
            <FormControl>
              <Input 
                placeholder="Entrez l'équipement (séparé par des virgules)"
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="locations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieux</FormLabel>
            <FormControl>
              <Input 
                placeholder="Entrez les lieux (séparés par des virgules)"
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="variations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variations</FormLabel>
            <FormControl>
              <Input 
                placeholder="Entrez les variations (séparées par des virgules)"
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};