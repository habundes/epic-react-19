import { useReducer } from 'react';

type State = {
  count: number;
};

type Acition = Partial<State> | ((state: State) => Partial<State>);

function countReducer(state: State, action: Acition) {
  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action)
  };
}

export default function Counter({ intialState = 0, step = 1 }) {
  const [state, setState] = useReducer(countReducer, {
    count: intialState,
  });
  const { count } = state;

  const incement = () => setState(current => ({ count: current.count + step }));
  const decrement = () => setState(current => ({ count: current.count - step }));

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