import { e, FooActions, FooState, fooSymbol, r } from './App';

it('hoge', () => {
  const initialState: FooState = { foo: 'foo' };

  expect(r(initialState, FooActions.baz('baz'))).toStrictEqual({ foo: 'baz' });
});
it('epic', () => {
  const epic = e.handlers.get(fooSymbol)!.get((FooActions.bar() as any).type[1])![0];
  expect(epic(undefined, undefined as any, undefined)).toStrictEqual(FooActions.baz('barbar'));
});
