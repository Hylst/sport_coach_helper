import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SessionFormValues } from "./SessionForm";

interface PricingRulesProps {
  form: UseFormReturn<SessionFormValues>;
}

export const PricingRules = ({ form }: PricingRulesProps) => {
  const addPricingRule = () => {
    const currentRules = form.getValues("pricing_rules") || [];
    form.setValue("pricing_rules", [
      ...currentRules,
      {
        name: "",
        price: 0,
        start_date: "",
        end_date: "",
        max_spots: null,
      },
    ]);
  };

  const removePricingRule = (index: number) => {
    const currentRules = form.getValues("pricing_rules") || [];
    form.setValue(
      "pricing_rules",
      currentRules.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Règles de tarification</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={addPricingRule}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une règle
        </Button>
      </div>

      {form.watch("pricing_rules")?.map((_, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removePricingRule(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <FormField
            control={form.control}
            name={`pricing_rules.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la règle</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Early Bird" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`pricing_rules.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`pricing_rules.${index}.start_date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`pricing_rules.${index}.end_date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name={`pricing_rules.${index}.max_spots`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Places disponibles</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};