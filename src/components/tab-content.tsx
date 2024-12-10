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
      title: "Tabla copiada",
      description: `${timestamp}`,
    });
  };

  return (
    <div
      className={`relative flex flex-col gap-4 w-full border-2 p-4 rounded-md ${
        ethBehavior === "up" ? "border-green-300" : "border-red-300"
      }`}
    >
      <div className='flex gap-3 items-center absolute right-0 bottom-4 px-4 w-full justify-between z-10'>
        <p className='text-sm text-gray-500'>{timestamp}</p>
        <div className='flex gap-3'>
          <Button variant='outline' size='icon' onClick={copyToClipboard}>
            <Copy />
          </Button>
          <Button
            className='hover:bg-red-300 ml-auto'
            variant='outline'
            size='icon'
            onClick={onDelete}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <CryptoTable index={id} ethValue={ethValue} ethBehavior={ethBehavior} />
    </div>
  );
}
