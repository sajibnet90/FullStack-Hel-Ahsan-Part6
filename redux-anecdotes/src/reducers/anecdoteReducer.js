//redux-anecdotes/src/reducers/anecdoteReducer.js

import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';



// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// ];

//const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// });

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    // voteAnecdote(state, action) {
    //   const updatedAnecdote = action.payload;
    //   const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id);
    //   if (index !== -1) {
    //     state[index] = updatedAnecdote;// Update the anecdote in the state with the updated anecdote object
    //   }      
    // },
    appendAnecdote(state,action){
      state.push(action.payload);// 
    },
    setAnecdotes(state, action) {
       return action.payload;
    },
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions;

// Fetch all anecdotes  //initializeAnecdotes is an action creator that returns a function that dispatches the setAnecdotes action with the anecdotes as the payload
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));//here setAnecdotes is an action creator that creates an action with the type 'anecdotes/setAnecdotes' and the payload set to the value passed to the action creator
  };
};

// Create a new anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

// Vote for an anecdote
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;

