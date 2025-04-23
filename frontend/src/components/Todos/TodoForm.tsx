import { useState } from 'react';

// kai bus pridetas naujas todo elementas, jis bus issiustas tevui:
export const TodoForm = ({addTodo}) => {
  // nusettina kai yra input:
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // jei yra reiksme, issiuncia ja i teva:
    if (value) {
      addTodo(value);
      setValue('');
    } else {
      alert('Iveskite uzduoti');
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Idekite uzduoti"
        className="todo-input"
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Todo
      </button>
    </form>
  );
};