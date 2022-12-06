import React from 'react';
import './AddTodo.sass';
import { useState, useRef, useEffect } from 'react'
import { ITodo } from '../../types/data';
import { sendTodo } from '../../utils/api.ts';

interface IAddTodoProps {
  isOpened: boolean,
  todos: ITodo[],
  setTodos: (data: ITodo[]) => void,
  setIsOpened: (data: boolean) => void,
}

const AddTodo: React.FC<IAddTodoProps> = ({ isOpened, setTodos, todos, setIsOpened }) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  // Обработчик добавления новой задачи
  const addTodo = () => {
    if (value) {
      let newTodos: ITodo[];

      const todo = {
        id: Date.now(),
        title: value,
        complete: false
      }

      sendTodo(todo)
      .then(res => {

        // Добавление нового Todo массив
        newTodos = [...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }];

        // Сортировка массива Todos
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
      setValue("");
      setIsOpened(false);

      })
    .catch(err => console.log(err))

    }
  }

  // Обновляю значение в стейте при вводе символов в инпут
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  // Обработчик нажатия на клавишу enter
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") addTodo();
  }

  // Обработчик закрытия модлаьного окна при клике по оверлею
  const handleClickOnOverlay: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) setIsOpened(false);
  }

  // Установка фокуса на input при открытие попапа
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isOpened])

  return (
    <div className={`add-todo ${isOpened && "add-todo_opened"}`} onClick={handleClickOnOverlay}>
      <div className="add-todo__container">
        <h2 className='add-todo__title'>Add Todo</h2>
        <input className='add-todo__input' value={value} onChange={handleChange} ref={inputRef} onKeyDown={handleKeyDown} />
        <div className='add-todo__icon'></div>
        <button type='button' className='add-todo__btn' onClick={addTodo}>Add</button>
      </div>
    </div>
  )
}

export default AddTodo;