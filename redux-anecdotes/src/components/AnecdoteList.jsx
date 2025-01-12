import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification,removeNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';  

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {//getting filter state from store and filtering anecdotes based on the filter
    // [...anecdotes]
    //   .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())) // filter state is a string and we are filtering the anecdotes based on the filter
    //   .sort((a, b) => b.votes - a.votes) // Sort the anecdotes based on the number of votes
    return anecdotes
      .filter((anecdote) => 
        anecdote.content && filter ? 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()) : 
        true
      )
      .sort((a, b) => b.votes - a.votes);
});

  const vote = async (id) => {
    const anectodeToVote = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnecdote = { ...anectodeToVote, votes: anectodeToVote.votes + 1 };
    await anecdoteService.updateVote(id,updatedAnecdote);//update the votes in the server
    
    dispatch(voteAnecdote(updatedAnecdote));//update the votes in the store

    dispatch(setNotification(`You voted '${anectodeToVote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000); // Remove the notification after 5 seconds
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has : {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;


/* 
The filter state is initialized as an empty string in the filterReducer.
The Filter component dispatches the setFilter action with the input value (a string) as the payload.
The filterReducer updates the filter state with this string payload.
The filter state is accessed in the AnecdoteList component and used to filter the anecdotes. */