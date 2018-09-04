import { get, set } from 'idb-keyval';
import { Observable } from '../../../node_modules/rxjs';

const initalState = {
  todoList: []
};

export const types = {
  FETCH_ALL_TODO: 'TODO/FETCH_ALL_TODO',
  CREATE_TODO: 'TODO/CREATE_TODO',
  DELETE_TODO: 'TODO/DELETE_TODO',
  TOGGLE_TODO: 'TODO/TOGGLE_TODO'
}

export const actions = {
  fetchAllTodoList: () => {
    console.log('[action fetchAllTodoList]');
    return (dispatch, getState) => {
      return get('TODO_LIST').then(val => {
        console.log('xxxx', val);
        dispatch({
          type: types.FETCH_ALL_TODO,
          todoList: val
        });
      })
    }
  },
  createTodo: (name) => {
    return (dispatch, getState) => {
      const param = {
        id: new Date().getTime(),
        name: name,
        isDone: false
      };
      get('TODO_LIST').then(val => {
        let todoList = val || [];
        todoList.push(param);
        set('TODO_LIST', todoList).then(result => {
          dispatch({
            type: types.CREATE_TODO,
            todoList: todoList
          });
        });
      });
    }
  },
  deleteTodo: (id) => {
    return (dispatch, getState) => {
      dispatch({
        type: types.DELETE_TODO,
        todoList: []
      });
    }
  },
  toggleTodo: (todo)  => {
    return (dispatch, getState) => {
      dispatch({
        type: types.TOGGLE_TODO,
        todo: { ...todo, isDone: !todo.isDone }
      });
    }
  }
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case types.FETCH_ALL_TODO:
    case types.TOGGLE_TODO:
    case types.CREATE_TODO:
      return { ...state, todoList: action.todoList };
    case types.DELETE_TODO:
    default:
      return state;
  }
};

export default reducer;

export const fetchAllTodos = state => {
  return state.todos.todoList;
}