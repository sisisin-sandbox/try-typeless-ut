import React from 'react';
import { createModule, useActions } from 'typeless';

export interface FooState {
  foo: string;
}
export const fooSymbol = Symbol('foo');
const modules = createModule(fooSymbol)
  .withActions({
    bar: null,
    baz: (baz: string) => ({ payload: { baz } }),
  })
  .withState<FooState>();
export const useFooModule = modules[0];
export const FooActions = modules[1];
const getFooState = modules[2];

export const r = useFooModule.reducer({ foo: 'foo' }).on(FooActions.baz, (state, { baz }) => {
  state.foo = baz;
});
export const e = useFooModule.epic().on(FooActions.bar, (a, b, c) => {
  return FooActions.baz('barbar');
});

const Foo = () => {
  const { baz, bar } = useActions(FooActions);
  const { foo } = getFooState.useState();
  return (
    <>
      <div>{foo}</div>
      <button
        onClick={() => {
          baz('bazubazu');
        }}
      >
        button
      </button>
      <button onClick={bar}>button</button>
    </>
  );
};
const FooModule = () => {
  useFooModule();
  console.log(r({ foo: 'o' }, FooActions.baz('baz')));
  return <Foo />;
};
export const App: React.FC = () => {
  return (
    <div className="App">
      <FooModule />
    </div>
  );
};
