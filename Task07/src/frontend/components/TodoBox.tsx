import { useLiveQuery } from "dexie-react-hooks";
import type { TodoItem } from "../model/types";
import { db } from "../model/db";

interface Props {
  item: TodoItem;
}

export function TodoBox() {

  const items = useLiveQuery(
    () => db.todoItems.toArray(),
    []
  ) ?? [{
      todoListId: -1,
      title: "jwkdnjew",
      description: "deded",
      due: "dewdw",
      done: false
  }];

 //   console.log(items);

  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="border">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <p>{item.due}</p>
          <p>{item.done ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
