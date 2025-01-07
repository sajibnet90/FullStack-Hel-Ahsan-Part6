const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // Action creator for setting the filter
  export const setFilter = (filter) => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    };
  };
  
  export default filterReducer;
  