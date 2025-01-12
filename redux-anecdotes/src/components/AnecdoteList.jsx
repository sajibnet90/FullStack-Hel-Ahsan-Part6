import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {//getting filter state from store and filtering anecdotes based on the filter
    // [...anecdotes]
    //   .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())) // filter state is a string and we are filtering the anecdotes based on the filter
    //   .sort((a, b) => b.votes - a.votes) // Sort the anecdotes based on the number of votes
    return anecdotes
      .filter((anecdote) => 
        anecdote.content && filter ? //if the filter is not empty then filter the anecdotes based on the filter otherwise return all the anecdotes
        anecdote.content.toLowerCase().includes(filter.toLowerCase()) : 
        true
      )
      .sort((a, b) => b.votes - a.votes);
});

  // vote function called with the anecdote object as the argument when button is clicked
  const vote = async (anecdote) => {
    await dispatch(voteAnecdote(anecdote));

    dispatch(setNotificationWithTimeout(`You voted '${anecdote.content}'`, 5));
  };


  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has : {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
{/* // vote function called with the anecdote object as the argument when button is clicked
 */}          </div>
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