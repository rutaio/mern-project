// sis komponentas egzistuoja su tikslu - valdyti a single todo ir parodyti mygtukus, kad tokie yra.

import { Todo } from '../../../types/types';
import './todo-item.css';

interface TodoProps {
  todo: Todo;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
}

export const TodoItem: React.FC<TodoProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="todo-wrapper">
      <div className="todo-card">
        <div className="todo-hero">
          <h3>{todo.name}</h3>
          <h6>{todo.status}</h6>
        </div>
        <p>{todo.description}</p>
        <div className="todo-actions">
          <button onClick={() => onEdit(todo._id)}>Edit</button>
          <button onClick={() => onDelete(todo._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
