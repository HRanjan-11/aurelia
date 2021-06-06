import { skip as _skip } from "rxjs/operators/index.js";
import type { skip as $skip } from "rxjs/operators";
const skip = _skip as typeof $skip;

import { DI, Registration } from '@aurelia/kernel';
import { assert } from '@aurelia/testing';
import { STORE, dispatchify, Store, UnregisteredActionError } from '@aurelia/store-v1';

import { createTestStore, testState } from './helpers.js';

function arrange() {
  const container = DI.createContainer();
  const { store } = createTestStore();

  const fakeAction = (currentState: testState, param1: string, param2: string) => {
    return { ...currentState, foo: param1 + param2 };
  };

  STORE.container = container;

  return { store, container, fakeAction };
}

describe('dispatchify', function () {
  it('should help create dispatchifyable functions', function (done) {
    const { store, container, fakeAction } = arrange();

    store.registerAction('FakeAction', fakeAction);
    container.register(Registration.instance(Store, store));

    dispatchify(fakeAction)("Hello", "World").catch(() => { /**/ });

    store.state.pipe(
      skip(1)
    ).subscribe((state: any) => {
      assert.equal(state.foo, "HelloWorld");
      done();
    });
  });

  it('should return the promise from dispatched calls', async function () {
    const { store, container, fakeAction } = arrange();

    store.registerAction('FakeAction', fakeAction);
    container.register(Registration.instance(Store, store));

    const result = dispatchify(fakeAction)("Hello", "World");
    assert.notEqual(result.then, undefined);

    await result;
  });

  it('should accept the reducers registered name', function (done) {
    const { store, container, fakeAction } = arrange();

    const fakeActionRegisteredName = 'FakeAction';

    store.registerAction(fakeActionRegisteredName, fakeAction);
    container.register(Registration.instance(Store, store));

    dispatchify(fakeActionRegisteredName)('A', 'B').catch(() => { /**/ });

    store.state.pipe(
      skip(1)
    ).subscribe((state: any) => {
      assert.equal(state.foo, 'AB');
      done();
    });
  });

  it('should throw if any string given that doesn\'t reflect a registered action name', async function () {
    const { store, container, fakeAction } = arrange();
    const fakeActionRegisteredName = 'FakeAction';

    store.registerAction(fakeActionRegisteredName, fakeAction);
    container.register(Registration.instance(Store, store));

    try {
      await dispatchify('ABC')('A', 'B');
    } catch(e) {
      assert.equal(e instanceof UnregisteredActionError, true);
    }
  });
});
