import React from 'react';
import { ITodo } from '../../types/data';
import './TodoItem.sass';
import { useRef, useState } from 'react'

interface ITodoItem extends ITodo {
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {id, title, complete, deleteTodo, toggleTodo} = props;

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleClickFakeCheckbox = () => {
    checkboxRef.current?.click()
  }

  return (
    <li className={`todo__container ${complete && 'todo__container_done'}`}>
      <input className='todo__checkbox' type="checkbox" checked={complete} onChange={() => toggleTodo(id)} ref={checkboxRef}/>
      <div className={complete? 'todo__fake-checkbox_clicked' : 'todo__fake-checkbox'} onClick={handleClickFakeCheckbox}/>
      <p className={`todo__text ${complete && 'todo__text_done'}`}>{title}</p>
      <button className='todo__delete-btn' onClick={() => deleteTodo(id)} />
    </li>
  )
}

export default TodoItem;
