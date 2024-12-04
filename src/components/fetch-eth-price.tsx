import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Contract, formatUnits, JsonRpcProvider } from "ethers";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const FetchEthPrice = () => {
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast(); // Toast hook from shadcn

  // Aave Oracle Contract Address and ABI
  const oracleAddress = "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70"; // Replace with your desired oracle
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const fetchPrice = async () => {
    try {
      const provider = new JsonRpcProvider("https://mainnet.base.org"); // Replace with your provider URL

      const contract = new Contract(
        oracleAddress,
        aggregatorV3InterfaceABI,
        provider
      );

      const roundData = await contract.latestRoundData();
      const price = formatUnits(roundData.answer, 8); // Price is in 8 decimals
      setEthPrice(price);
      setLastUpdated(
        new Date(Number(roundData.updatedAt) * 1000).toLocaleString()
      );
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  const copyToClipboard = () => {
    if (ethPrice) {
      navigator.clipboard.writeText(`${parseFloat(ethPrice).toFixed(2)}`);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[220px] md:top-4 md:right-4"
        ),
        title: "Precio de ETH Copiado!",
        description: `${ethPrice}`,
      });
    }
  };

  useEffect(() => {
    fetchPrice(); // Initial fetch
    const interval = setInterval(fetchPrice, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Ethereum</h2>
      {ethPrice ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-end">
            <p className="text-lg">${parseFloat(ethPrice).toFixed(2)}</p>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Ultima actualización: {lastUpdated}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default FetchEthPrice;
