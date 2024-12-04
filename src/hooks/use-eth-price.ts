import { EthPriceContext } from '@/context/eth-price.context';
import { useContext } from 'react';

export const useEthPrice = () => {
  const context = useContext(EthPriceContext);
  if (!context) {
    throw new Error('useEthPrice must be used within an EthPriceProvider');
  }
  return context;
};