export interface TodoItem {
  id?: number;
  todoListId: number;
  title: string;
  description : string;
  done?: boolean;
  due: string 
}

export interface TodoList {
  id?: number;
  title: string;
}
