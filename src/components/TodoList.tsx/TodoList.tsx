import React from 'react';
import './TodoList.sass';
import TodoItem from '../TodoItem/TodoItem.tsx';
import todoStore from '../../store/todo'
import {toJS} from 'mobx'
import {observer} from 'mobx-react-lite'

const TodoList: React.FC = observer(() => {
  return (
    <ul className='todo-list__container'>
      {
        toJS(todoStore.todos).map(todo => <TodoItem key={todo.id} {...todo} />)
      }
    </ul>
  )
})

export default TodoList;