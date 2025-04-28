// sis komponentas egzistuoja su tikslais:
// 1. valdyti todo forma ir issiusti POST request i backend, kad sukurtu nauja todo.
// 2. informuoti teva Dashboard apie nauja todo per siunciama addTodo funkcija.

import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../constants/global';
import { Todo } from '../../../../types/types';
import './todo-form.css';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

// priima addTodo funkcija is tevo; kai bus pridetas naujas todo elementas, jis bus issiustas tevui:
export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // POST - siunciu duomenis, kai yra uzpildoma forma:
  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    // jei yra reiksme, issiuncia ja i teva:
    if (name || description || status) {
      try {
        // siunciu uzklausa i teva:
        const response = await axios.post(`${API_URL}/todos`, {
          name,
          description,
          status,
        });

        // kai atsakymas sekmingai gautas, pridedama nauja todo i teva:
        const newTodo: Todo = response.data;

        // pridedu nauja todo i teva Dashboard:
        addTodo(newTodo);

        // resettinu forma:
        setName('');
        setDescription('');
        setStatus('');
      } catch (error) {
        // jei ivyko klaida, isveda atejusi klaidos pranesima:
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
      <div className="inputs-container">
        <div className="form-group">
          <input
            placeholder="Name your todo:"
            type="text"
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Finished or not?"
            type="text"
            id="status"
            required
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Describe details:"
            type="text"
            id="description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>

      <button type="submit">Add Todo</button>
    </form>
  );
};
