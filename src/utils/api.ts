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