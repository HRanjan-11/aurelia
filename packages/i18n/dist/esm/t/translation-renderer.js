var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { camelCase } from '@aurelia/kernel';
import { TranslationBinding } from './translation-binding.js';
import { BindingMode, IExpressionParser, renderer, IObserverLocator, AttrSyntax, IPlatform, IAttrSyntaxTransformer, } from '@aurelia/runtime-html';
export const TranslationInstructionType = 'tt';
export class TranslationAttributePattern {
    static registerAlias(alias) {
        this.prototype[alias] = function (rawName, rawValue, parts) {
            return new AttrSyntax(rawName, rawValue, '', alias);
        };
    }
}
export class TranslationBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = TranslationInstructionType;
        this.mode = BindingMode.toView;
    }
}
export class TranslationBindingCommand {
    constructor(t) {
        this.t = t;
        this.bindingType = 284 /* CustomCommand */;
    }
    static get inject() { return [IAttrSyntaxTransformer]; }
    build(info) {
        var _a;
        let target;
        if (info.bindable == null) {
            target = (_a = this.t.map(info.node, info.attr.target)) !== null && _a !== void 0 ? _a : camelCase(info.attr.target);
        }
        else {
            target = info.bindable.property;
        }
        return new TranslationBindingInstruction(info.expr, target);
    }
}
let TranslationBindingRenderer = class TranslationBindingRenderer {
    constructor(parser, observerLocator, platform) {
        this.parser = parser;
        this.observerLocator = observerLocator;
        this.platform = platform;
    }
    render(flags, context, controller, target, instruction) {
        TranslationBinding.create({
            parser: this.parser,
            observerLocator: this.observerLocator,
            context,
            controller,
            target,
            instruction,
            platform: this.platform,
        });
    }
};
TranslationBindingRenderer = __decorate([
    renderer(TranslationInstructionType),
    __param(0, IExpressionParser),
    __param(1, IObserverLocator),
    __param(2, IPlatform)
], TranslationBindingRenderer);
export { TranslationBindingRenderer };
export const TranslationBindInstructionType = 'tbt';
export class TranslationBindAttributePattern {
    static registerAlias(alias) {
        const bindPattern = `${alias}.bind`;
        this.prototype[bindPattern] = function (rawName, rawValue, parts) {
            return new AttrSyntax(rawName, rawValue, parts[1], bindPattern);
        };
    }
}
export class TranslationBindBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = TranslationBindInstructionType;
        this.mode = BindingMode.toView;
    }
}
export class TranslationBindBindingCommand {
    constructor(t) {
        this.t = t;
        this.bindingType = 53 /* BindCommand */;
    }
    static get inject() { return [IAttrSyntaxTransformer]; }
    build(info) {
        var _a;
        let target;
        if (info.bindable == null) {
            target = (_a = this.t.map(info.node, info.attr.target)) !== null && _a !== void 0 ? _a : camelCase(info.attr.target);
        }
        else {
            target = info.bindable.property;
        }
        return new TranslationBindBindingInstruction(info.expr, target);
    }
}
let TranslationBindBindingRenderer = class TranslationBindBindingRenderer {
    constructor(parser, observerLocator, platform) {
        this.parser = parser;
        this.observerLocator = observerLocator;
        this.platform = platform;
    }
    render(flags, context, controller, target, instruction) {
        TranslationBinding.create({
            parser: this.parser,
            observerLocator: this.observerLocator,
            context,
            controller,
            target,
            instruction,
            platform: this.platform
        });
    }
};
TranslationBindBindingRenderer = __decorate([
    renderer(TranslationBindInstructionType),
    __param(0, IExpressionParser),
    __param(1, IObserverLocator),
    __param(2, IPlatform)
], TranslationBindBindingRenderer);
export { TranslationBindBindingRenderer };
//# sourceMappingURL=translation-renderer.js.map