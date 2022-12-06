import { ITodo } from '../types/data';

const sortTodos = (todos: ITodo[]): ITodo[] => {
  const sortedTodos = todos.sort(function (a, b) {
    if (a.complete > b.complete) {
      return 1;
    }
    if (a.complete < b.complete) {
      return -1;
    }
    return 0;
  });
  return sortedTodos;
}

export default sortTodos;