import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createModule, Registry, TypelessContext } from 'typeless';
import { CounterActions, CounterState } from './interface';
import { epic, incrementTwoTimesEpicHandler, reducer } from './module';
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

it('should return n increment actions', () => {
  expect(incrementTwoTimesEpicHandler({ n: 2 })).toStrictEqual([
    CounterActions.increment(),
    CounterActions.increment(),
  ]);
});

describe('epic', () => {
  let container: HTMLDivElement = null!;
  let registry: Registry = null!;
  let App: any = null!;
  let getState: () => CounterState = null!;
  beforeEach(() => {
    registry = new Registry();
    container = document.createElement('div');
    document.body.appendChild(container);

    const mods = createModule(Symbol('test')).withState<CounterState>();
    const handle = mods[0];
    getState = mods[1];
    handle.epic().attach(epic);
    handle.reducer({ count: 0 }).attach(reducer);

    App = () => {
      handle();
      return null;
    };
  });
  afterEach(() => {
    registry.reset();
    document.body.removeChild(container);
    container = null!;
  });

  function render(node: React.ReactChild) {
    act(() => {
      ReactDOM.render(<TypelessContext.Provider value={{ registry }}>{node}</TypelessContext.Provider>, container);
    });
  }

  it('run increment 3 times', () => {
    render(<App />);
    expect(getState().count).toBe(0);
    act(() => {
      registry.dispatch(CounterActions.incrementThreeTimes());
    });
    expect(getState().count).toBe(3);
  });

  it('run multiple', () => {
    render(<App />);
    act(() => {
      registry.dispatch(CounterActions.incrementThreeTimes());
      registry.dispatch(CounterActions.incrementThreeTimes());
    });
    expect(getState().count).toBe(6);
  });
});
