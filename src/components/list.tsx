import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  timestamp: number;
}

function List() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //   useEffect(() => {
  //     if (todos.length > 0) {
  //       localStorage.setItem("todos", JSON.stringify(todos));
  //     }
  //   }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      timestamp: Date.now(),
    };
    setTodos([...todos, newTodoItem]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodoItem]));
    setNewTodo("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Historial de transacciones</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Agrega tu transacción acá"
        />
        <Button onClick={addTodo}>
          Agregar
        </Button>
      </div>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li className="flex gap-4 items-start" key={todo.id}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash />
            </Button>
            <div className="flex flex-col gap-2">
              <span>{todo.text}</span>
              <span className="text-sm text-gray-500">
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
