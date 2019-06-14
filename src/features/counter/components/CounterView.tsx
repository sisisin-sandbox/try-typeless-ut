import React from 'react';
import { useActions } from 'typeless';
import { CounterActions, getCounterState } from '../interface';

export const CounterView = () => {
  const { increment } = useActions(CounterActions);
  const { count } = getCounterState.useState();
  return (
    <>
      <div>{count}</div>
      <button onClick={increment}>+</button>
    </>
  );
};
