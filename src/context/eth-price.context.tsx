import { createContext } from "react";

interface EthPriceContextType {
  ethPrice: string | null;
  lastUpdated: string | null;
  fetchPrice: () => void;
}

export const EthPriceContext = createContext<EthPriceContextType | null>(null);
