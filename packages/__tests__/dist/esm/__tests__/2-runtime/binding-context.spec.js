import { BindingContext, Scope, } from '@aurelia/runtime';
import { assert } from '@aurelia/testing';
describe('Scope', function () {
    describe('create', function () {
        it('undefined, undefined', function () {
            const actual = Scope.create(undefined, undefined);
            assert.strictEqual(actual.bindingContext, undefined, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('undefined, null', function () {
            const actual = Scope.create(undefined, null);
            assert.strictEqual(actual.bindingContext, undefined, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('undefined, {}', function () {
            const overrideContext = {};
            const actual = Scope.create(undefined, overrideContext);
            assert.strictEqual(actual.bindingContext, undefined, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('undefined, { bindingContext }', function () {
            const bindingContext = {};
            const overrideContext = { bindingContext };
            const actual = Scope.create(null, overrideContext);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('null, undefined', function () {
            const actual = Scope.create(null, undefined);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, null, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('null, null', function () {
            const actual = Scope.create(null, null);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, null, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('null, {}', function () {
            const overrideContext = {};
            const actual = Scope.create(null, overrideContext);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('null, { bindingContext }', function () {
            const bindingContext = {};
            const overrideContext = { bindingContext };
            const actual = Scope.create(null, overrideContext);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{}, undefined', function () {
            const bindingContext = {};
            const actual = Scope.create(bindingContext, undefined);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{}, null', function () {
            const bindingContext = {};
            const actual = Scope.create(bindingContext, null);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{}, {}', function () {
            const bindingContext = {};
            const overrideContext = {};
            const actual = Scope.create(bindingContext, overrideContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{}, { bindingContext }', function () {
            const bindingContext = {};
            const overrideContext = { bindingContext };
            const actual = Scope.create(bindingContext, overrideContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{}, { bindingContext2 }', function () {
            const bindingContext = {};
            const bindingContext2 = {};
            const overrideContext = { bindingContext: bindingContext2 };
            const actual = Scope.create(bindingContext, overrideContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext2, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
    });
    describe('fromOverride', function () {
        it('undefined', function () {
            assert.throws(() => Scope.fromOverride(undefined), 'OverrideContext is undefined', `() => Scope.fromOverride(undefined)`);
        });
        it('null', function () {
            assert.throws(() => Scope.fromOverride(null), 'OverrideContext is null', `() => Scope.fromOverride(null)`);
        });
        it('{}', function () {
            const overrideContext = {};
            const actual = Scope.fromOverride(overrideContext);
            assert.strictEqual(actual.bindingContext, undefined, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
        it('{ bindingContext }', function () {
            const bindingContext = {};
            const overrideContext = { bindingContext };
            const actual = Scope.fromOverride(overrideContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.strictEqual(actual.overrideContext, overrideContext, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope, null, `actual.parentScope`);
        });
    });
    describe('fromParent', function () {
        it('undefined', function () {
            assert.throws(() => Scope.fromParent(undefined, {}), 'ParentScope is undefined', `() => Scope.fromParent(undefined, {})`);
        });
        it('null', function () {
            assert.throws(() => Scope.fromParent(null, {}), 'ParentScope is null', `() => Scope.fromParent(null, {})`);
        });
        it('{}, undefined', function () {
            const parentScope = {};
            const actual = Scope.fromParent(parentScope, undefined);
            assert.strictEqual(actual.bindingContext, undefined, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, undefined, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope.overrideContext, undefined, `actual.parentScope.overrideContext`);
        });
        it('{}, null', function () {
            const parentScope = {};
            const actual = Scope.fromParent(parentScope, null);
            assert.strictEqual(actual.bindingContext, null, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, null, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope.overrideContext, undefined, `actual.parentScope.overrideContext`);
        });
        it('{}, {}', function () {
            const parentScope = {};
            const bindingContext = {};
            const actual = Scope.fromParent(parentScope, bindingContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope.overrideContext, undefined, `actual.parentScope.overrideContext`);
        });
        it('{}, { overrideContext }', function () {
            const overrideContext = {};
            const parentScope = { overrideContext };
            const bindingContext = {};
            const actual = Scope.fromParent(parentScope, bindingContext);
            assert.strictEqual(actual.bindingContext, bindingContext, `actual.bindingContext`);
            assert.instanceOf(actual.overrideContext, Object, `actual.overrideContext`);
            assert.strictEqual(actual.overrideContext.bindingContext, bindingContext, `actual.overrideContext.bindingContext`);
            assert.strictEqual(actual.parentScope.overrideContext, overrideContext, `actual.parentScope.overrideContext`);
        });
    });
});
describe('BindingContext', function () {
    describe('get', function () {
        it('undefined', function () {
            assert.throws(() => BindingContext.get(undefined, undefined, undefined, 0 /* none */), 'Scope is undefined', `() => BindingContext.get(undefined, undefined, undefined, LF.none)`);
        });
        it('null', function () {
            assert.throws(() => BindingContext.get(null, undefined, undefined, 0 /* none */), 'Scope is null', `() => BindingContext.get(null, undefined, undefined, LF.none)`);
        });
        it('{ bindingContext: undefined, overrideContext: undefined }', function () {
            const scope = {};
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, undefined, `actual`);
        });
        it('{ bindingContext: undefined, overrideContext: null }', function () {
            const scope = { overrideContext: null };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, null, `actual`);
        });
        it('{ bindingContext: undefined, overrideContext: {} }', function () {
            const overrideContext = {};
            const scope = { overrideContext };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, overrideContext, `actual`);
        });
        it('{ bindingContext: null, overrideContext: undefined }', function () {
            const scope = {};
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, undefined, `actual`);
        });
        it('{ bindingContext: null, overrideContext: null }', function () {
            const scope = { overrideContext: null };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, null, `actual`);
        });
        it('{ bindingContext: null, overrideContext: {} }', function () {
            const overrideContext = {};
            const scope = { overrideContext };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, overrideContext, `actual`);
        });
        it('{ bindingContext: {}, overrideContext: undefined }', function () {
            const bindingContext = {};
            const scope = { bindingContext };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext, `actual`);
        });
        it('{ bindingContext: {}, overrideContext: null }', function () {
            const bindingContext = {};
            const scope = { bindingContext, overrideContext: null };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext, `actual`);
        });
        it('{ bindingContext: {}, overrideContext: {} }', function () {
            const overrideContext = {};
            const bindingContext = {};
            const scope = { bindingContext, overrideContext };
            const actual = BindingContext.get(scope, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext, `actual`);
        });
        it('1 ancestor, null, null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const actual = BindingContext.get(scope2, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('2 ancestors, null, null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const actual = BindingContext.get(scope3, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext3, `actual`);
        });
        it('3 ancestors, null, null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, null, null, 0 /* none */);
            assert.strictEqual(actual, bindingContext4, `actual`);
        });
        it('1 ancestor, \'foo\', null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const actual = BindingContext.get(scope2, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('2 ancestors, \'foo\', null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const actual = BindingContext.get(scope3, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext3, `actual`);
        });
        it('3 ancestors, \'foo\', null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext4, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on bc #1), null', function () {
            const bindingContext1 = { foo: 'bar' };
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext1, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on bc #2), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on bc #3), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext3, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on bc #4), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext4, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope1.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope2.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope3.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #4), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            scope4.overrideContext['foo'] = 'bar';
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope4.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1 and bc #1), null', function () {
            const bindingContext1 = { foo: 'bar' };
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope1.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2 and bc #2), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope2.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3 and bc #3), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope3.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #4 and bc #4), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            scope4.overrideContext['foo'] = 'bar';
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, scope4.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1 and bc #2), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2 and bc #3), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext3, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3 and bc #4), null', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', null, 0 /* none */);
            assert.strictEqual(actual, bindingContext4, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1 and bc #2), 1', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 1, 0 /* none */);
            assert.strictEqual(actual, scope3.bindingContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2 and bc #3), 1', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 1, 0 /* none */);
            assert.strictEqual(actual, bindingContext3, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3 and bc #4), 1', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 1, 0 /* none */);
            assert.strictEqual(actual, scope3.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1 and bc #2), 2', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 2, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2 and bc #3), 2', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 2, 0 /* none */);
            assert.strictEqual(actual, scope2.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3 and bc #4), 2', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 2, 0 /* none */);
            assert.strictEqual(actual, bindingContext2, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #1 and bc #2), 3', function () {
            const bindingContext1 = {};
            const bindingContext2 = { foo: 'bar' };
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            scope1.overrideContext['foo'] = 'bar';
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 3, 0 /* none */);
            assert.strictEqual(actual, scope1.overrideContext, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #2 and bc #3), 3', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = { foo: 'bar' };
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            scope2.overrideContext['foo'] = 'bar';
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 3, 0 /* none */);
            assert.strictEqual(actual, bindingContext1, `actual`);
        });
        it('3 ancestors, \'foo\' (exist on oc #3 and bc #4), 3', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = { foo: 'bar' };
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            scope3.overrideContext['foo'] = 'bar';
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 3, 0 /* none */);
            assert.strictEqual(actual, bindingContext1, `actual`);
        });
        it('3 ancestors, null, 4', function () {
            const bindingContext1 = {};
            const bindingContext2 = {};
            const bindingContext3 = {};
            const bindingContext4 = {};
            const scope1 = Scope.create(bindingContext1, null);
            const scope2 = Scope.fromParent(scope1, bindingContext2);
            const scope3 = Scope.fromParent(scope2, bindingContext3);
            const scope4 = Scope.fromParent(scope3, bindingContext4);
            const actual = BindingContext.get(scope4, 'foo', 4, 0 /* none */);
            assert.strictEqual(actual, undefined, `actual`);
        });
    });
});
//# sourceMappingURL=binding-context.spec.js.map