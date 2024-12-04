import { CryptoTable } from "@/components/crypto-table";

interface CryptoTableTabProps {
  id: string;
  timestamp: string;
  ethValue: string;
  ethBehavior: "up" | "down";
}

export default function CryptoTableTab({
  ethValue,
  ethBehavior,
  id,
  timestamp,
}: CryptoTableTabProps) {
  return (
    <div
      className={`flex flex-col gap-4 w-full border-2 p-4 rounded-md ${
        ethBehavior === "up" ? "border-green-200" : "border-red-200"
      }`}
    >
      <p className="text-sm text-gray-500">Tabla creada {timestamp}</p>
      <CryptoTable index={id} ethValue={ethValue} ethBehavior={ethBehavior} />
    </div>
  );
}
