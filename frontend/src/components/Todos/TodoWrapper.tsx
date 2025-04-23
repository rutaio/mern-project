import { useState } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="TodoWrapper">
      <TodoForm addTodo={handleAddTodo} />
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </div>
  );
};
