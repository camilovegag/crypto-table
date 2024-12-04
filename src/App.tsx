import FetchEthPrice from "@/components/fetch-eth-price";
import List from "@/components/list";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { useEthPrice } from "@/hooks/use-eth-price";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import CryptoTableTab from "./components/tab-content";

interface Table {
  id: string;
  timestamp: string;
  ethBehavior: "up" | "down";
}

export default function App() {
  const { ethPrice } = useEthPrice();
  const [ethValue, setEthValue] = useState<string>("");
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    if (ethPrice) {
      setEthValue(ethPrice);
    }
  }, [ethPrice]);

  const addTable = (ethBehavior: "up" | "down") => {
    const timestamp = new Date().toLocaleString();
    const id = `${timestamp}-${Date.now()}`;
    setTables([{ id, timestamp, ethBehavior }, ...tables]);
  };

  const deleteTable = (id: string) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  return (
    <>
      <header className="border-b">
        <nav className="flex justify-between w-[min(1280px,90%)] mx-auto py-4">
          <div className="flex gap-3 items-center">
            <Avatar className="w-9">
              <AvatarImage src="./eth.svg" />
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              Crypto Table
            </h1>
          </div>
          <ModeToggle />
        </nav>
      </header>
      <Toaster />
      <main className="w-[min(1280px,90%)] mx-auto py-10">
        <section className="flex flex-col gap-10">
          <FetchEthPrice />
          <div className="flex gap-3 items-center">
            <Button onClick={() => addTable("up")}>
              ETH al Alza
              <TrendingUp className="w-5 text-green-400" />
            </Button>
            <Button onClick={() => addTable("down")}>
              ETH a la Baja
              <TrendingDown className="w-5 text-red-400" />
            </Button>
          </div>
          {tables.length > 0 && (
            <section className="flex flex-col gap-4 overflow-auto h-96 border p-4 rounded-md">
              {tables.map((table) => (
                <CryptoTableTab
                  key={table.id}
                  ethValue={ethValue}
                  ethBehavior={table.ethBehavior}
                  id={table.id}
                  timestamp={table.timestamp}
                  onDelete={() => deleteTable(table.id)}
                />
              ))}
            </section>
          )}
          <List />
        </section>
      </main>
    </>
  );
}
