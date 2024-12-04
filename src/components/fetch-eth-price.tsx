import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Copy, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useEthPrice } from "@/hooks/use-eth-price";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const FetchEthPrice = () => {
  const { ethPrice, lastUpdated, fetchPrice } = useEthPrice();
  const { toast } = useToast(); // Toast hook from shadcn
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const prevEthPrice = useRef<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prevEthPrice.current && prevEthPrice.current !== ethPrice) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[320px] md:top-4 md:right-4 border-blue-300"
        ),
        title: "Precio de ETH Actualizado! 🚀",
        description: `Nuevo: $${ethPrice}, anterior: $${prevEthPrice.current}`,
      });
    }
    prevEthPrice.current = ethPrice;
  }, [ethPrice, toast]);

  const copyToClipboard = () => {
    if (ethPrice) {
      navigator.clipboard.writeText(`${parseFloat(ethPrice).toFixed(2)}`);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[320px] md:top-4 md:right-4"
        ),
        title: "Precio de ETH Copiado!",
        description: `${ethPrice}`,

      });
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl font-bold">Ethereum (Aave)</h2>
        <Avatar className="w-6">
          <AvatarImage src="./base.svg" />
          <AvatarFallback>BASE</AvatarFallback>
        </Avatar>
      </div>
      {ethPrice ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-end w-full">
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy />
            </Button>
            <p className="text-lg">${parseFloat(ethPrice).toFixed(2)}</p>
            <Button className="ml-auto" onClick={fetchPrice}>
              <RefreshCcw />
              Actualizar
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Ultima actualización: {lastUpdated}
          </p>
          <p className="text-sm text-gray-500">Hora actual: {currentTime}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
};

export default FetchEthPrice;
