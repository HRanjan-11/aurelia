import { subscriberCollection, withFlushQueue, } from '@aurelia/runtime';
const hasOwn = Object.prototype.hasOwnProperty;
const childObserverOptions = {
    childList: true,
    subtree: true,
    characterData: true
};
function defaultMatcher(a, b) {
    return a === b;
}
export class SelectValueObserver {
    constructor(obj, 
    // deepscan-disable-next-line
    _key, handler, observerLocator) {
        this.handler = handler;
        this.observerLocator = observerLocator;
        this.value = void 0;
        this.oldValue = void 0;
        this.hasChanges = false;
        // ObserverType.Layout is not always true
        // but for simplicity, always treat as such
        this.type = 2 /* Node */ | 1 /* Observer */ | 4 /* Layout */;
        this.arrayObserver = void 0;
        this.nodeObserver = void 0;
        this.observing = false;
        this.obj = obj;
    }
    getValue() {
        // is it safe to assume the observer has the latest value?
        // todo: ability to turn on/off cache based on type
        return this.observing
            ? this.value
            : this.obj.multiple
                ? Array.from(this.obj.options).map(o => o.value)
                : this.obj.value;
    }
    setValue(newValue, flags) {
        this.oldValue = this.value;
        this.value = newValue;
        this.hasChanges = newValue !== this.oldValue;
        this.observeArray(newValue instanceof Array ? newValue : null);
        if ((flags & 256 /* noFlush */) === 0) {
            this.flushChanges(flags);
        }
    }
    flushChanges(flags) {
        if (this.hasChanges) {
            this.hasChanges = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        // always sync "selected" property of <options/>
        // immediately whenever the array notifies its mutation
        this.syncOptions();
    }
    syncOptions() {
        var _a;
        const value = this.value;
        const obj = this.obj;
        const isArray = Array.isArray(value);
        const matcher = (_a = obj.matcher) !== null && _a !== void 0 ? _a : defaultMatcher;
        const options = obj.options;
        let i = options.length;
        while (i-- > 0) {
            const option = options[i];
            const optionValue = hasOwn.call(option, 'model') ? option.model : option.value;
            if (isArray) {
                option.selected = value.findIndex(item => !!matcher(optionValue, item)) !== -1;
                continue;
            }
            option.selected = !!matcher(optionValue, value);
        }
    }
    syncValue() {
        // Spec for synchronizing value from `<select/>`  to `SelectObserver`
        // When synchronizing value to observed <select/> element, do the following steps:
        // A. If `<select/>` is multiple
        //    1. Check if current value, called `currentValue` is an array
        //      a. If not an array, return true to signal value has changed
        //      b. If is an array:
        //        i. gather all current selected <option/>, in to array called `values`
        //        ii. loop through the `currentValue` array and remove items that are nolonger selected based on matcher
        //        iii. loop through the `values` array and add items that are selected based on matcher
        //        iv. Return false to signal value hasn't changed
        // B. If the select is single
        //    1. Let `value` equal the first selected option, if no option selected, then `value` is `null`
        //    2. assign `this.currentValue` to `this.oldValue`
        //    3. assign `value` to `this.currentValue`
        //    4. return `true` to signal value has changed
        const obj = this.obj;
        const options = obj.options;
        const len = options.length;
        const currentValue = this.value;
        let i = 0;
        if (obj.multiple) {
            // A.
            if (!(currentValue instanceof Array)) {
                // A.1.a
                return true;
            }
            // A.1.b
            // multi select
            let option;
            const matcher = obj.matcher || defaultMatcher;
            // A.1.b.i
            const values = [];
            while (i < len) {
                option = options[i];
                if (option.selected) {
                    values.push(hasOwn.call(option, 'model')
                        ? option.model
                        : option.value);
                }
                ++i;
            }
            // A.1.b.ii
            i = 0;
            while (i < currentValue.length) {
                const a = currentValue[i];
                // Todo: remove arrow fn
                if (values.findIndex(b => !!matcher(a, b)) === -1) {
                    currentValue.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
            // A.1.b.iii
            i = 0;
            while (i < values.length) {
                const a = values[i];
                // Todo: remove arrow fn
                if (currentValue.findIndex(b => !!matcher(a, b)) === -1) {
                    currentValue.push(a);
                }
                ++i;
            }
            // A.1.b.iv
            return false;
        }
        // B. single select
        // B.1
        let value = null;
        while (i < len) {
            const option = options[i];
            if (option.selected) {
                value = hasOwn.call(option, 'model')
                    ? option.model
                    : option.value;
                break;
            }
            ++i;
        }
        // B.2
        this.oldValue = this.value;
        // B.3
        this.value = value;
        // B.4
        return true;
    }
    start() {
        (this.nodeObserver = new this.obj.ownerDocument.defaultView.MutationObserver(this.handleNodeChange.bind(this)))
            .observe(this.obj, childObserverOptions);
        this.observeArray(this.value instanceof Array ? this.value : null);
        this.observing = true;
    }
    stop() {
        var _a;
        this.nodeObserver.disconnect();
        (_a = this.arrayObserver) === null || _a === void 0 ? void 0 : _a.unsubscribe(this);
        this.nodeObserver
            = this.arrayObserver
                = void 0;
        this.observing = false;
    }
    // todo: observe all kind of collection
    observeArray(array) {
        var _a;
        (_a = this.arrayObserver) === null || _a === void 0 ? void 0 : _a.unsubscribe(this);
        this.arrayObserver = void 0;
        if (array != null) {
            if (!this.obj.multiple) {
                throw new Error('Only null or Array instances can be bound to a multi-select.');
            }
            (this.arrayObserver = this.observerLocator.getArrayObserver(array)).subscribe(this);
        }
    }
    handleEvent() {
        const shouldNotify = this.syncValue();
        if (shouldNotify) {
            this.queue.add(this);
            // this.subs.notify(this.currentValue, this.oldValue, LF.none);
        }
    }
    handleNodeChange() {
        this.syncOptions();
        const shouldNotify = this.syncValue();
        if (shouldNotify) {
            this.queue.add(this);
        }
    }
    subscribe(subscriber) {
        if (this.subs.add(subscriber) && this.subs.count === 1) {
            this.handler.subscribe(this.obj, this);
            this.start();
        }
    }
    unsubscribe(subscriber) {
        if (this.subs.remove(subscriber) && this.subs.count === 0) {
            this.handler.dispose();
            this.stop();
        }
    }
    flush() {
        oV = this.oldValue;
        this.oldValue = this.value;
        this.subs.notify(this.value, oV, 0 /* none */);
    }
}
subscriberCollection(SelectValueObserver);
withFlushQueue(SelectValueObserver);
// a shared variable for `.flush()` methods of observers
// so that there doesn't need to create an env record for every call
let oV = void 0;
//# sourceMappingURL=select-value-observer.js.map