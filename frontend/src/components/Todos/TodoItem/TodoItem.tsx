// sis komponentas egzistuoja su tikslu - valdyti a single todo ir parodyti mygtukus, kad tokie yra.

import { Todo } from '../../../types/types';
import './todo-item.css';

interface TodoProps {
  todo: Todo;
  onEdit: (_id: string) => void;
}

export const TodoItem: React.FC<TodoProps> = ({ todo, onEdit }) => {
  return (
    <>
      <div className="todo-card">
        <h3>{todo.name}</h3>
        <p>{todo.description}</p>
        <h6>{todo.status}</h6>
        <div className="todo-actions">
          <button onClick={() => onEdit(todo._id)}>edit</button>
          <button>delete</button>
        </div>
      </div>
    </>
  );
};
