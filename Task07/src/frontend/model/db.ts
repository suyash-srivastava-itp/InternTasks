import Dexie, { type Table } from 'dexie';
import type { TodoItem, TodoList } from './types';


export class TodoDB extends Dexie {
    todoLists!: Table<TodoList, number>;
    todoItems!: Table<TodoItem, number>;

    constructor() {
        super('TodoDB');
        this.version(1).stores({
            todoLists: "++id",
            todoItems: "++id, todoListId,done"
        });
    }
}

export const db  = new TodoDB();

export async function populate() {
    const todolistId : number = await db.todoLists.add({
      title : "New List",
    })

    await db.todoItems.bulkAdd([
    {
      todoListId: todolistId ,
      title: "Feed the birds",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: true

    },
    {
      todoListId: todolistId,
      title: "Watch a movie",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: true
    },
    {
      todoListId: todolistId,
      title: "Have some sleep",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: false
    }
  ]);

  const todolistId2 : number = await db.todoLists.add({
    title: "Newer List"
  });

  await db.todoItems.bulkAdd([{
      todoListId: todolistId ,
      title: "Feed the birds",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: true

    },
    {
      todoListId: todolistId,
      title: "Watch a movie",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: true
    },
    {
      todoListId: todolistId,
      title: "Have some sleep",
      description: "hdwhdiwhdiw",
      due : Date.now().toString(),
      done: false
    }])
}

export function resetDatabase() {
  return db.transaction('rw', db.todoLists, db.todoItems, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    await populate();
  });
}