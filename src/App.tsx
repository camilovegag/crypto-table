import { ModeToggle } from "@/components/mode-toggle";

function App() {

  return (
    <>
      <header className="flex justify-between w-[min(1024px,80%)] mx-auto py-4">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Crypto Table
        </h1>
        <ModeToggle />
      </header>
      <main className="w-[min(1024px,80%)] mx-auto py-4">
      
      </main>
    </>
  );
}

export default App;