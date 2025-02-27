import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Sélectionner des options...",
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Ensure value is always an array 
  const safeValue = React.useMemo(() => {
    return Array.isArray(value) ? value : [];
  }, [value]);

  // Get labels for selected values
  const selectedLabels = React.useMemo(() => {
    if (!Array.isArray(options)) return [];
    
    return safeValue
      .map(v => options.find(opt => opt.value === v)?.label)
      .filter(Boolean) as string[];
  }, [safeValue, options]);

  // Handle option selection
  const handleSelect = React.useCallback((currentValue: string) => {
    if (!Array.isArray(safeValue)) return;
    
    const newValue = safeValue.includes(currentValue)
      ? safeValue.filter((v) => v !== currentValue)
      : [...safeValue, currentValue];
    
    onChange(newValue);
    // Keep popover open after selection
    setOpen(true);
  }, [safeValue, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
          type="button" // Prevent form submission
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            if (!disabled) setOpen(!open);
          }}
        >
          <div className="flex gap-1 flex-wrap max-w-[90%] overflow-hidden">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label) => (
                <span
                  key={label}
                  className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm text-sm truncate"
                >
                  {label}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-full p-0" 
        align="start" 
        side="bottom"
        onClick={(e) => e.stopPropagation()} // Prevent closing on selection
      >
        {Array.isArray(options) && options.length > 0 ? (
          <Command>
            <CommandInput placeholder="Rechercher..." />
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <span className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        safeValue.includes(option.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        ) : (
          <div className="py-6 text-center text-sm">Aucune option disponible</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
