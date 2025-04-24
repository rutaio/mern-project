import { Todo } from '../../types/types';

interface TodoProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className="TodoItem">
      <h3>{todo.name}</h3>
      <p>{todo.description}</p>
      <h6>{todo.status}</h6>
    </div>
  );
};
