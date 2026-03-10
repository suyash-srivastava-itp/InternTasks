import { useEffect } from "react";
import { TodoList } from "./components/TodoList";
import "./index.css";
import { populate, resetDatabase } from "./model/db";


export function App() {

  useEffect(() => {
    resetDatabase();
  }, []);
  return (
    <main className="w-full h-full">
      <TodoList />
    </main>
  );
}

export default App;
