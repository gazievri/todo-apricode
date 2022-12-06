import {makeAutoObservable} from "mobx"
import sortTodos from '../utils/sortTodos.ts'

class Todo {
  todos = []

  constructor() {
    makeAutoObservable(this);
  }

  setAllTodos(data) {
    this.todos = sortTodos(data);
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.todos = sortTodos(this.todos);
  }

  removeTodo(id) {
    this.todos = sortTodos(this.todos.filter(todo => todo.id !== id));
  }

  toggleTodo(newTodo) {
    this.todos = sortTodos(this.todos.map(todo => todo.id === newTodo.id ? newTodo : todo));
  }
}

export default new Todo();