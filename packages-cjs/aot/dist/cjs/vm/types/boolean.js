"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = void 0;
const _shared_js_1 = require("./_shared.js");
const object_js_1 = require("./object.js");
const string_js_1 = require("./string.js");
const number_js_1 = require("./number.js");
// http://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types-boolean-type
class $Boolean {
    constructor(realm, value, type = 1 /* normal */, target = realm['[[Intrinsics]]'].empty, sourceNode = null, conversionSource = null) {
        this.realm = realm;
        this.sourceNode = sourceNode;
        this.conversionSource = conversionSource;
        this.id = (0, _shared_js_1.nextValueId)();
        this.IntrinsicName = 'boolean';
        this.nodeStack = [];
        this.ctx = null;
        this.stack = '';
        this['[[Value]]'] = value;
        this['[[Type]]'] = type;
        this['[[Target]]'] = target;
    }
    // Note: this typing is incorrect, but we do it this way to prevent having to cast in 100+ places.
    // The purpose is to ensure the `isAbrupt === true` flow narrows down to the $Error type.
    // It could be done correctly, but that would require complex conditional types which is not worth the effort right now.
    get isAbrupt() { return (this['[[Type]]'] !== 1 /* normal */); }
    get Type() { return 'Boolean'; }
    get isEmpty() { return false; }
    get isUndefined() { return false; }
    get isNull() { return false; }
    get isNil() { return false; }
    get isBoolean() { return true; }
    get isNumber() { return false; }
    get isString() { return false; }
    get isSymbol() { return false; }
    get isPrimitive() { return true; }
    get isObject() { return false; }
    get isArray() { return false; }
    get isProxy() { return false; }
    get isFunction() { return false; }
    get isBoundFunction() { return false; }
    get isTruthy() { return this['[[Value]]']; }
    get isFalsey() { return !this['[[Value]]']; }
    get isSpeculative() { return false; }
    get hasValue() { return true; }
    get isList() { return false; }
    is(other) {
        return other instanceof $Boolean && this['[[Value]]'] === other['[[Value]]'];
    }
    enrichWith(ctx, node) {
        if (this['[[Type]]'] === 5 /* throw */) {
            this.nodeStack.push(node);
            if (this.ctx === null) {
                this.ctx = ctx;
                this.stack = ctx.Realm.stack.toString();
            }
        }
        return this;
    }
    [Symbol.toPrimitive]() {
        return String(this['[[Value]]']);
    }
    [Symbol.toStringTag]() {
        return Object.prototype.toString.call(this['[[Value]]']);
    }
    ToCompletion(type, target) {
        this['[[Type]]'] = type;
        this['[[Target]]'] = target;
        return this;
    }
    // http://www.ecma-international.org/ecma-262/#sec-updateempty
    // 6.2.3.4 UpdateEmpty ( completionRecord , value )
    UpdateEmpty(value) {
        // 1. Assert: If completionRecord.[[Type]] is either return or throw, then completionRecord.[[Value]] is not empty.
        // 2. If completionRecord.[[Value]] is not empty, return Completion(completionRecord).
        return this;
        // 3. Return Completion { [[Type]]: completionRecord.[[Type]], [[Value]]: value, [[Target]]: completionRecord.[[Target]] }.
    }
    ToObject(ctx) {
        const realm = ctx.Realm;
        const intrinsics = realm['[[Intrinsics]]'];
        return object_js_1.$Object.ObjectCreate(ctx, 'boolean', intrinsics['%BooleanPrototype%'], {
            '[[BooleanData]]': this,
        });
    }
    ToPropertyKey(ctx) {
        return this.ToString(ctx);
    }
    ToLength(ctx) {
        return this.ToNumber(ctx).ToLength(ctx);
    }
    ToPrimitive(ctx) {
        return this;
    }
    ToBoolean(ctx) {
        return this;
    }
    ToNumber(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ Number(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToInt32(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Int32)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToUint32(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Uint32)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToInt16(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Int16)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToUint16(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Uint16)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToInt8(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Int8)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToUint8(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Uint8)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToUint8Clamp(ctx) {
        return new number_js_1.$Number(
        /* realm */ this.realm, 
        /* value */ (0, _shared_js_1.Uint8Clamp)(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    ToString(ctx) {
        return new string_js_1.$String(
        /* realm */ this.realm, 
        /* value */ String(this['[[Value]]']), 
        /* type */ this['[[Type]]'], 
        /* target */ this['[[Target]]'], 
        /* sourceNode */ null, 
        /* conversionSource */ this);
    }
    GetValue(ctx) {
        return this;
    }
}
exports.$Boolean = $Boolean;
//# sourceMappingURL=boolean.js.map