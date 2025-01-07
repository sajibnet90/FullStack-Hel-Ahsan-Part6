import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';

// Create Redux store
const store = createStore(reducer);

const App = () => {
  // Dispatchers for each action type
  const good = () => {
    store.dispatch({ type: 'GOOD' });
  };

  const ok = () => {
    store.dispatch({ type: 'OK' });
  };

  const bad = () => {
    store.dispatch({ type: 'BAD' });
  };

  const resetStats = () => {
    store.dispatch({ type: 'ZERO' });
  };

  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <div>
        {/* Buttons for feedback */}
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={resetStats}>reset stats</button>
      </div>
      <h2>Statistics</h2>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application and subscribe to Redux store changes
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
