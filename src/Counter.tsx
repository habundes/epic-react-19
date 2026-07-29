import { useReducer } from 'react';

function countReducer(count: number, change: number) {
  return count + change;
}

export default function Counter({ intialState = 0, step = 1 }) {
  const [count, changeCount] = useReducer(countReducer, intialState);

  const incement = () => changeCount(step);
  const decrement = () => changeCount(-step);

  return (
    <>
      <button type="button" onClick={incement}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
      <p>Count is {count}</p>
    </>
  );
}