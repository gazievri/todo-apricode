import React from 'react';
import './Main.sass';
import { useState, useEffect, useRef } from 'react';
import { ITodo } from '../../types/data'
import TodoList from '../../components/TodoList.tsx/TodoList.tsx';
import AddTodo from '../../components/AddTodo/AddTodo.tsx';
import { getTodos, deleteTodoApi, changeStatusTodoApi, activateFilterApi } from '../../utils/api.ts';
import sortTodos from '../../utils/sortTodos.ts';

const Main: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpened, setIsOpened] = useState(false)

  // Обработка удаление todo по клику на кнопку удалить
  const deleteTodo = (id: number): void => {
    deleteTodoApi(id)
    .then(res => setTodos(todos.filter(todo => todo.id !== id)))
    .catch(err => console.log(err))
  }

  // Обработка клика по статусу todo (отправка данных на сервер и сохранение в стейт ответа от сервера)
  const toggleTodo = (id: number): void => {
    const newTodo = todos.find(item => item.id === id);
    // Изменение статуса todo
    if (newTodo) { newTodo.complete = !newTodo.complete; }

    // Отправка запроса на сервер
    changeStatusTodoApi(id, newTodo)
    .then(res => {
      let newTodos: ITodo[];
      // Внесение изменений в массив с todo
      newTodos = todos.map(todo => todo.id === res.id ? res : todo );
      // Сортировка массива с todo
      sortTodos(newTodos);
      // Обновления стейта массива с todo
      setTodos(newTodos);
    })
    .catch(err => console.log(err))
  }

  // Обработка клика по кнопке отрыть модальное окно Добавление нового todo
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
    .then(res => setTodos(res))
    .catch(err => console.log(err))
  }

  // Загрузка всех todo из с сервера при загрузке страницы
  useEffect(() => {
    getTodos()
    .then(res => setTodos(sortTodos(res)))
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