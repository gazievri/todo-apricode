import React from 'react';
import './Main.sass';
import { useState, useEffect } from 'react';
import TodoList from '../../components/TodoList.tsx/TodoList.tsx';
import AddTodo from '../../components/AddTodo/AddTodo.tsx';
import { getTodos, activateFilterApi } from '../../utils/api.ts';
import todosStore from '../../store/todo.ts';
import {toJS} from 'mobx'
import {observer} from 'mobx-react-lite';

const Main: React.FC = observer(() => {
  const [isOpened, setIsOpened] = useState(false)

  // Обработка клика по кнопке открыть модальное окно Добавление нового todo
  const handleOpenAddTodo = (): void => {
    setIsOpened(true);
  }

  // Применение фильтров с запросом на сервер
  const handleClickFilter = (key: string | null) => {
    let query = '';

    // Определение get параметра в зависимости от нажатой кнопки
    if (!key) {
      query = ``
    } else if (key === 'todo') {
      query = `?complete=false`
    } else if (key === 'done') {
      query = `?complete=true`
    }

    // Запрос на сервер
    activateFilterApi(query)
    .then(res => todosStore.setAllTodos(res))
    .catch(err => console.log(err))
  }

  // Загрузка всех todo с сервера при загрузке страницы
  useEffect(() => {
    getTodos()
    .then(res => {
      todosStore.setAllTodos(res)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <section className='main'>
      <div className='main__header'>
        <div className='main__filters'>
          <button type="button" className='main__filter' onClick={() => handleClickFilter('')} >All</button>
          <button type="button" className='main__filter' onClick={() => handleClickFilter('todo')}>Todo</button>
          <button type="button" className='main__filter' onClick={() => handleClickFilter('done')}>Done</button>
        </div>
        <div className='main__info'>
          <div className='main__info-icon' />
          <h2 className='main__info-data'>{`${toJS(todosStore.todos).filter(item => item.complete === true).length} / ${toJS(todosStore.todos).length}`}</h2>
          <button className='main__add-btn' type="button" onClick={handleOpenAddTodo} />
        </div>
      </div>
      <TodoList />
      <AddTodo isOpened={isOpened} setIsOpened={setIsOpened} />
    </section>
  )
})

export default Main;