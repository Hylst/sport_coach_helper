import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SessionFormValues } from "./SessionForm";

interface LevelSettingsProps {
  form: UseFormReturn<SessionFormValues>;
}

export const LevelSettings = ({ form }: LevelSettingsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="min_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau minimum</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Débutant" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="max_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Niveau maximum</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Avancé" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="waitlist_capacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Capacité liste d'attente</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                {...field}
                onChange={(e) =>
                  field.onChange(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};