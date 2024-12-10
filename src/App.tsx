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

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <header className='border-b'>
        <nav className='flex justify-between w-[min(1280px,90%)] mx-auto py-6 items-center'>
          <div className='flex gap-10 items-center'>
            <div className='flex gap-3 items-start'>
              <Avatar className='w-9'>
                <AvatarImage src='./eth.svg' />
                <AvatarFallback>CT</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-gray-400'>
                  Crypto Table
                </h1>
                <p className='text-sm text-gray-500'>
                  Hora actual: {currentTime}
                </p>
              </div>
            </div>
            <FetchEthPrice />
          </div>
          <div className='flex gap-3 items-center mr-40'>
            <Button onClick={() => addTable("up")}>
              ETH al Alza
              <TrendingUp className='w-5 text-green-400' />
            </Button>
            <Button onClick={() => addTable("down")}>
              ETH a la Baja
              <TrendingDown className='w-5 text-red-400' />
            </Button>
          </div>
          <ModeToggle />
        </nav>
      </header>
      <Toaster />
      <main className='w-[min(1280px,90%)] mx-auto py-4'>
        <section className='flex flex-col gap-8'>
          {tables.length > 0 && (
            <section className='flex flex-col gap-4 overflow-auto h-[702px] border p-4 rounded-md'>
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
