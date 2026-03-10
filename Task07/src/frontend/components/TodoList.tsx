import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { db } from "../model/db";
import { TodoBox } from "./TodoBox";

export function TodoList() {
  const lists = useLiveQuery(() => db.todoLists.toArray());
  if (!lists) return null;

 
  return (
    <section>
      {lists.map((list) => (
        <div key={list.id}>{list.title}</div>
      ))}
      <TodoBox />
    </section>
  );
}
