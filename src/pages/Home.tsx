import { Fragment } from "react";
import TodoForm from "../components/TodoForm.tsx";
import useTodos from "../hooks/useTodos";

const Home = () => {
  const {
    todos,
    onRemove,
    onAdd,
    todo,
    onCancel,
    onSubmit,
    onTitleChange,
    onDescriptionChange,
    onIsDoneChange,
    onUpdate,
  } = useTodos();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={onAdd}>Add a todo</button>
      {todos ? (
        <Fragment>
          <h4>Todo List</h4>
          <ul>
            {todos.map((e) => (
              <li key={e.id} className={e.isDone && "checked"}>
                <span>{e.title}</span>
                <button onClick={onRemove(e.id)}>remove</button>
                <button onClick={onUpdate(e.id)}>update</button>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h4>Empty List</h4>
      )}
      {todo !== null && (
        <dialog open={todo !== null}>
          <TodoForm
            title={todo.title}
            description={todo.description || ""}
            onDescriptionChange={onDescriptionChange}
            onIsdoneChange={onIsDoneChange}
            onTitleChange={onTitleChange}
            isDone={todo.isDone}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </dialog>
      )}
    </div>
  );
};

export default Home;
