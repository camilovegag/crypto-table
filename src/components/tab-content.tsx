import { CryptoTable } from "@/components/crypto-table";
import { Button } from "./ui/button";
import { Copy, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CryptoTableTabProps {
  id: string;
  timestamp: string;
  ethValue: string;
  ethBehavior: "up" | "down";
  onDelete: () => void;
}

export default function CryptoTableTab({
  ethValue,
  ethBehavior,
  id,
  timestamp,
  onDelete,
}: CryptoTableTabProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Tabla ${timestamp}`);
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[320px] md:top-4 md:right-4"
      ),
      title: "Fecha de tabla copiada",
      description: `${timestamp}`,
    });
  };

  return (
    <div
      className={`flex flex-col gap-4 w-full border-2 p-4 rounded-md ${
        ethBehavior === "up" ? "border-green-200" : "border-red-200"
      }`}
    >
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy />
        </Button>
        <p className="text-sm text-gray-500">Tabla creada {timestamp}</p>
        <Button
          className="hover:bg-red-300 ml-auto"
          variant="outline"
          size="icon"
          onClick={onDelete}
        >
          <Trash />
        </Button>
      </div>
      <CryptoTable index={id} ethValue={ethValue} ethBehavior={ethBehavior} />
    </div>
  );
}
