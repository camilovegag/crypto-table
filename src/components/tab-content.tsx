import { Button } from "@/components/ui/button";
import { CryptoTable } from "@/components/crypto-table";
import { Plus } from "lucide-react";

interface CryptoTableTabsContentProps {
  ethValue: string;
  ethBehavior: "up" | "down";
  tableCount: number;
  setTableCount: React.Dispatch<React.SetStateAction<number>>;
}

const CryptoTableTabsContent: React.FC<CryptoTableTabsContentProps> = ({ ethValue, ethBehavior, tableCount, setTableCount }) => {
  const addTable = () => {
    setTableCount(tableCount + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="self-start mt-6" onClick={addTable}>
        <Plus />
        Añadir Tabla
      </Button>
      {Array.from({ length: tableCount }).map((_, index) => (
        <CryptoTable key={index} ethValue={ethValue} ethBehavior={ethBehavior} />
      ))}
    </div>
  );
};

export default CryptoTableTabsContent;