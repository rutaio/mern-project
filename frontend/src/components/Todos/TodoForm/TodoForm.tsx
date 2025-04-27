import { useState } from 'react';
import './todo-form.css';
import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { Todo } from '../../../types/types';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

// kai bus pridetas naujas todo elementas, jis bus issiustas tevui:
export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // siunciu duomenis, kai yra uzpildoma forma:
  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    // jei yra reiksme, issiuncia ja i teva:
    if (name || description || status) {
      try {
        await axios.post(`${API_URL}/todos`, {
          name: name,
          description: description,
          status: status,
        });
        const newTodo: Todo = {
          name: name,
          description: description,
          status: status,
        };
        addTodo(newTodo);
        // resettinu forma:
        setName('');
        setDescription('');
        setStatus('');
      } catch (error) {
        // idedame atejusi error:
        if (axios.isAxiosError(error)) {
          // einu gilyn per objektus:
          const errorMessage =
            error.response?.data?.error || 'Error happenned...';
          console.error('Error creating a todo item:', errorMessage);
        }
      }
    } else {
      alert('Please add a todo item');
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name your todo:</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Describe details:</label>
        <input
          type="text"
          id="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Status:</label>
        <input
          type="text"
          id="status"
          required
          value={status}
          placeholder="finished or not?"
          onChange={(event) => setStatus(event.target.value)}
        />
      </div>

      <button type="submit" className="todo-btn">
        Add Todo
      </button>
    </form>
  );
};
