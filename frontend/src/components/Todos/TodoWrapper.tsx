import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
// import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types/types';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  //  const handleAddTodo = (todo: Todo) => {
  //   setTodos([...todos, todo]);
  // };

  // atsisiunciu visus todos:
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="TodoWrapper">
      {/*  <TodoForm addTodo={handleAddTodo} /> */}
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </div>
  );
};
