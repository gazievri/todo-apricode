import React from 'react';
import { ITodo } from '../../types/data';
import './TodoItem.sass';

interface ITodoItem extends ITodo {
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {id, title, complete, deleteTodo, toggleTodo} = props;
  return (
    <div>
      <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)} />
      <p>{title}</p>
      <button onClick={() => deleteTodo(id)}>x</button>
    </div>
  )
}

export default TodoItem;
