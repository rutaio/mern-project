import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Todo } from '../../types/types';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

// kai bus pridetas naujas todo elementas, jis bus issiustas tevui:
export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // siunciu duomenis:
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        setValue('');
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
        <label htmlFor="name">Pavadinimas</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Aprasymas</label>
        <input
          type="text"
          id="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Statusas</label>
        <input
          type="text"
          id="status"
          required
          value={status}
          placeholder="baigta ar nebaigta?"
          onChange={(event) => setStatus(event.target.value)}
        />
      </div>

      <button type="submit" className="todo-btn">
        Add Todo
      </button>
    </form>
  );
};
