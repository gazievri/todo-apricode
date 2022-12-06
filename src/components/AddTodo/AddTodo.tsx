import React from 'react';
import './AddTodo.sass';
import { useState, useRef, useEffect } from 'react'
import { ITodo } from '../../types/data';
import { sendTodo } from '../../utils/api.ts';
import todosStore from '../../store/todo.ts'

interface IAddTodoProps {
  isOpened: boolean,
  setIsOpened: (data: boolean) => void,
}

const AddTodo: React.FC<IAddTodoProps> = ({ isOpened, setIsOpened }) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  // Обработчик добавления новой задачи
  const addTodo = () => {
    if (value) {
      // Создание объекта нового todo
      const todo: ITodo = {
        id: Date.now(),
        title: value,
        complete: false
      }
      // Отправка нового todo на сервер
      sendTodo(todo)
      .then(res => {
        todosStore.addTodo(res);
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