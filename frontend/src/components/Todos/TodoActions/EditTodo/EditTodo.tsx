// sis komponentas egzistuoja su tikslu - parodyti forma, kai norima redaguoti konkretu todo ir priimti paredaguotus inputs is userio.

import { Todo } from '../../../../types/types';
import { useState } from 'react';
import './edit-todo.css';

interface EditTodoProps {
  todo: Todo;
  onSave: (todo: Todo) => void;
  onCancel: () => void;
}

export const EditTodoItem: React.FC<EditTodoProps> = ({
  todo,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);

  // kai formoje yra paspaudziamas mygtukas "save", iskvieciame funkcija onSave.
  // tevas TodoWrapper irgi gauna si update, ir tada jis siuncia PUT request i Dashboard.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // issaugo visus todo laukelius, taip pat ir _id:
    onSave({ ...todo, name, description, status });
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="inputs-container">
        <div className="form-group">
          <label htmlFor="name">Name your todo:</label>
          <input
            className="short-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            className="short-input"
            type="text"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Describe details:</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>

      <div className='buttons-container'>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
