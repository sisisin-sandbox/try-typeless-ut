import React from 'react';
import { CounterActions, useCounterModule } from './interface';
import { CounterView } from './components/CounterView';

export const epic = useCounterModule.epic().on(CounterActions.incrementThreeTimes, () => {
  return [CounterActions.increment(), CounterActions.increment(), CounterActions.increment()];
});

export const incrementTwoTimesEpicHandler = ({ n }: { n: number }) => {
  return new Array(n).fill(CounterActions.increment());
};
epic.on(CounterActions.incrementNTimes, incrementTwoTimesEpicHandler);
export const reducer = useCounterModule.reducer({ count: 0 }).on(CounterActions.increment, state => {
  state.count++;
});

export const CounterModule = () => {
  useCounterModule();
  return <CounterView />;
};
