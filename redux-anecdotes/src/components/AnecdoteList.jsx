import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification,removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => //getting filter state from store and filtering anecdotes based on the filter
    [...anecdotes]
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())) // filter state is a string and we are filtering the anecdotes based on the filter
  );

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`You voted '${content}'`));
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
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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