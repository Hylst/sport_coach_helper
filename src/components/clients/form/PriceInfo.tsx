import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PriceInfoProps {
  form: UseFormReturn<any>;
}

export const PriceInfo = ({ form }: PriceInfoProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="price_per_session"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix par séance</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.01"
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Prix personnalisé par séance"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};