import React from 'react';
import './TodoList.sass';
import TodoItem from '../TodoItem/TodoItem.tsx';
import { ITodo } from '../../types/data'

interface ITodoListProps {
  items: ITodo[],
  toggleTodo: (id: number) => void,
  deleteTodo: (id: number) => void,
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const {items, toggleTodo, deleteTodo} = props;

  return (
    <ul className='todo-list__container'>
      {
        items.map(todo => <TodoItem key={todo.id} {...todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
      }
    </ul>
  )
}

export default TodoList;