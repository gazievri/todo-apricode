import { ITodo } from '../types/data';
import { BASE_URL } from './constants.ts'

// Запрос на авторизацию пользователя
export const login = (email: string, password: string) => {
  return fetch(`${BASE_URL}/login`, {
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  }).then(checkResponse);
};


// Запрос на список задач
export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "GET",
  });
  return checkResponse(response);
};

// Запрос на добавление задачи
export const sendTodo = async ({ id, title, complete }) => {
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({id, title, complete})
  });
  return checkResponse(response);
};

// Запрос на удаление задачи
export const deleteTodoApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return checkResponse(response);
};

// Запрос на изменение статуса задачи
export const changeStatusTodoApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({id, title, complete})
  });
  return checkResponse(response);
};

// Функция проверки ответа от сервера
export function checkResponse(response: {
  ok: any;
  json: () => any;
  status: any;
}) {
  return response.ok
    ? response.json()
    : Promise.reject(`Error ${response.status}`);
}