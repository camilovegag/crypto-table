import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CryptoTable } from "@/components/crypto-table";
import { Plus } from "lucide-react";

interface CryptoTableTabsContentProps {
  ethValue: string;
  ethBehavior: "up" | "down";
}

const CryptoTableTabsContent: React.FC<CryptoTableTabsContentProps> = ({
  ethValue,
  ethBehavior,
}) => {
  const [tableCount, setTableCount] = useState(1);

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
        <CryptoTable
          key={index}
          index={index}
          ethValue={ethValue}
          ethBehavior={ethBehavior}
        />
      ))}
    </div>
  );
};

export default CryptoTableTabsContent;
