//redux-anecdotes/src/reducers/anecdoteReducer.js

import { createSlice } from '@reduxjs/toolkit';

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
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id);
      if (index !== -1) {
        state[index] = updatedAnecdote;// Update the anecdote in the state with the updated anecdote object
      }      
    },
    createAnecdote(state, action) {
      // const newAnecdote = asObject(action.payload); // Ensure the new anecdote has the correct structure
      // state.push(newAnecdote);
      state.push(action.payload); // Add the new anecdote to the state
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

