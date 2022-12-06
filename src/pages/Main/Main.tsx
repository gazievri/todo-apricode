import React from 'react';
import './Main.sass';
import { useState, useEffect, useRef } from 'react';
import { ITodo } from '../../types/data'
import TodoList from '../../components/TodoList.tsx/TodoList.tsx';
import AddTodo from '../../components/AddTodo/AddTodo.tsx';
import { getTodos, deleteTodoApi, changeStatusTodoApi  } from '../../utils/api.ts';

const Main: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpened, setIsOpened] = useState(false)

  const deleteTodo = (id: number): void => {
    deleteTodoApi(id)
    .then(res => setTodos(todos.filter(todo => todo.id !== id)))
    .catch(err => console.log(err))
  }

  const toggleTodo = (id: number): void => {
    let newTodos: ITodo[];

   

    newTodos = todos.map(todo => todo.id !== id ? todo : {...todo, complete: !todo.complete});
    newTodos = newTodos.sort(function (a, b) {
      if (a.complete > b.complete) {
        return 1;
      }
      if (a.complete < b.complete) {
        return -1;
      }
      return 0;
    });

    setTodos(newTodos);
  }

  const handleOpenAddTodo = (): void => {
    setIsOpened(true);
  }

  console.log(todos)

  useEffect(() => {
    getTodos()
    .then(res => setTodos(res))
    .catch(err => console.log(err))
  }, [])

  return (
    <section className='main'>
      <div className='main__header'>
        <div className='main__filters'>
          <button type="button" className='main__filter' disabled={todos.length === 0 ? true : false}>All</button>
          <button type="button" className='main__filter' disabled={todos.length === 0 ? true : false}>Todo</button>
          <button type="button" className='main__filter' disabled={todos.length === 0 ? true : false}>Done</button>
        </div>
        <div className='main__info'>
          <div className='main__info-icon' />
          <h2 className='main__info-data'>{`${todos.filter(item => item.complete === true).length} / ${todos.length}`}</h2>
          <button className='main__add-btn' type="button" onClick={handleOpenAddTodo} />
        </div>
      </div>
      <TodoList items={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      <AddTodo isOpened={isOpened} setTodos={setTodos} todos={todos} setIsOpened={setIsOpened} />
    </section>
  )
}

export default Main;