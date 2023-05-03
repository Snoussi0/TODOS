import styles from "./TodoForm.module.css";

interface TodosFromPropsInterface {
  title: string;
  description: string;
  isDone?: Date;
  onTitleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onIsdoneChange: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}
const TodoForm = (props: TodosFromPropsInterface) => {
  const {
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    isDone,
    onIsdoneChange,
    onCancel,
    onSubmit,
  } = props;
  return (
    <form className={styles.container}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="Title"
        value={title}
        onChange={onTitleChange}
      />
      <label htmlFor="description">Descripton:</label>
      <textarea
        id="description"
        value={description}
        onChange={onDescriptionChange}
      />
      <label htmlFor="isDone">isDone:</label>
      <input
        type="checkbox"
        id="isDone"
        name="isDone"
        checked={isDone !== undefined}
        onChange={onIsdoneChange}
      />
      <div className={styles.buttonContainer}>
        <button onClick={onSubmit}> submit </button>
        <button onClick={onCancel}> cancel </button>
      </div>
    </form>
  );
};

export default TodoForm;
