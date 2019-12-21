import React from 'react';
import { Registry } from 'typeless';
import { CounterActions, CounterState } from './interface';
import { CounterModule, incrementTwoTimesEpicHandler, reducer } from './module';
import { render } from 'app/helper';

describe('reducer', () => {
  it('should increment count', () => {
    const base: CounterState = { count: 0 };

    expect(reducer(base, CounterActions.increment())).toStrictEqual({
      count: base.count + 1,
    });
  });
});

describe('epic', () => {
  let registry: Registry;
  let dispatch: jest.SpyInstance;
  beforeEach(() => {
    registry = new Registry();
    dispatch = jest.spyOn(registry, 'dispatch');
    render(registry, () => <CounterModule />);
  });
  it('should return n increment actions', () => {
    expect(incrementTwoTimesEpicHandler({ n: 2 })).toStrictEqual([
      CounterActions.increment(),
      CounterActions.increment(),
    ]);
  });

  it('should be updated', () => {
    registry.dispatch(CounterActions.incrementThreeTimes());

    expect(dispatch.mock.calls).toMatchObject([
      [CounterActions.incrementThreeTimes()],
      [CounterActions.increment()],
      [CounterActions.increment()],
      [CounterActions.increment()],
    ]);
  });

  it('should be updated', () => {
    registry.dispatch(CounterActions.incrementThreeTimes());

    expect(dispatch.mock.calls).toMatchObject([
      [CounterActions.incrementThreeTimes()],
      [CounterActions.increment()],
      [CounterActions.increment()],
      [CounterActions.increment()],
    ]);
  });
});
