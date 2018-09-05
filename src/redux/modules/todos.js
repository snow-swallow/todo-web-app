import IDB from '../../utils/db';

const idb = new IDB();
const KEY_TODO_LIST = 'TODO_LIST';

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
    return dispatch => {
      return idb.get(KEY_TODO_LIST).then(val => {
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
      (async function() {
        let list = (await idb.get(KEY_TODO_LIST)) || [];
        list.push(param);
        await idb.set(KEY_TODO_LIST, list);
        return list;
      })().then(resultList => {
        dispatch({
          type: types.CREATE_TODO,
          todoList: resultList
        });
      });
    }
  },
  deleteTodo: (id) => {
    return dispatch => {
      deleteAndUpdate(id, list => {
        dispatch({
          type: types.DELETE_TODO,
          todoList: list
        });
      });
    }
  },
  toggleTodo: (id)  => {
    return dispatch => {
      toggleAndUpdate(id, list => {
        dispatch({
          type: types.TOGGLE_TODO,
          todoList: list
        });
      });
    }
  }
}

const deleteAndUpdate = async function (id, callback) {
  let list = await idb.get(KEY_TODO_LIST);
  if (list && list.some(item => item.id === id)) {
    list.splice(list.findIndex(item => item.id === id), 1);
    await idb.set(KEY_TODO_LIST, list);
  }
  await callback(list);
}
const toggleAndUpdate = async function (id, callback) {
  let list = await idb.get(KEY_TODO_LIST);
  list.forEach(item => {
    if (item.id === id) {
      item.isDone = !item.isDone;
    }
  });
  await idb.set(KEY_TODO_LIST, list);
  await callback(list);
};

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