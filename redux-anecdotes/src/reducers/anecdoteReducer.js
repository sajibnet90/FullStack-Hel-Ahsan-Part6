//redux-anecdotes/src/reducers/anecdoteReducer.js
const getId = () => (100000 * Math.random()).toFixed(0);

// Function to convert an anecdote to an object with votes initialized to 0 and an id generated by the getId function 
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

// Initialize state by mapping each anecdote string to an object
const initialState = anecdotesAtStart.map(asObject);
console.log('initialState:', initialState);// Log the initialState

// Reducer function for the anecdote state management
const reducer = (state = initialState, action) => {
  console.log('Current State:', state);// Log the current state
  console.log('Action:', action);// Log the action
  
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id);
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
      console.log('Updated State after VOTE:', newState);
      return newState;

    case 'NEW_ANECDOTE': // Add a new anecdote to the state with the content and id passed as a parameter and votes initialized to 0.
    const addedState = [...state, action.payload];
    console.log('Updated State after NEW_ANECDOTE:', addedState);
    return addedState;


    default:
      return state;
  }
};

// Action creators
// Action creator for voting on an anecdote with the id passed as a parameter
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  };
};

// Action creator for creating a new anecdote with the 'content' passed as a parameter
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  };
};

export default reducer;
