import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { WorkshopFormValues } from "./WorkshopForm";

interface DetailFieldsProps {
  form: UseFormReturn<WorkshopFormValues>;
}

export const DetailFields = ({ form }: DetailFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="muscles"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Muscles ciblés</FormLabel>
            <FormControl>
              <Input 
                placeholder="Entrez les muscles (séparés par des virgules)"
                value={field.value?.join(", ") || ""}
                onChange={(e) => field.onChange(e.target.value.split(",").map(s => s.trim()))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rest_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temps de repos (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="precautions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Précautions</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};