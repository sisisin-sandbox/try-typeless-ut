import { createModule } from 'typeless';
import { CounterSymbol } from './symbol';

export interface CounterState {
  count: number;
}

export const [useCounterModule, CounterActions, getCounterState] = createModule(CounterSymbol)
  .withActions({
    increment: null,
    incrementNTimes: (n: number) => ({ payload: { n } }),
    incrementThreeTimes: null,
  })
  .withState<CounterState>();
