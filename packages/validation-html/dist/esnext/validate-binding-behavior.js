import { __decorate, __metadata } from "tslib";
import { DI } from '@aurelia/kernel';
import { bindingBehavior, BindingInterceptor, BindingMediator, IScheduler, DOM, PropertyBinding, } from '@aurelia/runtime';
import { PropertyRule } from '@aurelia/validation';
import { IValidationController, ValidationController, BindingInfo } from './validation-controller';
/**
 * Validation triggers.
 */
export var ValidationTrigger;
(function (ValidationTrigger) {
    /**
     * Manual validation.  Use the controller's `validate()` and  `reset()` methods to validate all bindings.
     */
    ValidationTrigger["manual"] = "manual";
    /**
     * Validate the binding when the binding's target element fires a DOM 'blur' event.
     */
    ValidationTrigger["blur"] = "blur";
    /**
     * Validate the binding when the binding's target element fires a DOM 'focusout' event.
     */
    ValidationTrigger["focusout"] = "focusout";
    /**
     * Validate the binding when it updates the model due to a change in the source property (usually triggered by some change in view)
     */
    ValidationTrigger["change"] = "change";
    /**
     * Validate the binding when the binding's target element fires a DOM 'blur' event and when it updates the model due to a change in the view.
     */
    ValidationTrigger["changeOrBlur"] = "changeOrBlur";
    /**
     * Validate the binding when the binding's target element fires a DOM 'focusout' event and when it updates the model due to a change in the view.
     */
    ValidationTrigger["changeOrFocusout"] = "changeOrFocusout";
})(ValidationTrigger || (ValidationTrigger = {}));
/* @internal */
export const IDefaultTrigger = DI.createInterface('IDefaultTrigger').noDefault();
/**
 * Binding behavior. Indicates the bound property should be validated.
 */
let ValidateBindingBehavior = class ValidateBindingBehavior extends BindingInterceptor {
    constructor(binding, expr) {
        super(binding, expr);
        this.binding = binding;
        this.propertyBinding = (void 0);
        this.target = (void 0);
        this.isChangeTrigger = false;
        this.connectedExpressions = [];
        this.triggerMediator = new BindingMediator('handleTriggerChange', this, this.observerLocator, this.locator);
        this.controllerMediator = new BindingMediator('handleControllerChange', this, this.observerLocator, this.locator);
        this.rulesMediator = new BindingMediator('handleRulesChange', this, this.observerLocator, this.locator);
        this.isDirty = false;
        this.validatedOnce = false;
        this.triggerEvent = null;
        const locator = this.locator;
        this.scheduler = locator.get(IScheduler);
        this.defaultTrigger = locator.get(IDefaultTrigger);
        if (locator.has(IValidationController, true)) {
            this.scopedController = locator.get(IValidationController);
        }
        this.setPropertyBinding();
    }
    updateSource(value, flags) {
        // TODO: need better approach. If done incorrectly may cause infinite loop, stack overflow 💣
        if (this.interceptor !== this) {
            this.interceptor.updateSource(value, flags);
        }
        else {
            // let binding = this as BindingInterceptor;
            // while (binding.binding !== void 0) {
            //   binding = binding.binding as unknown as BindingInterceptor;
            // }
            // binding.updateSource(value, flags);
            // this is a shortcut of the above code
            this.propertyBinding.updateSource(value, flags);
        }
        this.isDirty = true;
        const event = this.triggerEvent;
        if (this.isChangeTrigger && (event === null || event !== null && this.validatedOnce)) {
            this.validateBinding();
        }
    }
    handleEvent(_event) {
        if (!this.isChangeTrigger || this.isChangeTrigger && this.isDirty) {
            this.validateBinding();
        }
    }
    $bind(flags, scope, part) {
        this.scope = scope;
        this.binding.$bind(flags, scope, part);
        this.setTarget();
        const delta = this.processBindingExpressionArgs(flags);
        this.processDelta(delta);
    }
    $unbind(flags) {
        var _a, _b, _c, _d;
        const event = this.triggerEvent;
        if (event !== null) {
            (_a = this.target) === null || _a === void 0 ? void 0 : _a.removeEventListener(event, this);
        }
        (_b = this.controller) === null || _b === void 0 ? void 0 : _b.removeSubscriber(this);
        (_c = this.controller) === null || _c === void 0 ? void 0 : _c.unregisterBinding(this.propertyBinding);
        this.binding.$unbind(flags);
        for (const expr of this.connectedExpressions) {
            (_d = expr.unbind) === null || _d === void 0 ? void 0 : _d.call(expr, flags, this.scope, this);
        }
    }
    handleTriggerChange(newValue, _previousValue, _flags) {
        this.processDelta(new ValidateArgumentsDelta(void 0, this.ensureTrigger(newValue), void 0));
    }
    handleControllerChange(newValue, _previousValue, _flags) {
        this.processDelta(new ValidateArgumentsDelta(this.ensureController(newValue), void 0, void 0));
    }
    handleRulesChange(newValue, _previousValue, _flags) {
        this.processDelta(new ValidateArgumentsDelta(void 0, void 0, this.ensureRules(newValue)));
    }
    handleValidationEvent(event) {
        var _a;
        const triggerEvent = this.triggerEvent;
        const propertyName = (_a = this.bindingInfo.propertyInfo) === null || _a === void 0 ? void 0 : _a.propertyName;
        if (propertyName !== void 0 && triggerEvent !== null && this.isChangeTrigger) {
            this.validatedOnce = event.addedResults.find((r) => r.result.propertyName === propertyName) !== void 0;
        }
    }
    processBindingExpressionArgs(flags) {
        const scope = this.scope;
        const locator = this.locator;
        let rules;
        let trigger;
        let controller;
        let expression = this.propertyBinding.sourceExpression;
        while (expression.name !== 'validate' && expression !== void 0) {
            expression = expression.expression;
        }
        const evaluationFlags = flags | 4 /* isStrictBindingStrategy */;
        const args = expression.args;
        for (let i = 0, ii = args.length; i < ii; i++) {
            const arg = args[i];
            const temp = arg.evaluate(evaluationFlags, scope, locator);
            switch (i) {
                case 0:
                    trigger = this.ensureTrigger(temp);
                    arg.connect(flags, scope, this.triggerMediator);
                    break;
                case 1:
                    controller = this.ensureController(temp);
                    arg.connect(flags, scope, this.controllerMediator);
                    break;
                case 2:
                    rules = this.ensureRules(temp);
                    arg.connect(flags, scope, this.rulesMediator);
                    break;
                default:
                    throw new Error(`Unconsumed argument#${i + 1} for validate binding behavior: ${temp}`); // TODO: use reporter
            }
            this.connectedExpressions.push(arg);
        }
        return new ValidateArgumentsDelta(this.ensureController(controller), this.ensureTrigger(trigger), rules);
    }
    validateBinding() {
        this.scheduler.getPostRenderTaskQueue().queueTask(async () => {
            await this.controller.validateBinding(this.propertyBinding);
        });
    }
    processDelta(delta) {
        var _a, _b, _c, _d;
        const trigger = (_a = delta.trigger) !== null && _a !== void 0 ? _a : this.trigger;
        const controller = (_b = delta.controller) !== null && _b !== void 0 ? _b : this.controller;
        const rules = delta.rules;
        if (this.trigger !== trigger) {
            let event = this.triggerEvent;
            if (event !== null) {
                this.target.removeEventListener(event, this);
            }
            this.validatedOnce = false;
            this.isDirty = false;
            this.trigger = trigger;
            this.isChangeTrigger = trigger === ValidationTrigger.change
                || trigger === ValidationTrigger.changeOrBlur
                || trigger === ValidationTrigger.changeOrFocusout;
            event = this.setTriggerEvent(this.trigger);
            if (event !== null) {
                this.target.addEventListener(event, this);
            }
        }
        if (this.controller !== controller || rules !== void 0) {
            (_c = this.controller) === null || _c === void 0 ? void 0 : _c.removeSubscriber(this);
            (_d = this.controller) === null || _d === void 0 ? void 0 : _d.unregisterBinding(this.propertyBinding);
            this.controller = controller;
            controller.registerBinding(this.propertyBinding, this.setBindingInfo(rules));
            controller.addSubscriber(this);
        }
    }
    ensureTrigger(trigger) {
        if (trigger === (void 0) || trigger === null) {
            trigger = this.defaultTrigger;
        }
        else if (!Object.values(ValidationTrigger).includes(trigger)) {
            throw new Error(`${trigger} is not a supported validation trigger`); // TODO: use reporter
        }
        return trigger;
    }
    ensureController(controller) {
        if (controller === (void 0) || controller === null) {
            controller = this.scopedController;
        }
        else if (!(controller instanceof ValidationController)) {
            throw new Error(`${controller} is not of type ValidationController`); // TODO: use reporter
        }
        return controller;
    }
    ensureRules(rules) {
        if (Array.isArray(rules) && rules.every((item) => item instanceof PropertyRule)) {
            return rules;
        }
    }
    setPropertyBinding() {
        let binding = this.binding;
        while (!(binding instanceof PropertyBinding) && binding !== void 0) {
            binding = binding.binding;
        }
        if (binding === void 0) {
            throw new Error('Unable to set property binding');
        }
        this.propertyBinding = binding;
    }
    setTarget() {
        var _a;
        const target = this.propertyBinding.target;
        if (DOM.isNodeInstance(target)) {
            this.target = target;
        }
        else {
            const controller = (_a = target) === null || _a === void 0 ? void 0 : _a.$controller;
            if (controller === void 0) {
                throw new Error('Invalid binding target'); // TODO: use reporter
            }
            this.target = controller.host;
        }
    }
    setTriggerEvent(trigger) {
        let triggerEvent = null;
        switch (trigger) {
            case ValidationTrigger.blur:
            case ValidationTrigger.changeOrBlur:
                triggerEvent = 'blur';
                break;
            case ValidationTrigger.focusout:
            case ValidationTrigger.changeOrFocusout:
                triggerEvent = 'focusout';
                break;
        }
        return this.triggerEvent = triggerEvent;
    }
    setBindingInfo(rules) {
        return this.bindingInfo = new BindingInfo(this.target, this.scope, rules);
    }
};
ValidateBindingBehavior = __decorate([
    bindingBehavior('validate'),
    __metadata("design:paramtypes", [Object, Object])
], ValidateBindingBehavior);
export { ValidateBindingBehavior };
class ValidateArgumentsDelta {
    constructor(controller, trigger, rules) {
        this.controller = controller;
        this.trigger = trigger;
        this.rules = rules;
    }
}
//# sourceMappingURL=validate-binding-behavior.js.map