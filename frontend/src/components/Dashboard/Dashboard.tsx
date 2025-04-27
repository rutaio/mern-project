import { useContext, useState } from 'react';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { TodoWrapper } from '../Todos/TodoWrapper';
import { TodoForm } from '../Todos/TodoForm/TodoForm';
import { Todo } from '../../types/types';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);

  // sukuriame array su pries tai buvusia ir naujausia info:
  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Account Information</h3>
          <div className="account-info">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Add Todo</h3>
          <div className="todo-form">
            <TodoForm addTodo={addTodo} />
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Todos</h3>
          <div className="todo-info">
            <TodoWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};
