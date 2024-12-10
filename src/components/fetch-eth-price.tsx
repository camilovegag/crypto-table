import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useEthPrice } from "@/hooks/use-eth-price";
import { useEffect, useRef } from "react";

const FetchEthPrice = () => {
  const { ethPrice, lastUpdated } = useEthPrice();
  const { toast } = useToast(); // Toast hook from shadcn

  const prevEthPrice = useRef<string | null>(null);

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

  return (
    <section className='flex flex-col gap-2'>
      {ethPrice ? (
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold'>
            ${parseFloat(ethPrice).toFixed(2)}
          </h2>
          <p className='text-sm text-gray-500'>
            Ultima actualización: {lastUpdated}
          </p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
};

export default FetchEthPrice;
