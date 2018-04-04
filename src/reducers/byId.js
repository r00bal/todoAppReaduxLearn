const byId = (state = {}, action) => {
    console.log('res',action);
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextState = {...state }

      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      }
    }
};

export default byId;

export const getTodo = (state, id) => state[id];
