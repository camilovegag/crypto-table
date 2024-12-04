import FetchEthPrice from "@/components/fetch-eth-price";
import List from "@/components/list";
import { ModeToggle } from "@/components/mode-toggle";
import CryptoTableTabsContent from "@/components/tab-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useEthPrice } from "@/hooks/use-eth-price";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const { ethPrice } = useEthPrice();
  const [ethValue, setEthValue] = useState("");
  const [tab, setTab] = useState("up");

  useEffect(() => {
    if (ethPrice) {
      setEthValue(ethPrice);
    }
  }, [ethPrice]);

  return (
    <>
      <header className="border-b">
        <nav className="flex justify-between w-[min(1024px,80%)] mx-auto py-4">
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
      <main className="w-[min(1024px,80%)] mx-auto py-10">
        <section className="flex flex-col gap-10">
          <FetchEthPrice />
          <Tabs
            defaultValue="up"
            onValueChange={setTab}
            className={`w-full border-2 p-4 rounded-md ${
              tab === "up" ? "border-green-200" : "border-red-200"
            }`}
          >
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger className="flex gap-2 h-8 items-center" value="up">
                ETH al Alza
                <TrendingUp className="w-5 text-green-400" />
              </TabsTrigger>
              <TabsTrigger className="flex gap-2 h-8 items-center" value="down">
                ETH a la Baja
                <TrendingDown className="w-5 text-red-400" />
              </TabsTrigger>
            </TabsList>
            <TabsContent className="overflow-auto h-96" value="up">
              <CryptoTableTabsContent ethValue={ethValue} ethBehavior="up" />
            </TabsContent>
            <TabsContent className="overflow-auto h-96" value="down">
              <CryptoTableTabsContent ethValue={ethValue} ethBehavior="down" />
            </TabsContent>
          </Tabs>
          <List />
        </section>
      </main>
    </>
  );
}
