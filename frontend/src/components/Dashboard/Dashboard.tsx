// sis komponentas egzistuoja su tikslu - uz API calls ir priimti info is vaiku: per addTodo funkcija suzino apie naujus todos ir perduoda sia info TodoWrapper

import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { TodoWrapper } from '../Todos/TodoWrapper/TodoWrapper';
import { TodoForm } from '../Todos/TodoActions/TodoForm/TodoForm';
import { Todo } from '../../types/types';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  // GET - atsisiunciu visus todos:
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // uzkrauna duomenis kai pasileidzia sis puslapis:
  useEffect(() => {
    fetchTodos();
  }, []);

  // POST - pridedu nauja todo i sarasa,  sukuriame array su pries tai buvusia ir naujausia info:
  // // pats POST request vyksta TodoForm
  // // addTodo ateina is TodoForm
  const addTodo = (newTodo: Todo) => {
    // pakeicia todos busena cia Dashboard (ir nusius sia info i TodoWrapper)
    // [...] (Spread Operator) - tai yra visi ankstesni todos
    // grazina nauja array su ankstesniais ir naujais duomenimis:
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    fetchTodos();
  };

  // PUT - po redagavimo updatinu konkretu todo:
  const updateTodo = async (updatedTodo: Todo) => {
    try {
      await axios.put(`${API_URL}/todos/${updatedTodo._id}`, updatedTodo);
      // pereina per visus todos, patikrina ar dabartinio todo ir mano redaguojamo todo id sutampa, ir updatina mano paredaguota todo su setTodos:
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error in updating a todo', error);
    }
  };

  // DELETE - istrinu konkretu todo:
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      // isfiltruok todos sarasa, surask trinama todo ir grazink sarasa be trinamo todo:
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error in deleting todo:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Have a productive day, {user?.name}!</p>
      </div>

      <div className="dashboard-content">
        <div className="todo-form">
          <h3>Add Todo</h3>
          <TodoForm addTodo={addTodo} />
        </div>

        <div className="todo-wrapper">
          <TodoWrapper
            todos={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};
