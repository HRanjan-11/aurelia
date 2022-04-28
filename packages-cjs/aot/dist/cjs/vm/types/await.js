"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Await_Rejected = exports.$Await_Fulfilled = exports.$Await = void 0;
const function_js_1 = require("./function.js");
const list_js_1 = require("./list.js");
const undefined_js_1 = require("./undefined.js");
const promise_js_1 = require("../globals/promise.js");
const number_js_1 = require("./number.js");
// http://www.ecma-international.org/ecma-262/#await
// 6.2.3.1 Await
function $Await(ctx, value) {
    const realm = ctx.Realm;
    const intrinsics = realm['[[Intrinsics]]'];
    const stack = realm.stack;
    // 1. Let asyncContext be the running execution context.
    const asyncContext = ctx;
    // 2. Let promise be ? PromiseResolve(%Promise%, « value »).
    const promise = (0, promise_js_1.$PromiseResolve)(ctx, intrinsics['%Promise%'], new list_js_1.$List(value)); // TODO: this cast urgently needs to be addressed with corrected typings
    if (promise.isAbrupt) {
        return promise;
    }
    // 3. Let stepsFulfilled be the algorithm steps defined in Await Fulfilled Functions.
    // 4. Let onFulfilled be CreateBuiltinFunction(stepsFulfilled, « [[AsyncContext]] »).
    // 5. Set onFulfilled.[[AsyncContext]] to asyncContext.
    const onFulfilled = new $Await_Fulfilled(realm, asyncContext);
    // 6. Let stepsRejected be the algorithm steps defined in Await Rejected Functions.
    // 7. Let onRejected be CreateBuiltinFunction(stepsRejected, « [[AsyncContext]] »).
    // 8. Set onRejected.[[AsyncContext]] to asyncContext.
    const onRejected = new $Await_Rejected(realm, asyncContext);
    // 9. Perform ! PerformPromiseThen(promise, onFulfilled, onRejected).
    (0, promise_js_1.$PerformPromiseThen)(ctx, promise, onFulfilled, onRejected);
    // 10. Remove asyncContext from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
    stack.pop();
    // 11. Set the code evaluation state of asyncContext such that when evaluation is resumed with a Completion completion, the following steps of the algorithm that invoked Await will be performed, with completion available.
    asyncContext.onResume = function (completion) {
        return completion; // TODO: sure about this? Seems like a writing muckup in the spec
    };
    // 12. Return.
    return new undefined_js_1.$Undefined(realm);
    // 13. NOTE: This returns to the evaluation of the operation that had most previously resumed evaluation of asyncContext.
}
exports.$Await = $Await;
// http://www.ecma-international.org/ecma-262/#await-fulfilled
// 6.2.3.1.1 Await Fulfilled
class $Await_Fulfilled extends function_js_1.$BuiltinFunction {
    constructor(realm, asyncContext) {
        const intrinsics = realm['[[Intrinsics]]'];
        super(realm, 'Await_Fulfilled', intrinsics['%FunctionPrototype%']);
        this['[[AsyncContext]]'] = asyncContext;
        this.length = new number_js_1.$Number(realm, 1);
    }
    get length() {
        return this.getProperty(this.realm['[[Intrinsics]]'].length)['[[Value]]'];
    }
    set length(value) {
        this.setDataProperty(this.realm['[[Intrinsics]]'].length, value, false, false, true);
    }
    performSteps(ctx, thisArgument, [value], NewTarget) {
        const realm = ctx.Realm;
        const intrinsics = realm['[[Intrinsics]]'];
        const stack = realm.stack;
        if (value === void 0) {
            value = intrinsics.undefined;
        }
        // 1. Let F be the active function object.
        const F = this;
        // 2. Let asyncContext be F.[[AsyncContext]].
        const asyncContext = F['[[AsyncContext]]'];
        // 3. Let prevContext be the running execution context.
        const prevContext = ctx;
        // 4. Suspend prevContext.
        prevContext.suspend();
        // 5. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
        stack.push(asyncContext);
        // 6. Resume the suspended evaluation of asyncContext using NormalCompletion(value) as the result of the operation that suspended it.
        asyncContext.resume();
        asyncContext.onResume(value); // TODO: do we need to change the completion type here in case it's abrupt?
        // 7. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
        // 8. Return undefined.
        return intrinsics.undefined;
    }
}
exports.$Await_Fulfilled = $Await_Fulfilled;
// http://www.ecma-international.org/ecma-262/#await-rejected
// 6.2.3.1.2 Await Rejected Functions
class $Await_Rejected extends function_js_1.$BuiltinFunction {
    constructor(realm, asyncContext) {
        const intrinsics = realm['[[Intrinsics]]'];
        super(realm, 'Await_Rejected', intrinsics['%FunctionPrototype%']);
        this['[[AsyncContext]]'] = asyncContext;
        this.length = new number_js_1.$Number(realm, 1);
    }
    get length() {
        return this.getProperty(this.realm['[[Intrinsics]]'].length)['[[Value]]'];
    }
    set length(value) {
        this.setDataProperty(this.realm['[[Intrinsics]]'].length, value, false, false, true);
    }
    performSteps(ctx, thisArgument, [value], NewTarget) {
        const realm = ctx.Realm;
        const intrinsics = realm['[[Intrinsics]]'];
        const stack = realm.stack;
        if (value === void 0) {
            value = intrinsics.undefined;
        }
        // 1. Let F be the active function object.
        const F = this;
        // 2. Let asyncContext be F.[[AsyncContext]].
        const asyncContext = F['[[AsyncContext]]'];
        // 3. Let prevContext be the running execution context.
        const prevContext = ctx;
        // 4. Suspend prevContext.
        prevContext.suspend();
        // 5. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
        stack.push(asyncContext);
        // 6. Resume the suspended evaluation of asyncContext using ThrowCompletion(reason) as the result of the operation that suspended it.
        asyncContext.resume();
        asyncContext.onResume(value.ToCompletion(5 /* throw */, intrinsics.empty));
        // 7. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
        // 8. Return undefined.
        return intrinsics.undefined;
    }
}
exports.$Await_Rejected = $Await_Rejected;
//# sourceMappingURL=await.js.map