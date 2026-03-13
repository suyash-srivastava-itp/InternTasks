import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../model/db";
import { useState } from "react";

interface Props {
  listId: number;
}

export function TodoBox({ listId }: Props) {

  const items = useLiveQuery(
    () => db.todoItems.where("todoListId").equals(listId).toArray(),
    [listId]
  ) ?? [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");

  async function addItem() {
    if (!title.trim()) return;

    await db.todoItems.add({
      todoListId: listId,
      title,
      description,
      due,
      done: false
    });

    setTitle("");
    setDescription("");
    setDue("");
  }

  async function toggleDone(id?: number, done?: boolean) {
    if (!id) return;

    await db.todoItems.update(id, {
      done: !done
    });
  }

  async function deleteItem(id?: number) {
    if (!id) return;

    await db.todoItems.delete(id);
  }

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-4 gap-2">

        <input
          placeholder="Title"
          className="border px-2 py-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          className="border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />

        <button
          onClick={addItem}
          className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
        >
          Add
        </button>

      </div>

 
      <div className="space-y-2">

        {items.map((item) => (
          <div
            key={item.id}
            className={`border rounded p-3 flex justify-between items-center
              ${item.done ? "bg-green-50" : "bg-gray-50"}
            `}
          >
            <div>

              <h3 className={`font-semibold ${item.done ? "line-through" : ""}`}>
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">{item.description}</p>

              <p className="text-xs text-gray-400">
                Due: {item.due}
              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() => toggleDone(item.id, item.done)}
                className="text-blue-500 hover:text-blue-700"
              >
                {item.done ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}