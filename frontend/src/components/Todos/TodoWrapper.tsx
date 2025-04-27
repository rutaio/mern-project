// sis komponentas egzistuoja su tikslu - valdyti todo sarasa ir API calls.

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { TodoItem } from './TodoItem/TodoItem';
import { Todo } from '../../types/types';
import { EditTodoItem } from './TodoActions/EditTodo';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

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

  // pradedu redaguoti sita todo frontende:
  const handleEditClick = (_id: string) => {
    setEditTodoId(_id);
  };

  const handleSave = async (updatedTodo: Todo) => {
    try {
      await axios.put(`${API_URL}/todos/${updatedTodo._id}`, updatedTodo);
      // pereina per visa todo sarasa ir updatina mano paredaguota todo:
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      setEditTodoId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="TodoWrapper">
      {/* eina per visa todo sarasa ir sukuria kiekvienam todo po kortele (TodoItem.tsx): */}
      {todos.map((todo) =>
        // cia prasideda ternary operator, kurio reikia, kad suprastume ar pasirinktas todo yra in edit mode ar yra tiesiog iprastas todo:
        editTodoId === todo._id ? (
          // cia prasideda Edit komponentas:
          // jei todo yra in edit mode, tuomet is cia issiunciame kvietima Edit komponentui redaguoti butent to konkretaus todo turini (kuris bus parodytas Edit formoje, o funkcijos leis issaugoti arba cancel):
          <EditTodoItem
            key={todo._id}
            todo={todo}
            onSave={handleSave}
            onCancel={() => setEditTodoId(null)}
          />
        ) : (
          // jei todo nera redaguojamas, rodome iprasta sarasa todos:
          // cia yra nurodyta funkcija tuo atveju, jei konkretus todo butu paspaustas redaguoti:
          <TodoItem key={todo._id} todo={todo} onEdit={handleEditClick} />
        )
      )}
    </div>
  );
};
