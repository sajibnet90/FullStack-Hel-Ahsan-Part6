import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
const dispatch = useDispatch();

const anecdotes = useSelector(state =>
    [...state].sort((a, b) => b.votes - a.votes)
    );  

  const vote = (id) => {
    dispatch(voteAnecdote(id));// Dispatch the voteAnecdote action creator with the id of the anecdote to vote on
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content} =
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
