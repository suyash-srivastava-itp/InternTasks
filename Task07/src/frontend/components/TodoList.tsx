import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../model/db";
import { TodoBox } from "./TodoBox";
import { useState } from "react";

export function TodoList() {
  const lists = useLiveQuery(() => db.todoLists.toArray(), []) ?? [];
  const [title, setTitle] = useState("");

  async function addList() {
    if (!title.trim()) return;

    await db.todoLists.add({
      title
    });

    setTitle("");
  }

  async function deleteList(id?: number) {
    if (!id) return;

    await db.todoItems.where("todoListId").equals(id).delete();
    await db.todoLists.delete(id);
  }

  return (
    <section className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold">Todo Lists</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="New list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addList}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add List
        </button>
      </div>

      {lists.map((list) => (
        <div
          key={list.id}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
        >
          <div className="flex justify-between items-center">

            <h2 className="text-xl font-semibold">{list.title}</h2>

            <button
              onClick={() => deleteList(list.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>

          </div>

          <TodoBox listId={list.id!} />
        </div>
      ))}
    </section>
  );
}