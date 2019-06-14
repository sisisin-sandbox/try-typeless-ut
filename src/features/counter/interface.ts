import { createModule } from 'typeless';
import { CounterSymbol } from './symbol';

export interface CounterState {
  count: number;
}
const modules = createModule(CounterSymbol)
  .withActions({
    increment: null,
    incrementThreeTimes: null,
  })
  .withState<CounterState>();
export const useCounterModule = modules[0];
export const CounterActions = modules[1];
export const getCounterState = modules[2];
