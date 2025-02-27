import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { SessionFormValues } from "./SessionForm";

interface SessionAdditionalInfoProps {
  control: Control<SessionFormValues>;
}

export const SessionAdditionalInfo = ({ control }: SessionAdditionalInfoProps) => {
  return (
    <>
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="periodicity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Periodicity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select periodicity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="equipment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipment</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter equipment (comma separated)"
                onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                value={field.value?.join(', ') || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="workshop_list"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workshops</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter workshops (comma separated)"
                onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                value={field.value?.join(', ') || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};