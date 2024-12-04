import { ThemeProvider } from "@/components/theme-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import EthPriceProvider from "./context/eth-price-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EthPriceProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    </EthPriceProvider>
  </StrictMode>
);
