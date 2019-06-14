import { reducer, epic } from './module';
import { CounterState, CounterActions } from './interface';
import { CounterSymbol } from './symbol';

it('should increment count', () => {
  const base: CounterState = { count: 0 };

  expect(reducer(base, CounterActions.increment())).toStrictEqual({ count: base.count + 1 });
});

it('should return three increment actions', () => {
  const targetEpic = epic.handlers.get(CounterSymbol)!.get((CounterActions.incrementThreeTimes() as any).type[1])![0];
  expect(targetEpic(undefined, undefined as any, undefined)).toStrictEqual([
    CounterActions.increment(),
    CounterActions.increment(),
    CounterActions.increment(),
  ]);
});
