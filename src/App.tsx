import { ModeToggle } from "@/components/mode-toggle";
import FetchEthPrice from "@/components/fetch-eth-price";
import { Toaster } from "@/components/ui/toaster";
import { CryptoTable } from "./components/crypto-table";
import List from "./components/list";

export default function App() {
  return (
    <>
      <header className="flex justify-between w-[min(1024px,80%)] mx-auto py-4">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Crypto Table
        </h1>
        <ModeToggle />
      </header>
      <Toaster />
      <main className="w-[min(1024px,80%)] mx-auto py-4">
        <section className="flex flex-col gap-10">
        <FetchEthPrice />
        <CryptoTable />
        <List />
        </section>
      </main>
    </>
  );
}
