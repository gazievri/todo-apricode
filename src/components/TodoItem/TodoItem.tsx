import React from 'react';
import { ITodo } from '../../types/data';
import './TodoItem.sass';
import { useRef } from 'react'
import todosStore from '../../store/todo.ts'
import { observer } from 'mobx-react-lite'
import { deleteTodoApi, changeStatusTodoApi } from '../../utils/api.ts'
import { toJS } from 'mobx'

interface ITodoItem extends ITodo {}

const TodoItem: React.FC<ITodoItem> = observer((props) => {
  const { id, title, complete } = props;

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleClickFakeCheckbox = () => {
    checkboxRef.current?.click()
  }

  // Обработка изменения статуса todo
  const handleToggleStatusTodo = (id: number) => {
    const newTodo = toJS(todosStore.todos).find(item => item.id === id);
    // Изменение статуса todo
    if (newTodo) { newTodo.complete = !newTodo.complete; }
    // Отправка запроса на сервер
    changeStatusTodoApi(id, newTodo)
      .then(res => todosStore.toggleTodo(res))
      .catch(err => console.log(err))
  }

  // Удаление todo
  const handleDeleteTodo = (id: number) => {
    deleteTodoApi(id)
      .then(() => todosStore.removeTodo(id))
      .catch(err => console.log(err))
  }

  return (
    <li className={`todo__container ${complete && 'todo__container_done'}`}>
      <input className='todo__checkbox' type="checkbox" checked={complete} onChange={() => handleToggleStatusTodo(id)} ref={checkboxRef} />
      <div className={complete ? 'todo__fake-checkbox_clicked' : 'todo__fake-checkbox'} onClick={handleClickFakeCheckbox} />
      <p className={`todo__text ${complete && 'todo__text_done'}`}>{title}</p>
      <button className='todo__delete-btn' onClick={() => handleDeleteTodo(id)} type="button" />
    </li>
  )
})

export default TodoItem;
