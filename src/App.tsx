
import { useState } from 'react';
import { Todos } from './components/Todos';
import { FilterValue, type TodoId, type Todo as TodoType } from './types';
import { TODO_FILTERS } from './consts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoTitle } from './types';
const mockTodos = [{
  id: '1',
  title: 'todo 1',
  completed: true,

}, {
  id: '2',
  title: 'todo 2',
  completed: false,
}, {
  id: '3',
  title: 'todo 3',
  completed: false,
}]
const App = (): JSX.Element => {
  const [todos, setTodos] = useState (mockTodos);
 const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);
  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo, completed
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  }
  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todos => !todos.completed)
    setTodos(newTodos)
    
  }
  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todos => { 
    if (filterSelected === TODO_FILTERS.ACTIVE)  return !todos.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todos.completed
    return todos
  })

  const handleAddTodo = ({title} : TodoTitle): void => {
    const newTodo = {
    title,
     id: crypto.randomUUID(),
     completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
  <Footer
          activeCount={activeCount}
          filterSelected={filterSelected}
          handleFilterChange={handleFilterChange}
          onClearCompleted={handleRemoveAllCompleted}
          completedCount={completedCount}
         
        />    </div>
  );
};

export default App;