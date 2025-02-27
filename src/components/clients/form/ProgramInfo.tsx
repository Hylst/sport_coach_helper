import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface ProgramInfoProps {
  form: UseFormReturn<any>;
}

export const ProgramInfo = ({ form }: ProgramInfoProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="program"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Programme</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="difficulties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficultés</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="course_location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lieu du cours</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};