import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface FormattedCellProps {
  value: string | number | null | undefined;
  type?: "date" | "text" | "number" | "currency";
}

export const FormattedCell = ({ value, type = "text" }: FormattedCellProps) => {
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  switch (type) {
    case "date":
      return (
        <span>
          {format(new Date(value as string), "dd/MM/yyyy", { locale: fr })}
        </span>
      );
    case "currency":
      return <span>{value}€</span>;
    default:
      return <span className="break-words">{value}</span>;
  }
};