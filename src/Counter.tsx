import { useReducer } from 'react';

type State = {
  count: number;

};

type Acition = State;

function countReducer(state: State, action: Acition) {
  return { ...state, ...action };
}

export default function Counter({ intialState = 0, step = 1 }) {
  const [state, setState] = useReducer(countReducer, {
    count: intialState,
  });
  const { count } = state;

  const incement = () => setState({ count: count + step });
  const decrement = () => setState({ count: count - step });

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