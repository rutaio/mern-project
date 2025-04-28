// sis komponentas egzistuoja su tikslu - parodyti sarasa todos

import { useState } from 'react';
import { TodoItem } from './TodoItem/TodoItem';
import { Todo } from '../../types/types';
import { EditTodoItem } from './TodoActions/EditTodo';

interface TodoWrapperProps {
  todos: Todo[]; // priimu todos kaip propsa
  updateTodo: (updatedTodo: Todo) => void; // ateina is tevo
  deleteTodo: (id: string) => void; //  ateina is tevo
}

// todos ateina is Dashboard:
export const TodoWrapper: React.FC<TodoWrapperProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);

  // pradedu redaguoti sita todo frontende:
  const handleEditClick = (_id: string) => {
    setEditTodoId(_id);
  };

  const handleSave = (updatedTodo: Todo) => {
    updateTodo(updatedTodo);
    setEditTodoId(null);
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
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={handleEditClick}
            onDelete={deleteTodo}
          />
        )
      )}
    </div>
  );
};
