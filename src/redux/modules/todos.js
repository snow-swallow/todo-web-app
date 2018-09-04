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
    return (dispatch, getState) => {
      dispatch({
        type: types.FETCH_ALL_TODO,
        todoList: []
      });
    }
  },
  createTodo: (name) => {
    console.log('handleCreate', name);
    return (dispatch, getState) => {
      dispatch({
        type: types.CREATE_TODO,
        todo: { id: new Date().getTime(), name: name }
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
      return action.todoList;
    case types.ADD_TODO:
    case types.DELETE_TODO:
    default:
      return state;
  }
};

export default reducer;

export const fetchAllTodoList = state => {
  return state.todos.todoList;
}