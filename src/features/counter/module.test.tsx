import React from 'react';
import { act } from 'react-dom/test-utils';
import { Registry } from 'typeless';
import { render } from '../../helper';
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
  it('should run twice', () => {
    render(() => <CounterModule />, registry);

    act(() => {
      registry.dispatch(CounterActions.incrementThreeTimes());
      registry.dispatch(CounterActions.incrementThreeTimes());
    });

    expect(getCounterState().count).toBe(6);
  });

  it('should run 3 times', () => {
    render(() => <CounterModule />, registry);

    act(() => {
      registry.dispatch(CounterActions.incrementThreeTimes());
      registry.dispatch(CounterActions.incrementThreeTimes());
      registry.dispatch(CounterActions.incrementThreeTimes());
    });

    expect(getCounterState().count).toBe(9);
  });
});
