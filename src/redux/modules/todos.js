import { get, set } from 'idb-keyval';

const initalState = {
  todoList: []
};

// const DB_NAME = 'TODO_APP';
const KEY_TODO_LIST = 'TODO_LIST';

export const types = {
  FETCH_ALL_TODO: 'TODO/FETCH_ALL_TODO',
  CREATE_TODO: 'TODO/CREATE_TODO',
  DELETE_TODO: 'TODO/DELETE_TODO',
  TOGGLE_TODO: 'TODO/TOGGLE_TODO'
}

export const actions = {
  fetchAllTodoList: () => {
    return (dispatch, getState) => {
      return get(KEY_TODO_LIST).then(val => {
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
      get(KEY_TODO_LIST).then(val => {
        let todoList = val || [];
        todoList.push(param);
        set(KEY_TODO_LIST, todoList).then(result => {
          dispatch({
            type: types.CREATE_TODO,
            todoList: todoList
          });
        });
      });
    }
  },
  deleteTodo: (id) => {
    return dispatch => {
      get(KEY_TODO_LIST).then(val => {
        const list = val;
        if (list && list.some(item => item.id === id)) {
          list.splice(list.findIndex(item => item.id === id), 1);
          set(KEY_TODO_LIST, list).then(() => {
            dispatch({
              type: types.DELETE_TODO,
              todoList: list
            });
          });
        }
      });
    }
  },
  toggleTodo: (id)  => {
    return dispatch => {
      get(KEY_TODO_LIST).then(val => {
        let list = val;
        list.forEach(item => {
          if (item.id === id) {
            item.isDone = !item.isDone;
          }
        });
        set(KEY_TODO_LIST, list).then(() => {
          dispatch({
            type: types.TOGGLE_TODO,
            todoList: list
          });
        });
      });
    }
  }
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case types.FETCH_ALL_TODO:
    case types.TOGGLE_TODO:
    case types.CREATE_TODO:
    case types.DELETE_TODO:
      return { ...state, todoList: action.todoList };
    default:
      return state;
  }
};

export default reducer;

export const fetchAllTodos = state => {
  return state.todos.todoList;
}