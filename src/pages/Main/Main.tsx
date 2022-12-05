import React from 'react';
import './Main.sass';
import { useState, useEffect, useRef } from 'react';
import { ITodo } from '../../types/data'
import TodoList from '../../components/TodoList.tsx/TodoList.tsx';

const Main: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }])
      setValue("")
    }
  }

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => todo.id !== id ? todo : {...todo, complete: !todo.complete}))
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])


  return (
    <section className='main'>
      <div>
        <input value={value} onChange={handleChange} ref={inputRef} onKeyDown={handleKeyDown} />
        <button type='button' onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </section>
  )
}

export default Main;