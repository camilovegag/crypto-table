import {
  aggregatorV3InterfaceABI,
  oracleAddress,
  providerUrl,
} from "@/constants/eth";
import { Contract, formatUnits, JsonRpcProvider } from "ethers";
import { ReactNode, useEffect, useState } from "react";
import { EthPriceContext } from "./eth-price.context";

interface EthPriceProviderProps {
  children: ReactNode;
}

export default function EthPriceProvider({ children }: EthPriceProviderProps) {
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const provider = new JsonRpcProvider(providerUrl);

      const contract = new Contract(
        oracleAddress,
        aggregatorV3InterfaceABI,
        provider
      );

      const roundData = await contract.latestRoundData();
      console.log("🚀 ~ fetchPrice ~ roundData:", roundData.updatedAt);
      const price = formatUnits(roundData.answer, 8);
      setEthPrice(price);
      setLastUpdated(
        new Date(Number(roundData.updatedAt) * 1000).toLocaleTimeString()
      );
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  useEffect(() => {
    fetchPrice(); // Initial fetch
    const interval = setInterval(fetchPrice, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <EthPriceContext.Provider value={{ ethPrice, lastUpdated, fetchPrice }}>
      {children}
    </EthPriceContext.Provider>
  );
}
