import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
}

function List() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const { toast } = useToast(); // Toast hook

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      timestamp: Date.now(),
    };
    const updatedTodos = [newTodoItem, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo("");
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[220px] md:top-4 md:right-4"
      ),
      title: "Transacción agregada!",
    });
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[220px] md:top-4 md:right-4"
      ),
      title: "Transacción eliminada!",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Historial de transacciones</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Agrega tu transacción acá"
        />
        <Button onClick={addTodo}>Agregar</Button>
      </div>
      <ul className="flex flex-col gap-6 mt-4 overflow-auto h-96 border p-4 rounded-sm">
        {todos.map((todo) => (
          <li className="flex gap-4 items-start" key={todo.id}>
            <Button
            className="hover:bg-red-300"
              variant="outline"
              size="icon"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash />
            </Button>
            <div className="flex flex-col gap-1">
              <span>{todo.text}</span>
              <span className="text-xs text-gray-500">
                {new Date(todo.timestamp).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default List;
