import { createSlice } from '@reduxjs/toolkit'; // createSlice is a function that returns an object with the reducer and action creators inside it

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) { //setFilter is an action creator that creates an action with the type 'filter/setFilter' and the payload set to the value passed to the action creator
      return action.payload;// update the state to the value of the payload
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;




// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//       case 'SET_FILTER':
//         return action.payload;
//       default:
//         return state;
//     }
//   };
  
//   // Action creator for setting the filter
//   export const setFilter = (filter) => {
//     return {
//       type: 'SET_FILTER',
//       payload: filter,
//     };
//   };
  
//   export default filterReducer;
  