import { DI, IPlatform } from '@aurelia/kernel';
import { subscriberCollection } from './subscriber-collection.js';
import { withFlushQueue } from './flush-queue.js';
export const IDirtyChecker = DI.createInterface('IDirtyChecker', x => x.singleton(DirtyChecker));
export const DirtyCheckSettings = {
    /**
     * Default: `6`
     *
     * Adjust the global dirty check frequency.
     * Measures in "timeouts per check", such that (given a default of 250 timeouts per second in modern browsers):
     * - A value of 1 will result in 250 dirty checks per second (or 1 dirty check per second for an inactive tab)
     * - A value of 25 will result in 10 dirty checks per second (or 1 dirty check per 25 seconds for an inactive tab)
     */
    timeoutsPerCheck: 25,
    /**
     * Default: `false`
     *
     * Disable dirty-checking entirely. Properties that cannot be observed without dirty checking
     * or an adapter, will simply not be observed.
     */
    disabled: false,
    /**
     * Default: `false`
     *
     * Throw an error if a property is being dirty-checked.
     */
    throw: false,
    /**
     * Resets all dirty checking settings to the framework's defaults.
     */
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};
const queueTaskOpts = {
    persistent: true,
};
export class DirtyChecker {
    constructor(platform) {
        this.platform = platform;
        this.tracked = [];
        this.task = null;
        this.elapsedFrames = 0;
        this.check = () => {
            if (DirtyCheckSettings.disabled) {
                return;
            }
            if (++this.elapsedFrames < DirtyCheckSettings.timeoutsPerCheck) {
                return;
            }
            this.elapsedFrames = 0;
            const tracked = this.tracked;
            const len = tracked.length;
            let current;
            let i = 0;
            for (; i < len; ++i) {
                current = tracked[i];
                if (current.isDirty()) {
                    this.queue.add(current);
                }
            }
        };
    }
    createProperty(obj, propertyName) {
        if (DirtyCheckSettings.throw) {
            throw new Error(`Property '${propertyName}' is being dirty-checked.`);
        }
        return new DirtyCheckProperty(this, obj, propertyName);
    }
    addProperty(property) {
        this.tracked.push(property);
        if (this.tracked.length === 1) {
            this.task = this.platform.taskQueue.queueTask(this.check, queueTaskOpts);
        }
    }
    removeProperty(property) {
        this.tracked.splice(this.tracked.indexOf(property), 1);
        if (this.tracked.length === 0) {
            this.task.cancel();
            this.task = null;
        }
    }
}
/**
 * @internal
 */
DirtyChecker.inject = [IPlatform];
withFlushQueue(DirtyChecker);
export class DirtyCheckProperty {
    constructor(dirtyChecker, obj, propertyKey) {
        this.dirtyChecker = dirtyChecker;
        this.obj = obj;
        this.propertyKey = propertyKey;
        this.oldValue = void 0;
        this.type = 0 /* None */;
    }
    getValue() {
        return this.obj[this.propertyKey];
    }
    setValue(v, f) {
        // todo: this should be allowed, probably
        // but the construction of dirty checker should throw instead
        throw new Error(`Trying to set value for property ${this.propertyKey} in dirty checker`);
    }
    isDirty() {
        return this.oldValue !== this.obj[this.propertyKey];
    }
    flush() {
        const oldValue = this.oldValue;
        const newValue = this.getValue();
        this.oldValue = newValue;
        this.subs.notify(newValue, oldValue, 0 /* none */);
    }
    subscribe(subscriber) {
        if (this.subs.add(subscriber) && this.subs.count === 1) {
            this.oldValue = this.obj[this.propertyKey];
            this.dirtyChecker.addProperty(this);
        }
    }
    unsubscribe(subscriber) {
        if (this.subs.remove(subscriber) && this.subs.count === 0) {
            this.dirtyChecker.removeProperty(this);
        }
    }
}
subscriberCollection(DirtyCheckProperty);
//# sourceMappingURL=dirty-checker.js.map