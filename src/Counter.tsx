import { useReducer } from 'react';

type State = {
  count: number;
};

type Acition = { type: 'increment'; step: number } | { type: 'decrement'; step: number }

function countReducer(state: State, action: Acition) {
  const { step, type } = action;
  switch(type) {
    case 'increment':
      return {
        ...state,
        count: state.count + step,
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - step,
      }
  }
}

export default function Counter({ intialState = 0, step = 1 }) {
  const [state, dispatch] = useReducer(countReducer, {
    count: intialState,
  });
  const { count } = state;

  const incement = () => dispatch({ type: 'increment', step });
  const decrement = () => dispatch({ type: 'decrement', step });

  return (
    <>
      <button type="button" onClick={incement}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
      <p>Count is { count }</p>
    </>
  );
}