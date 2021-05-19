"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetterNotifier = exports.SetterObserver = void 0;
const subscriber_collection_js_1 = require("./subscriber-collection.js");
const utilities_objects_js_1 = require("../utilities-objects.js");
const flush_queue_js_1 = require("./flush-queue.js");
// a reusable variable for `.flush()` methods of observers
// so that there doesn't need to create an env record for every call
let oV = void 0;
/**
 * Observer for the mutation of object property value employing getter-setter strategy.
 * This is used for observing object properties that has no decorator.
 */
class SetterObserver {
    constructor(obj, propertyKey) {
        this.obj = obj;
        this.propertyKey = propertyKey;
        this.value = void 0;
        this.oldValue = void 0;
        this.observing = false;
        // todo(bigopon): tweak the flag based on typeof obj (array/set/map/iterator/proxy etc...)
        this.type = 1 /* Observer */;
        this.f = 0 /* none */;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue, flags) {
        if (this.observing) {
            const value = this.value;
            if (Object.is(newValue, value)) {
                return;
            }
            this.value = newValue;
            this.oldValue = value;
            this.f = flags;
            this.queue.add(this);
        }
        else {
            // If subscribe() has been called, the target property descriptor is replaced by these getter/setter methods,
            // so calling obj[propertyKey] will actually return this.value.
            // However, if subscribe() was not yet called (indicated by !this.observing), the target descriptor
            // is unmodified and we need to explicitly set the property value.
            // This will happen in one-time, to-view and two-way bindings during $bind, meaning that the $bind will not actually update the target value.
            // This wasn't visible in vCurrent due to connect-queue always doing a delayed update, so in many cases it didn't matter whether $bind updated the target or not.
            this.obj[this.propertyKey] = newValue;
        }
    }
    subscribe(subscriber) {
        if (this.observing === false) {
            this.start();
        }
        this.subs.add(subscriber);
    }
    flush() {
        oV = this.oldValue;
        this.oldValue = this.value;
        this.subs.notify(this.value, oV, this.f);
    }
    start() {
        if (this.observing === false) {
            this.observing = true;
            this.value = this.obj[this.propertyKey];
            utilities_objects_js_1.def(this.obj, this.propertyKey, {
                enumerable: true,
                configurable: true,
                get: ( /* Setter Observer */) => this.getValue(),
                set: (/* Setter Observer */ value) => {
                    this.setValue(value, 0 /* none */);
                },
            });
        }
        return this;
    }
    stop() {
        if (this.observing) {
            utilities_objects_js_1.def(this.obj, this.propertyKey, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: this.value,
            });
            this.observing = false;
            // todo(bigopon/fred): add .removeAllSubscribers()
        }
        return this;
    }
}
exports.SetterObserver = SetterObserver;
class SetterNotifier {
    constructor(obj, callbackKey, set, initialValue) {
        this.type = 1 /* Observer */;
        /**
         * @internal
         */
        this.v = void 0;
        /**
         * @internal
         */
        this.oV = void 0;
        /**
         * @internal
         */
        this.f = 0 /* none */;
        this.obj = obj;
        this.s = set;
        const callback = obj[callbackKey];
        this.cb = typeof callback === 'function' ? callback : void 0;
        this.v = initialValue;
    }
    getValue() {
        return this.v;
    }
    setValue(value, flags) {
        var _a;
        if (typeof this.s === 'function') {
            value = this.s(value);
        }
        if (!Object.is(value, this.v)) {
            this.oV = this.v;
            this.v = value;
            this.f = flags;
            (_a = this.cb) === null || _a === void 0 ? void 0 : _a.call(this.obj, this.v, this.oV, flags);
            this.queue.add(this);
        }
    }
    flush() {
        oV = this.oV;
        this.oV = this.v;
        this.subs.notify(this.v, oV, this.f);
    }
}
exports.SetterNotifier = SetterNotifier;
subscriber_collection_js_1.subscriberCollection(SetterObserver);
subscriber_collection_js_1.subscriberCollection(SetterNotifier);
flush_queue_js_1.withFlushQueue(SetterObserver);
flush_queue_js_1.withFlushQueue(SetterNotifier);
//# sourceMappingURL=setter-observer.js.map