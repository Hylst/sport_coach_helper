import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SessionFormValues } from "./SessionForm";

interface RecurrenceSettingsProps {
  form: UseFormReturn<SessionFormValues>;
}

export const RecurrenceSettings = ({ form }: RecurrenceSettingsProps) => {
  const weekDays = [
    { label: "Lundi", value: 1 },
    { label: "Mardi", value: 2 },
    { label: "Mercredi", value: 3 },
    { label: "Jeudi", value: 4 },
    { label: "Vendredi", value: 5 },
    { label: "Samedi", value: 6 },
    { label: "Dimanche", value: 7 },
  ];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="recurrence_end_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date de fin de récurrence</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />

      <div>
        <FormLabel>Jours de récurrence</FormLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {weekDays.map((day) => (
            <FormField
              key={day.value}
              control={form.control}
              name="recurrence_days"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value?.includes(day.value)}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      const newValue = checked
                        ? [...currentValue, day.value]
                        : currentValue.filter((v) => v !== day.value);
                      field.onChange(newValue);
                    }}
                  />
                  <span className="text-sm">{day.label}</span>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};