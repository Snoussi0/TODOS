import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../interfaces/Todo";

const INITIAL_TODOS = [
  {
    id: uuidv4(),
    title: "todo 1",
  },
  {
    id: uuidv4(),
    title: "todo 2",
  },
  {
    id: uuidv4(),
    title: "todo 3",
  },
];

const useTodos = () => {
  // array of todos
  const [todos, setTodos] = useState<Array<Todo>>(INITIAL_TODOS);
  // current todo to update, if id equal -1 this mean it is a new todo to add
  const [todo, setTodo] = useState<Todo | null>(null);
  // handle submit todo form (update and add)
  const onSubmit = () => {
    if (!todo) return;
    if (todo.id === "-1") {
      setTodos([{ ...todo, id: uuidv4() }, ...todos]);
    } else {
      setTodos(todos.map((e) => (e.id === todo.id ? todo : e)));
    }
    setTodo(null);
  };
  // handle click cancel button in todo form
  const onCancel = () => {
    setTodo(null);
  };
  // handle click add todo button
  const onAdd = () => {
    setTodo({
      id: "-1",
      title: "",
    });
  };
  // handle click update todo
  const onUpdate = (id: string) => () => {
    const currentTodo = todos.find((e) => e.id === id);
    if (!currentTodo) return;
    setTodo(currentTodo);
  };
  // handle remove todo item
  const onRemove = (id: string) => () => {
    setTodos(todos.filter((e) => e.id !== id));
  };
  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!todo) return;
    setTodo({
      ...todo,
      title: e.currentTarget.value,
    });
  };
  // handle change description
  const onDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (!todo) return;
    setTodo({
      ...todo,
      description: e.currentTarget.value,
    });
  };
  // handle change isDone
  const onIsDoneChange = () => {
    if (!todo) return;
    setTodo({
      ...todo,
      isDone: todo.isDone ? undefined : new Date(),
    });
  };
  return {
    todos: todos.sort((a, b) => {
      // Check if both todos have an isDone property
      if (a.isDone && b.isDone) {
        return Number(b.isDone) - Number(a.isDone); // Sort by date
      } else if (a.isDone) {
        return 1; // b comes first since it's done
      } else if (b.isDone) {
        return -1; // a comes first since it's done
      } else {
        return 0; // No isDone property on either todo
      }
    }),
    todo,
    onSubmit,
    onRemove,
    onTitleChange,
    onAdd,
    onCancel,
    onDescriptionChange,
    onIsDoneChange,
    onUpdate,
  };
};

export default useTodos;
