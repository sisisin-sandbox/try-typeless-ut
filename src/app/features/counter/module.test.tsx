import { render } from 'app/helper';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Registry } from 'typeless';
import { CounterActions, CounterState, getCounterState } from './interface';
import { CounterModule, incrementTwoTimesEpicHandler, reducer } from './module';

it('should increment count', () => {
  const base: CounterState = { count: 0 };

  expect(reducer(base, CounterActions.increment())).toStrictEqual({ count: base.count + 1 });
});

it('should return n increment actions', () => {
  expect(incrementTwoTimesEpicHandler({ n: 2 })).toStrictEqual([
    CounterActions.increment(),
    CounterActions.increment(),
  ]);
});

describe('epic', () => {
  const registry = new Registry();
  const dispatch = jest.spyOn(registry, 'dispatch');

  it('should be updated', () => {
    render(() => <CounterModule />, registry);

    act(() => {
      registry.dispatch(CounterActions.incrementThreeTimes());
    });

    expect(getCounterState().count).toBe(3);
    expect(dispatch.mock.calls).toMatchObject([
      [CounterActions.incrementThreeTimes()],
      [CounterActions.increment()],
      [CounterActions.increment()],
      [CounterActions.increment()],
    ]);
  });

  it('should run 3 times', () => {
    render(() => <CounterModule />, registry);

    act(() => {
      registry.dispatch(CounterActions.incrementNTimes(4));
    });

    expect(getCounterState().count).toBe(4);
  });
});
