import { useState } from 'react';
import './App.css'

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!newTodo) {
      setError("Write a Todo name");
    } else {
      setError("");
      setTodoList([...todoList, {id: todoList.length + 1, name: newTodo, complete: false}]);
      setNewTodo("");
    }
  };

  const PendingToDO = todoList.filter((todo) => !todo.complete);

  const CompletedToDO = todoList.filter((todo) => todo.complete);

  const todoComplete = (todo_id) => {
    setTodoList(todoList.map((todo) => {
      return todo.id === todo_id ?
        {...todo, complete: true} :
        todo
    }));
  }

  return (
    <>
      <h1>Todo List</h1>

        <form className='create-form' action="" onSubmit={handleSubmit}>
          <input type="text" name="todo" id="todo-input" value={newTodo}  onChange={(e) => setNewTodo(e.target.value)}/>
          {error && <p style={{color:'red'}}>{error}</p>}
          <button type="submit">Create New Todo</button>
        </form>

      <div className='todo-list'>
        <h2>Pending TODO</h2>
          <ul>
            { PendingToDO.map((todo,index) => (
              <li key={index}>
                <span>{todo.name}</span> 
                <input type="checkbox" checked={todo.complete} onChange={() => todoComplete(todo.id)}/>
              </li>
            )) }
          </ul>

        <h2>Completed TODO</h2>
        <ul className='completed-todo'>
            { CompletedToDO.map((todo, index) => (
              <li key={index}>
                <span>{todo.name}</span>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default App
