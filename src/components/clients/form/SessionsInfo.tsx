import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface SessionsInfoProps {
  form: UseFormReturn<any>;
}

export const SessionsInfo = ({ form }: SessionsInfoProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="sessions_completed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Séances effectuées</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sessions_paid"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Séances réglées</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};