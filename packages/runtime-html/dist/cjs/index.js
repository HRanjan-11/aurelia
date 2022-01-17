"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/platform");

var e = require("@aurelia/platform-browser");

var s = require("@aurelia/kernel");

var i = require("@aurelia/runtime");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function n(t, e, s, i) {
    var n = arguments.length, r = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, s) : i, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, e, s, i); else for (var l = t.length - 1; l >= 0; l--) if (o = t[l]) r = (n < 3 ? o(r) : n > 3 ? o(e, s, r) : o(e, s)) || r;
    return n > 3 && r && Object.defineProperty(e, s, r), r;
}

function r(t, e) {
    return function(s, i) {
        e(s, i, t);
    };
}

const o = s.Metadata.getOwn;

const l = s.Metadata.hasOwn;

const h = s.Metadata.define;

const {annotation: c, resource: a} = s.Protocol;

const u = c.keyFor;

const f = a.keyFor;

const d = a.appendTo;

const p = c.appendTo;

const m = c.getKeys;

const v = () => Object.create(null);

const x = Object.prototype.hasOwnProperty;

const g = v();

const w = (t, e, s) => {
    if (true === g[e]) return true;
    if (!k(e)) return false;
    const i = e.slice(0, 5);
    return g[e] = "aria-" === i || "data-" === i || s.isStandardSvgAttribute(t, e);
};

const b = t => t instanceof Promise;

const y = t => "function" === typeof t;

const k = t => "string" === typeof t;

function C(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        h(R, BindableDefinition.create(e, t, s), t.constructor, e);
        p(t.constructor, S.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (k(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function A(t) {
    return t.startsWith(R);
}

const R = u("bindable");

const S = Object.freeze({
    name: R,
    keyFrom: t => `${R}:${t}`,
    from(t, ...e) {
        const s = {};
        const i = Array.isArray;
        function n(e) {
            s[e] = BindableDefinition.create(e, t);
        }
        function r(e, i) {
            s[e] = i instanceof BindableDefinition ? i : BindableDefinition.create(e, t, i);
        }
        function o(t) {
            if (i(t)) t.forEach(n); else if (t instanceof BindableDefinition) s[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => r(e, t[e])));
        }
        e.forEach(o);
        return s;
    },
    for(t) {
        let e;
        const s = {
            add(i) {
                let n;
                let r;
                if (k(i)) {
                    n = i;
                    r = {
                        property: n
                    };
                } else {
                    n = i.property;
                    r = i;
                }
                e = BindableDefinition.create(n, t, r);
                if (!l(R, t, n)) p(t, S.keyFrom(n));
                h(R, e, t, n);
                return s;
            },
            mode(t) {
                e.mode = t;
                return s;
            },
            callback(t) {
                e.callback = t;
                return s;
            },
            attribute(t) {
                e.attribute = t;
                return s;
            },
            primary() {
                e.primary = true;
                return s;
            },
            set(t) {
                e.set = t;
                return s;
            }
        };
        return s;
    },
    getAll(t) {
        const e = R.length + 1;
        const i = [];
        const n = s.getPrototypeChain(t);
        let r = n.length;
        let l = 0;
        let h;
        let c;
        let a;
        let u;
        while (--r >= 0) {
            a = n[r];
            h = m(a).filter(A);
            c = h.length;
            for (u = 0; u < c; ++u) i[l++] = o(R, a, h[u].slice(e));
        }
        return i;
    }
});

class BindableDefinition {
    constructor(t, e, s, i, n, r) {
        this.attribute = t;
        this.callback = e;
        this.mode = s;
        this.primary = i;
        this.property = n;
        this.set = r;
    }
    static create(t, e, n = {}) {
        return new BindableDefinition(s.firstDefined(n.attribute, s.kebabCase(t)), s.firstDefined(n.callback, `${t}Changed`), s.firstDefined(n.mode, i.BindingMode.toView), s.firstDefined(n.primary, false), s.firstDefined(n.property, t), s.firstDefined(n.set, I(t, e, n)));
    }
}

function E(t, e, s) {
    B.define(t, e);
}

const B = {
    key: u("coercer"),
    define(t, e) {
        h(B.key, t[e].bind(t), t);
    },
    for(t) {
        return o(B.key, t);
    }
};

function I(t, e, i = {}) {
    var n, r, o;
    const l = null !== (r = null !== (n = i.type) && void 0 !== n ? n : Reflect.getMetadata("design:type", e, t)) && void 0 !== r ? r : null;
    if (null == l) return s.noop;
    let h;
    switch (l) {
      case Number:
      case Boolean:
      case String:
      case BigInt:
        h = l;
        break;

      default:
        {
            const t = l.coerce;
            h = "function" === typeof t ? t.bind(l) : null !== (o = B.for(l)) && void 0 !== o ? o : s.noop;
            break;
        }
    }
    return h === s.noop ? h : T(h, i.nullable);
}

function T(t, e) {
    return function(s, i) {
        var n;
        if (!(null === i || void 0 === i ? void 0 : i.enableCoercion)) return s;
        return (null !== e && void 0 !== e ? e : (null !== (n = null === i || void 0 === i ? void 0 : i.coerceNullish) && void 0 !== n ? n : false) ? false : true) && null == s ? s : t(s, i);
    };
}

class BindableObserver {
    constructor(t, e, i, n, r, o) {
        this.set = n;
        this.$controller = r;
        this.t = o;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        const l = t[i];
        const h = t.propertyChanged;
        const c = this.i = y(l);
        const a = this.u = y(h);
        const u = this.hs = n !== s.noop;
        let f;
        this.o = t;
        this.k = e;
        this.cb = c ? l : s.noop;
        this.C = a ? h : s.noop;
        if (void 0 === this.cb && !a && !u) this.iO = false; else {
            this.iO = true;
            f = t[e];
            this.v = u && void 0 !== f ? n(f, this.t) : f;
            this.A();
        }
    }
    get type() {
        return 1;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (this.hs) t = this.set(t, this.t);
        const s = this.v;
        if (this.iO) {
            if (Object.is(t, s)) return;
            this.v = t;
            this.ov = s;
            this.f = e;
            if (null == this.$controller || this.$controller.isBound) {
                if (this.i) this.cb.call(this.o, t, s, e);
                if (this.u) this.C.call(this.o, this.k, t, s, e);
            }
            this.queue.add(this);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === !this.iO) {
            this.iO = true;
            this.v = this.hs ? this.set(this.o[this.k], this.t) : this.o[this.k];
            this.A();
        }
        this.subs.add(t);
    }
    flush() {
        D = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, D, this.f);
    }
    A() {
        Reflect.defineProperty(this.o, this.k, {
            enumerable: true,
            configurable: true,
            get: () => this.v,
            set: t => {
                this.setValue(t, 0);
            }
        });
    }
}

i.subscriberCollection(BindableObserver);

i.withFlushQueue(BindableObserver);

let D;

class CharSpec {
    constructor(t, e, s, i) {
        this.chars = t;
        this.repeat = e;
        this.isSymbol = s;
        this.isInverted = i;
        if (i) switch (t.length) {
          case 0:
            this.has = this.R;
            break;

          case 1:
            this.has = this.B;
            break;

          default:
            this.has = this.I;
        } else switch (t.length) {
          case 0:
            this.has = this.T;
            break;

          case 1:
            this.has = this.P;
            break;

          default:
            this.has = this.$;
        }
    }
    equals(t) {
        return this.chars === t.chars && this.repeat === t.repeat && this.isSymbol === t.isSymbol && this.isInverted === t.isInverted;
    }
    $(t) {
        return this.chars.includes(t);
    }
    P(t) {
        return this.chars === t;
    }
    T(t) {
        return false;
    }
    I(t) {
        return !this.chars.includes(t);
    }
    B(t) {
        return this.chars !== t;
    }
    R(t) {
        return true;
    }
}

class Interpretation {
    constructor() {
        this.parts = s.emptyArray;
        this.O = "";
        this.L = {};
        this.q = {};
    }
    get pattern() {
        const t = this.O;
        if ("" === t) return null; else return t;
    }
    set pattern(t) {
        if (null == t) {
            this.O = "";
            this.parts = s.emptyArray;
        } else {
            this.O = t;
            this.parts = this.q[t];
        }
    }
    append(t, e) {
        const s = this.L;
        if (void 0 === s[t]) s[t] = e; else s[t] += e;
    }
    next(t) {
        const e = this.L;
        let s;
        if (void 0 !== e[t]) {
            s = this.q;
            if (void 0 === s[t]) s[t] = [ e[t] ]; else s[t].push(e[t]);
            e[t] = void 0;
        }
    }
}

class State$1 {
    constructor(t, ...e) {
        this.charSpec = t;
        this.nextStates = [];
        this.types = null;
        this.isEndpoint = false;
        this.patterns = e;
    }
    get pattern() {
        return this.isEndpoint ? this.patterns[0] : null;
    }
    findChild(t) {
        const e = this.nextStates;
        const s = e.length;
        let i = null;
        let n = 0;
        for (;n < s; ++n) {
            i = e[n];
            if (t.equals(i.charSpec)) return i;
        }
        return null;
    }
    append(t, e) {
        const s = this.patterns;
        if (!s.includes(e)) s.push(e);
        let i = this.findChild(t);
        if (null == i) {
            i = new State$1(t, e);
            this.nextStates.push(i);
            if (t.repeat) i.nextStates.push(i);
        }
        return i;
    }
    findMatches(t, e) {
        const s = [];
        const i = this.nextStates;
        const n = i.length;
        let r = 0;
        let o = null;
        let l = 0;
        let h = 0;
        for (;l < n; ++l) {
            o = i[l];
            if (o.charSpec.has(t)) {
                s.push(o);
                r = o.patterns.length;
                h = 0;
                if (o.charSpec.isSymbol) for (;h < r; ++h) e.next(o.patterns[h]); else for (;h < r; ++h) e.append(o.patterns[h], t);
            }
        }
        return s;
    }
}

class StaticSegment {
    constructor(t) {
        this.text = t;
        const e = this.len = t.length;
        const s = this.specs = [];
        let i = 0;
        for (;e > i; ++i) s.push(new CharSpec(t[i], false, false, false));
    }
    eachChar(t) {
        const e = this.len;
        const s = this.specs;
        let i = 0;
        for (;e > i; ++i) t(s[i]);
    }
}

class DynamicSegment {
    constructor(t) {
        this.text = "PART";
        this.spec = new CharSpec(t, true, false, true);
    }
    eachChar(t) {
        t(this.spec);
    }
}

class SymbolSegment {
    constructor(t) {
        this.text = t;
        this.spec = new CharSpec(t, false, true, false);
    }
    eachChar(t) {
        t(this.spec);
    }
}

class SegmentTypes {
    constructor() {
        this.statics = 0;
        this.dynamics = 0;
        this.symbols = 0;
    }
}

const P = s.DI.createInterface("ISyntaxInterpreter", (t => t.singleton(SyntaxInterpreter)));

class SyntaxInterpreter {
    constructor() {
        this.rootState = new State$1(null);
        this.initialStates = [ this.rootState ];
    }
    add(t) {
        t = t.slice(0).sort(((t, e) => t.pattern > e.pattern ? 1 : -1));
        const e = t.length;
        let s;
        let i;
        let n;
        let r;
        let o;
        let l;
        let h;
        let c = 0;
        let a;
        while (e > c) {
            s = this.rootState;
            i = t[c];
            n = i.pattern;
            r = new SegmentTypes;
            o = this.parse(i, r);
            l = o.length;
            h = t => {
                s = s.append(t, n);
            };
            for (a = 0; l > a; ++a) o[a].eachChar(h);
            s.types = r;
            s.isEndpoint = true;
            ++c;
        }
    }
    interpret(t) {
        const e = new Interpretation;
        const s = t.length;
        let i = this.initialStates;
        let n = 0;
        let r;
        for (;n < s; ++n) {
            i = this.getNextStates(i, t.charAt(n), e);
            if (0 === i.length) break;
        }
        i = i.filter($);
        if (i.length > 0) {
            i.sort(O);
            r = i[0];
            if (!r.charSpec.isSymbol) e.next(r.pattern);
            e.pattern = r.pattern;
        }
        return e;
    }
    getNextStates(t, e, s) {
        const i = [];
        let n = null;
        const r = t.length;
        let o = 0;
        for (;o < r; ++o) {
            n = t[o];
            i.push(...n.findMatches(e, s));
        }
        return i;
    }
    parse(t, e) {
        const s = [];
        const i = t.pattern;
        const n = i.length;
        const r = t.symbols;
        let o = 0;
        let l = 0;
        let h = "";
        while (o < n) {
            h = i.charAt(o);
            if (0 === r.length || !r.includes(h)) if (o === l) if ("P" === h && "PART" === i.slice(o, o + 4)) {
                l = o += 4;
                s.push(new DynamicSegment(r));
                ++e.dynamics;
            } else ++o; else ++o; else if (o !== l) {
                s.push(new StaticSegment(i.slice(l, o)));
                ++e.statics;
                l = o;
            } else {
                s.push(new SymbolSegment(i.slice(l, o + 1)));
                ++e.symbols;
                l = ++o;
            }
        }
        if (l !== o) {
            s.push(new StaticSegment(i.slice(l, o)));
            ++e.statics;
        }
        return s;
    }
}

function $(t) {
    return t.isEndpoint;
}

function O(t, e) {
    const s = t.types;
    const i = e.types;
    if (s.statics !== i.statics) return i.statics - s.statics;
    if (s.dynamics !== i.dynamics) return i.dynamics - s.dynamics;
    if (s.symbols !== i.symbols) return i.symbols - s.symbols;
    return 0;
}

class AttrSyntax {
    constructor(t, e, s, i) {
        this.rawName = t;
        this.rawValue = e;
        this.target = s;
        this.command = i;
    }
}

const L = s.DI.createInterface("IAttributePattern");

const q = s.DI.createInterface("IAttributeParser", (t => t.singleton(AttributeParser)));

class AttributeParser {
    constructor(t, e) {
        this.U = {};
        this.F = t;
        const i = this._ = {};
        const n = e.reduce(((t, e) => {
            const s = M(e.constructor);
            s.forEach((t => i[t.pattern] = e));
            return t.concat(s);
        }), s.emptyArray);
        t.add(n);
    }
    parse(t, e) {
        let s = this.U[t];
        if (null == s) s = this.U[t] = this.F.interpret(t);
        const i = s.pattern;
        if (null == i) return new AttrSyntax(t, e, t, null); else return this._[i][i](t, e, s.parts);
    }
}

AttributeParser.inject = [ P, s.all(L) ];

function U(...t) {
    return function e(s) {
        return V.define(t, s);
    };
}

class AttributePatternResourceDefinition {
    constructor(t) {
        this.Type = t;
        this.name = void 0;
    }
    register(t) {
        s.Registration.singleton(L, this.Type).register(t);
    }
}

const F = f("attribute-pattern");

const _ = "attribute-pattern-definitions";

const M = t => s.Protocol.annotation.get(t, _);

const V = Object.freeze({
    name: F,
    definitionAnnotationKey: _,
    define(t, e) {
        const i = new AttributePatternResourceDefinition(e);
        h(F, i, e);
        d(e, F);
        s.Protocol.annotation.set(e, _, t);
        p(e, _);
        return e;
    },
    getPatternDefinitions: M
});

exports.DotSeparatedAttributePattern = class DotSeparatedAttributePattern {
    "PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[1]);
    }
    "PART.PART.PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], s[2]);
    }
};

exports.DotSeparatedAttributePattern = n([ U({
    pattern: "PART.PART",
    symbols: "."
}, {
    pattern: "PART.PART.PART",
    symbols: "."
}) ], exports.DotSeparatedAttributePattern);

exports.RefAttributePattern = class RefAttributePattern {
    ref(t, e, s) {
        return new AttrSyntax(t, e, "element", "ref");
    }
    "PART.ref"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "ref");
    }
};

exports.RefAttributePattern = n([ U({
    pattern: "ref",
    symbols: ""
}, {
    pattern: "PART.ref",
    symbols: "."
}) ], exports.RefAttributePattern);

exports.ColonPrefixedBindAttributePattern = class ColonPrefixedBindAttributePattern {
    ":PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "bind");
    }
};

exports.ColonPrefixedBindAttributePattern = n([ U({
    pattern: ":PART",
    symbols: ":"
}) ], exports.ColonPrefixedBindAttributePattern);

exports.AtPrefixedTriggerAttributePattern = class AtPrefixedTriggerAttributePattern {
    "@PART"(t, e, s) {
        return new AttrSyntax(t, e, s[0], "trigger");
    }
};

exports.AtPrefixedTriggerAttributePattern = n([ U({
    pattern: "@PART",
    symbols: "@"
}) ], exports.AtPrefixedTriggerAttributePattern);

let j = class SpreadAttributePattern {
    "...$attrs"(t, e, s) {
        return new AttrSyntax(t, e, "", "...$attrs");
    }
};

j = n([ U({
    pattern: "...$attrs",
    symbols: ""
}) ], j);

const N = s.IPlatform;

const W = s.DI.createInterface("ISVGAnalyzer", (t => t.singleton(NoopSVGAnalyzer)));

class NoopSVGAnalyzer {
    isStandardSvgAttribute(t, e) {
        return false;
    }
}

function H(t) {
    const e = v();
    let s;
    for (s of t) e[s] = true;
    return e;
}

class SVGAnalyzer {
    constructor(t) {
        this.M = Object.assign(v(), {
            a: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            altGlyph: H([ "class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            altglyph: v(),
            altGlyphDef: H([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphdef: v(),
            altGlyphItem: H([ "id", "xml:base", "xml:lang", "xml:space" ]),
            altglyphitem: v(),
            animate: H([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateColor: H([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateMotion: H([ "accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            animateTransform: H([ "accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            circle: H([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            clipPath: H([ "class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            "color-profile": H([ "id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            cursor: H([ "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            defs: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            desc: H([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            ellipse: H([ "class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            feBlend: H([ "class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feColorMatrix: H([ "class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComponentTransfer: H([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feComposite: H([ "class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feConvolveMatrix: H([ "bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDiffuseLighting: H([ "class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feDisplacementMap: H([ "class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector" ]),
            feDistantLight: H([ "azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space" ]),
            feFlood: H([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feFuncA: H([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncB: H([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncG: H([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feFuncR: H([ "amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space" ]),
            feGaussianBlur: H([ "class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feImage: H([ "class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMerge: H([ "class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feMergeNode: H([ "id", "xml:base", "xml:lang", "xml:space" ]),
            feMorphology: H([ "class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feOffset: H([ "class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            fePointLight: H([ "id", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feSpecularLighting: H([ "class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feSpotLight: H([ "id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z" ]),
            feTile: H([ "class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            feTurbulence: H([ "baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            filter: H([ "class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            font: H([ "class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            "font-face": H([ "accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-format": H([ "id", "string", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-name": H([ "id", "name", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-src": H([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "font-face-uri": H([ "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            foreignObject: H([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            g: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            glyph: H([ "arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            glyphRef: H([ "class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            glyphref: v(),
            hkern: H([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ]),
            image: H([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            line: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            linearGradient: H([ "class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2" ]),
            marker: H([ "class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            mask: H([ "class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            metadata: H([ "id", "xml:base", "xml:lang", "xml:space" ]),
            "missing-glyph": H([ "class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space" ]),
            mpath: H([ "externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            path: H([ "class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            pattern: H([ "class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            polygon: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            polyline: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            radialGradient: H([ "class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            rect: H([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            script: H([ "externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            set: H([ "attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            stop: H([ "class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space" ]),
            style: H([ "id", "media", "title", "type", "xml:base", "xml:lang", "xml:space" ]),
            svg: H([ "baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan" ]),
            switch: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space" ]),
            symbol: H([ "class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space" ]),
            text: H([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            textPath: H([ "class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space" ]),
            title: H([ "class", "id", "style", "xml:base", "xml:lang", "xml:space" ]),
            tref: H([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            tspan: H([ "class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y" ]),
            use: H([ "class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y" ]),
            view: H([ "externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan" ]),
            vkern: H([ "g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space" ])
        });
        this.V = H([ "a", "altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use" ]);
        this.j = H([ "alignment-baseline", "baseline-shift", "clip-path", "clip-rule", "clip", "color-interpolation-filters", "color-interpolation", "color-profile", "color-rendering", "color", "cursor", "direction", "display", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "fill", "filter", "flood-color", "flood-opacity", "font-family", "font-size-adjust", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "image-rendering", "kerning", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "overflow", "pointer-events", "shape-rendering", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "stroke", "text-anchor", "text-decoration", "text-rendering", "unicode-bidi", "visibility", "word-spacing", "writing-mode" ]);
        this.SVGElement = t.globalThis.SVGElement;
        const e = t.document.createElement("div");
        e.innerHTML = "<svg><altGlyph /></svg>";
        if ("altglyph" === e.firstElementChild.nodeName) {
            const t = this.M;
            let e = t.altGlyph;
            t.altGlyph = t.altglyph;
            t.altglyph = e;
            e = t.altGlyphDef;
            t.altGlyphDef = t.altglyphdef;
            t.altglyphdef = e;
            e = t.altGlyphItem;
            t.altGlyphItem = t.altglyphitem;
            t.altglyphitem = e;
            e = t.glyphRef;
            t.glyphRef = t.glyphref;
            t.glyphref = e;
        }
    }
    static register(t) {
        return s.Registration.singleton(W, this).register(t);
    }
    isStandardSvgAttribute(t, e) {
        var s;
        if (!(t instanceof this.SVGElement)) return false;
        return true === this.V[t.nodeName] && true === this.j[e] || true === (null === (s = this.M[t.nodeName]) || void 0 === s ? void 0 : s[e]);
    }
}

SVGAnalyzer.inject = [ N ];

const z = s.DI.createInterface("IAttrMapper", (t => t.singleton(AttrMapper)));

class AttrMapper {
    constructor(t) {
        this.svg = t;
        this.fns = [];
        this.N = v();
        this.W = v();
        this.useMapping({
            LABEL: {
                for: "htmlFor"
            },
            IMG: {
                usemap: "useMap"
            },
            INPUT: {
                maxlength: "maxLength",
                minlength: "minLength",
                formaction: "formAction",
                formenctype: "formEncType",
                formmethod: "formMethod",
                formnovalidate: "formNoValidate",
                formtarget: "formTarget",
                inputmode: "inputMode"
            },
            TEXTAREA: {
                maxlength: "maxLength"
            },
            TD: {
                rowspan: "rowSpan",
                colspan: "colSpan"
            },
            TH: {
                rowspan: "rowSpan",
                colspan: "colSpan"
            }
        });
        this.useGlobalMapping({
            accesskey: "accessKey",
            contenteditable: "contentEditable",
            tabindex: "tabIndex",
            textcontent: "textContent",
            innerhtml: "innerHTML",
            scrolltop: "scrollTop",
            scrollleft: "scrollLeft",
            readonly: "readOnly"
        });
    }
    static get inject() {
        return [ W ];
    }
    useMapping(t) {
        var e;
        var s;
        let i;
        let n;
        let r;
        let o;
        for (r in t) {
            i = t[r];
            n = null !== (e = (s = this.N)[r]) && void 0 !== e ? e : s[r] = v();
            for (o in i) {
                if (void 0 !== n[o]) throw X(o, r);
                n[o] = i[o];
            }
        }
    }
    useGlobalMapping(t) {
        const e = this.W;
        for (const s in t) {
            if (void 0 !== e[s]) throw X(s, "*");
            e[s] = t[s];
        }
    }
    useTwoWay(t) {
        this.fns.push(t);
    }
    isTwoWay(t, e) {
        return G(t, e) || this.fns.length > 0 && this.fns.some((s => s(t, e)));
    }
    map(t, e) {
        var s, i, n;
        return null !== (n = null !== (i = null === (s = this.N[t.nodeName]) || void 0 === s ? void 0 : s[e]) && void 0 !== i ? i : this.W[e]) && void 0 !== n ? n : w(t, e, this.svg) ? e : null;
    }
}

function G(t, e) {
    switch (t.nodeName) {
      case "INPUT":
        switch (t.type) {
          case "checkbox":
          case "radio":
            return "checked" === e;

          default:
            return "value" === e || "files" === e || "value-as-number" === e || "value-as-date" === e;
        }

      case "TEXTAREA":
      case "SELECT":
        return "value" === e;

      default:
        switch (e) {
          case "textcontent":
          case "innerhtml":
            return t.hasAttribute("contenteditable");

          case "scrolltop":
          case "scrollleft":
            return true;

          default:
            return false;
        }
    }
}

function X(t, e) {
    return new Error(`Attribute ${t} has been already registered for ${"*" === e ? "all elements" : `<${e}/>`}`);
}

class CallBinding {
    constructor(t, e, s, i, n) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = s;
        this.locator = n;
        this.interceptor = this;
        this.isBound = false;
        this.targetObserver = i.getAccessor(e, s);
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const s = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        return s;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        this.targetObserver.setValue((t => this.interceptor.callSource(t)), t, this.target, this.targetProperty);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.targetObserver.setValue(null, t, this.target, this.targetProperty);
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

class AttributeObserver {
    constructor(t, e, s) {
        this.type = 2 | 1 | 4;
        this.v = null;
        this.ov = null;
        this.H = false;
        this.f = 0;
        this.o = t;
        this.G = e;
        this.X = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        this.v = t;
        this.H = t !== this.ov;
        if (0 === (256 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.ov = this.v;
            switch (this.X) {
              case "class":
                this.o.classList.toggle(this.G, !!this.v);
                break;

              case "style":
                {
                    let t = "";
                    let e = this.v;
                    if (k(e) && e.includes("!important")) {
                        t = "important";
                        e = e.replace("!important", "");
                    }
                    this.o.style.setProperty(this.G, e, t);
                    break;
                }

              default:
                if (null == this.v) this.o.removeAttribute(this.X); else this.o.setAttribute(this.X, String(this.v));
            }
        }
    }
    handleMutation(t) {
        let e = false;
        for (let s = 0, i = t.length; i > s; ++s) {
            const i = t[s];
            if ("attributes" === i.type && i.attributeName === this.G) {
                e = true;
                break;
            }
        }
        if (e) {
            let t;
            switch (this.X) {
              case "class":
                t = this.o.classList.contains(this.G);
                break;

              case "style":
                t = this.o.style.getPropertyValue(this.G);
                break;

              default:
                throw new Error(`AUR0651:${this.X}`);
            }
            if (t !== this.v) {
                this.ov = this.v;
                this.v = t;
                this.H = false;
                this.f = 0;
                this.queue.add(this);
            }
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.v = this.ov = this.o.getAttribute(this.G);
            K(this.o.ownerDocument.defaultView.MutationObserver, this.o, this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) Y(this.o, this);
    }
    flush() {
        Q = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Q, this.f);
    }
}

i.subscriberCollection(AttributeObserver);

i.withFlushQueue(AttributeObserver);

const K = (t, e, s) => {
    if (void 0 === e.$eMObs) e.$eMObs = new Set;
    if (void 0 === e.$mObs) (e.$mObs = new t(Z)).observe(e, {
        attributes: true
    });
    e.$eMObs.add(s);
};

const Y = (t, e) => {
    const s = t.$eMObs;
    if (s && s.delete(e)) {
        if (0 === s.size) {
            t.$mObs.disconnect();
            t.$mObs = void 0;
        }
        return true;
    }
    return false;
};

const Z = t => {
    t[0].target.$eMObs.forEach(J, t);
};

function J(t) {
    t.handleMutation(this);
}

let Q;

class BindingTargetSubscriber {
    constructor(t) {
        this.b = t;
    }
    handleChange(t, e, s) {
        const i = this.b;
        if (t !== i.sourceExpression.evaluate(s, i.$scope, i.locator, null)) i.updateSource(t, s);
    }
}

const {oneTime: tt, toView: et, fromView: st} = i.BindingMode;

const it = et | tt;

const nt = {
    reusable: false,
    preempt: true
};

class AttributeBinding {
    constructor(t, e, s, i, n, r, o) {
        this.sourceExpression = t;
        this.targetAttribute = s;
        this.targetProperty = i;
        this.mode = n;
        this.locator = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = null;
        this.task = null;
        this.targetSubscriber = null;
        this.persistentFlags = 0;
        this.value = void 0;
        this.target = e;
        this.p = o.get(N);
        this.oL = r;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        s |= this.persistentFlags;
        const i = this.mode;
        const n = this.interceptor;
        const r = this.sourceExpression;
        const o = this.$scope;
        const l = this.locator;
        const h = this.targetObserver;
        const c = 0 === (2 & s) && (4 & h.type) > 0;
        let a = false;
        let u;
        if (10082 !== r.$kind || this.obs.count > 1) {
            a = 0 === (i & tt);
            if (a) this.obs.version++;
            t = r.evaluate(s, o, l, n);
            if (a) this.obs.clear();
        }
        if (t !== this.value) {
            this.value = t;
            if (c) {
                u = this.task;
                this.task = this.p.domWriteQueue.queueTask((() => {
                    this.task = null;
                    n.updateTarget(t, s);
                }), nt);
                null === u || void 0 === u ? void 0 : u.cancel();
            } else n.updateTarget(t, s);
        }
    }
    $bind(t, e) {
        var s;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let i = this.sourceExpression;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        let n = this.targetObserver;
        if (!n) n = this.targetObserver = new AttributeObserver(this.target, this.targetProperty, this.targetAttribute);
        i = this.sourceExpression;
        const r = this.mode;
        const o = this.interceptor;
        let l = false;
        if (r & it) {
            l = (r & et) > 0;
            o.updateTarget(this.value = i.evaluate(t, e, this.locator, l ? o : null), t);
        }
        if (r & st) n.subscribe(null !== (s = this.targetSubscriber) && void 0 !== s ? s : this.targetSubscriber = new BindingTargetSubscriber(o));
        this.isBound = true;
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        this.value = void 0;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.obs.clearAll();
        this.isBound = false;
    }
}

i.connectable(AttributeBinding);

const {toView: rt} = i.BindingMode;

const ot = {
    reusable: false,
    preempt: true
};

class InterpolationBinding {
    constructor(t, e, s, i, n, r, o) {
        this.interpolation = e;
        this.target = s;
        this.targetProperty = i;
        this.mode = n;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.oL = t;
        this.targetObserver = t.getAccessor(s, i);
        const l = e.expressions;
        const h = this.partBindings = Array(l.length);
        const c = l.length;
        let a = 0;
        for (;c > a; ++a) h[a] = new InterpolationPartBinding(l[a], s, i, r, t, this);
    }
    updateTarget(t, e) {
        const s = this.partBindings;
        const i = this.interpolation.parts;
        const n = s.length;
        let r = "";
        let o = 0;
        if (1 === n) r = i[0] + s[0].value + i[1]; else {
            r = i[0];
            for (;n > o; ++o) r += s[o].value + i[o + 1];
        }
        const l = this.targetObserver;
        const h = 0 === (2 & e) && (4 & l.type) > 0;
        let c;
        if (h) {
            c = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.task = null;
                l.setValue(r, e, this.target, this.targetProperty);
            }), ot);
            null === c || void 0 === c ? void 0 : c.cancel();
            c = null;
        } else l.setValue(r, e, this.target, this.targetProperty);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        const s = this.partBindings;
        const i = s.length;
        let n = 0;
        for (;i > n; ++n) s[n].$bind(t, e);
        this.updateTarget(void 0, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        const s = this.partBindings;
        const i = s.length;
        let n = 0;
        for (;i > n; ++n) s[n].interceptor.$unbind(t);
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
}

class InterpolationPartBinding {
    constructor(t, e, s, n, r, o) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = s;
        this.locator = n;
        this.owner = o;
        this.interceptor = this;
        this.mode = i.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = r;
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        const i = this.sourceExpression;
        const n = this.obs;
        const r = 10082 === i.$kind && 1 === n.count;
        let o = false;
        if (!r) {
            o = (this.mode & rt) > 0;
            if (o) n.version++;
            t = i.evaluate(s, this.$scope, this.locator, o ? this.interceptor : null);
            if (o) n.clear();
        }
        if (t != this.value) {
            this.value = t;
            if (t instanceof Array) this.observeCollection(t);
            this.owner.updateTarget(t, s);
        }
    }
    handleCollectionChange(t, e) {
        this.owner.updateTarget(void 0, e);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & rt) > 0 ? this.interceptor : null);
        if (this.value instanceof Array) this.observeCollection(this.value);
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
    }
}

i.connectable(InterpolationPartBinding);

class ContentBinding {
    constructor(t, e, s, n, r, o) {
        this.sourceExpression = t;
        this.target = e;
        this.locator = s;
        this.p = r;
        this.strict = o;
        this.interceptor = this;
        this.mode = i.BindingMode.toView;
        this.value = "";
        this.task = null;
        this.isBound = false;
        this.oL = n;
    }
    updateTarget(t, e) {
        var s, i;
        const n = this.target;
        const r = this.p.Node;
        const o = this.value;
        this.value = t;
        if (o instanceof r) null === (s = o.parentNode) || void 0 === s ? void 0 : s.removeChild(o);
        if (t instanceof r) {
            n.textContent = "";
            null === (i = n.parentNode) || void 0 === i ? void 0 : i.insertBefore(t, n);
        } else n.textContent = String(t);
    }
    handleChange(t, e, s) {
        var i;
        if (!this.isBound) return;
        const n = this.sourceExpression;
        const r = this.obs;
        const o = 10082 === n.$kind && 1 === r.count;
        let l = false;
        if (!o) {
            l = (this.mode & rt) > 0;
            if (l) r.version++;
            s |= this.strict ? 1 : 0;
            t = n.evaluate(s, this.$scope, this.locator, l ? this.interceptor : null);
            if (l) r.clear();
        }
        if (t === this.value) {
            null === (i = this.task) || void 0 === i ? void 0 : i.cancel();
            this.task = null;
            return;
        }
        const h = 0 === (2 & s);
        if (h) this.queueUpdate(t, s); else this.updateTarget(t, s);
    }
    handleCollectionChange() {
        this.queueUpdate(this.value, 0);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(t);
        }
        this.isBound = true;
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this.interceptor);
        t |= this.strict ? 1 : 0;
        const s = this.value = this.sourceExpression.evaluate(t, e, this.locator, (this.mode & rt) > 0 ? this.interceptor : null);
        if (s instanceof Array) this.observeCollection(s);
        this.updateTarget(s, t);
    }
    $unbind(t) {
        var e;
        if (!this.isBound) return;
        this.isBound = false;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
    }
    queueUpdate(t, e) {
        const s = this.task;
        this.task = this.p.domWriteQueue.queueTask((() => {
            this.task = null;
            this.updateTarget(t, e);
        }), ot);
        null === s || void 0 === s ? void 0 : s.cancel();
    }
}

i.connectable(ContentBinding);

class LetBinding {
    constructor(t, e, s, i, n = false) {
        this.sourceExpression = t;
        this.targetProperty = e;
        this.locator = i;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.task = null;
        this.target = null;
        this.oL = s;
        this.Y = n;
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        const i = this.target;
        const n = this.targetProperty;
        const r = i[n];
        this.obs.version++;
        t = this.sourceExpression.evaluate(s, this.$scope, this.locator, this.interceptor);
        this.obs.clear();
        if (t !== r) i[n] = t;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        this.target = this.Y ? e.bindingContext : e.overrideContext;
        const s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        this.target[this.targetProperty] = this.sourceExpression.evaluate(2 | t, e, this.locator, this.interceptor);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.obs.clearAll();
        this.isBound = false;
    }
}

i.connectable(LetBinding);

const {oneTime: lt, toView: ht, fromView: ct} = i.BindingMode;

const at = ht | lt;

const ut = {
    reusable: false,
    preempt: true
};

class PropertyBinding {
    constructor(t, e, s, i, n, r, o) {
        this.sourceExpression = t;
        this.target = e;
        this.targetProperty = s;
        this.mode = i;
        this.locator = r;
        this.taskQueue = o;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.targetObserver = void 0;
        this.persistentFlags = 0;
        this.task = null;
        this.targetSubscriber = null;
        this.oL = n;
    }
    updateTarget(t, e) {
        e |= this.persistentFlags;
        this.targetObserver.setValue(t, e, this.target, this.targetProperty);
    }
    updateSource(t, e) {
        e |= this.persistentFlags;
        this.sourceExpression.assign(e, this.$scope, this.locator, t);
    }
    handleChange(t, e, s) {
        if (!this.isBound) return;
        s |= this.persistentFlags;
        const i = 0 === (2 & s) && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        let r = false;
        if (10082 !== this.sourceExpression.$kind || n.count > 1) {
            r = this.mode > lt;
            if (r) n.version++;
            t = this.sourceExpression.evaluate(s, this.$scope, this.locator, this.interceptor);
            if (r) n.clear();
        }
        if (i) {
            ft = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, s);
                this.task = null;
            }), ut);
            null === ft || void 0 === ft ? void 0 : ft.cancel();
            ft = null;
        } else this.interceptor.updateTarget(t, s);
    }
    $bind(t, e) {
        var s;
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        t |= 1;
        this.persistentFlags = 961 & t;
        this.$scope = e;
        let i = this.sourceExpression;
        if (i.hasBind) i.bind(t, e, this.interceptor);
        const n = this.oL;
        const r = this.mode;
        let o = this.targetObserver;
        if (!o) {
            if (r & ct) o = n.getObserver(this.target, this.targetProperty); else o = n.getAccessor(this.target, this.targetProperty);
            this.targetObserver = o;
        }
        i = this.sourceExpression;
        const l = this.interceptor;
        const h = (r & ht) > 0;
        if (r & at) l.updateTarget(i.evaluate(t, e, this.locator, h ? l : null), t);
        if (r & ct) {
            o.subscribe(null !== (s = this.targetSubscriber) && void 0 !== s ? s : this.targetSubscriber = new BindingTargetSubscriber(l));
            if (!h) l.updateSource(o.getValue(this.target, this.targetProperty), t);
        }
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        this.persistentFlags = 0;
        if (this.sourceExpression.hasUnbind) this.sourceExpression.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        ft = this.task;
        if (this.targetSubscriber) this.targetObserver.unsubscribe(this.targetSubscriber);
        if (null != ft) {
            ft.cancel();
            ft = this.task = null;
        }
        this.obs.clearAll();
        this.isBound = false;
    }
}

i.connectable(PropertyBinding);

let ft = null;

class RefBinding {
    constructor(t, e, s) {
        this.sourceExpression = t;
        this.target = e;
        this.locator = s;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        if (this.sourceExpression.hasBind) this.sourceExpression.bind(t, e, this);
        this.sourceExpression.assign(t, this.$scope, this.locator, this.target);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        let e = this.sourceExpression;
        if (e.evaluate(t, this.$scope, this.locator, null) === this.target) e.assign(t, this.$scope, this.locator, null);
        e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = void 0;
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

const dt = s.DI.createInterface("IAppTask");

class $AppTask {
    constructor(t, e, s) {
        this.c = void 0;
        this.slot = t;
        this.k = e;
        this.cb = s;
    }
    register(t) {
        return this.c = t.register(s.Registration.instance(dt, this));
    }
    run() {
        const t = this.k;
        const e = this.cb;
        return null === t ? e() : e(this.c.get(t));
    }
}

const pt = Object.freeze({
    beforeCreate: mt("beforeCreate"),
    hydrating: mt("hydrating"),
    hydrated: mt("hydrated"),
    beforeActivate: mt("beforeActivate"),
    afterActivate: mt("afterActivate"),
    beforeDeactivate: mt("beforeDeactivate"),
    afterDeactivate: mt("afterDeactivate")
});

function mt(t) {
    function e(e, s) {
        if (y(s)) return new $AppTask(t, e, s);
        return new $AppTask(t, null, e);
    }
    return e;
}

function vt(t, e) {
    let s;
    function i(t, e) {
        if (arguments.length > 1) s.property = e;
        h(gt, ChildrenDefinition.create(e, s), t.constructor, e);
        p(t.constructor, wt.keyFrom(e));
    }
    if (arguments.length > 1) {
        s = {};
        i(t, e);
        return;
    } else if (k(t)) {
        s = {};
        return i;
    }
    s = void 0 === t ? {} : t;
    return i;
}

function xt(t) {
    return t.startsWith(gt);
}

const gt = u("children-observer");

const wt = Object.freeze({
    name: gt,
    keyFrom: t => `${gt}:${t}`,
    from(...t) {
        const e = {};
        const s = Array.isArray;
        function i(t) {
            e[t] = ChildrenDefinition.create(t);
        }
        function n(t, s) {
            e[t] = ChildrenDefinition.create(t, s);
        }
        function r(t) {
            if (s(t)) t.forEach(i); else if (t instanceof ChildrenDefinition) e[t.property] = t; else if (void 0 !== t) Object.keys(t).forEach((e => n(e, t)));
        }
        t.forEach(r);
        return e;
    },
    getAll(t) {
        const e = gt.length + 1;
        const i = [];
        const n = s.getPrototypeChain(t);
        let r = n.length;
        let l = 0;
        let h;
        let c;
        let a;
        while (--r >= 0) {
            a = n[r];
            h = m(a).filter(xt);
            c = h.length;
            for (let t = 0; t < c; ++t) i[l++] = o(gt, a, h[t].slice(e));
        }
        return i;
    }
});

const bt = {
    childList: true
};

class ChildrenDefinition {
    constructor(t, e, s, i, n, r) {
        this.callback = t;
        this.property = e;
        this.options = s;
        this.query = i;
        this.filter = n;
        this.map = r;
    }
    static create(t, e = {}) {
        var i;
        return new ChildrenDefinition(s.firstDefined(e.callback, `${t}Changed`), s.firstDefined(e.property, t), null !== (i = e.options) && void 0 !== i ? i : bt, e.query, e.filter, e.map);
    }
}

class ChildrenObserver {
    constructor(t, e, s, i, n = yt, r = kt, o = Ct, l) {
        this.controller = t;
        this.obj = e;
        this.propertyKey = s;
        this.query = n;
        this.filter = r;
        this.map = o;
        this.options = l;
        this.observing = false;
        this.children = void 0;
        this.observer = void 0;
        this.callback = e[i];
        Reflect.defineProperty(this.obj, this.propertyKey, {
            enumerable: true,
            configurable: true,
            get: () => this.getValue(),
            set: () => {}
        });
    }
    getValue() {
        return this.observing ? this.children : this.get();
    }
    setValue(t) {}
    start() {
        var t;
        if (!this.observing) {
            this.observing = true;
            this.children = this.get();
            (null !== (t = this.observer) && void 0 !== t ? t : this.observer = new this.controller.host.ownerDocument.defaultView.MutationObserver((() => {
                this.Z();
            }))).observe(this.controller.host, this.options);
        }
    }
    stop() {
        if (this.observing) {
            this.observing = false;
            this.observer.disconnect();
            this.children = s.emptyArray;
        }
    }
    Z() {
        this.children = this.get();
        if (void 0 !== this.callback) this.callback.call(this.obj);
        this.subs.notify(this.children, void 0, 0);
    }
    get() {
        return Rt(this.controller, this.query, this.filter, this.map);
    }
}

i.subscriberCollection()(ChildrenObserver);

function yt(t) {
    return t.host.childNodes;
}

function kt(t, e, s) {
    return !!s;
}

function Ct(t, e, s) {
    return s;
}

const At = {
    optional: true
};

function Rt(t, e, s, i) {
    var n;
    const r = e(t);
    const o = r.length;
    const l = [];
    let h;
    let c;
    let a;
    let u = 0;
    for (;u < o; ++u) {
        h = r[u];
        c = Zt.for(h, At);
        a = null !== (n = null === c || void 0 === c ? void 0 : c.viewModel) && void 0 !== n ? n : null;
        if (s(h, c, a)) l.push(i(h, c, a));
    }
    return l;
}

function St(t) {
    return function(e) {
        return Dt.define(t, e);
    };
}

function Et(t) {
    return function(e) {
        return Dt.define(k(t) ? {
            isTemplateController: true,
            name: t
        } : {
            isTemplateController: true,
            ...t
        }, e);
    };
}

class CustomAttributeDefinition {
    constructor(t, e, s, i, n, r, o, l, h) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
        this.defaultBindingMode = n;
        this.isTemplateController = r;
        this.bindables = o;
        this.noMultiBindings = l;
        this.watches = h;
    }
    get type() {
        return 2;
    }
    static create(t, e) {
        let n;
        let r;
        if (k(t)) {
            n = t;
            r = {
                name: n
            };
        } else {
            n = t.name;
            r = t;
        }
        return new CustomAttributeDefinition(e, s.firstDefined(Tt(e, "name"), n), s.mergeArrays(Tt(e, "aliases"), r.aliases, e.aliases), Dt.keyFrom(n), s.firstDefined(Tt(e, "defaultBindingMode"), r.defaultBindingMode, e.defaultBindingMode, i.BindingMode.toView), s.firstDefined(Tt(e, "isTemplateController"), r.isTemplateController, e.isTemplateController, false), S.from(e, ...S.getAll(e), Tt(e, "bindables"), e.bindables, r.bindables), s.firstDefined(Tt(e, "noMultiBindings"), r.noMultiBindings, e.noMultiBindings, false), s.mergeArrays(Lt.getAnnotation(e), e.watches));
    }
    register(t) {
        const {Type: e, key: n, aliases: r} = this;
        s.Registration.transient(n, e).register(t);
        s.Registration.aliasTo(n, e).register(t);
        i.registerAliases(r, Dt, n, t);
    }
}

const Bt = f("custom-attribute");

const It = t => `${Bt}:${t}`;

const Tt = (t, e) => o(u(e), t);

const Dt = Object.freeze({
    name: Bt,
    keyFrom: It,
    isType(t) {
        return y(t) && l(Bt, t);
    },
    for(t, e) {
        var s;
        return null !== (s = Ke(t, It(e))) && void 0 !== s ? s : void 0;
    },
    define(t, e) {
        const s = CustomAttributeDefinition.create(t, e);
        h(Bt, s, s.Type);
        h(Bt, s, s);
        d(e, Bt);
        return s.Type;
    },
    getDefinition(t) {
        const e = o(Bt, t);
        if (void 0 === e) throw new Error(`AUR0759:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        h(u(e), s, t);
    },
    getAnnotation: Tt
});

function Pt(t, e) {
    if (!t) throw new Error("AUR0772");
    return function s(i, n, r) {
        const o = null == n;
        const l = o ? i : i.constructor;
        const h = new WatchDefinition(t, o ? e : r.value);
        if (o) {
            if (!y(e) && (null == e || !(e in l.prototype))) throw new Error(`AUR0773:${String(e)}@${l.name}}`);
        } else if (!y(null === r || void 0 === r ? void 0 : r.value)) throw new Error(`AUR0774:${String(n)}`);
        Lt.add(l, h);
        if (Dt.isType(l)) Dt.getDefinition(l).watches.push(h);
        if (Zt.isType(l)) Zt.getDefinition(l).watches.push(h);
    };
}

class WatchDefinition {
    constructor(t, e) {
        this.expression = t;
        this.callback = e;
    }
}

const $t = s.emptyArray;

const Ot = u("watch");

const Lt = Object.freeze({
    name: Ot,
    add(t, e) {
        let s = o(Ot, t);
        if (null == s) h(Ot, s = [], t);
        s.push(e);
    },
    getAnnotation(t) {
        var e;
        return null !== (e = o(Ot, t)) && void 0 !== e ? e : $t;
    }
});

function qt(t) {
    return function(e) {
        return Zt.define(t, e);
    };
}

function Ut(t) {
    if (void 0 === t) return function(t) {
        Kt(t, "shadowOptions", {
            mode: "open"
        });
    };
    if (!y(t)) return function(e) {
        Kt(e, "shadowOptions", t);
    };
    Kt(t, "shadowOptions", {
        mode: "open"
    });
}

function Ft(t) {
    if (void 0 === t) return function(t) {
        Kt(t, "containerless", true);
    };
    Kt(t, "containerless", true);
}

const _t = new WeakMap;

class CustomElementDefinition {
    constructor(t, e, s, i, n, r, o, l, h, c, a, u, f, d, p, m, v, x, g, w, b) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
        this.cache = n;
        this.capture = r;
        this.template = o;
        this.instructions = l;
        this.dependencies = h;
        this.injectable = c;
        this.needsCompile = a;
        this.surrogates = u;
        this.bindables = f;
        this.childrenObservers = d;
        this.containerless = p;
        this.isStrictBinding = m;
        this.shadowOptions = v;
        this.hasSlots = x;
        this.enhance = g;
        this.watches = w;
        this.processContent = b;
    }
    get type() {
        return 1;
    }
    static create(t, e = null) {
        if (null === e) {
            const i = t;
            if (k(i)) throw new Error(`AUR0761:${t}`);
            const n = s.fromDefinitionOrDefault("name", i, Xt);
            if (y(i.Type)) e = i.Type; else e = Zt.generateType(s.pascalCase(n));
            return new CustomElementDefinition(e, n, s.mergeArrays(i.aliases), s.fromDefinitionOrDefault("key", i, (() => Zt.keyFrom(n))), s.fromDefinitionOrDefault("cache", i, Vt), s.fromDefinitionOrDefault("capture", i, Nt), s.fromDefinitionOrDefault("template", i, jt), s.mergeArrays(i.instructions), s.mergeArrays(i.dependencies), s.fromDefinitionOrDefault("injectable", i, jt), s.fromDefinitionOrDefault("needsCompile", i, Wt), s.mergeArrays(i.surrogates), S.from(e, i.bindables), wt.from(i.childrenObservers), s.fromDefinitionOrDefault("containerless", i, Nt), s.fromDefinitionOrDefault("isStrictBinding", i, Nt), s.fromDefinitionOrDefault("shadowOptions", i, jt), s.fromDefinitionOrDefault("hasSlots", i, Nt), s.fromDefinitionOrDefault("enhance", i, Nt), s.fromDefinitionOrDefault("watches", i, Ht), s.fromAnnotationOrTypeOrDefault("processContent", e, jt));
        }
        if (k(t)) return new CustomElementDefinition(e, t, s.mergeArrays(Yt(e, "aliases"), e.aliases), Zt.keyFrom(t), s.fromAnnotationOrTypeOrDefault("cache", e, Vt), s.fromAnnotationOrTypeOrDefault("capture", e, Nt), s.fromAnnotationOrTypeOrDefault("template", e, jt), s.mergeArrays(Yt(e, "instructions"), e.instructions), s.mergeArrays(Yt(e, "dependencies"), e.dependencies), s.fromAnnotationOrTypeOrDefault("injectable", e, jt), s.fromAnnotationOrTypeOrDefault("needsCompile", e, Wt), s.mergeArrays(Yt(e, "surrogates"), e.surrogates), S.from(e, ...S.getAll(e), Yt(e, "bindables"), e.bindables), wt.from(...wt.getAll(e), Yt(e, "childrenObservers"), e.childrenObservers), s.fromAnnotationOrTypeOrDefault("containerless", e, Nt), s.fromAnnotationOrTypeOrDefault("isStrictBinding", e, Nt), s.fromAnnotationOrTypeOrDefault("shadowOptions", e, jt), s.fromAnnotationOrTypeOrDefault("hasSlots", e, Nt), s.fromAnnotationOrTypeOrDefault("enhance", e, Nt), s.mergeArrays(Lt.getAnnotation(e), e.watches), s.fromAnnotationOrTypeOrDefault("processContent", e, jt));
        const i = s.fromDefinitionOrDefault("name", t, Xt);
        return new CustomElementDefinition(e, i, s.mergeArrays(Yt(e, "aliases"), t.aliases, e.aliases), Zt.keyFrom(i), s.fromAnnotationOrDefinitionOrTypeOrDefault("cache", t, e, Vt), s.fromAnnotationOrDefinitionOrTypeOrDefault("capture", t, e, Nt), s.fromAnnotationOrDefinitionOrTypeOrDefault("template", t, e, jt), s.mergeArrays(Yt(e, "instructions"), t.instructions, e.instructions), s.mergeArrays(Yt(e, "dependencies"), t.dependencies, e.dependencies), s.fromAnnotationOrDefinitionOrTypeOrDefault("injectable", t, e, jt), s.fromAnnotationOrDefinitionOrTypeOrDefault("needsCompile", t, e, Wt), s.mergeArrays(Yt(e, "surrogates"), t.surrogates, e.surrogates), S.from(e, ...S.getAll(e), Yt(e, "bindables"), e.bindables, t.bindables), wt.from(...wt.getAll(e), Yt(e, "childrenObservers"), e.childrenObservers, t.childrenObservers), s.fromAnnotationOrDefinitionOrTypeOrDefault("containerless", t, e, Nt), s.fromAnnotationOrDefinitionOrTypeOrDefault("isStrictBinding", t, e, Nt), s.fromAnnotationOrDefinitionOrTypeOrDefault("shadowOptions", t, e, jt), s.fromAnnotationOrDefinitionOrTypeOrDefault("hasSlots", t, e, Nt), s.fromAnnotationOrDefinitionOrTypeOrDefault("enhance", t, e, Nt), s.mergeArrays(t.watches, Lt.getAnnotation(e), e.watches), s.fromAnnotationOrDefinitionOrTypeOrDefault("processContent", t, e, jt));
    }
    static getOrCreate(t) {
        if (t instanceof CustomElementDefinition) return t;
        if (_t.has(t)) return _t.get(t);
        const e = CustomElementDefinition.create(t);
        _t.set(t, e);
        h(zt, e, e.Type);
        return e;
    }
    register(t) {
        const {Type: e, key: n, aliases: r} = this;
        if (!t.has(n, false)) {
            s.Registration.transient(n, e).register(t);
            s.Registration.aliasTo(n, e).register(t);
            i.registerAliases(r, Zt, n, t);
        }
    }
}

const Mt = {
    name: void 0,
    searchParents: false,
    optional: false
};

const Vt = () => 0;

const jt = () => null;

const Nt = () => false;

const Wt = () => true;

const Ht = () => s.emptyArray;

const zt = f("custom-element");

const Gt = t => `${zt}:${t}`;

const Xt = (() => {
    let t = 0;
    return () => `unnamed-${++t}`;
})();

const Kt = (t, e, s) => {
    h(u(e), s, t);
};

const Yt = (t, e) => o(u(e), t);

const Zt = Object.freeze({
    name: zt,
    keyFrom: Gt,
    isType(t) {
        return y(t) && l(zt, t);
    },
    for(t, e = Mt) {
        if (void 0 === e.name && true !== e.searchParents) {
            const s = Ke(t, zt);
            if (null === s) {
                if (true === e.optional) return null;
                throw new Error("AUR0762");
            }
            return s;
        }
        if (void 0 !== e.name) {
            if (true !== e.searchParents) {
                const s = Ke(t, zt);
                if (null === s) throw new Error("AUR0763");
                if (s.is(e.name)) return s;
                return;
            }
            let s = t;
            let i = false;
            while (null !== s) {
                const t = Ke(s, zt);
                if (null !== t) {
                    i = true;
                    if (t.is(e.name)) return t;
                }
                s = es(s);
            }
            if (i) return;
            throw new Error("AUR0764");
        }
        let s = t;
        while (null !== s) {
            const t = Ke(s, zt);
            if (null !== t) return t;
            s = es(s);
        }
        throw new Error("AUR0765");
    },
    define(t, e) {
        const s = CustomElementDefinition.create(t, e);
        h(zt, s, s.Type);
        h(zt, s, s);
        d(s.Type, zt);
        return s.Type;
    },
    getDefinition(t) {
        const e = o(zt, t);
        if (void 0 === e) throw new Error(`AUR0760:${t.name}`);
        return e;
    },
    annotate: Kt,
    getAnnotation: Yt,
    generateName: Xt,
    createInjectable() {
        const t = function(e, i, n) {
            const r = s.DI.getOrCreateAnnotationParamTypes(e);
            r[n] = t;
            return e;
        };
        t.register = function(e) {
            return {
                resolve(e, s) {
                    if (s.has(t, true)) return s.get(t); else return null;
                }
            };
        };
        return t;
    },
    generateType: function() {
        const t = {
            value: "",
            writable: false,
            enumerable: false,
            configurable: true
        };
        const e = {};
        return function(s, i = e) {
            const n = class {};
            t.value = s;
            Reflect.defineProperty(n, "name", t);
            if (i !== e) Object.assign(n.prototype, i);
            return n;
        };
    }()
});

const Jt = u("processContent");

function Qt(t) {
    return void 0 === t ? function(t, e, s) {
        h(Jt, te(t, e), t);
    } : function(e) {
        t = te(e, t);
        const s = o(zt, e);
        if (void 0 !== s) s.processContent = t; else h(Jt, t, e);
        return e;
    };
}

function te(t, e) {
    if (k(e)) e = t[e];
    if (!y(e)) throw new Error(`AUR0766:${typeof e}`);
    return e;
}

class ClassAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.J = {};
        this.tt = 0;
        this.H = false;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.value;
    }
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (256 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.J;
            const s = ee(t);
            let i = this.tt;
            this.ov = t;
            if (s.length > 0) this.et(s);
            this.tt += 1;
            if (0 === i) return;
            i -= 1;
            for (const t in e) {
                if (!Object.prototype.hasOwnProperty.call(e, t) || e[t] !== i) continue;
                this.obj.classList.remove(t);
            }
        }
    }
    et(t) {
        const e = this.obj;
        const s = t.length;
        let i = 0;
        let n;
        for (;i < s; i++) {
            n = t[i];
            if (0 === n.length) continue;
            this.J[n] = this.tt;
            e.classList.add(n);
        }
    }
}

function ee(t) {
    if (k(t)) return se(t);
    if ("object" !== typeof t) return s.emptyArray;
    if (t instanceof Array) {
        const e = t.length;
        if (e > 0) {
            const s = [];
            let i = 0;
            for (;e > i; ++i) s.push(...ee(t[i]));
            return s;
        } else return s.emptyArray;
    }
    const e = [];
    let i;
    for (i in t) if (Boolean(t[i])) if (i.includes(" ")) e.push(...se(i)); else e.push(i);
    return e;
}

function se(t) {
    const e = t.match(/\S+/g);
    if (null === e) return s.emptyArray;
    return e;
}

function ie(...t) {
    return new CSSModulesProcessorRegistry(t);
}

class CSSModulesProcessorRegistry {
    constructor(t) {
        this.modules = t;
    }
    register(t) {
        var e;
        const s = Object.assign({}, ...this.modules);
        const i = Dt.define({
            name: "class",
            bindables: [ "value" ]
        }, (e = class CustomAttributeClass {
            constructor(t) {
                this.element = t;
            }
            binding() {
                this.valueChanged();
            }
            valueChanged() {
                if (!this.value) {
                    this.element.className = "";
                    return;
                }
                this.element.className = ee(this.value).map((t => s[t] || t)).join(" ");
            }
        }, e.inject = [ Ze ], e));
        t.register(i);
    }
}

function ne(...t) {
    return new ShadowDOMRegistry(t);
}

const re = s.DI.createInterface("IShadowDOMStyleFactory", (t => t.cachedCallback((t => {
    if (AdoptedStyleSheetsStyles.supported(t.get(N))) return t.get(AdoptedStyleSheetsStylesFactory);
    return t.get(StyleElementStylesFactory);
}))));

class ShadowDOMRegistry {
    constructor(t) {
        this.css = t;
    }
    register(t) {
        const e = t.get(le);
        const i = t.get(re);
        t.register(s.Registration.instance(oe, i.createStyles(this.css, e)));
    }
}

class AdoptedStyleSheetsStylesFactory {
    constructor(t) {
        this.p = t;
        this.cache = new Map;
    }
    createStyles(t, e) {
        return new AdoptedStyleSheetsStyles(this.p, t, this.cache, e);
    }
}

AdoptedStyleSheetsStylesFactory.inject = [ N ];

class StyleElementStylesFactory {
    constructor(t) {
        this.p = t;
    }
    createStyles(t, e) {
        return new StyleElementStyles(this.p, t, e);
    }
}

StyleElementStylesFactory.inject = [ N ];

const oe = s.DI.createInterface("IShadowDOMStyles");

const le = s.DI.createInterface("IShadowDOMGlobalStyles", (t => t.instance({
    applyTo: s.noop
})));

class AdoptedStyleSheetsStyles {
    constructor(t, e, s, i = null) {
        this.sharedStyles = i;
        this.styleSheets = e.map((e => {
            let i;
            if (e instanceof t.CSSStyleSheet) i = e; else {
                i = s.get(e);
                if (void 0 === i) {
                    i = new t.CSSStyleSheet;
                    i.replaceSync(e);
                    s.set(e, i);
                }
            }
            return i;
        }));
    }
    static supported(t) {
        return "adoptedStyleSheets" in t.ShadowRoot.prototype;
    }
    applyTo(t) {
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
        t.adoptedStyleSheets = [ ...t.adoptedStyleSheets, ...this.styleSheets ];
    }
}

class StyleElementStyles {
    constructor(t, e, s = null) {
        this.p = t;
        this.localStyles = e;
        this.sharedStyles = s;
    }
    applyTo(t) {
        const e = this.localStyles;
        const s = this.p;
        for (let i = e.length - 1; i > -1; --i) {
            const n = s.document.createElement("style");
            n.innerHTML = e[i];
            t.prepend(n);
        }
        if (null !== this.sharedStyles) this.sharedStyles.applyTo(t);
    }
}

const he = {
    shadowDOM(t) {
        return pt.beforeCreate(s.IContainer, (e => {
            if (null != t.sharedStyles) {
                const i = e.get(re);
                e.register(s.Registration.instance(le, i.createStyles(t.sharedStyles, null)));
            }
        }));
    }
};

const {enter: ce, exit: ae} = i.ConnectableSwitcher;

const {wrap: ue, unwrap: fe} = i.ProxyObservable;

class ComputedWatcher {
    constructor(t, e, s, i, n) {
        this.obj = t;
        this.get = s;
        this.cb = i;
        this.useProxy = n;
        this.interceptor = this;
        this.value = void 0;
        this.isBound = false;
        this.running = false;
        this.oL = e;
    }
    handleChange() {
        this.run();
    }
    handleCollectionChange() {
        this.run();
    }
    $bind() {
        if (this.isBound) return;
        this.isBound = true;
        this.compute();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
    }
    run() {
        if (!this.isBound || this.running) return;
        const t = this.obj;
        const e = this.value;
        const s = this.compute();
        if (!Object.is(s, e)) this.cb.call(t, s, e, t);
    }
    compute() {
        this.running = true;
        this.obs.version++;
        try {
            ce(this);
            return this.value = fe(this.get.call(void 0, this.useProxy ? ue(this.obj) : this.obj, this));
        } finally {
            this.obs.clear();
            this.running = false;
            ae(this);
        }
    }
}

class ExpressionWatcher {
    constructor(t, e, s, i, n) {
        this.scope = t;
        this.locator = e;
        this.oL = s;
        this.expression = i;
        this.callback = n;
        this.interceptor = this;
        this.isBound = false;
        this.obj = t.bindingContext;
    }
    handleChange(t) {
        const e = this.expression;
        const s = this.obj;
        const i = this.value;
        const n = 10082 === e.$kind && 1 === this.obs.count;
        if (!n) {
            this.obs.version++;
            t = e.evaluate(0, this.scope, this.locator, this);
            this.obs.clear();
        }
        if (!Object.is(t, i)) {
            this.value = t;
            this.callback.call(s, t, i, s);
        }
    }
    $bind() {
        if (this.isBound) return;
        this.isBound = true;
        this.obs.version++;
        this.value = this.expression.evaluate(0, this.scope, this.locator, this);
        this.obs.clear();
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.obs.clearAll();
        this.value = void 0;
    }
}

i.connectable(ComputedWatcher);

i.connectable(ExpressionWatcher);

const de = s.DI.createInterface("ILifecycleHooks");

class LifecycleHooksEntry {
    constructor(t, e) {
        this.definition = t;
        this.instance = e;
    }
}

class LifecycleHooksDefinition {
    constructor(t, e) {
        this.Type = t;
        this.propertyNames = e;
    }
    static create(t, e) {
        const s = new Set;
        let i = e.prototype;
        while (i !== Object.prototype) {
            for (const t of Object.getOwnPropertyNames(i)) if ("constructor" !== t) s.add(t);
            i = Object.getPrototypeOf(i);
        }
        return new LifecycleHooksDefinition(e, s);
    }
    register(t) {
        s.Registration.singleton(de, this.Type).register(t);
    }
}

const pe = new WeakMap;

const me = u("lifecycle-hooks");

const ve = Object.freeze({
    name: me,
    define(t, e) {
        const s = LifecycleHooksDefinition.create(t, e);
        h(me, s, e);
        d(e, me);
        return s.Type;
    },
    resolve(t) {
        let e = pe.get(t);
        if (void 0 === e) {
            e = new LifecycleHooksLookupImpl;
            const s = t.root;
            const i = s.id === t.id ? t.getAll(de) : t.has(de, false) ? [ ...s.getAll(de), ...t.getAll(de) ] : s.getAll(de);
            let n;
            let r;
            let l;
            let h;
            let c;
            for (n of i) {
                r = o(me, n.constructor);
                l = new LifecycleHooksEntry(r, n);
                for (h of r.propertyNames) {
                    c = e[h];
                    if (void 0 === c) e[h] = [ l ]; else c.push(l);
                }
            }
        }
        return e;
    }
});

class LifecycleHooksLookupImpl {}

function xe() {
    return function t(e) {
        return ve.define({}, e);
    };
}

const ge = s.DI.createInterface("IViewFactory");

class ViewFactory {
    constructor(t, e) {
        this.isCaching = false;
        this.cache = null;
        this.cacheSize = -1;
        this.name = e.name;
        this.container = t;
        this.def = e;
    }
    setCacheSize(t, e) {
        if (t) {
            if ("*" === t) t = ViewFactory.maxCacheSize; else if (k(t)) t = parseInt(t, 10);
            if (-1 === this.cacheSize || !e) this.cacheSize = t;
        }
        if (this.cacheSize > 0) this.cache = []; else this.cache = null;
        this.isCaching = this.cacheSize > 0;
    }
    canReturnToCache(t) {
        return null != this.cache && this.cache.length < this.cacheSize;
    }
    tryReturnToCache(t) {
        if (this.canReturnToCache(t)) {
            this.cache.push(t);
            return true;
        }
        return false;
    }
    create(t) {
        const e = this.cache;
        let s;
        if (null != e && e.length > 0) {
            s = e.pop();
            return s;
        }
        s = Controller.$view(this, t);
        return s;
    }
}

ViewFactory.maxCacheSize = 65535;

const we = new WeakSet;

function be(t) {
    return !we.has(t);
}

function ye(t) {
    we.add(t);
    return CustomElementDefinition.create(t);
}

const ke = f("views");

const Ce = Object.freeze({
    name: ke,
    has(t) {
        return y(t) && (l(ke, t) || "$views" in t);
    },
    get(t) {
        if (y(t) && "$views" in t) {
            const e = t.$views;
            const s = e.filter(be).map(ye);
            for (const e of s) Ce.add(t, e);
        }
        let e = o(ke, t);
        if (void 0 === e) h(ke, e = [], t);
        return e;
    },
    add(t, e) {
        const s = CustomElementDefinition.create(e);
        let i = o(ke, t);
        if (void 0 === i) h(ke, i = [ s ], t); else i.push(s);
        return i;
    }
});

function Ae(t) {
    return function(e) {
        Ce.add(e, t);
    };
}

const Re = s.DI.createInterface("IViewLocator", (t => t.singleton(ViewLocator)));

class ViewLocator {
    constructor() {
        this.st = new WeakMap;
        this.it = new Map;
    }
    getViewComponentForObject(t, e) {
        if (t) {
            const s = Ce.has(t.constructor) ? Ce.get(t.constructor) : [];
            const i = y(e) ? e(t, s) : this.nt(s, e);
            return this.rt(t, s, i);
        }
        return null;
    }
    rt(t, e, s) {
        let i = this.st.get(t);
        let n;
        if (void 0 === i) {
            i = {};
            this.st.set(t, i);
        } else n = i[s];
        if (void 0 === n) {
            const r = this.ot(t, e, s);
            n = Zt.define(Zt.getDefinition(r), class extends r {
                constructor() {
                    super(t);
                }
            });
            i[s] = n;
        }
        return n;
    }
    ot(t, e, s) {
        let n = this.it.get(t.constructor);
        let r;
        if (void 0 === n) {
            n = {};
            this.it.set(t.constructor, n);
        } else r = n[s];
        if (void 0 === r) {
            r = Zt.define(this.lt(e, s), class {
                constructor(t) {
                    this.viewModel = t;
                }
                define(t, e, s) {
                    const n = this.viewModel;
                    t.scope = i.Scope.fromParent(t.scope, n);
                    if (void 0 !== n.define) return n.define(t, e, s);
                }
            });
            const o = r.prototype;
            if ("hydrating" in t) o.hydrating = function t(e) {
                this.viewModel.hydrating(e);
            };
            if ("hydrated" in t) o.hydrated = function t(e) {
                this.viewModel.hydrated(e);
            };
            if ("created" in t) o.created = function t(e) {
                this.viewModel.created(e);
            };
            if ("binding" in t) o.binding = function t(e, s, i) {
                return this.viewModel.binding(e, s, i);
            };
            if ("bound" in t) o.bound = function t(e, s, i) {
                return this.viewModel.bound(e, s, i);
            };
            if ("attaching" in t) o.attaching = function t(e, s, i) {
                return this.viewModel.attaching(e, s, i);
            };
            if ("attached" in t) o.attached = function t(e, s) {
                return this.viewModel.attached(e, s);
            };
            if ("detaching" in t) o.detaching = function t(e, s, i) {
                return this.viewModel.detaching(e, s, i);
            };
            if ("unbinding" in t) o.unbinding = function t(e, s, i) {
                return this.viewModel.unbinding(e, s, i);
            };
            if ("dispose" in t) o.dispose = function t() {
                this.viewModel.dispose();
            };
            n[s] = r;
        }
        return r;
    }
    nt(t, e) {
        if (e) return e;
        if (1 === t.length) return t[0].name;
        return "default-view";
    }
    lt(t, e) {
        const s = t.find((t => t.name === e));
        if (void 0 === s) throw new Error(`Could not find view: ${e}`);
        return s;
    }
}

const Se = s.DI.createInterface("IRendering", (t => t.singleton(Rendering)));

class Rendering {
    constructor(t) {
        this.ht = new WeakMap;
        this.ct = new WeakMap;
        this.at = (this.ut = t.root).get(N);
        this.ft = new FragmentNodeSequence(this.at, this.at.document.createDocumentFragment());
    }
    get renderers() {
        return null == this.rs ? this.rs = this.ut.getAll(vs, false).reduce(((t, e) => {
            t[e.instructionType] = e;
            return t;
        }), v()) : this.rs;
    }
    compile(t, e, s) {
        if (false !== t.needsCompile) {
            const i = this.ht;
            const n = e.get(ms);
            let r = i.get(t);
            if (null == r) i.set(t, r = n.compile(t, e, s)); else e.register(...r.dependencies);
            return r;
        }
        return t;
    }
    getViewFactory(t, e) {
        return new ViewFactory(e, CustomElementDefinition.getOrCreate(t));
    }
    createNodes(t) {
        if (true === t.enhance) return new FragmentNodeSequence(this.at, t.template);
        let e;
        const s = this.ct;
        if (s.has(t)) e = s.get(t); else {
            const i = this.at;
            const n = i.document;
            const r = t.template;
            let o;
            if (null === r) e = null; else if (r instanceof i.Node) if ("TEMPLATE" === r.nodeName) e = n.adoptNode(r.content); else (e = n.adoptNode(n.createDocumentFragment())).appendChild(r.cloneNode(true)); else {
                o = n.createElement("template");
                if (k(r)) o.innerHTML = r;
                n.adoptNode(e = o.content);
            }
            s.set(t, e);
        }
        return null == e ? this.ft : new FragmentNodeSequence(this.at, e.cloneNode(true));
    }
    render(t, e, s, i) {
        const n = s.instructions;
        const r = this.renderers;
        const o = e.length;
        if (e.length !== n.length) throw new Error(`AUR0757:${o}<>${n.length}`);
        let l = 0;
        let h = 0;
        let c = 0;
        let a;
        let u;
        let f;
        if (o > 0) while (o > l) {
            a = n[l];
            f = e[l];
            h = 0;
            c = a.length;
            while (c > h) {
                u = a[h];
                r[u.type].render(t, f, u);
                ++h;
            }
            ++l;
        }
        if (void 0 !== i && null !== i) {
            a = s.surrogates;
            if ((c = a.length) > 0) {
                h = 0;
                while (c > h) {
                    u = a[h];
                    r[u.type].render(t, i, u);
                    ++h;
                }
            }
        }
    }
}

Rendering.inject = [ s.IContainer ];

var Ee;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["host"] = 1] = "host";
    t[t["shadowRoot"] = 2] = "shadowRoot";
    t[t["location"] = 3] = "location";
})(Ee || (Ee = {}));

const Be = {
    optional: true
};

const Ie = new WeakMap;

class Controller {
    constructor(t, e, i, n, r, o) {
        this.container = t;
        this.vmKind = e;
        this.definition = i;
        this.viewFactory = n;
        this.viewModel = r;
        this.host = o;
        this.id = s.nextId("au$component");
        this.head = null;
        this.tail = null;
        this.next = null;
        this.parent = null;
        this.bindings = null;
        this.children = null;
        this.hasLockedScope = false;
        this.isStrictBinding = false;
        this.scope = null;
        this.isBound = false;
        this.hostController = null;
        this.mountTarget = 0;
        this.shadowRoot = null;
        this.nodes = null;
        this.location = null;
        this.lifecycleHooks = null;
        this.state = 0;
        this.dt = false;
        this.vt = s.emptyArray;
        this.flags = 0;
        this.$initiator = null;
        this.$flags = 0;
        this.$resolve = void 0;
        this.$reject = void 0;
        this.$promise = void 0;
        this.xt = 0;
        this.gt = 0;
        this.wt = 0;
        this.r = t.root.get(Se);
        switch (e) {
          case 1:
          case 0:
            this.hooks = new HooksDefinition(r);
            break;

          case 2:
            this.hooks = HooksDefinition.none;
            break;
        }
    }
    get isActive() {
        return (this.state & (1 | 2)) > 0 && 0 === (4 & this.state);
    }
    get name() {
        var t;
        if (null === this.parent) switch (this.vmKind) {
          case 1:
            return `[${this.definition.name}]`;

          case 0:
            return this.definition.name;

          case 2:
            return this.viewFactory.name;
        }
        switch (this.vmKind) {
          case 1:
            return `${this.parent.name}>[${this.definition.name}]`;

          case 0:
            return `${this.parent.name}>${this.definition.name}`;

          case 2:
            return this.viewFactory.name === (null === (t = this.parent.definition) || void 0 === t ? void 0 : t.name) ? `${this.parent.name}[view]` : `${this.parent.name}[view:${this.viewFactory.name}]`;
        }
    }
    static getCached(t) {
        return Ie.get(t);
    }
    static getCachedOrThrow(t) {
        const e = Controller.getCached(t);
        if (void 0 === e) throw new Error(`AUR0500:${t}`);
        return e;
    }
    static $el(t, e, i, n, r = void 0) {
        if (Ie.has(e)) return Ie.get(e);
        r = null !== r && void 0 !== r ? r : Zt.getDefinition(e.constructor);
        const o = new Controller(t, 0, r, null, e, i);
        const l = t.get(s.optional(je));
        if (r.dependencies.length > 0) t.register(...r.dependencies);
        t.registerResolver(je, new s.InstanceProvider("IHydrationContext", new HydrationContext(o, n, l)));
        Ie.set(e, o);
        if (null == n || false !== n.hydrate) o.bt(n, l);
        return o;
    }
    static $attr(t, e, s, i) {
        if (Ie.has(e)) return Ie.get(e);
        i = null !== i && void 0 !== i ? i : Dt.getDefinition(e.constructor);
        const n = new Controller(t, 1, i, null, e, s);
        Ie.set(e, n);
        n.yt();
        return n;
    }
    static $view(t, e = void 0) {
        const s = new Controller(t.container, 2, null, t, null, null);
        s.parent = null !== e && void 0 !== e ? e : null;
        s.kt();
        return s;
    }
    bt(t, e) {
        const n = this.container;
        const r = this.flags;
        const o = this.viewModel;
        let l = this.definition;
        this.scope = i.Scope.create(o, null, true);
        if (l.watches.length > 0) Le(this, n, l, o);
        De(this, l, r, o);
        this.vt = Pe(this, l, o);
        if (this.hooks.hasDefine) {
            const t = o.define(this, e, l);
            if (void 0 !== t && t !== l) l = CustomElementDefinition.getOrCreate(t);
        }
        this.lifecycleHooks = ve.resolve(n);
        l.register(n);
        if (null !== l.injectable) n.registerResolver(l.injectable, new s.InstanceProvider("definition.injectable", o));
        if (null == t || false !== t.hydrate) {
            this.Ct(t);
            this.At();
        }
    }
    Ct(t) {
        if (this.hooks.hasHydrating) this.viewModel.hydrating(this);
        const e = this.Rt = this.r.compile(this.definition, this.container, t);
        const {shadowOptions: s, isStrictBinding: i, hasSlots: n, containerless: r} = e;
        this.isStrictBinding = i;
        if (null !== (this.hostController = Zt.for(this.host, Be))) this.host = this.container.root.get(N).document.createElement(this.definition.name);
        Ye(this.host, Zt.name, this);
        Ye(this.host, this.definition.key, this);
        if (null !== s || n) {
            if (r) throw new Error("AUR0501");
            Ye(this.shadowRoot = this.host.attachShadow(null !== s && void 0 !== s ? s : Fe), Zt.name, this);
            Ye(this.shadowRoot, this.definition.key, this);
            this.mountTarget = 2;
        } else if (r) {
            Ye(this.location = is(this.host), Zt.name, this);
            Ye(this.location, this.definition.key, this);
            this.mountTarget = 3;
        } else this.mountTarget = 1;
        this.viewModel.$controller = this;
        this.nodes = this.r.createNodes(e);
        if (this.hooks.hasHydrated) this.viewModel.hydrated(this);
    }
    At() {
        this.r.render(this, this.nodes.findTargets(), this.Rt, this.host);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    yt() {
        const t = this.definition;
        const e = this.viewModel;
        if (t.watches.length > 0) Le(this, this.container, t, e);
        De(this, t, this.flags, e);
        e.$controller = this;
        this.lifecycleHooks = ve.resolve(this.container);
        if (this.hooks.hasCreated) this.viewModel.created(this);
    }
    kt() {
        this.Rt = this.r.compile(this.viewFactory.def, this.container, null);
        this.isStrictBinding = this.Rt.isStrictBinding;
        this.r.render(this, (this.nodes = this.r.createNodes(this.Rt)).findTargets(), this.Rt, void 0);
    }
    activate(t, e, s, i) {
        switch (this.state) {
          case 0:
          case 8:
            if (!(null === e || e.isActive)) return;
            this.state = 1;
            break;

          case 2:
            return;

          case 32:
            throw new Error(`AUR0502:${this.name}`);

          default:
            throw new Error(`AUR0503:${this.name} ${Me(this.state)}`);
        }
        this.parent = e;
        s |= 2;
        switch (this.vmKind) {
          case 0:
            this.scope.parentScope = null !== i && void 0 !== i ? i : null;
            break;

          case 1:
            this.scope = null !== i && void 0 !== i ? i : null;
            break;

          case 2:
            if (void 0 === i || null === i) throw new Error("AUR0504");
            if (!this.hasLockedScope) this.scope = i;
            break;
        }
        if (this.isStrictBinding) s |= 1;
        this.$initiator = t;
        this.$flags = s;
        this.St();
        if (this.hooks.hasBinding) {
            const t = this.viewModel.binding(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Et();
                t.then((() => {
                    this.bind();
                })).catch((t => {
                    this.Bt(t);
                }));
                return this.$promise;
            }
        }
        this.bind();
        return this.$promise;
    }
    bind() {
        let t = 0;
        let e = this.vt.length;
        let s;
        if (e > 0) while (e > t) {
            this.vt[t].start();
            ++t;
        }
        if (null !== this.bindings) {
            t = 0;
            e = this.bindings.length;
            while (e > t) {
                this.bindings[t].$bind(this.$flags, this.scope);
                ++t;
            }
        }
        if (this.hooks.hasBound) {
            s = this.viewModel.bound(this.$initiator, this.parent, this.$flags);
            if (s instanceof Promise) {
                this.Et();
                s.then((() => {
                    this.isBound = true;
                    this.It();
                })).catch((t => {
                    this.Bt(t);
                }));
                return;
            }
        }
        this.isBound = true;
        this.It();
    }
    Tt(...t) {
        switch (this.mountTarget) {
          case 1:
            this.host.append(...t);
            break;

          case 2:
            this.shadowRoot.append(...t);
            break;

          case 3:
            {
                let e = 0;
                for (;e < t.length; ++e) this.location.parentNode.insertBefore(t[e], this.location);
                break;
            }
        }
    }
    It() {
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.hostController.Tt(this.host);
            break;

          case 3:
            this.hostController.Tt(this.location.$start, this.location);
            break;
        }
        switch (this.mountTarget) {
          case 1:
            this.nodes.appendTo(this.host, null != this.definition && this.definition.enhance);
            break;

          case 2:
            {
                const t = this.container;
                const e = t.has(oe, false) ? t.get(oe) : t.get(le);
                e.applyTo(this.shadowRoot);
                this.nodes.appendTo(this.shadowRoot);
                break;
            }

          case 3:
            this.nodes.insertBefore(this.location);
            break;
        }
        if (this.hooks.hasAttaching) {
            const t = this.viewModel.attaching(this.$initiator, this.parent, this.$flags);
            if (t instanceof Promise) {
                this.Et();
                this.St();
                t.then((() => {
                    this.Dt();
                })).catch((t => {
                    this.Bt(t);
                }));
            }
        }
        if (null !== this.children) {
            let t = 0;
            for (;t < this.children.length; ++t) void this.children[t].activate(this.$initiator, this, this.$flags, this.scope);
        }
        this.Dt();
    }
    deactivate(t, e, s) {
        switch (~16 & this.state) {
          case 2:
            this.state = 4;
            break;

          case 0:
          case 8:
          case 32:
          case 8 | 32:
            return;

          default:
            throw new Error(`AUR0505:${this.name} ${Me(this.state)}`);
        }
        this.$initiator = t;
        this.$flags = s;
        if (t === this) this.Pt();
        let i = 0;
        if (this.vt.length) for (;i < this.vt.length; ++i) this.vt[i].stop();
        if (null !== this.children) for (i = 0; i < this.children.length; ++i) void this.children[i].deactivate(t, this, s);
        if (this.hooks.hasDetaching) {
            const e = this.viewModel.detaching(this.$initiator, this.parent, this.$flags);
            if (e instanceof Promise) {
                this.Et();
                t.Pt();
                e.then((() => {
                    t.$t();
                })).catch((e => {
                    t.Bt(e);
                }));
            }
        }
        if (null === t.head) t.head = this; else t.tail.next = this;
        t.tail = this;
        if (t !== this) return;
        this.$t();
        return this.$promise;
    }
    removeNodes() {
        switch (this.vmKind) {
          case 0:
          case 2:
            this.nodes.remove();
            this.nodes.unlink();
        }
        if (null !== this.hostController) switch (this.mountTarget) {
          case 1:
          case 2:
            this.host.remove();
            break;

          case 3:
            this.location.$start.remove();
            this.location.remove();
            break;
        }
    }
    unbind() {
        const t = 4 | this.$flags;
        let e = 0;
        if (null !== this.bindings) for (;e < this.bindings.length; ++e) this.bindings[e].$unbind(t);
        this.parent = null;
        switch (this.vmKind) {
          case 1:
            this.scope = null;
            break;

          case 2:
            if (!this.hasLockedScope) this.scope = null;
            if (16 === (16 & this.state) && !this.viewFactory.tryReturnToCache(this) && this.$initiator === this) this.dispose();
            break;

          case 0:
            this.scope.parentScope = null;
            break;
        }
        if (32 === (32 & t) && this.$initiator === this) this.dispose();
        this.state = 32 & this.state | 8;
        this.$initiator = null;
        this.Ot();
    }
    Et() {
        if (void 0 === this.$promise) {
            this.$promise = new Promise(((t, e) => {
                this.$resolve = t;
                this.$reject = e;
            }));
            if (this.$initiator !== this) this.parent.Et();
        }
    }
    Ot() {
        if (void 0 !== this.$promise) {
            We = this.$resolve;
            this.$resolve = this.$reject = this.$promise = void 0;
            We();
            We = void 0;
        }
    }
    Bt(t) {
        if (void 0 !== this.$promise) {
            He = this.$reject;
            this.$resolve = this.$reject = this.$promise = void 0;
            He(t);
            He = void 0;
        }
        if (this.$initiator !== this) this.parent.Bt(t);
    }
    St() {
        ++this.xt;
        if (this.$initiator !== this) this.parent.St();
    }
    Dt() {
        if (0 === --this.xt) {
            if (this.hooks.hasAttached) {
                ze = this.viewModel.attached(this.$initiator, this.$flags);
                if (ze instanceof Promise) {
                    this.Et();
                    ze.then((() => {
                        this.state = 2;
                        this.Ot();
                        if (this.$initiator !== this) this.parent.Dt();
                    })).catch((t => {
                        this.Bt(t);
                    }));
                    ze = void 0;
                    return;
                }
                ze = void 0;
            }
            this.state = 2;
            this.Ot();
        }
        if (this.$initiator !== this) this.parent.Dt();
    }
    Pt() {
        ++this.gt;
    }
    $t() {
        if (0 === --this.gt) {
            this.Lt();
            this.removeNodes();
            let t = this.$initiator.head;
            while (null !== t) {
                if (t !== this) {
                    if (t.debug) t.logger.trace(`detach()`);
                    t.removeNodes();
                }
                if (t.hooks.hasUnbinding) {
                    if (t.debug) t.logger.trace("unbinding()");
                    ze = t.viewModel.unbinding(t.$initiator, t.parent, t.$flags);
                    if (ze instanceof Promise) {
                        this.Et();
                        this.Lt();
                        ze.then((() => {
                            this.qt();
                        })).catch((t => {
                            this.Bt(t);
                        }));
                    }
                    ze = void 0;
                }
                t = t.next;
            }
            this.qt();
        }
    }
    Lt() {
        ++this.wt;
    }
    qt() {
        if (0 === --this.wt) {
            let t = this.$initiator.head;
            let e = null;
            while (null !== t) {
                if (t !== this) {
                    t.isBound = false;
                    t.unbind();
                }
                e = t.next;
                t.next = null;
                t = e;
            }
            this.head = this.tail = null;
            this.isBound = false;
            this.unbind();
        }
    }
    addBinding(t) {
        if (null === this.bindings) this.bindings = [ t ]; else this.bindings[this.bindings.length] = t;
    }
    addChild(t) {
        if (null === this.children) this.children = [ t ]; else this.children[this.children.length] = t;
    }
    is(t) {
        switch (this.vmKind) {
          case 1:
            return Dt.getDefinition(this.viewModel.constructor).name === t;

          case 0:
            return Zt.getDefinition(this.viewModel.constructor).name === t;

          case 2:
            return this.viewFactory.name === t;
        }
    }
    lockScope(t) {
        this.scope = t;
        this.hasLockedScope = true;
    }
    setHost(t) {
        if (0 === this.vmKind) {
            Ye(t, Zt.name, this);
            Ye(t, this.definition.key, this);
        }
        this.host = t;
        this.mountTarget = 1;
        return this;
    }
    setShadowRoot(t) {
        if (0 === this.vmKind) {
            Ye(t, Zt.name, this);
            Ye(t, this.definition.key, this);
        }
        this.shadowRoot = t;
        this.mountTarget = 2;
        return this;
    }
    setLocation(t) {
        if (0 === this.vmKind) {
            Ye(t, Zt.name, this);
            Ye(t, this.definition.key, this);
        }
        this.location = t;
        this.mountTarget = 3;
        return this;
    }
    release() {
        this.state |= 16;
    }
    dispose() {
        if (32 === (32 & this.state)) return;
        this.state |= 32;
        if (this.hooks.hasDispose) this.viewModel.dispose();
        if (null !== this.children) {
            this.children.forEach(Ne);
            this.children = null;
        }
        this.hostController = null;
        this.scope = null;
        this.nodes = null;
        this.location = null;
        this.viewFactory = null;
        if (null !== this.viewModel) {
            Ie.delete(this.viewModel);
            this.viewModel = null;
        }
        this.viewModel = null;
        this.host = null;
        this.shadowRoot = null;
        this.container.disposeResolvers();
    }
    accept(t) {
        if (true === t(this)) return true;
        if (this.hooks.hasAccept && true === this.viewModel.accept(t)) return true;
        if (null !== this.children) {
            const {children: e} = this;
            for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
        }
    }
}

function Te(t) {
    let e = t.$observers;
    if (void 0 === e) Reflect.defineProperty(t, "$observers", {
        enumerable: false,
        value: e = {}
    });
    return e;
}

function De(t, e, s, n) {
    const r = e.bindables;
    const o = Object.getOwnPropertyNames(r);
    const l = o.length;
    if (l > 0) {
        let e;
        let s;
        let h = 0;
        const c = Te(n);
        const a = t.container;
        const u = a.has(i.ICoercionConfiguration, true) ? a.get(i.ICoercionConfiguration) : null;
        for (;h < l; ++h) {
            e = o[h];
            if (void 0 === c[e]) {
                s = r[e];
                c[e] = new BindableObserver(n, e, s.callback, s.set, t, u);
            }
        }
    }
}

function Pe(t, e, i) {
    const n = e.childrenObservers;
    const r = Object.getOwnPropertyNames(n);
    const o = r.length;
    if (o > 0) {
        const e = Te(i);
        const s = [];
        let l;
        let h = 0;
        let c;
        for (;h < o; ++h) {
            l = r[h];
            if (void 0 == e[l]) {
                c = n[l];
                s[s.length] = e[l] = new ChildrenObserver(t, i, l, c.callback, c.query, c.filter, c.map, c.options);
            }
        }
        return s;
    }
    return s.emptyArray;
}

const $e = new Map;

const Oe = t => {
    let e = $e.get(t);
    if (null == e) {
        e = new i.AccessScopeExpression(t, 0);
        $e.set(t, e);
    }
    return e;
};

function Le(t, e, s, n) {
    const r = e.get(i.IObserverLocator);
    const o = e.get(i.IExpressionParser);
    const l = s.watches;
    const h = 0 === t.vmKind ? t.scope : i.Scope.create(n, null, true);
    const c = l.length;
    let a;
    let u;
    let f;
    let d = 0;
    for (;c > d; ++d) {
        ({expression: a, callback: u} = l[d]);
        u = y(u) ? u : Reflect.get(n, u);
        if (!y(u)) throw new Error(`AUR0506:${String(u)}`);
        if (y(a)) t.addBinding(new ComputedWatcher(n, r, a, u, true)); else {
            f = k(a) ? o.parse(a, 8) : Oe(a);
            t.addBinding(new ExpressionWatcher(h, e, r, f, u));
        }
    }
}

function qe(t) {
    return t instanceof Controller && 0 === t.vmKind;
}

function Ue(t) {
    return s.isObject(t) && Zt.isType(t.constructor);
}

class HooksDefinition {
    constructor(t) {
        this.hasDefine = "define" in t;
        this.hasHydrating = "hydrating" in t;
        this.hasHydrated = "hydrated" in t;
        this.hasCreated = "created" in t;
        this.hasBinding = "binding" in t;
        this.hasBound = "bound" in t;
        this.hasAttaching = "attaching" in t;
        this.hasAttached = "attached" in t;
        this.hasDetaching = "detaching" in t;
        this.hasUnbinding = "unbinding" in t;
        this.hasDispose = "dispose" in t;
        this.hasAccept = "accept" in t;
    }
}

HooksDefinition.none = new HooksDefinition({});

const Fe = {
    mode: "open"
};

exports.ViewModelKind = void 0;

(function(t) {
    t[t["customElement"] = 0] = "customElement";
    t[t["customAttribute"] = 1] = "customAttribute";
    t[t["synthetic"] = 2] = "synthetic";
})(exports.ViewModelKind || (exports.ViewModelKind = {}));

var _e;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["activating"] = 1] = "activating";
    t[t["activated"] = 2] = "activated";
    t[t["deactivating"] = 4] = "deactivating";
    t[t["deactivated"] = 8] = "deactivated";
    t[t["released"] = 16] = "released";
    t[t["disposed"] = 32] = "disposed";
})(_e || (_e = {}));

function Me(t) {
    const e = [];
    if (1 === (1 & t)) e.push("activating");
    if (2 === (2 & t)) e.push("activated");
    if (4 === (4 & t)) e.push("deactivating");
    if (8 === (8 & t)) e.push("deactivated");
    if (16 === (16 & t)) e.push("released");
    if (32 === (32 & t)) e.push("disposed");
    return 0 === e.length ? "none" : e.join("|");
}

const Ve = s.DI.createInterface("IController");

const je = s.DI.createInterface("IHydrationContext");

class HydrationContext {
    constructor(t, e, s) {
        this.instruction = e;
        this.parent = s;
        this.controller = t;
    }
}

function Ne(t) {
    t.dispose();
}

let We;

let He;

let ze;

const Ge = s.DI.createInterface("IAppRoot");

const Xe = s.DI.createInterface("IWorkTracker", (t => t.singleton(WorkTracker)));

class WorkTracker {
    constructor(t) {
        this.Ut = 0;
        this.Ft = null;
        this.Ot = null;
        this._t = t.scopeTo("WorkTracker");
    }
    start() {
        this._t.trace(`start(stack:${this.Ut})`);
        ++this.Ut;
    }
    finish() {
        this._t.trace(`finish(stack:${this.Ut})`);
        if (0 === --this.Ut) {
            const t = this.Ot;
            if (null !== t) {
                this.Ot = this.Ft = null;
                t();
            }
        }
    }
    wait() {
        this._t.trace(`wait(stack:${this.Ut})`);
        if (null === this.Ft) {
            if (0 === this.Ut) return Promise.resolve();
            this.Ft = new Promise((t => {
                this.Ot = t;
            }));
        }
        return this.Ft;
    }
}

WorkTracker.inject = [ s.ILogger ];

class AppRoot {
    constructor(t, e, i, n) {
        this.config = t;
        this.platform = e;
        this.container = i;
        this.controller = void 0;
        this.Mt = void 0;
        this.host = t.host;
        this.work = i.get(Xe);
        n.prepare(this);
        i.registerResolver(e.HTMLElement, i.registerResolver(e.Element, i.registerResolver(Ze, new s.InstanceProvider("ElementResolver", t.host))));
        this.Mt = s.onResolve(this.Vt("beforeCreate"), (() => {
            const e = t.component;
            const n = i.createChild();
            let r;
            if (Zt.isType(e)) r = this.container.get(e); else r = t.component;
            const o = {
                hydrate: false,
                projections: null
            };
            const l = this.controller = Controller.$el(n, r, this.host, o);
            l.bt(o, null);
            return s.onResolve(this.Vt("hydrating"), (() => {
                l.Ct(null);
                return s.onResolve(this.Vt("hydrated"), (() => {
                    l.At();
                    this.Mt = void 0;
                }));
            }));
        }));
    }
    activate() {
        return s.onResolve(this.Mt, (() => s.onResolve(this.Vt("beforeActivate"), (() => s.onResolve(this.controller.activate(this.controller, null, 2, void 0), (() => this.Vt("afterActivate")))))));
    }
    deactivate() {
        return s.onResolve(this.Vt("beforeDeactivate"), (() => s.onResolve(this.controller.deactivate(this.controller, null, 0), (() => this.Vt("afterDeactivate")))));
    }
    Vt(t) {
        return s.resolveAll(...this.container.getAll(dt).reduce(((e, s) => {
            if (s.slot === t) e.push(s.run());
            return e;
        }), []));
    }
    dispose() {
        var t;
        null === (t = this.controller) || void 0 === t ? void 0 : t.dispose();
    }
}

class Refs {}

function Ke(t, e) {
    var s, i;
    return null !== (i = null === (s = t.$au) || void 0 === s ? void 0 : s[e]) && void 0 !== i ? i : null;
}

function Ye(t, e, s) {
    var i;
    var n;
    (null !== (i = (n = t).$au) && void 0 !== i ? i : n.$au = new Refs)[e] = s;
}

const Ze = s.DI.createInterface("INode");

const Je = s.DI.createInterface("IEventTarget", (t => t.cachedCallback((t => {
    if (t.has(Ge, true)) return t.get(Ge).host;
    return t.get(N).document;
}))));

const Qe = s.DI.createInterface("IRenderLocation");

exports.NodeType = void 0;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attr"] = 2] = "Attr";
    t[t["Text"] = 3] = "Text";
    t[t["CDATASection"] = 4] = "CDATASection";
    t[t["EntityReference"] = 5] = "EntityReference";
    t[t["Entity"] = 6] = "Entity";
    t[t["ProcessingInstruction"] = 7] = "ProcessingInstruction";
    t[t["Comment"] = 8] = "Comment";
    t[t["Document"] = 9] = "Document";
    t[t["DocumentType"] = 10] = "DocumentType";
    t[t["DocumentFragment"] = 11] = "DocumentFragment";
    t[t["Notation"] = 12] = "Notation";
})(exports.NodeType || (exports.NodeType = {}));

const ts = new WeakMap;

function es(t) {
    if (ts.has(t)) return ts.get(t);
    let e = 0;
    let s = t.nextSibling;
    while (null !== s) {
        if (8 === s.nodeType) switch (s.textContent) {
          case "au-start":
            ++e;
            break;

          case "au-end":
            if (0 === e--) return s;
        }
        s = s.nextSibling;
    }
    if (null === t.parentNode && 11 === t.nodeType) {
        const e = Zt.for(t);
        if (void 0 === e) return null;
        if (2 === e.mountTarget) return es(e.host);
    }
    return t.parentNode;
}

function ss(t, e) {
    if (void 0 !== t.platform && !(t instanceof t.platform.Node)) {
        const s = t.childNodes;
        for (let t = 0, i = s.length; t < i; ++t) ts.set(s[t], e);
    } else ts.set(t, e);
}

function is(t) {
    if (ns(t)) return t;
    const e = t.ownerDocument.createComment("au-end");
    const s = t.ownerDocument.createComment("au-start");
    if (null !== t.parentNode) {
        t.parentNode.replaceChild(e, t);
        e.parentNode.insertBefore(s, e);
    }
    e.$start = s;
    return e;
}

function ns(t) {
    return "au-end" === t.textContent;
}

class FragmentNodeSequence {
    constructor(t, e) {
        this.platform = t;
        this.fragment = e;
        this.isMounted = false;
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
        const s = e.querySelectorAll(".au");
        let i = 0;
        let n = s.length;
        let r;
        let o = this.targets = Array(n);
        while (n > i) {
            r = s[i];
            if ("AU-M" === r.nodeName) o[i] = is(r); else o[i] = r;
            ++i;
        }
        const l = e.childNodes;
        const h = this.childNodes = Array(n = l.length);
        i = 0;
        while (n > i) {
            h[i] = l[i];
            ++i;
        }
        this.firstChild = e.firstChild;
        this.lastChild = e.lastChild;
    }
    findTargets() {
        return this.targets;
    }
    insertBefore(t) {
        if (this.isLinked && !!this.refNode) this.addToLinked(); else {
            const e = t.parentNode;
            if (this.isMounted) {
                let s = this.firstChild;
                let i;
                const n = this.lastChild;
                while (null != s) {
                    i = s.nextSibling;
                    e.insertBefore(s, t);
                    if (s === n) break;
                    s = i;
                }
            } else {
                this.isMounted = true;
                t.parentNode.insertBefore(this.fragment, t);
            }
        }
    }
    appendTo(t, e = false) {
        if (this.isMounted) {
            let e = this.firstChild;
            let s;
            const i = this.lastChild;
            while (null != e) {
                s = e.nextSibling;
                t.appendChild(e);
                if (e === i) break;
                e = s;
            }
        } else {
            this.isMounted = true;
            if (!e) t.appendChild(this.fragment);
        }
    }
    remove() {
        if (this.isMounted) {
            this.isMounted = false;
            const t = this.fragment;
            const e = this.lastChild;
            let s;
            let i = this.firstChild;
            while (null !== i) {
                s = i.nextSibling;
                t.appendChild(i);
                if (i === e) break;
                i = s;
            }
        }
    }
    addToLinked() {
        const t = this.refNode;
        const e = t.parentNode;
        if (this.isMounted) {
            let s = this.firstChild;
            let i;
            const n = this.lastChild;
            while (null != s) {
                i = s.nextSibling;
                e.insertBefore(s, t);
                if (s === n) break;
                s = i;
            }
        } else {
            this.isMounted = true;
            e.insertBefore(this.fragment, t);
        }
    }
    unlink() {
        this.isLinked = false;
        this.next = void 0;
        this.refNode = void 0;
    }
    link(t) {
        this.isLinked = true;
        if (ns(t)) this.refNode = t; else {
            this.next = t;
            this.obtainRefNode();
        }
    }
    obtainRefNode() {
        if (void 0 !== this.next) this.refNode = this.next.firstChild; else this.refNode = void 0;
    }
}

const rs = s.DI.createInterface("IWindow", (t => t.callback((t => t.get(N).window))));

const os = s.DI.createInterface("ILocation", (t => t.callback((t => t.get(rs).location))));

const ls = s.DI.createInterface("IHistory", (t => t.callback((t => t.get(rs).history))));

const hs = {
    [i.DelegationStrategy.capturing]: {
        capture: true
    },
    [i.DelegationStrategy.bubbling]: {
        capture: false
    }
};

class Listener {
    constructor(t, e, s, i, n, r, o, l) {
        this.platform = t;
        this.targetEvent = e;
        this.delegationStrategy = s;
        this.sourceExpression = i;
        this.target = n;
        this.preventDefault = r;
        this.eventDelegator = o;
        this.locator = l;
        this.interceptor = this;
        this.isBound = false;
        this.handler = null;
    }
    callSource(t) {
        const e = this.$scope.overrideContext;
        e.$event = t;
        const s = this.sourceExpression.evaluate(8, this.$scope, this.locator, null);
        Reflect.deleteProperty(e, "$event");
        if (true !== s && this.preventDefault) t.preventDefault();
        return s;
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, e) {
        if (this.isBound) {
            if (this.$scope === e) return;
            this.interceptor.$unbind(2 | t);
        }
        this.$scope = e;
        const s = this.sourceExpression;
        if (s.hasBind) s.bind(t, e, this.interceptor);
        if (this.delegationStrategy === i.DelegationStrategy.none) this.target.addEventListener(this.targetEvent, this); else this.handler = this.eventDelegator.addEventListener(this.locator.get(Je), this.target, this.targetEvent, this, hs[this.delegationStrategy]);
        this.isBound = true;
    }
    $unbind(t) {
        if (!this.isBound) return;
        const e = this.sourceExpression;
        if (e.hasUnbind) e.unbind(t, this.$scope, this.interceptor);
        this.$scope = null;
        if (this.delegationStrategy === i.DelegationStrategy.none) this.target.removeEventListener(this.targetEvent, this); else {
            this.handler.dispose();
            this.handler = null;
        }
        this.isBound = false;
    }
    observe(t, e) {
        return;
    }
    handleChange(t, e, s) {
        return;
    }
}

const cs = {
    capture: false
};

class ListenerTracker {
    constructor(t, e, s = cs) {
        this.jt = t;
        this.Nt = e;
        this.Wt = s;
        this.Ht = 0;
        this.zt = new Map;
        this.Gt = new Map;
    }
    Xt() {
        if (1 === ++this.Ht) this.jt.addEventListener(this.Nt, this, this.Wt);
    }
    Kt() {
        if (0 === --this.Ht) this.jt.removeEventListener(this.Nt, this, this.Wt);
    }
    dispose() {
        if (this.Ht > 0) {
            this.Ht = 0;
            this.jt.removeEventListener(this.Nt, this, this.Wt);
        }
        this.zt.clear();
        this.Gt.clear();
    }
    Yt(t) {
        const e = true === this.Wt.capture ? this.zt : this.Gt;
        let s = e.get(t);
        if (void 0 === s) e.set(t, s = v());
        return s;
    }
    handleEvent(t) {
        const e = true === this.Wt.capture ? this.zt : this.Gt;
        const s = t.composedPath();
        if (true === this.Wt.capture) s.reverse();
        for (const i of s) {
            const s = e.get(i);
            if (void 0 === s) continue;
            const n = s[this.Nt];
            if (void 0 === n) continue;
            if (y(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, e, s, i) {
        this.Zt = t;
        this.Jt = e;
        this.Nt = s;
        t.Xt();
        e[s] = i;
    }
    dispose() {
        this.Zt.Kt();
        this.Jt[this.Nt] = void 0;
    }
}

class EventSubscriber {
    constructor(t) {
        this.config = t;
        this.target = null;
        this.handler = null;
    }
    subscribe(t, e) {
        this.target = t;
        this.handler = e;
        let s;
        for (s of this.config.events) t.addEventListener(s, e);
    }
    dispose() {
        const {target: t, handler: e} = this;
        let s;
        if (null !== t && null !== e) for (s of this.config.events) t.removeEventListener(s, e);
        this.target = this.handler = null;
    }
}

const as = s.DI.createInterface("IEventDelegator", (t => t.singleton(EventDelegator)));

class EventDelegator {
    constructor() {
        this.Qt = v();
    }
    addEventListener(t, e, s, i, n) {
        var r;
        var o;
        const l = null !== (r = (o = this.Qt)[s]) && void 0 !== r ? r : o[s] = new Map;
        let h = l.get(t);
        if (void 0 === h) l.set(t, h = new ListenerTracker(t, s, n));
        return new DelegateSubscription(h, h.Yt(e), s, i);
    }
    dispose() {
        for (const t in this.Qt) {
            const e = this.Qt[t];
            for (const t of e.values()) t.dispose();
            e.clear();
        }
    }
}

const us = s.DI.createInterface("IProjections");

const fs = s.DI.createInterface("IAuSlotsInfo");

class AuSlotsInfo {
    constructor(t) {
        this.projectedSlots = t;
    }
}

exports.InstructionType = void 0;

(function(t) {
    t["hydrateElement"] = "ra";
    t["hydrateAttribute"] = "rb";
    t["hydrateTemplateController"] = "rc";
    t["hydrateLetElement"] = "rd";
    t["setProperty"] = "re";
    t["interpolation"] = "rf";
    t["propertyBinding"] = "rg";
    t["callBinding"] = "rh";
    t["letBinding"] = "ri";
    t["refBinding"] = "rj";
    t["iteratorBinding"] = "rk";
    t["textBinding"] = "ha";
    t["listenerBinding"] = "hb";
    t["attributeBinding"] = "hc";
    t["stylePropertyBinding"] = "hd";
    t["setAttribute"] = "he";
    t["setClassAttribute"] = "hf";
    t["setStyleAttribute"] = "hg";
    t["spreadBinding"] = "hs";
    t["spreadElementProp"] = "hp";
})(exports.InstructionType || (exports.InstructionType = {}));

const ds = s.DI.createInterface("Instruction");

function ps(t) {
    const e = t.type;
    return k(e) && 2 === e.length;
}

class InterpolationInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rf";
    }
}

class PropertyBindingInstruction {
    constructor(t, e, s) {
        this.from = t;
        this.to = e;
        this.mode = s;
    }
    get type() {
        return "rg";
    }
}

class IteratorBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rk";
    }
}

class CallBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rh";
    }
}

class RefBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "rj";
    }
}

class SetPropertyInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
    }
    get type() {
        return "re";
    }
}

class HydrateElementInstruction {
    constructor(t, e, s, i, n, r) {
        this.res = t;
        this.alias = e;
        this.props = s;
        this.projections = i;
        this.containerless = n;
        this.captures = r;
        this.auSlot = null;
    }
    get type() {
        return "ra";
    }
}

class HydrateAttributeInstruction {
    constructor(t, e, s) {
        this.res = t;
        this.alias = e;
        this.props = s;
    }
    get type() {
        return "rb";
    }
}

class HydrateTemplateController {
    constructor(t, e, s, i) {
        this.def = t;
        this.res = e;
        this.alias = s;
        this.props = i;
    }
    get type() {
        return "rc";
    }
}

class HydrateLetElementInstruction {
    constructor(t, e) {
        this.instructions = t;
        this.toBindingContext = e;
    }
    get type() {
        return "rd";
    }
}

class LetBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "ri";
    }
}

class TextBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.strict = e;
    }
    get type() {
        return "ha";
    }
}

class ListenerBindingInstruction {
    constructor(t, e, s, i) {
        this.from = t;
        this.to = e;
        this.preventDefault = s;
        this.strategy = i;
    }
    get type() {
        return "hb";
    }
}

class StylePropertyBindingInstruction {
    constructor(t, e) {
        this.from = t;
        this.to = e;
    }
    get type() {
        return "hd";
    }
}

class SetAttributeInstruction {
    constructor(t, e) {
        this.value = t;
        this.to = e;
    }
    get type() {
        return "he";
    }
}

class SetClassAttributeInstruction {
    constructor(t) {
        this.value = t;
        this.type = "hf";
    }
}

class SetStyleAttributeInstruction {
    constructor(t) {
        this.value = t;
        this.type = "hg";
    }
}

class AttributeBindingInstruction {
    constructor(t, e, s) {
        this.attr = t;
        this.from = e;
        this.to = s;
    }
    get type() {
        return "hc";
    }
}

class SpreadBindingInstruction {
    get type() {
        return "hs";
    }
}

class SpreadElementPropBindingInstruction {
    constructor(t) {
        this.instructions = t;
    }
    get type() {
        return "hp";
    }
}

const ms = s.DI.createInterface("ITemplateCompiler");

const vs = s.DI.createInterface("IRenderer");

function xs(t) {
    return function e(i) {
        const n = function(...e) {
            const s = new i(...e);
            s.instructionType = t;
            return s;
        };
        n.register = function t(e) {
            s.Registration.singleton(vs, n).register(e);
        };
        const r = s.Metadata.getOwnKeys(i);
        for (const t of r) h(t, o(t, i), n);
        const l = Object.getOwnPropertyDescriptors(i);
        Object.keys(l).filter((t => "prototype" !== t)).forEach((t => {
            Reflect.defineProperty(n, t, l[t]);
        }));
        return n;
    };
}

function gs(t, e, s) {
    if (k(e)) return t.parse(e, s);
    return e;
}

function ws(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

function bs(t, e) {
    if ("element" === e) return t;
    switch (e) {
      case "controller":
        return Zt.for(t);

      case "view":
        throw new Error("AUR0750");

      case "view-model":
        return Zt.for(t).viewModel;

      default:
        {
            const s = Dt.for(t, e);
            if (void 0 !== s) return s.viewModel;
            const i = Zt.for(t, {
                name: e
            });
            if (void 0 === i) throw new Error(`AUR0751:${e}`);
            return i.viewModel;
        }
    }
}

let ys = class SetPropertyRenderer {
    render(t, e, s) {
        const i = ws(e);
        if (void 0 !== i.$observers && void 0 !== i.$observers[s.to]) i.$observers[s.to].setValue(s.value, 2); else i[s.to] = s.value;
    }
};

ys = n([ xs("re") ], ys);

let ks = class CustomElementRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Se, N ];
    }
    render(t, e, i) {
        let n;
        let r;
        let o;
        let l;
        const h = i.res;
        const c = i.projections;
        const a = t.container;
        const u = Xs(this.p, t, e, i, e, null == c ? void 0 : new AuSlotsInfo(Object.keys(c)));
        switch (typeof h) {
          case "string":
            n = a.find(Zt, h);
            if (null == n) throw new Error(`AUR0752:${h}@${t["name"]}`);
            break;

          default:
            n = h;
        }
        r = n.Type;
        o = u.invoke(r);
        u.registerResolver(r, new s.InstanceProvider(n.key, o));
        l = Controller.$el(u, o, e, i, n);
        Ye(e, n.key, l);
        const f = this.r.renderers;
        const d = i.props;
        const p = d.length;
        let m = 0;
        let v;
        while (p > m) {
            v = d[m];
            f[v.type].render(t, l, v);
            ++m;
        }
        t.addChild(l);
    }
};

ks = n([ xs("ra") ], ks);

let Cs = class CustomAttributeRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Se, N ];
    }
    render(t, e, s) {
        let i = t.container;
        let n;
        switch (typeof s.res) {
          case "string":
            n = i.find(Dt, s.res);
            if (null == n) throw new Error(`AUR0753:${s.res}@${t["name"]}`);
            break;

          default:
            n = s.res;
        }
        const r = Ks(this.p, n, t, e, s, void 0, void 0);
        const o = Controller.$attr(t.container, r, e, n);
        Ye(e, n.key, o);
        const l = this.r.renderers;
        const h = s.props;
        const c = h.length;
        let a = 0;
        let u;
        while (c > a) {
            u = h[a];
            l[u.type].render(t, o, u);
            ++a;
        }
        t.addChild(o);
    }
};

Cs = n([ xs("rb") ], Cs);

let As = class TemplateControllerRenderer {
    constructor(t, e) {
        this.r = t;
        this.p = e;
    }
    static get inject() {
        return [ Se, N ];
    }
    render(t, e, s) {
        var i;
        let n = t.container;
        let r;
        switch (typeof s.res) {
          case "string":
            r = n.find(Dt, s.res);
            if (null == r) throw new Error(`AUR0754:${s.res}@${t["name"]}`);
            break;

          default:
            r = s.res;
        }
        const o = this.r.getViewFactory(s.def, n);
        const l = is(e);
        const h = Ks(this.p, r, t, e, s, o, l);
        const c = Controller.$attr(t.container, h, e, r);
        Ye(l, r.key, c);
        null === (i = h.link) || void 0 === i ? void 0 : i.call(h, t, c, e, s);
        const a = this.r.renderers;
        const u = s.props;
        const f = u.length;
        let d = 0;
        let p;
        while (f > d) {
            p = u[d];
            a[p.type].render(t, c, p);
            ++d;
        }
        t.addChild(c);
    }
};

As = n([ xs("rc") ], As);

let Rs = class LetElementRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        e.remove();
        const i = s.instructions;
        const n = s.toBindingContext;
        const r = t.container;
        const o = i.length;
        let l;
        let h;
        let c;
        let a = 0;
        while (o > a) {
            l = i[a];
            h = gs(this.ep, l.from, 8);
            c = new LetBinding(h, l.to, this.oL, r, n);
            t.addBinding(38962 === h.$kind ? $s(c, h, r) : c);
            ++a;
        }
    }
};

Rs.inject = [ i.IExpressionParser, i.IObserverLocator ];

Rs = n([ xs("rd") ], Rs);

let Ss = class CallBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const i = gs(this.ep, s.from, 8 | 4);
        const n = new CallBinding(i, ws(e), s.to, this.oL, t.container);
        t.addBinding(38962 === i.$kind ? $s(n, i, t.container) : n);
    }
};

Ss.inject = [ i.IExpressionParser, i.IObserverLocator ];

Ss = n([ xs("rh") ], Ss);

let Es = class RefBindingRenderer {
    constructor(t) {
        this.ep = t;
    }
    render(t, e, s) {
        const i = gs(this.ep, s.from, 8);
        const n = new RefBinding(i, bs(e, s.to), t.container);
        t.addBinding(38962 === i.$kind ? $s(n, i, t.container) : n);
    }
};

Es.inject = [ i.IExpressionParser ];

Es = n([ xs("rj") ], Es);

let Bs = class InterpolationBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const n = t.container;
        const r = gs(this.ep, s.from, 1);
        const o = new InterpolationBinding(this.oL, r, ws(e), s.to, i.BindingMode.toView, n, this.p.domWriteQueue);
        const l = o.partBindings;
        const h = l.length;
        let c = 0;
        let a;
        for (;h > c; ++c) {
            a = l[c];
            if (38962 === a.sourceExpression.$kind) l[c] = $s(a, a.sourceExpression, n);
        }
        t.addBinding(o);
    }
};

Bs.inject = [ i.IExpressionParser, i.IObserverLocator, N ];

Bs = n([ xs("rf") ], Bs);

let Is = class PropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = gs(this.ep, s.from, 8);
        const n = new PropertyBinding(i, ws(e), s.to, s.mode, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === i.$kind ? $s(n, i, t.container) : n);
    }
};

Is.inject = [ i.IExpressionParser, i.IObserverLocator, N ];

Is = n([ xs("rg") ], Is);

let Ts = class IteratorBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const n = gs(this.ep, s.from, 2);
        const r = new PropertyBinding(n, ws(e), s.to, i.BindingMode.toView, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === n.iterable.$kind ? $s(r, n.iterable, t.container) : r);
    }
};

Ts.inject = [ i.IExpressionParser, i.IObserverLocator, N ];

Ts = n([ xs("rk") ], Ts);

let Ds = 0;

const Ps = [];

function $s(t, e, s) {
    while (e instanceof i.BindingBehaviorExpression) {
        Ps[Ds++] = e;
        e = e.expression;
    }
    while (Ds > 0) {
        const e = Ps[--Ds];
        const n = s.get(e.behaviorKey);
        if (n instanceof i.BindingBehaviorFactory) t = n.construct(t, e);
    }
    Ps.length = 0;
    return t;
}

let Os = class TextBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = t.container;
        const n = e.nextSibling;
        const r = e.parentNode;
        const o = this.p.document;
        const l = gs(this.ep, s.from, 1);
        const h = l.parts;
        const c = l.expressions;
        const a = c.length;
        let u = 0;
        let f = h[0];
        let d;
        let p;
        if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        for (;a > u; ++u) {
            p = c[u];
            d = new ContentBinding(p, r.insertBefore(o.createTextNode(""), n), i, this.oL, this.p, s.strict);
            t.addBinding(38962 === p.$kind ? $s(d, p, i) : d);
            f = h[u + 1];
            if ("" !== f) r.insertBefore(o.createTextNode(f), n);
        }
        if ("AU-M" === e.nodeName) e.remove();
    }
};

Os.inject = [ i.IExpressionParser, i.IObserverLocator, N ];

Os = n([ xs("ha") ], Os);

let Ls = class ListenerBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.te = e;
        this.p = s;
    }
    render(t, e, s) {
        const i = gs(this.ep, s.from, 4);
        const n = new Listener(this.p, s.to, s.strategy, i, e, s.preventDefault, this.te, t.container);
        t.addBinding(38962 === i.$kind ? $s(n, i, t.container) : n);
    }
};

Ls.inject = [ i.IExpressionParser, as, N ];

Ls = n([ xs("hb") ], Ls);

let qs = class SetAttributeRenderer {
    render(t, e, s) {
        e.setAttribute(s.to, s.value);
    }
};

qs = n([ xs("he") ], qs);

let Us = class SetClassAttributeRenderer {
    render(t, e, s) {
        js(e.classList, s.value);
    }
};

Us = n([ xs("hf") ], Us);

let Fs = class SetStyleAttributeRenderer {
    render(t, e, s) {
        e.style.cssText += s.value;
    }
};

Fs = n([ xs("hg") ], Fs);

let _s = class StylePropertyBindingRenderer {
    constructor(t, e, s) {
        this.ep = t;
        this.oL = e;
        this.p = s;
    }
    render(t, e, s) {
        const n = gs(this.ep, s.from, 8);
        const r = new PropertyBinding(n, e.style, s.to, i.BindingMode.toView, this.oL, t.container, this.p.domWriteQueue);
        t.addBinding(38962 === n.$kind ? $s(r, n, t.container) : r);
    }
};

_s.inject = [ i.IExpressionParser, i.IObserverLocator, N ];

_s = n([ xs("hd") ], _s);

let Ms = class AttributeBindingRenderer {
    constructor(t, e) {
        this.ep = t;
        this.oL = e;
    }
    render(t, e, s) {
        const n = gs(this.ep, s.from, 8);
        const r = new AttributeBinding(n, e, s.attr, s.to, i.BindingMode.toView, this.oL, t.container);
        t.addBinding(38962 === n.$kind ? $s(r, n, t.container) : r);
    }
};

Ms.inject = [ i.IExpressionParser, i.IObserverLocator ];

Ms = n([ xs("hc") ], Ms);

let Vs = class SpreadRenderer {
    constructor(t, e) {
        this.ee = t;
        this.r = e;
    }
    static get inject() {
        return [ ms, Se ];
    }
    render(t, e, i) {
        const n = t.container;
        const r = n.get(je);
        const o = this.r.renderers;
        const l = t => {
            let e = t;
            let s = r;
            while (null != s && e > 0) {
                s = s.parent;
                --e;
            }
            if (null == s) throw new Error("No scope context for spread binding.");
            return s;
        };
        const h = i => {
            var n, r;
            const c = l(i);
            const a = Ns(c);
            const u = this.ee.compileSpread(c.controller.definition, null !== (r = null === (n = c.instruction) || void 0 === n ? void 0 : n.captures) && void 0 !== r ? r : s.emptyArray, c.controller.container, e);
            let f;
            for (f of u) switch (f.type) {
              case "hs":
                h(i + 1);
                break;

              case "hp":
                o[f.instructions.type].render(a, Zt.for(e), f.instructions);
                break;

              default:
                o[f.type].render(a, e, f);
            }
            t.addBinding(a);
        };
        h(0);
    }
};

Vs = n([ xs("hs") ], Vs);

class SpreadBinding {
    constructor(t, e) {
        this.se = t;
        this.ie = e;
        this.interceptor = this;
        this.isBound = false;
        this.ctrl = e.controller;
        this.locator = this.ctrl.container;
    }
    get container() {
        return this.locator;
    }
    get definition() {
        return this.ctrl.definition;
    }
    get isStrictBinding() {
        return this.ctrl.isStrictBinding;
    }
    $bind(t, e) {
        var s;
        if (this.isBound) return;
        this.isBound = true;
        const i = this.$scope = null !== (s = this.ie.controller.scope.parentScope) && void 0 !== s ? s : void 0;
        if (null == i) throw new Error("Invalid spreading. Context scope is null/undefined");
        this.se.forEach((e => e.$bind(t, i)));
    }
    $unbind(t) {
        this.se.forEach((e => e.$unbind(t)));
        this.isBound = false;
    }
    addBinding(t) {
        this.se.push(t);
    }
    addChild(t) {
        if (1 !== t.vmKind) throw new Error("Spread binding does not support spreading custom attributes/template controllers");
        this.ctrl.addChild(t);
    }
}

function js(t, e) {
    const s = e.length;
    let i = 0;
    for (let n = 0; n < s; ++n) if (32 === e.charCodeAt(n)) {
        if (n !== i) t.add(e.slice(i, n));
        i = n + 1;
    } else if (n + 1 === s) t.add(e.slice(i));
}

const Ns = t => new SpreadBinding([], t);

const Ws = "IController";

const Hs = "IInstruction";

const zs = "IRenderLocation";

const Gs = "IAuSlotsInfo";

function Xs(t, e, i, n, r, o) {
    const l = e.container.createChild();
    l.registerResolver(t.HTMLElement, l.registerResolver(t.Element, l.registerResolver(Ze, new s.InstanceProvider("ElementResolver", i))));
    l.registerResolver(Ve, new s.InstanceProvider(Ws, e));
    l.registerResolver(ds, new s.InstanceProvider(Hs, n));
    l.registerResolver(Qe, null == r ? Ys : new s.InstanceProvider(zs, r));
    l.registerResolver(ge, Zs);
    l.registerResolver(fs, null == o ? Js : new s.InstanceProvider(Gs, o));
    return l;
}

class ViewFactoryProvider {
    constructor(t) {
        this.f = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        const t = this.f;
        if (null === t) throw new Error("AUR7055");
        if (!k(t.name) || 0 === t.name.length) throw new Error("AUR0756");
        return t;
    }
}

function Ks(t, e, i, n, r, o, l, h) {
    const c = i.container.createChild();
    c.registerResolver(t.HTMLElement, c.registerResolver(t.Element, c.registerResolver(Ze, new s.InstanceProvider("ElementResolver", n))));
    i = i instanceof Controller ? i : i.ctrl;
    c.registerResolver(Ve, new s.InstanceProvider(Ws, i));
    c.registerResolver(ds, new s.InstanceProvider(Hs, r));
    c.registerResolver(Qe, null == l ? Ys : new s.InstanceProvider(zs, l));
    c.registerResolver(ge, null == o ? Zs : new ViewFactoryProvider(o));
    c.registerResolver(fs, null == h ? Js : new s.InstanceProvider(Gs, h));
    return c.invoke(e.Type);
}

const Ys = new s.InstanceProvider(zs);

const Zs = new ViewFactoryProvider(null);

const Js = new s.InstanceProvider(Gs, new AuSlotsInfo(s.emptyArray));

exports.CommandType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["IgnoreAttr"] = 1] = "IgnoreAttr";
})(exports.CommandType || (exports.CommandType = {}));

function Qs(t) {
    return function(e) {
        return ii.define(t, e);
    };
}

class BindingCommandDefinition {
    constructor(t, e, s, i, n) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = i;
        this.type = n;
    }
    static create(t, e) {
        let i;
        let n;
        if (k(t)) {
            i = t;
            n = {
                name: i
            };
        } else {
            i = t.name;
            n = t;
        }
        return new BindingCommandDefinition(e, s.firstDefined(si(e, "name"), i), s.mergeArrays(si(e, "aliases"), n.aliases, e.aliases), ei(i), s.firstDefined(si(e, "type"), n.type, e.type, null));
    }
    register(t) {
        const {Type: e, key: n, aliases: r} = this;
        s.Registration.singleton(n, e).register(t);
        s.Registration.aliasTo(n, e).register(t);
        i.registerAliases(r, ii, n, t);
    }
}

const ti = f("binding-command");

const ei = t => `${ti}:${t}`;

const si = (t, e) => o(u(e), t);

const ii = Object.freeze({
    name: ti,
    keyFrom: ei,
    define(t, e) {
        const s = BindingCommandDefinition.create(t, e);
        h(ti, s, s.Type);
        h(ti, s, s);
        d(e, ti);
        return s.Type;
    },
    getAnnotation: si
});

exports.OneTimeBindingCommand = class OneTimeBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "one-time";
    }
    build(t) {
        var e;
        const n = t.attr;
        let r = n.target;
        let o = t.attr.rawValue;
        if (null == t.bindable) r = null !== (e = this.m.map(t.node, r)) && void 0 !== e ? e : s.camelCase(r); else {
            if ("" === o && 1 === t.def.type) o = s.camelCase(r);
            r = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, i.BindingMode.oneTime);
    }
};

exports.OneTimeBindingCommand.inject = [ z, i.IExpressionParser ];

exports.OneTimeBindingCommand = n([ Qs("one-time") ], exports.OneTimeBindingCommand);

exports.ToViewBindingCommand = class ToViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "to-view";
    }
    build(t) {
        var e;
        const n = t.attr;
        let r = n.target;
        let o = t.attr.rawValue;
        if (null == t.bindable) r = null !== (e = this.m.map(t.node, r)) && void 0 !== e ? e : s.camelCase(r); else {
            if ("" === o && 1 === t.def.type) o = s.camelCase(r);
            r = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, i.BindingMode.toView);
    }
};

exports.ToViewBindingCommand.inject = [ z, i.IExpressionParser ];

exports.ToViewBindingCommand = n([ Qs("to-view") ], exports.ToViewBindingCommand);

exports.FromViewBindingCommand = class FromViewBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "from-view";
    }
    build(t) {
        var e;
        const n = t.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == t.bindable) r = null !== (e = this.m.map(t.node, r)) && void 0 !== e ? e : s.camelCase(r); else {
            if ("" === o && 1 === t.def.type) o = s.camelCase(r);
            r = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, i.BindingMode.fromView);
    }
};

exports.FromViewBindingCommand.inject = [ z, i.IExpressionParser ];

exports.FromViewBindingCommand = n([ Qs("from-view") ], exports.FromViewBindingCommand);

exports.TwoWayBindingCommand = class TwoWayBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "two-way";
    }
    build(t) {
        var e;
        const n = t.attr;
        let r = n.target;
        let o = n.rawValue;
        if (null == t.bindable) r = null !== (e = this.m.map(t.node, r)) && void 0 !== e ? e : s.camelCase(r); else {
            if ("" === o && 1 === t.def.type) o = s.camelCase(r);
            r = t.bindable.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(o, 8), r, i.BindingMode.twoWay);
    }
};

exports.TwoWayBindingCommand.inject = [ z, i.IExpressionParser ];

exports.TwoWayBindingCommand = n([ Qs("two-way") ], exports.TwoWayBindingCommand);

exports.DefaultBindingCommand = class DefaultBindingCommand {
    constructor(t, e) {
        this.type = 0;
        this.m = t;
        this.ep = e;
    }
    get name() {
        return "bind";
    }
    build(t) {
        var e;
        const n = t.attr;
        const r = t.bindable;
        let o;
        let l;
        let h = n.target;
        let c = n.rawValue;
        if (null == r) {
            l = this.m.isTwoWay(t.node, h) ? i.BindingMode.twoWay : i.BindingMode.toView;
            h = null !== (e = this.m.map(t.node, h)) && void 0 !== e ? e : s.camelCase(h);
        } else {
            if ("" === c && 1 === t.def.type) c = s.camelCase(h);
            o = t.def.defaultBindingMode;
            l = r.mode === i.BindingMode.default || null == r.mode ? null == o || o === i.BindingMode.default ? i.BindingMode.toView : o : r.mode;
            h = r.property;
        }
        return new PropertyBindingInstruction(this.ep.parse(c, 8), h, l);
    }
};

exports.DefaultBindingCommand.inject = [ z, i.IExpressionParser ];

exports.DefaultBindingCommand = n([ Qs("bind") ], exports.DefaultBindingCommand);

exports.CallBindingCommand = class CallBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "call";
    }
    build(t) {
        const e = null === t.bindable ? s.camelCase(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(this.ep.parse(t.attr.rawValue, 8 | 4), e);
    }
};

exports.CallBindingCommand.inject = [ i.IExpressionParser ];

exports.CallBindingCommand = n([ Qs("call") ], exports.CallBindingCommand);

exports.ForBindingCommand = class ForBindingCommand {
    constructor(t) {
        this.type = 0;
        this.ep = t;
    }
    get name() {
        return "for";
    }
    build(t) {
        const e = null === t.bindable ? s.camelCase(t.attr.target) : t.bindable.property;
        return new IteratorBindingInstruction(this.ep.parse(t.attr.rawValue, 2), e);
    }
};

exports.ForBindingCommand.inject = [ i.IExpressionParser ];

exports.ForBindingCommand = n([ Qs("for") ], exports.ForBindingCommand);

exports.TriggerBindingCommand = class TriggerBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "trigger";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, true, i.DelegationStrategy.none);
    }
};

exports.TriggerBindingCommand.inject = [ i.IExpressionParser ];

exports.TriggerBindingCommand = n([ Qs("trigger") ], exports.TriggerBindingCommand);

exports.DelegateBindingCommand = class DelegateBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "delegate";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, i.DelegationStrategy.bubbling);
    }
};

exports.DelegateBindingCommand.inject = [ i.IExpressionParser ];

exports.DelegateBindingCommand = n([ Qs("delegate") ], exports.DelegateBindingCommand);

exports.CaptureBindingCommand = class CaptureBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "capture";
    }
    build(t) {
        return new ListenerBindingInstruction(this.ep.parse(t.attr.rawValue, 4), t.attr.target, false, i.DelegationStrategy.capturing);
    }
};

exports.CaptureBindingCommand.inject = [ i.IExpressionParser ];

exports.CaptureBindingCommand = n([ Qs("capture") ], exports.CaptureBindingCommand);

exports.AttrBindingCommand = class AttrBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "attr";
    }
    build(t) {
        return new AttributeBindingInstruction(t.attr.target, this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.AttrBindingCommand.inject = [ i.IExpressionParser ];

exports.AttrBindingCommand = n([ Qs("attr") ], exports.AttrBindingCommand);

exports.StyleBindingCommand = class StyleBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "style";
    }
    build(t) {
        return new AttributeBindingInstruction("style", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.StyleBindingCommand.inject = [ i.IExpressionParser ];

exports.StyleBindingCommand = n([ Qs("style") ], exports.StyleBindingCommand);

exports.ClassBindingCommand = class ClassBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "class";
    }
    build(t) {
        return new AttributeBindingInstruction("class", this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

exports.ClassBindingCommand.inject = [ i.IExpressionParser ];

exports.ClassBindingCommand = n([ Qs("class") ], exports.ClassBindingCommand);

let ni = class RefBindingCommand {
    constructor(t) {
        this.type = 1;
        this.ep = t;
    }
    get name() {
        return "ref";
    }
    build(t) {
        return new RefBindingInstruction(this.ep.parse(t.attr.rawValue, 8), t.attr.target);
    }
};

ni.inject = [ i.IExpressionParser ];

ni = n([ Qs("ref") ], ni);

let ri = class SpreadBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() {
        return "...$attrs";
    }
    build(t) {
        return new SpreadBindingInstruction;
    }
};

ri = n([ Qs("...$attrs") ], ri);

const oi = s.DI.createInterface("ITemplateElementFactory", (t => t.singleton(TemplateElementFactory)));

const li = {};

class TemplateElementFactory {
    constructor(t) {
        this.p = t;
        this.ne = t.document.createElement("template");
    }
    createTemplate(t) {
        var e;
        if (k(t)) {
            let e = li[t];
            if (void 0 === e) {
                const s = this.ne;
                s.innerHTML = t;
                const i = s.content.firstElementChild;
                if (null == i || "TEMPLATE" !== i.nodeName || null != i.nextElementSibling) {
                    this.ne = this.p.document.createElement("template");
                    e = s;
                } else {
                    s.content.removeChild(i);
                    e = i;
                }
                li[t] = e;
            }
            return e.cloneNode(true);
        }
        if ("TEMPLATE" !== t.nodeName) {
            const e = this.p.document.createElement("template");
            e.content.appendChild(t);
            return e;
        }
        null === (e = t.parentNode) || void 0 === e ? void 0 : e.removeChild(t);
        return t.cloneNode(true);
    }
}

TemplateElementFactory.inject = [ N ];

const hi = function(t) {
    function e(t, i, n) {
        s.DI.inject(e)(t, i, n);
    }
    e.$isResolver = true;
    e.resolve = function(e, s) {
        if (s.root === s) return s.getAll(t, false);
        return s.has(t, false) ? s.getAll(t, false).concat(s.root.getAll(t, false)) : s.root.getAll(t, false);
    };
    return e;
};

class TemplateCompiler {
    constructor() {
        this.debug = false;
        this.resolveResources = true;
    }
    static register(t) {
        return s.Registration.singleton(ms, this).register(t);
    }
    compile(t, e, i) {
        var n, r, o, l;
        const h = CustomElementDefinition.getOrCreate(t);
        if (null === h.template || void 0 === h.template) return h;
        if (false === h.needsCompile) return h;
        null !== i && void 0 !== i ? i : i = ui;
        const c = new CompilationContext(t, e, i, null, null, void 0);
        const a = k(h.template) || !t.enhance ? c.re.createTemplate(h.template) : h.template;
        const u = "TEMPLATE" === a.nodeName && null != a.content;
        const f = u ? a.content : a;
        const d = e.get(hi(ki));
        const p = d.length;
        let m = 0;
        if (p > 0) while (p > m) {
            null === (r = (n = d[m]).compiling) || void 0 === r ? void 0 : r.call(n, a);
            ++m;
        }
        if (a.hasAttribute(wi)) throw new Error("AUR0701");
        this.oe(f, c);
        this.le(f, c);
        return CustomElementDefinition.create({
            ...t,
            name: t.name || Ei(),
            dependencies: (null !== (o = t.dependencies) && void 0 !== o ? o : s.emptyArray).concat(null !== (l = c.deps) && void 0 !== l ? l : s.emptyArray),
            instructions: c.rows,
            surrogates: u ? this.he(a, c) : s.emptyArray,
            template: a,
            hasSlots: c.hasSlot,
            needsCompile: false
        });
    }
    compileSpread(t, e, i, n) {
        var r;
        const o = new CompilationContext(t, i, ui, null, null, void 0);
        const l = [];
        const h = o.ce(n.nodeName.toLowerCase());
        const c = o.ep;
        const a = e.length;
        let u = 0;
        let f;
        let d = null;
        let p;
        let m;
        let v;
        let x;
        let g;
        let w = null;
        let b;
        let y;
        let k;
        let C;
        for (;a > u; ++u) {
            f = e[u];
            k = f.target;
            C = f.rawValue;
            w = o.ae(f);
            if (null !== w && (1 & w.type) > 0) {
                di.node = n;
                di.attr = f;
                di.bindable = null;
                di.def = null;
                l.push(w.build(di));
                continue;
            }
            d = o.ue(k);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${k}`);
                v = BindablesInfo.from(d, true);
                y = false === d.noMultiBindings && null === w && ci(C);
                if (y) m = this.fe(n, C, d, o); else {
                    g = v.primary;
                    if (null === w) {
                        b = c.parse(C, 1);
                        m = [ null === b ? new SetPropertyInstruction(C, g.property) : new InterpolationInstruction(b, g.property) ];
                    } else {
                        di.node = n;
                        di.attr = f;
                        di.bindable = g;
                        di.def = d;
                        m = [ w.build(di) ];
                    }
                }
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(k) ? k : void 0, m));
                continue;
            }
            if (null === w) {
                b = c.parse(C, 1);
                if (null !== h) {
                    v = BindablesInfo.from(h, false);
                    x = v.attrs[k];
                    if (void 0 !== x) {
                        b = c.parse(C, 1);
                        l.push(new SpreadElementPropBindingInstruction(null == b ? new SetPropertyInstruction(C, x.property) : new InterpolationInstruction(b, x.property)));
                        continue;
                    }
                }
                if (null != b) l.push(new InterpolationInstruction(b, null !== (r = o.m.map(n, k)) && void 0 !== r ? r : s.camelCase(k))); else switch (k) {
                  case "class":
                    l.push(new SetClassAttributeInstruction(C));
                    break;

                  case "style":
                    l.push(new SetStyleAttributeInstruction(C));
                    break;

                  default:
                    l.push(new SetAttributeInstruction(C, k));
                }
            } else {
                if (null !== h) {
                    v = BindablesInfo.from(h, false);
                    x = v.attrs[k];
                    if (void 0 !== x) {
                        di.node = n;
                        di.attr = f;
                        di.bindable = x;
                        di.def = h;
                        l.push(new SpreadElementPropBindingInstruction(w.build(di)));
                        continue;
                    }
                }
                di.node = n;
                di.attr = f;
                di.bindable = null;
                di.def = null;
                l.push(w.build(di));
            }
        }
        ai();
        if (null != p) return p.concat(l);
        return l;
    }
    he(t, e) {
        var i;
        const n = [];
        const r = t.attributes;
        const o = e.ep;
        let l = r.length;
        let h = 0;
        let c;
        let a;
        let u;
        let f;
        let d = null;
        let p;
        let m;
        let v;
        let x;
        let g = null;
        let w;
        let b;
        let y;
        let k;
        for (;l > h; ++h) {
            c = r[h];
            a = c.name;
            u = c.value;
            f = e.de.parse(a, u);
            y = f.target;
            k = f.rawValue;
            if (pi[y]) throw new Error(`AUR0702:${a}`);
            g = e.ae(f);
            if (null !== g && (1 & g.type) > 0) {
                di.node = t;
                di.attr = f;
                di.bindable = null;
                di.def = null;
                n.push(g.build(di));
                continue;
            }
            d = e.ue(y);
            if (null !== d) {
                if (d.isTemplateController) throw new Error(`AUR0703:${y}`);
                v = BindablesInfo.from(d, true);
                b = false === d.noMultiBindings && null === g && ci(k);
                if (b) m = this.fe(t, k, d, e); else {
                    x = v.primary;
                    if (null === g) {
                        w = o.parse(k, 1);
                        m = [ null === w ? new SetPropertyInstruction(k, x.property) : new InterpolationInstruction(w, x.property) ];
                    } else {
                        di.node = t;
                        di.attr = f;
                        di.bindable = x;
                        di.def = d;
                        m = [ g.build(di) ];
                    }
                }
                t.removeAttribute(a);
                --h;
                --l;
                (null !== p && void 0 !== p ? p : p = []).push(new HydrateAttributeInstruction(this.resolveResources ? d : d.name, null != d.aliases && d.aliases.includes(y) ? y : void 0, m));
                continue;
            }
            if (null === g) {
                w = o.parse(k, 1);
                if (null != w) {
                    t.removeAttribute(a);
                    --h;
                    --l;
                    n.push(new InterpolationInstruction(w, null !== (i = e.m.map(t, y)) && void 0 !== i ? i : s.camelCase(y)));
                } else switch (a) {
                  case "class":
                    n.push(new SetClassAttributeInstruction(k));
                    break;

                  case "style":
                    n.push(new SetStyleAttributeInstruction(k));
                    break;

                  default:
                    n.push(new SetAttributeInstruction(k, a));
                }
            } else {
                di.node = t;
                di.attr = f;
                di.bindable = null;
                di.def = null;
                n.push(g.build(di));
            }
        }
        ai();
        if (null != p) return p.concat(n);
        return n;
    }
    le(t, e) {
        switch (t.nodeType) {
          case 1:
            switch (t.nodeName) {
              case "LET":
                return this.pe(t, e);

              default:
                return this.me(t, e);
            }

          case 3:
            return this.ve(t, e);

          case 11:
            {
                let s = t.firstChild;
                while (null !== s) s = this.le(s, e);
                break;
            }
        }
        return t.nextSibling;
    }
    pe(t, e) {
        const n = t.attributes;
        const r = n.length;
        const o = [];
        const l = e.ep;
        let h = false;
        let c = 0;
        let a;
        let u;
        let f;
        let d;
        let p;
        let m;
        let v;
        let x;
        for (;r > c; ++c) {
            a = n[c];
            f = a.name;
            d = a.value;
            if ("to-binding-context" === f) {
                h = true;
                continue;
            }
            u = e.de.parse(f, d);
            m = u.target;
            v = u.rawValue;
            p = e.ae(u);
            if (null !== p) switch (p.name) {
              case "to-view":
              case "bind":
                o.push(new LetBindingInstruction(l.parse(v, 8), s.camelCase(m)));
                continue;

              default:
                throw new Error(`AUR0704:${u.command}`);
            }
            x = l.parse(v, 1);
            o.push(new LetBindingInstruction(null === x ? new i.PrimitiveLiteralExpression(v) : x, s.camelCase(m)));
        }
        e.rows.push([ new HydrateLetElementInstruction(o, h) ]);
        return this.xe(t).nextSibling;
    }
    me(t, e) {
        var i, n, r, o, l, h;
        var c, a;
        const u = t.nextSibling;
        const f = (null !== (i = t.getAttribute("as-element")) && void 0 !== i ? i : t.nodeName).toLowerCase();
        const d = e.ce(f);
        const p = !!(null === d || void 0 === d ? void 0 : d.capture);
        const m = p ? [] : s.emptyArray;
        const v = e.ep;
        const x = this.debug ? s.noop : () => {
            t.removeAttribute(C);
            --y;
            --b;
        };
        let g = t.attributes;
        let w;
        let b = g.length;
        let y = 0;
        let k;
        let C;
        let A;
        let R;
        let S;
        let E;
        let B = null;
        let I = false;
        let T;
        let D;
        let P;
        let $;
        let O;
        let L;
        let q;
        let U = null;
        let F;
        let _;
        let M;
        let V;
        let j = true;
        let N = false;
        if ("slot" === f) e.root.hasSlot = true;
        if (null !== d) {
            j = null === (n = d.processContent) || void 0 === n ? void 0 : n.call(d.Type, t, e.p);
            g = t.attributes;
            b = g.length;
        }
        if (e.root.def.enhance && t.classList.contains("au")) throw new Error(`AUR0705`);
        for (;b > y; ++y) {
            k = g[y];
            C = k.name;
            A = k.value;
            switch (C) {
              case "as-element":
              case "containerless":
                x();
                if (!N) N = "containerless" === C;
                continue;
            }
            R = e.de.parse(C, A);
            U = e.ae(R);
            M = R.target;
            V = R.rawValue;
            if (p) {
                if (null != U && 1 & U.type) {
                    x();
                    m.push(R);
                    continue;
                }
                if ("au-slot" !== M) {
                    F = BindablesInfo.from(d, false);
                    if (null == F.attrs[M] && !(null === (r = e.ue(M)) || void 0 === r ? void 0 : r.isTemplateController)) {
                        x();
                        m.push(R);
                        continue;
                    }
                }
            }
            if (null !== U && 1 & U.type) {
                di.node = t;
                di.attr = R;
                di.bindable = null;
                di.def = null;
                (null !== S && void 0 !== S ? S : S = []).push(U.build(di));
                x();
                continue;
            }
            B = e.ue(M);
            if (null !== B) {
                F = BindablesInfo.from(B, true);
                I = false === B.noMultiBindings && null === U && ci(A);
                if (I) P = this.fe(t, A, B, e); else {
                    _ = F.primary;
                    if (null === U) {
                        L = v.parse(A, 1);
                        P = [ null === L ? new SetPropertyInstruction(A, _.property) : new InterpolationInstruction(L, _.property) ];
                    } else {
                        di.node = t;
                        di.attr = R;
                        di.bindable = _;
                        di.def = B;
                        P = [ U.build(di) ];
                    }
                }
                x();
                if (B.isTemplateController) (null !== $ && void 0 !== $ ? $ : $ = []).push(new HydrateTemplateController(fi, this.resolveResources ? B : B.name, void 0, P)); else (null !== D && void 0 !== D ? D : D = []).push(new HydrateAttributeInstruction(this.resolveResources ? B : B.name, null != B.aliases && B.aliases.includes(M) ? M : void 0, P));
                continue;
            }
            if (null === U) {
                if (null !== d) {
                    F = BindablesInfo.from(d, false);
                    T = F.attrs[M];
                    if (void 0 !== T) {
                        L = v.parse(V, 1);
                        (null !== E && void 0 !== E ? E : E = []).push(null == L ? new SetPropertyInstruction(V, T.property) : new InterpolationInstruction(L, T.property));
                        x();
                        continue;
                    }
                }
                L = v.parse(V, 1);
                if (null != L) {
                    x();
                    (null !== S && void 0 !== S ? S : S = []).push(new InterpolationInstruction(L, null !== (o = e.m.map(t, M)) && void 0 !== o ? o : s.camelCase(M)));
                }
                continue;
            }
            x();
            if (null !== d) {
                F = BindablesInfo.from(d, false);
                T = F.attrs[M];
                if (void 0 !== T) {
                    di.node = t;
                    di.attr = R;
                    di.bindable = T;
                    di.def = d;
                    (null !== E && void 0 !== E ? E : E = []).push(U.build(di));
                    continue;
                }
            }
            di.node = t;
            di.attr = R;
            di.bindable = null;
            di.def = null;
            (null !== S && void 0 !== S ? S : S = []).push(U.build(di));
        }
        ai();
        if (this.ge(t) && null != S && S.length > 1) this.we(t, S);
        if (null !== d) {
            q = new HydrateElementInstruction(this.resolveResources ? d : d.name, void 0, null !== E && void 0 !== E ? E : s.emptyArray, null, N, m);
            if ("au-slot" === f) {
                const s = t.getAttribute("name") || "default";
                const i = e.h("template");
                const n = e.be();
                let r = t.firstChild;
                while (null !== r) {
                    if (1 === r.nodeType && r.hasAttribute("au-slot")) t.removeChild(r); else i.content.appendChild(r);
                    r = t.firstChild;
                }
                this.le(i.content, n);
                q.auSlot = {
                    name: s,
                    fallback: CustomElementDefinition.create({
                        name: Ei(),
                        template: i,
                        instructions: n.rows,
                        needsCompile: false
                    })
                };
                t = this.ye(t, e);
            }
        }
        if (null != S || null != q || null != D) {
            w = s.emptyArray.concat(null !== q && void 0 !== q ? q : s.emptyArray, null !== D && void 0 !== D ? D : s.emptyArray, null !== S && void 0 !== S ? S : s.emptyArray);
            this.xe(t);
        }
        let W;
        if (null != $) {
            b = $.length - 1;
            y = b;
            O = $[y];
            let s;
            this.ye(t, e);
            if ("TEMPLATE" === t.nodeName) s = t; else {
                s = e.h("template");
                s.content.appendChild(t);
            }
            const i = s;
            const n = e.be(null == w ? [] : [ w ]);
            let r;
            let o;
            let h;
            let a;
            let u;
            let p;
            let m;
            let v;
            let x = 0, g = 0;
            let k = t.firstChild;
            if (false !== j) while (null !== k) if (1 === k.nodeType) {
                r = k;
                k = k.nextSibling;
                o = r.getAttribute("au-slot");
                if (null !== o) {
                    if (null === d) throw new Error(`AUR0706:${f}[${o}]`);
                    if ("" === o) o = "default";
                    r.removeAttribute("au-slot");
                    t.removeChild(r);
                    (null !== (l = (c = null !== a && void 0 !== a ? a : a = {})[o]) && void 0 !== l ? l : c[o] = []).push(r);
                }
            } else k = k.nextSibling;
            if (null != a) {
                h = {};
                for (o in a) {
                    s = e.h("template");
                    u = a[o];
                    for (x = 0, g = u.length; g > x; ++x) {
                        p = u[x];
                        if ("TEMPLATE" === p.nodeName) if (p.attributes.length > 0) s.content.appendChild(p); else s.content.appendChild(p.content); else s.content.appendChild(p);
                    }
                    v = e.be();
                    this.le(s.content, v);
                    h[o] = CustomElementDefinition.create({
                        name: Ei(),
                        template: s,
                        instructions: v.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = h;
            }
            if (null !== d && d.containerless) this.ye(t, e);
            W = null === d || !d.containerless && !N && false !== j;
            if (W) if ("TEMPLATE" === t.nodeName) this.le(t.content, n); else {
                k = t.firstChild;
                while (null !== k) k = this.le(k, n);
            }
            O.def = CustomElementDefinition.create({
                name: Ei(),
                template: i,
                instructions: n.rows,
                needsCompile: false,
                isStrictBinding: e.root.def.isStrictBinding
            });
            while (y-- > 0) {
                O = $[y];
                s = e.h("template");
                m = e.h("au-m");
                m.classList.add("au");
                s.content.appendChild(m);
                O.def = CustomElementDefinition.create({
                    name: Ei(),
                    template: s,
                    needsCompile: false,
                    instructions: [ [ $[y + 1] ] ],
                    isStrictBinding: e.root.def.isStrictBinding
                });
            }
            e.rows.push([ O ]);
        } else {
            if (null != w) e.rows.push(w);
            let s = t.firstChild;
            let i;
            let n;
            let r = null;
            let o;
            let l;
            let c;
            let u;
            let f;
            let p = 0, m = 0;
            if (false !== j) while (null !== s) if (1 === s.nodeType) {
                i = s;
                s = s.nextSibling;
                n = i.getAttribute("au-slot");
                if (null !== n) {
                    if (null === d) throw new Error(`AUR0706:${t.nodeName}[${n}]`);
                    if ("" === n) n = "default";
                    t.removeChild(i);
                    i.removeAttribute("au-slot");
                    (null !== (h = (a = null !== o && void 0 !== o ? o : o = {})[n]) && void 0 !== h ? h : a[n] = []).push(i);
                }
            } else s = s.nextSibling;
            if (null != o) {
                r = {};
                for (n in o) {
                    u = e.h("template");
                    l = o[n];
                    for (p = 0, m = l.length; m > p; ++p) {
                        c = l[p];
                        if ("TEMPLATE" === c.nodeName) if (c.attributes.length > 0) u.content.appendChild(c); else u.content.appendChild(c.content); else u.content.appendChild(c);
                    }
                    f = e.be();
                    this.le(u.content, f);
                    r[n] = CustomElementDefinition.create({
                        name: Ei(),
                        template: u,
                        instructions: f.rows,
                        needsCompile: false,
                        isStrictBinding: e.root.def.isStrictBinding
                    });
                }
                q.projections = r;
            }
            if (null !== d && d.containerless) this.ye(t, e);
            W = null === d || !d.containerless && !N && false !== j;
            if (W && t.childNodes.length > 0) {
                s = t.firstChild;
                while (null !== s) s = this.le(s, e);
            }
        }
        return u;
    }
    ve(t, e) {
        let s = "";
        let i = t;
        while (null !== i && 3 === i.nodeType) {
            s += i.textContent;
            i = i.nextSibling;
        }
        const n = e.ep.parse(s, 1);
        if (null === n) return i;
        const r = t.parentNode;
        r.insertBefore(this.xe(e.h("au-m")), t);
        e.rows.push([ new TextBindingInstruction(n, !!e.def.isStrictBinding) ]);
        t.textContent = "";
        i = t.nextSibling;
        while (null !== i && 3 === i.nodeType) {
            r.removeChild(i);
            i = t.nextSibling;
        }
        return t.nextSibling;
    }
    fe(t, e, s, i) {
        const n = BindablesInfo.from(s, true);
        const r = e.length;
        const o = [];
        let l;
        let h;
        let c = 0;
        let a = 0;
        let u;
        let f;
        let d;
        let p;
        for (let m = 0; m < r; ++m) {
            a = e.charCodeAt(m);
            if (92 === a) ++m; else if (58 === a) {
                l = e.slice(c, m);
                while (e.charCodeAt(++m) <= 32) ;
                c = m;
                for (;m < r; ++m) {
                    a = e.charCodeAt(m);
                    if (92 === a) ++m; else if (59 === a) {
                        h = e.slice(c, m);
                        break;
                    }
                }
                if (void 0 === h) h = e.slice(c);
                f = i.de.parse(l, h);
                d = i.ae(f);
                p = n.attrs[f.target];
                if (null == p) throw new Error(`AUR0707:${s.name}.${f.target}`);
                if (null === d) {
                    u = i.ep.parse(h, 1);
                    o.push(null === u ? new SetPropertyInstruction(h, p.property) : new InterpolationInstruction(u, p.property));
                } else {
                    di.node = t;
                    di.attr = f;
                    di.bindable = p;
                    di.def = s;
                    o.push(d.build(di));
                }
                while (m < r && e.charCodeAt(++m) <= 32) ;
                c = m;
                l = void 0;
                h = void 0;
            }
        }
        ai();
        return o;
    }
    oe(t, e) {
        const i = t;
        const n = s.toArray(i.querySelectorAll("template[as-custom-element]"));
        const r = n.length;
        if (0 === r) return;
        if (r === i.childElementCount) throw new Error("AUR0708");
        const o = new Set;
        for (const t of n) {
            if (t.parentNode !== i) throw new Error("AUR0709");
            const n = bi(t, o);
            const r = class LocalTemplate {};
            const l = t.content;
            const h = s.toArray(l.querySelectorAll("bindable"));
            const c = S.for(r);
            const a = new Set;
            const u = new Set;
            for (const t of h) {
                if (t.parentNode !== l) throw new Error("AUR0710");
                const e = t.getAttribute("property");
                if (null === e) throw new Error("AUR0711");
                const s = t.getAttribute("attribute");
                if (null !== s && u.has(s) || a.has(e)) throw new Error(`AUR0712:${e}+${s}`); else {
                    if (null !== s) u.add(s);
                    a.add(e);
                }
                c.add({
                    property: e,
                    attribute: null !== s && void 0 !== s ? s : void 0,
                    mode: yi(t)
                });
                const i = t.getAttributeNames().filter((t => !gi.includes(t)));
                if (i.length > 0) ;
                l.removeChild(t);
            }
            e.ke(Zt.define({
                name: n,
                template: t
            }, r));
            i.removeChild(t);
        }
    }
    ge(t) {
        return "INPUT" === t.nodeName && 1 === mi[t.type];
    }
    we(t, e) {
        switch (t.nodeName) {
          case "INPUT":
            {
                const t = e;
                let s;
                let i;
                let n = 0;
                let r;
                for (let e = 0; e < t.length && n < 3; e++) {
                    r = t[e];
                    switch (r.to) {
                      case "model":
                      case "value":
                      case "matcher":
                        s = e;
                        n++;
                        break;

                      case "checked":
                        i = e;
                        n++;
                        break;
                    }
                }
                if (void 0 !== i && void 0 !== s && i < s) [t[s], t[i]] = [ t[i], t[s] ];
            }
        }
    }
    xe(t) {
        t.classList.add("au");
        return t;
    }
    ye(t, e) {
        const s = t.parentNode;
        const i = e.h("au-m");
        this.xe(s.insertBefore(i, t));
        s.removeChild(t);
        return i;
    }
}

class CompilationContext {
    constructor(t, e, n, r, o, l) {
        this.hasSlot = false;
        this.Ce = v();
        const h = null !== r;
        this.c = e;
        this.root = null === o ? this : o;
        this.def = t;
        this.ci = n;
        this.parent = r;
        this.re = h ? r.re : e.get(oi);
        this.de = h ? r.de : e.get(q);
        this.ep = h ? r.ep : e.get(i.IExpressionParser);
        this.m = h ? r.m : e.get(z);
        this._t = h ? r._t : e.get(s.ILogger);
        this.p = h ? r.p : e.get(N);
        this.localEls = h ? r.localEls : new Set;
        this.rows = null !== l && void 0 !== l ? l : [];
    }
    ke(t) {
        var e;
        var s;
        (null !== (e = (s = this.root).deps) && void 0 !== e ? e : s.deps = []).push(t);
        this.root.c.register(t);
    }
    h(t) {
        const e = this.p.document.createElement(t);
        if ("template" === t) this.p.document.adoptNode(e.content);
        return e;
    }
    ce(t) {
        return this.c.find(Zt, t);
    }
    ue(t) {
        return this.c.find(Dt, t);
    }
    be(t) {
        return new CompilationContext(this.def, this.c, this.ci, this, this.root, t);
    }
    ae(t) {
        if (this.root !== this) return this.root.ae(t);
        const e = t.command;
        if (null === e) return null;
        let s = this.Ce[e];
        if (void 0 === s) {
            s = this.c.create(ii, e);
            if (null === s) throw new Error(`AUR0713:${e}`);
            this.Ce[e] = s;
        }
        return s;
    }
}

function ci(t) {
    const e = t.length;
    let s = 0;
    let i = 0;
    while (e > i) {
        s = t.charCodeAt(i);
        if (92 === s) ++i; else if (58 === s) return true; else if (36 === s && 123 === t.charCodeAt(i + 1)) return false;
        ++i;
    }
    return false;
}

function ai() {
    di.node = di.attr = di.bindable = di.def = null;
}

const ui = {
    projections: null
};

const fi = {
    name: "unnamed"
};

const di = {
    node: null,
    attr: null,
    bindable: null,
    def: null
};

const pi = Object.assign(v(), {
    id: true,
    name: true,
    "au-slot": true,
    "as-element": true
});

const mi = {
    checkbox: 1,
    radio: 1
};

const vi = new WeakMap;

class BindablesInfo {
    constructor(t, e, s) {
        this.attrs = t;
        this.bindables = e;
        this.primary = s;
    }
    static from(t, e) {
        let s = vi.get(t);
        if (null == s) {
            const n = t.bindables;
            const r = v();
            const o = e ? void 0 === t.defaultBindingMode ? i.BindingMode.default : t.defaultBindingMode : i.BindingMode.default;
            let l;
            let h;
            let c = false;
            let a;
            let u;
            for (h in n) {
                l = n[h];
                u = l.attribute;
                if (true === l.primary) {
                    if (c) throw new Error(`AUR0714:${t.name}`);
                    c = true;
                    a = l;
                } else if (!c && null == a) a = l;
                r[u] = BindableDefinition.create(h, t.Type, l);
            }
            if (null == l && e) a = r.value = BindableDefinition.create("value", t.Type, {
                mode: o
            });
            vi.set(t, s = new BindablesInfo(r, n, a));
        }
        return s;
    }
}

var xi;

(function(t) {
    t["property"] = "property";
    t["attribute"] = "attribute";
    t["mode"] = "mode";
})(xi || (xi = {}));

const gi = Object.freeze([ "property", "attribute", "mode" ]);

const wi = "as-custom-element";

function bi(t, e) {
    const s = t.getAttribute(wi);
    if (null === s || "" === s) throw new Error("AUR0715");
    if (e.has(s)) throw new Error(`AUR0716:${s}`); else {
        e.add(s);
        t.removeAttribute(wi);
    }
    return s;
}

function yi(t) {
    switch (t.getAttribute("mode")) {
      case "oneTime":
        return i.BindingMode.oneTime;

      case "toView":
        return i.BindingMode.toView;

      case "fromView":
        return i.BindingMode.fromView;

      case "twoWay":
        return i.BindingMode.twoWay;

      case "default":
      default:
        return i.BindingMode.default;
    }
}

const ki = s.DI.createInterface("ITemplateCompilerHooks");

const Ci = new WeakMap;

const Ai = f("compiler-hooks");

const Ri = Object.freeze({
    name: Ai,
    define(t) {
        let e = Ci.get(t);
        if (void 0 === e) {
            Ci.set(t, e = new TemplateCompilerHooksDefinition(t));
            h(Ai, e, t);
            d(t, Ai);
        }
        return t;
    }
});

class TemplateCompilerHooksDefinition {
    constructor(t) {
        this.Type = t;
    }
    get name() {
        return "";
    }
    register(t) {
        t.register(s.Registration.singleton(ki, this.Type));
    }
}

const Si = t => {
    return void 0 === t ? e : e(t);
    function e(t) {
        return Ri.define(t);
    }
};

const Ei = Zt.generateName;

class BindingModeBehavior {
    constructor(t) {
        this.mode = t;
        this.Ae = new Map;
    }
    bind(t, e, s) {
        this.Ae.set(s, s.mode);
        s.mode = this.mode;
    }
    unbind(t, e, s) {
        s.mode = this.Ae.get(s);
        this.Ae.delete(s);
    }
}

class OneTimeBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(i.BindingMode.oneTime);
    }
}

class ToViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(i.BindingMode.toView);
    }
}

class FromViewBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(i.BindingMode.fromView);
    }
}

class TwoWayBindingBehavior extends BindingModeBehavior {
    constructor() {
        super(i.BindingMode.twoWay);
    }
}

i.bindingBehavior("oneTime")(OneTimeBindingBehavior);

i.bindingBehavior("toView")(ToViewBindingBehavior);

i.bindingBehavior("fromView")(FromViewBindingBehavior);

i.bindingBehavior("twoWay")(TwoWayBindingBehavior);

const Bi = 200;

class DebounceBindingBehavior extends i.BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: Bi
        };
        this.firstArg = null;
        this.task = null;
        this.taskQueue = t.locator.get(s.IPlatform).taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.queueTask((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, s) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
        }
        this.binding.handleChange(t, e, s);
    }
    updateSource(t, e) {
        this.queueTask((() => this.binding.updateSource(t, e)));
    }
    queueTask(t) {
        const e = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            return t();
        }), this.opts);
        null === e || void 0 === e ? void 0 : e.cancel();
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const s = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = isNaN(s) ? Bi : s;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        this.binding.$unbind(t);
    }
}

i.bindingBehavior("debounce")(DebounceBindingBehavior);

class SignalBindingBehavior {
    constructor(t) {
        this.Jt = new Map;
        this.Re = t;
    }
    bind(t, e, s, ...i) {
        if (!("handleChange" in s)) throw new Error("AUR0817");
        if (0 === i.length) throw new Error("AUR0818");
        this.Jt.set(s, i);
        let n;
        for (n of i) this.Re.addSignalListener(n, s);
    }
    unbind(t, e, s) {
        const i = this.Jt.get(s);
        this.Jt.delete(s);
        let n;
        for (n of i) this.Re.removeSignalListener(n, s);
    }
}

SignalBindingBehavior.inject = [ i.ISignaler ];

i.bindingBehavior("signal")(SignalBindingBehavior);

const Ii = 200;

class ThrottleBindingBehavior extends i.BindingInterceptor {
    constructor(t, e) {
        super(t, e);
        this.opts = {
            delay: Ii
        };
        this.firstArg = null;
        this.task = null;
        this.lastCall = 0;
        this.delay = 0;
        this.p = t.locator.get(s.IPlatform);
        this.Se = this.p.taskQueue;
        if (e.args.length > 0) this.firstArg = e.args[0];
    }
    callSource(t) {
        this.Ee((() => this.binding.callSource(t)));
        return;
    }
    handleChange(t, e, s) {
        if (null !== this.task) {
            this.task.cancel();
            this.task = null;
            this.lastCall = this.p.performanceNow();
        }
        this.binding.handleChange(t, e, s);
    }
    updateSource(t, e) {
        this.Ee((() => this.binding.updateSource(t, e)));
    }
    Ee(t) {
        const e = this.opts;
        const s = this.p;
        const i = this.lastCall + e.delay - s.performanceNow();
        if (i > 0) {
            const n = this.task;
            e.delay = i;
            this.task = this.Se.queueTask((() => {
                this.lastCall = s.performanceNow();
                this.task = null;
                e.delay = this.delay;
                t();
            }), e);
            null === n || void 0 === n ? void 0 : n.cancel();
        } else {
            this.lastCall = s.performanceNow();
            t();
        }
    }
    $bind(t, e) {
        if (null !== this.firstArg) {
            const s = Number(this.firstArg.evaluate(t, e, this.locator, null));
            this.opts.delay = this.delay = isNaN(s) ? Ii : s;
        }
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        var e;
        null === (e = this.task) || void 0 === e ? void 0 : e.cancel();
        this.task = null;
        super.$unbind(t);
    }
}

i.bindingBehavior("throttle")(ThrottleBindingBehavior);

class DataAttributeAccessor {
    constructor() {
        this.type = 2 | 4;
    }
    getValue(t, e) {
        return t.getAttribute(e);
    }
    setValue(t, e, s, i) {
        if (void 0 == t) s.removeAttribute(i); else s.setAttribute(i, t);
    }
}

const Ti = new DataAttributeAccessor;

class AttrBindingBehavior {
    bind(t, e, s) {
        s.targetObserver = Ti;
    }
    unbind(t, e, s) {
        return;
    }
}

i.bindingBehavior("attr")(AttrBindingBehavior);

function Di(t) {
    const e = t.composedPath()[0];
    if (this.target !== e) return;
    return this.selfEventCallSource(t);
}

class SelfBindingBehavior {
    bind(t, e, s) {
        if (!s.callSource || !s.targetEvent) throw new Error("AUR0801");
        s.selfEventCallSource = s.callSource;
        s.callSource = Di;
    }
    unbind(t, e, s) {
        s.callSource = s.selfEventCallSource;
        s.selfEventCallSource = null;
    }
}

i.bindingBehavior("self")(SelfBindingBehavior);

const Pi = v();

class AttributeNSAccessor {
    constructor(t) {
        this.ns = t;
        this.type = 2 | 4;
    }
    static forNs(t) {
        var e;
        return null !== (e = Pi[t]) && void 0 !== e ? e : Pi[t] = new AttributeNSAccessor(t);
    }
    getValue(t, e) {
        return t.getAttributeNS(this.ns, e);
    }
    setValue(t, e, s, i) {
        if (void 0 == t) s.removeAttributeNS(this.ns, i); else s.setAttributeNS(this.ns, i, t);
    }
}

function $i(t, e) {
    return t === e;
}

class CheckedObserver {
    constructor(t, e, s, i) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.Be = void 0;
        this.Ie = void 0;
        this.f = 0;
        this.o = t;
        this.oL = i;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        const s = this.v;
        if (t === s) return;
        this.v = t;
        this.ov = s;
        this.f = e;
        this.Te();
        this.De();
        this.queue.add(this);
    }
    handleCollectionChange(t, e) {
        this.De();
    }
    handleChange(t, e, s) {
        this.De();
    }
    De() {
        const t = this.v;
        const e = this.o;
        const s = x.call(e, "model") ? e.model : e.value;
        const i = "radio" === e.type;
        const n = void 0 !== e.matcher ? e.matcher : $i;
        if (i) e.checked = !!n(t, s); else if (true === t) e.checked = true; else {
            let i = false;
            if (t instanceof Array) i = -1 !== t.findIndex((t => !!n(t, s))); else if (t instanceof Set) {
                for (const e of t) if (n(e, s)) {
                    i = true;
                    break;
                }
            } else if (t instanceof Map) for (const e of t) {
                const t = e[0];
                const r = e[1];
                if (n(t, s) && true === r) {
                    i = true;
                    break;
                }
            }
            e.checked = i;
        }
    }
    handleEvent() {
        let t = this.ov = this.v;
        const e = this.o;
        const s = x.call(e, "model") ? e.model : e.value;
        const i = e.checked;
        const n = void 0 !== e.matcher ? e.matcher : $i;
        if ("checkbox" === e.type) {
            if (t instanceof Array) {
                const e = t.findIndex((t => !!n(t, s)));
                if (i && -1 === e) t.push(s); else if (!i && -1 !== e) t.splice(e, 1);
                return;
            } else if (t instanceof Set) {
                const e = {};
                let r = e;
                for (const e of t) if (true === n(e, s)) {
                    r = e;
                    break;
                }
                if (i && r === e) t.add(s); else if (!i && r !== e) t.delete(r);
                return;
            } else if (t instanceof Map) {
                let e;
                for (const i of t) {
                    const t = i[0];
                    if (true === n(t, s)) {
                        e = t;
                        break;
                    }
                }
                t.set(e, i);
                return;
            }
            t = i;
        } else if (i) t = s; else return;
        this.v = t;
        this.queue.add(this);
    }
    start() {
        this.handler.subscribe(this.o, this);
        this.Te();
    }
    stop() {
        var t, e;
        this.handler.dispose();
        null === (t = this.Be) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.Be = void 0;
        null === (e = this.Ie) || void 0 === e ? void 0 : e.unsubscribe(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.start();
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.stop();
    }
    flush() {
        Oi = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Oi, this.f);
    }
    Te() {
        var t, e, s, i, n, r, o;
        const l = this.o;
        null === (n = null !== (t = this.Ie) && void 0 !== t ? t : this.Ie = null !== (s = null === (e = l.$observers) || void 0 === e ? void 0 : e.model) && void 0 !== s ? s : null === (i = l.$observers) || void 0 === i ? void 0 : i.value) || void 0 === n ? void 0 : n.subscribe(this);
        null === (r = this.Be) || void 0 === r ? void 0 : r.unsubscribe(this);
        this.Be = void 0;
        if ("checkbox" === l.type) null === (o = this.Be = Gi(this.v, this.oL)) || void 0 === o ? void 0 : o.subscribe(this);
    }
}

i.subscriberCollection(CheckedObserver);

i.withFlushQueue(CheckedObserver);

let Oi;

const Li = Object.prototype.hasOwnProperty;

const qi = {
    childList: true,
    subtree: true,
    characterData: true
};

function Ui(t, e) {
    return t === e;
}

class SelectValueObserver {
    constructor(t, e, s, i) {
        this.type = 2 | 1 | 4;
        this.v = void 0;
        this.ov = void 0;
        this.H = false;
        this.Pe = void 0;
        this.$e = void 0;
        this.iO = false;
        this.o = t;
        this.oL = i;
        this.handler = s;
    }
    getValue() {
        return this.iO ? this.v : this.o.multiple ? Fi(this.o.options) : this.o.value;
    }
    setValue(t, e) {
        this.ov = this.v;
        this.v = t;
        this.H = t !== this.ov;
        this.Oe(t instanceof Array ? t : null);
        if (0 === (256 & e)) this.K();
    }
    K() {
        if (this.H) {
            this.H = false;
            this.syncOptions();
        }
    }
    handleCollectionChange() {
        this.syncOptions();
    }
    syncOptions() {
        var t;
        const e = this.v;
        const s = this.o;
        const i = Array.isArray(e);
        const n = null !== (t = s.matcher) && void 0 !== t ? t : Ui;
        const r = s.options;
        let o = r.length;
        while (o-- > 0) {
            const t = r[o];
            const s = Li.call(t, "model") ? t.model : t.value;
            if (i) {
                t.selected = -1 !== e.findIndex((t => !!n(s, t)));
                continue;
            }
            t.selected = !!n(s, e);
        }
    }
    syncValue() {
        const t = this.o;
        const e = t.options;
        const s = e.length;
        const i = this.v;
        let n = 0;
        if (t.multiple) {
            if (!(i instanceof Array)) return true;
            let r;
            const o = t.matcher || Ui;
            const l = [];
            while (n < s) {
                r = e[n];
                if (r.selected) l.push(Li.call(r, "model") ? r.model : r.value);
                ++n;
            }
            let h;
            n = 0;
            while (n < i.length) {
                h = i[n];
                if (-1 === l.findIndex((t => !!o(h, t)))) i.splice(n, 1); else ++n;
            }
            n = 0;
            while (n < l.length) {
                h = l[n];
                if (-1 === i.findIndex((t => !!o(h, t)))) i.push(h);
                ++n;
            }
            return false;
        }
        let r = null;
        let o;
        while (n < s) {
            o = e[n];
            if (o.selected) {
                r = Li.call(o, "model") ? o.model : o.value;
                break;
            }
            ++n;
        }
        this.ov = this.v;
        this.v = r;
        return true;
    }
    Le() {
        (this.$e = new this.o.ownerDocument.defaultView.MutationObserver(this.qe.bind(this))).observe(this.o, qi);
        this.Oe(this.v instanceof Array ? this.v : null);
        this.iO = true;
    }
    Ue() {
        var t;
        this.$e.disconnect();
        null === (t = this.Pe) || void 0 === t ? void 0 : t.unsubscribe(this);
        this.$e = this.Pe = void 0;
        this.iO = false;
    }
    Oe(t) {
        var e;
        null === (e = this.Pe) || void 0 === e ? void 0 : e.unsubscribe(this);
        this.Pe = void 0;
        if (null != t) {
            if (!this.o.multiple) throw new Error("AUR0654");
            (this.Pe = this.oL.getArrayObserver(t)).subscribe(this);
        }
    }
    handleEvent() {
        const t = this.syncValue();
        if (t) this.queue.add(this);
    }
    qe(t) {
        this.syncOptions();
        const e = this.syncValue();
        if (e) this.queue.add(this);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.Le();
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.handler.dispose();
            this.Ue();
        }
    }
    flush() {
        _i = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, _i, 0);
    }
}

i.subscriberCollection(SelectValueObserver);

i.withFlushQueue(SelectValueObserver);

function Fi(t) {
    const e = [];
    if (0 === t.length) return e;
    const s = t.length;
    let i = 0;
    let n;
    while (s > i) {
        n = t[i];
        if (n.selected) e[e.length] = Li.call(n, "model") ? n.model : n.value;
        ++i;
    }
    return e;
}

let _i;

const Mi = "--";

class StyleAttributeAccessor {
    constructor(t) {
        this.obj = t;
        this.type = 2 | 4;
        this.value = "";
        this.ov = "";
        this.styles = {};
        this.version = 0;
        this.H = false;
    }
    getValue() {
        return this.obj.style.cssText;
    }
    setValue(t, e) {
        this.value = t;
        this.H = t !== this.ov;
        if (0 === (256 & e)) this.K();
    }
    Fe(t) {
        const e = [];
        const s = /url\([^)]+$/;
        let i = 0;
        let n = "";
        let r;
        let o;
        let l;
        let h;
        while (i < t.length) {
            r = t.indexOf(";", i);
            if (-1 === r) r = t.length;
            n += t.substring(i, r);
            i = r + 1;
            if (s.test(n)) {
                n += ";";
                continue;
            }
            o = n.indexOf(":");
            l = n.substring(0, o).trim();
            h = n.substring(o + 1).trim();
            e.push([ l, h ]);
            n = "";
        }
        return e;
    }
    _e(t) {
        let e;
        let i;
        const n = [];
        for (i in t) {
            e = t[i];
            if (null == e) continue;
            if (k(e)) {
                if (i.startsWith(Mi)) {
                    n.push([ i, e ]);
                    continue;
                }
                n.push([ s.kebabCase(i), e ]);
                continue;
            }
            n.push(...this.Me(e));
        }
        return n;
    }
    Ve(t) {
        const e = t.length;
        if (e > 0) {
            const s = [];
            let i = 0;
            for (;e > i; ++i) s.push(...this.Me(t[i]));
            return s;
        }
        return s.emptyArray;
    }
    Me(t) {
        if (k(t)) return this.Fe(t);
        if (t instanceof Array) return this.Ve(t);
        if (t instanceof Object) return this._e(t);
        return s.emptyArray;
    }
    K() {
        if (this.H) {
            this.H = false;
            const t = this.value;
            const e = this.styles;
            const s = this.Me(t);
            let i;
            let n = this.version;
            this.ov = t;
            let r;
            let o;
            let l;
            let h = 0;
            const c = s.length;
            for (;h < c; ++h) {
                r = s[h];
                o = r[0];
                l = r[1];
                this.setProperty(o, l);
                e[o] = n;
            }
            this.styles = e;
            this.version += 1;
            if (0 === n) return;
            n -= 1;
            for (i in e) {
                if (!Object.prototype.hasOwnProperty.call(e, i) || e[i] !== n) continue;
                this.obj.style.removeProperty(i);
            }
        }
    }
    setProperty(t, e) {
        let s = "";
        if (null != e && y(e.indexOf) && e.includes("!important")) {
            s = "important";
            e = e.replace("!important", "");
        }
        this.obj.style.setProperty(t, e, s);
    }
    bind(t) {
        this.value = this.ov = this.obj.style.cssText;
    }
}

class ValueAttributeObserver {
    constructor(t, e, s) {
        this.handler = s;
        this.type = 2 | 1 | 4;
        this.v = "";
        this.ov = "";
        this.H = false;
        this.o = t;
        this.k = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (Object.is(t, this.v)) return;
        this.ov = this.v;
        this.v = t;
        this.H = true;
        if (!this.handler.config.readonly && 0 === (256 & e)) this.K(e);
    }
    K(t) {
        var e;
        if (this.H) {
            this.H = false;
            this.o[this.k] = null !== (e = this.v) && void 0 !== e ? e : this.handler.config.default;
            if (0 === (2 & t)) this.queue.add(this);
        }
    }
    handleEvent() {
        this.ov = this.v;
        this.v = this.o[this.k];
        if (this.ov !== this.v) {
            this.H = false;
            this.queue.add(this);
        }
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.handler.subscribe(this.o, this);
            this.v = this.ov = this.o[this.k];
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.handler.dispose();
    }
    flush() {
        Vi = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Vi, 0);
    }
}

i.subscriberCollection(ValueAttributeObserver);

i.withFlushQueue(ValueAttributeObserver);

let Vi;

const ji = "http://www.w3.org/1999/xlink";

const Ni = "http://www.w3.org/XML/1998/namespace";

const Wi = "http://www.w3.org/2000/xmlns/";

const Hi = Object.assign(v(), {
    "xlink:actuate": [ "actuate", ji ],
    "xlink:arcrole": [ "arcrole", ji ],
    "xlink:href": [ "href", ji ],
    "xlink:role": [ "role", ji ],
    "xlink:show": [ "show", ji ],
    "xlink:title": [ "title", ji ],
    "xlink:type": [ "type", ji ],
    "xml:lang": [ "lang", Ni ],
    "xml:space": [ "space", Ni ],
    xmlns: [ "xmlns", Wi ],
    "xmlns:xlink": [ "xlink", Wi ]
});

const zi = new i.PropertyAccessor;

zi.type = 2 | 4;

class NodeObserverConfig {
    constructor(t) {
        var e;
        this.type = null !== (e = t.type) && void 0 !== e ? e : ValueAttributeObserver;
        this.events = t.events;
        this.readonly = t.readonly;
        this.default = t.default;
    }
}

class NodeObserverLocator {
    constructor(t, e, s, i) {
        this.locator = t;
        this.platform = e;
        this.dirtyChecker = s;
        this.svgAnalyzer = i;
        this.allowDirtyCheck = true;
        this.je = v();
        this.Ne = v();
        this.We = v();
        this.He = v();
        const n = [ "change", "input" ];
        const r = {
            events: n,
            default: ""
        };
        this.useConfig({
            INPUT: {
                value: r,
                valueAsNumber: {
                    events: n,
                    default: 0
                },
                checked: {
                    type: CheckedObserver,
                    events: n
                },
                files: {
                    events: n,
                    readonly: true
                }
            },
            SELECT: {
                value: {
                    type: SelectValueObserver,
                    events: [ "change" ],
                    default: ""
                }
            },
            TEXTAREA: {
                value: r
            }
        });
        const o = {
            events: [ "change", "input", "blur", "keyup", "paste" ],
            default: ""
        };
        const l = {
            events: [ "scroll" ],
            default: 0
        };
        this.useConfigGlobal({
            scrollTop: l,
            scrollLeft: l,
            textContent: o,
            innerHTML: o
        });
        this.overrideAccessorGlobal("css", "style", "class");
        this.overrideAccessor({
            INPUT: [ "value", "checked", "model" ],
            SELECT: [ "value" ],
            TEXTAREA: [ "value" ]
        });
    }
    static register(t) {
        s.Registration.aliasTo(i.INodeObserverLocator, NodeObserverLocator).register(t);
        s.Registration.singleton(i.INodeObserverLocator, NodeObserverLocator).register(t);
    }
    handles(t, e) {
        return t instanceof this.platform.Node;
    }
    useConfig(t, e, s) {
        var i, n;
        const r = this.je;
        let o;
        if (k(t)) {
            o = null !== (i = r[t]) && void 0 !== i ? i : r[t] = v();
            if (null == o[e]) o[e] = new NodeObserverConfig(s); else Xi(t, e);
        } else for (const s in t) {
            o = null !== (n = r[s]) && void 0 !== n ? n : r[s] = v();
            const i = t[s];
            for (e in i) if (null == o[e]) o[e] = new NodeObserverConfig(i[e]); else Xi(s, e);
        }
    }
    useConfigGlobal(t, e) {
        const s = this.Ne;
        if ("object" === typeof t) for (const e in t) if (null == s[e]) s[e] = new NodeObserverConfig(t[e]); else Xi("*", e); else if (null == s[t]) s[t] = new NodeObserverConfig(e); else Xi("*", t);
    }
    getAccessor(t, e, i) {
        var n;
        if (e in this.He || e in (null !== (n = this.We[t.tagName]) && void 0 !== n ? n : s.emptyObject)) return this.getObserver(t, e, i);
        switch (e) {
          case "src":
          case "href":
          case "role":
            return Ti;

          default:
            {
                const s = Hi[e];
                if (void 0 !== s) return AttributeNSAccessor.forNs(s[1]);
                if (w(t, e, this.svgAnalyzer)) return Ti;
                return zi;
            }
        }
    }
    overrideAccessor(t, e) {
        var s, i;
        var n, r;
        let o;
        if (k(t)) {
            o = null !== (s = (n = this.We)[t]) && void 0 !== s ? s : n[t] = v();
            o[e] = true;
        } else for (const e in t) for (const s of t[e]) {
            o = null !== (i = (r = this.We)[e]) && void 0 !== i ? i : r[e] = v();
            o[s] = true;
        }
    }
    overrideAccessorGlobal(...t) {
        for (const e of t) this.He[e] = true;
    }
    getObserver(t, e, s) {
        var n, r;
        switch (e) {
          case "role":
            return Ti;

          case "class":
            return new ClassAttributeAccessor(t);

          case "css":
          case "style":
            return new StyleAttributeAccessor(t);
        }
        const o = null !== (r = null === (n = this.je[t.tagName]) || void 0 === n ? void 0 : n[e]) && void 0 !== r ? r : this.Ne[e];
        if (null != o) return new o.type(t, e, new EventSubscriber(o), s, this.locator);
        const l = Hi[e];
        if (void 0 !== l) return AttributeNSAccessor.forNs(l[1]);
        if (w(t, e, this.svgAnalyzer)) return Ti;
        if (e in t.constructor.prototype) {
            if (this.allowDirtyCheck) return this.dirtyChecker.createProperty(t, e);
            throw new Error(`AUR0652:${String(e)}`);
        } else return new i.SetterObserver(t, e);
    }
}

NodeObserverLocator.inject = [ s.IServiceLocator, N, i.IDirtyChecker, W ];

function Gi(t, e) {
    if (t instanceof Array) return e.getArrayObserver(t);
    if (t instanceof Map) return e.getMapObserver(t);
    if (t instanceof Set) return e.getSetObserver(t);
}

function Xi(t, e) {
    throw new Error(`AUR0653:${String(e)}@${t}`);
}

class UpdateTriggerBindingBehavior {
    constructor(t) {
        this.oL = t;
    }
    bind(t, e, s, ...n) {
        if (0 === n.length) throw new Error(`AUR0802`);
        if (s.mode !== i.BindingMode.twoWay && s.mode !== i.BindingMode.fromView) throw new Error("AUR0803");
        const r = this.oL.getObserver(s.target, s.targetProperty);
        if (!r.handler) throw new Error("AUR0804");
        s.targetObserver = r;
        const o = r.handler;
        r.originalHandler = o;
        r.handler = new EventSubscriber(new NodeObserverConfig({
            default: o.config.default,
            events: n,
            readonly: o.config.readonly
        }));
    }
    unbind(t, e, s) {
        s.targetObserver.handler.dispose();
        s.targetObserver.handler = s.targetObserver.originalHandler;
        s.targetObserver.originalHandler = null;
    }
}

UpdateTriggerBindingBehavior.inject = [ i.IObserverLocator ];

i.bindingBehavior("updateTrigger")(UpdateTriggerBindingBehavior);

class Focus {
    constructor(t, e) {
        this.ze = t;
        this.p = e;
        this.Ge = false;
    }
    binding() {
        this.valueChanged();
    }
    valueChanged() {
        if (this.$controller.isActive) this.Xe(); else this.Ge = true;
    }
    attached() {
        if (this.Ge) {
            this.Ge = false;
            this.Xe();
        }
        this.ze.addEventListener("focus", this);
        this.ze.addEventListener("blur", this);
    }
    afterDetachChildren() {
        const t = this.ze;
        t.removeEventListener("focus", this);
        t.removeEventListener("blur", this);
    }
    handleEvent(t) {
        if ("focus" === t.type) this.value = true; else if (!this.Ke) this.value = false;
    }
    Xe() {
        const t = this.ze;
        const e = this.Ke;
        const s = this.value;
        if (s && !e) t.focus(); else if (!s && e) t.blur();
    }
    get Ke() {
        return this.ze === this.p.document.activeElement;
    }
}

Focus.inject = [ Ze, N ];

n([ C({
    mode: i.BindingMode.twoWay
}) ], Focus.prototype, "value", void 0);

St("focus")(Focus);

let Ki = class Show {
    constructor(t, e, s) {
        this.el = t;
        this.p = e;
        this.Ye = false;
        this.Ze = null;
        this.$val = "";
        this.$prio = "";
        this.update = () => {
            this.Ze = null;
            if (Boolean(this.value) !== this.Je) if (this.Je === this.Qe) {
                this.Je = !this.Qe;
                this.$val = this.el.style.getPropertyValue("display");
                this.$prio = this.el.style.getPropertyPriority("display");
                this.el.style.setProperty("display", "none", "important");
            } else {
                this.Je = this.Qe;
                this.el.style.setProperty("display", this.$val, this.$prio);
                if ("" === this.el.getAttribute("style")) this.el.removeAttribute("style");
            }
        };
        this.Je = this.Qe = "hide" !== s.alias;
    }
    binding() {
        this.Ye = true;
        this.update();
    }
    detaching() {
        var t;
        this.Ye = false;
        null === (t = this.Ze) || void 0 === t ? void 0 : t.cancel();
        this.Ze = null;
    }
    valueChanged() {
        if (this.Ye && null === this.Ze) this.Ze = this.p.domWriteQueue.queueTask(this.update);
    }
};

n([ C ], Ki.prototype, "value", void 0);

Ki = n([ r(0, Ze), r(1, N), r(2, ds) ], Ki);

i.alias("hide")(Ki);

St("show")(Ki);

class Portal {
    constructor(t, e, i) {
        this.id = s.nextId("au$component");
        this.strict = false;
        this.p = i;
        this.ts = i.document.createElement("div");
        this.view = t.create();
        ss(this.view.nodes, e);
    }
    attaching(t, e, s) {
        if (null == this.callbackContext) this.callbackContext = this.$controller.scope.bindingContext;
        const i = this.ts = this.es();
        this.view.setHost(i);
        return this.ss(t, i, s);
    }
    detaching(t, e, s) {
        return this.os(t, this.ts, s);
    }
    targetChanged() {
        const {$controller: t} = this;
        if (!t.isActive) return;
        const e = this.ts;
        const i = this.ts = this.es();
        if (e === i) return;
        this.view.setHost(i);
        const n = s.onResolve(this.os(null, i, t.flags), (() => this.ss(null, i, t.flags)));
        if (n instanceof Promise) n.catch((t => {
            throw t;
        }));
    }
    ss(t, e, i) {
        const {activating: n, callbackContext: r, view: o} = this;
        o.setHost(e);
        return s.onResolve(null === n || void 0 === n ? void 0 : n.call(r, e, o), (() => this.ls(t, e, i)));
    }
    ls(t, e, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.appendTo(e); else return s.onResolve(r.activate(null !== t && void 0 !== t ? t : r, n, i, n.scope), (() => this.cs(e)));
        return this.cs(e);
    }
    cs(t) {
        const {activated: e, callbackContext: s, view: i} = this;
        return null === e || void 0 === e ? void 0 : e.call(s, t, i);
    }
    os(t, e, i) {
        const {deactivating: n, callbackContext: r, view: o} = this;
        return s.onResolve(null === n || void 0 === n ? void 0 : n.call(r, e, o), (() => this.us(t, e, i)));
    }
    us(t, e, i) {
        const {$controller: n, view: r} = this;
        if (null === t) r.nodes.remove(); else return s.onResolve(r.deactivate(t, n, i), (() => this.ds(e)));
        return this.ds(e);
    }
    ds(t) {
        const {deactivated: e, callbackContext: s, view: i} = this;
        return null === e || void 0 === e ? void 0 : e.call(s, t, i);
    }
    es() {
        const t = this.p;
        const e = t.document;
        let s = this.target;
        let i = this.renderContext;
        if ("" === s) {
            if (this.strict) throw new Error("AUR0811");
            return e.body;
        }
        if (k(s)) {
            let n = e;
            if (k(i)) i = e.querySelector(i);
            if (i instanceof t.Node) n = i;
            s = n.querySelector(s);
        }
        if (s instanceof t.Node) return s;
        if (null == s) {
            if (this.strict) throw new Error("AUR0812");
            return e.body;
        }
        return s;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
        this.callbackContext = null;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

Portal.inject = [ ge, Qe, N ];

n([ C({
    primary: true
}) ], Portal.prototype, "target", void 0);

n([ C({
    callback: "targetChanged"
}) ], Portal.prototype, "renderContext", void 0);

n([ C() ], Portal.prototype, "strict", void 0);

n([ C() ], Portal.prototype, "deactivating", void 0);

n([ C() ], Portal.prototype, "activating", void 0);

n([ C() ], Portal.prototype, "deactivated", void 0);

n([ C() ], Portal.prototype, "activated", void 0);

n([ C() ], Portal.prototype, "callbackContext", void 0);

Et("portal")(Portal);

class FlagsTemplateController {
    constructor(t, e, i) {
        this.fs = i;
        this.id = s.nextId("au$component");
        this.view = t.create().setLocation(e);
    }
    attaching(t, e, s) {
        const {$controller: i} = this;
        return this.view.activate(t, i, s | this.fs, i.scope);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

class FrequentMutations extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 512);
    }
}

FrequentMutations.inject = [ ge, Qe ];

class ObserveShallow extends FlagsTemplateController {
    constructor(t, e) {
        super(t, e, 128);
    }
}

ObserveShallow.inject = [ ge, Qe ];

Et("frequent-mutations")(FrequentMutations);

Et("observe-shallow")(ObserveShallow);

class If {
    constructor(t, e, i) {
        this.ifFactory = t;
        this.location = e;
        this.work = i;
        this.id = s.nextId("au$component");
        this.elseFactory = void 0;
        this.elseView = void 0;
        this.ifView = void 0;
        this.view = void 0;
        this.value = false;
        this.cache = true;
        this.pending = void 0;
        this.ps = false;
        this.vs = 0;
    }
    attaching(t, e, i) {
        let n;
        const r = this.$controller;
        const o = this.vs++;
        const l = () => !this.ps && this.vs === o + 1;
        return s.onResolve(this.pending, (() => {
            var e;
            if (!l()) return;
            this.pending = void 0;
            if (this.value) n = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else n = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (e = this.elseFactory) || void 0 === e ? void 0 : e.create();
            if (null == n) return;
            n.setLocation(this.location);
            this.pending = s.onResolve(n.activate(t, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        }));
    }
    detaching(t, e, i) {
        this.ps = true;
        return s.onResolve(this.pending, (() => {
            var e;
            this.ps = false;
            this.pending = void 0;
            void (null === (e = this.view) || void 0 === e ? void 0 : e.deactivate(t, this.$controller, i));
        }));
    }
    valueChanged(t, e, i) {
        if (!this.$controller.isActive) return;
        t = !!t;
        e = !!e;
        if (t === e) return;
        this.work.start();
        const n = this.view;
        const r = this.$controller;
        const o = this.vs++;
        const l = () => !this.ps && this.vs === o + 1;
        let h;
        return s.onResolve(s.onResolve(this.pending, (() => this.pending = s.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(n, r, i), (() => {
            var e;
            if (!l()) return;
            if (t) h = this.view = this.ifView = this.cache && null != this.ifView ? this.ifView : this.ifFactory.create(); else h = this.view = this.elseView = this.cache && null != this.elseView ? this.elseView : null === (e = this.elseFactory) || void 0 === e ? void 0 : e.create();
            if (null == h) return;
            h.setLocation(this.location);
            return s.onResolve(h.activate(h, r, i, r.scope), (() => {
                if (l()) this.pending = void 0;
            }));
        })))), (() => this.work.finish()));
    }
    dispose() {
        var t, e;
        null === (t = this.ifView) || void 0 === t ? void 0 : t.dispose();
        null === (e = this.elseView) || void 0 === e ? void 0 : e.dispose();
        this.ifView = this.elseView = this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

If.inject = [ ge, Qe, Xe ];

n([ C ], If.prototype, "value", void 0);

n([ C({
    set: t => "" === t || !!t && "false" !== t
}) ], If.prototype, "cache", void 0);

Et("if")(If);

class Else {
    constructor(t) {
        this.factory = t;
        this.id = s.nextId("au$component");
    }
    link(t, e, s, i) {
        const n = t.children;
        const r = n[n.length - 1];
        if (r instanceof If) r.elseFactory = this.factory; else if (r.viewModel instanceof If) r.viewModel.elseFactory = this.factory; else throw new Error("AUR0810");
    }
}

Else.inject = [ ge ];

Et({
    name: "else"
})(Else);

function Yi(t) {
    t.dispose();
}

const Zi = [ 38962, 36913 ];

class Repeat {
    constructor(t, e, i) {
        this.l = t;
        this.xs = e;
        this.f = i;
        this.id = s.nextId("au$component");
        this.views = [];
        this.key = void 0;
        this.gs = void 0;
        this.ws = false;
        this.bs = false;
        this.ys = null;
        this.ks = void 0;
        this.Cs = false;
    }
    binding(t, e, s) {
        const i = this.xs.bindings;
        const n = i.length;
        let r;
        let o;
        let l = 0;
        for (;n > l; ++l) {
            r = i[l];
            if (r.target === this && "items" === r.targetProperty) {
                o = this.forOf = r.sourceExpression;
                this.As = r;
                let t = o.iterable;
                while (null != t && Zi.includes(t.$kind)) {
                    t = t.expression;
                    this.ws = true;
                }
                this.ys = t;
                break;
            }
        }
        this.Rs(s);
        const h = o.declaration;
        if (!(this.Cs = 90137 === h.$kind || 106521 === h.$kind)) this.local = h.evaluate(s, this.$controller.scope, r.locator, null);
    }
    attaching(t, e, s) {
        this.Ss(s);
        return this.Es(t, s);
    }
    detaching(t, e, s) {
        this.Rs(s);
        return this.Bs(t, s);
    }
    itemsChanged(t) {
        const {$controller: e} = this;
        if (!e.isActive) return;
        t |= e.flags;
        this.Rs(t);
        this.Ss(t);
        const i = s.onResolve(this.Bs(null, t), (() => this.Es(null, t)));
        if (i instanceof Promise) i.catch((t => {
            throw t;
        }));
    }
    handleCollectionChange(t, e) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.ws) {
            if (this.bs) return;
            this.bs = true;
            this.items = this.forOf.iterable.evaluate(e, n.scope, this.As.locator, null);
            this.bs = false;
            return;
        }
        e |= n.flags;
        this.Ss(e);
        if (void 0 === t) {
            const t = s.onResolve(this.Bs(null, e), (() => this.Es(null, e)));
            if (t instanceof Promise) t.catch((t => {
                throw t;
            }));
        } else {
            const n = this.views.length;
            i.applyMutationsToIndices(t);
            if (t.deletedItems.length > 0) {
                t.deletedItems.sort(s.compareNumber);
                const i = s.onResolve(this.Is(t, e), (() => this.Ts(n, t, e)));
                if (i instanceof Promise) i.catch((t => {
                    throw t;
                }));
            } else this.Ts(n, t, e);
        }
    }
    Rs(t) {
        var e;
        const s = this.$controller.scope;
        let n = this.Ds;
        let r = this.ws;
        if (r) {
            n = this.Ds = null !== (e = this.ys.evaluate(t, s, this.As.locator, null)) && void 0 !== e ? e : null;
            r = this.ws = !Object.is(this.items, n);
        }
        const o = this.gs;
        if (4 & t) {
            if (void 0 !== o) o.unsubscribe(this);
        } else if (this.$controller.isActive) {
            const t = this.gs = i.getCollectionObserver(r ? n : this.items);
            if (o !== t && o) o.unsubscribe(this);
            if (t) t.subscribe(this);
        }
    }
    Ss(t) {
        const e = this.items;
        if (e instanceof Array) {
            this.ks = e;
            return;
        }
        const s = this.forOf;
        if (void 0 === s) return;
        const i = [];
        this.forOf.iterate(t, e, ((t, e, s) => {
            i[e] = s;
        }));
        this.ks = i;
    }
    Es(t, e) {
        let s;
        let n;
        let r;
        let o;
        const {$controller: l, f: h, local: c, l: a, items: u} = this;
        const f = l.scope;
        const d = this.forOf;
        const p = d.count(e, u);
        const m = this.views = Array(p);
        d.iterate(e, u, ((u, v, x) => {
            r = m[v] = h.create().setLocation(a);
            r.nodes.unlink();
            if (this.Cs) d.declaration.assign(e, o = i.Scope.fromParent(f, i.BindingContext.create()), this.As.locator, x); else o = i.Scope.fromParent(f, i.BindingContext.create(c, x));
            sn(o.overrideContext, v, p);
            n = r.activate(null !== t && void 0 !== t ? t : r, l, e, o);
            if (n instanceof Promise) (null !== s && void 0 !== s ? s : s = []).push(n);
        }));
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Bs(t, e) {
        let s;
        let i;
        let n;
        let r = 0;
        const {views: o, $controller: l} = this;
        const h = o.length;
        for (;h > r; ++r) {
            n = o[r];
            n.release();
            i = n.deactivate(null !== t && void 0 !== t ? t : n, l, e);
            if (i instanceof Promise) (null !== s && void 0 !== s ? s : s = []).push(i);
        }
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Is(t, e) {
        let s;
        let i;
        let n;
        const {$controller: r, views: o} = this;
        const l = t.deletedItems;
        const h = l.length;
        let c = 0;
        for (;h > c; ++c) {
            n = o[l[c]];
            n.release();
            i = n.deactivate(n, r, e);
            if (i instanceof Promise) (null !== s && void 0 !== s ? s : s = []).push(i);
        }
        c = 0;
        let a = 0;
        for (;h > c; ++c) {
            a = l[c] - c;
            o.splice(a, 1);
        }
        if (void 0 !== s) return 1 === s.length ? s[0] : Promise.all(s);
    }
    Ts(t, e, s) {
        var n;
        let r;
        let o;
        let l;
        let h;
        let c = 0;
        const {$controller: a, f: u, local: f, ks: d, l: p, views: m} = this;
        const v = e.length;
        for (;v > c; ++c) if (-2 === e[c]) {
            l = u.create();
            m.splice(c, 0, l);
        }
        if (m.length !== v) throw new Error(`AUR0814:${m.length}!=${v}`);
        const x = a.scope;
        const g = e.length;
        i.synchronizeIndices(m, e);
        const w = en(e);
        const b = w.length;
        let y;
        let k = b - 1;
        c = g - 1;
        for (;c >= 0; --c) {
            l = m[c];
            y = m[c + 1];
            l.nodes.link(null !== (n = null === y || void 0 === y ? void 0 : y.nodes) && void 0 !== n ? n : p);
            if (-2 === e[c]) {
                if (this.Cs) this.forOf.declaration.assign(s, h = i.Scope.fromParent(x, i.BindingContext.create()), this.As.locator, d[c]); else h = i.Scope.fromParent(x, i.BindingContext.create(f, d[c]));
                sn(h.overrideContext, c, g);
                l.setLocation(p);
                o = l.activate(l, a, s, h);
                if (o instanceof Promise) (null !== r && void 0 !== r ? r : r = []).push(o);
            } else if (k < 0 || 1 === b || c !== w[k]) {
                sn(l.scope.overrideContext, c, g);
                l.nodes.insertBefore(l.location);
            } else {
                if (t !== g) sn(l.scope.overrideContext, c, g);
                --k;
            }
        }
        if (void 0 !== r) return 1 === r.length ? r[0] : Promise.all(r);
    }
    dispose() {
        this.views.forEach(Yi);
        this.views = void 0;
    }
    accept(t) {
        const {views: e} = this;
        if (void 0 !== e) for (let s = 0, i = e.length; s < i; ++s) if (true === e[s].accept(t)) return true;
    }
}

Repeat.inject = [ Qe, Ve, ge ];

n([ C ], Repeat.prototype, "items", void 0);

Et("repeat")(Repeat);

let Ji = 16;

let Qi = new Int32Array(Ji);

let tn = new Int32Array(Ji);

function en(t) {
    const e = t.length;
    if (e > Ji) {
        Ji = e;
        Qi = new Int32Array(e);
        tn = new Int32Array(e);
    }
    let s = 0;
    let i = 0;
    let n = 0;
    let r = 0;
    let o = 0;
    let l = 0;
    let h = 0;
    let c = 0;
    for (;r < e; r++) {
        i = t[r];
        if (-2 !== i) {
            o = Qi[s];
            n = t[o];
            if (-2 !== n && n < i) {
                tn[r] = o;
                Qi[++s] = r;
                continue;
            }
            l = 0;
            h = s;
            while (l < h) {
                c = l + h >> 1;
                n = t[Qi[c]];
                if (-2 !== n && n < i) l = c + 1; else h = c;
            }
            n = t[Qi[l]];
            if (i < n || -2 === n) {
                if (l > 0) tn[r] = Qi[l - 1];
                Qi[l] = r;
            }
        }
    }
    r = ++s;
    const a = new Int32Array(r);
    i = Qi[s - 1];
    while (s-- > 0) {
        a[s] = i;
        i = tn[i];
    }
    while (r-- > 0) Qi[r] = 0;
    return a;
}

function sn(t, e, s) {
    const i = 0 === e;
    const n = e === s - 1;
    const r = e % 2 === 0;
    t.$index = e;
    t.$first = i;
    t.$last = n;
    t.$middle = !i && !n;
    t.$even = r;
    t.$odd = !r;
    t.$length = s;
}

class With {
    constructor(t, e) {
        this.id = s.nextId("au$component");
        this.id = s.nextId("au$component");
        this.view = t.create().setLocation(e);
    }
    valueChanged(t, e, s) {
        const n = this.$controller;
        const r = this.view.bindings;
        let o;
        let l = 0, h = 0;
        if (n.isActive && null != r) {
            o = i.Scope.fromParent(n.scope, void 0 === t ? {} : t);
            for (h = r.length; h > l; ++l) r[l].$bind(2, o);
        }
    }
    attaching(t, e, s) {
        const {$controller: n, value: r} = this;
        const o = i.Scope.fromParent(n.scope, void 0 === r ? {} : r);
        return this.view.activate(t, n, s, o);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

With.inject = [ ge, Qe ];

n([ C ], With.prototype, "value", void 0);

Et("with")(With);

exports.Switch = class Switch {
    constructor(t, e) {
        this.f = t;
        this.l = e;
        this.id = s.nextId("au$component");
        this.cases = [];
        this.activeCases = [];
        this.promise = void 0;
    }
    link(t, e, s, i) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, s) {
        const i = this.view;
        const n = this.$controller;
        this.queue((() => i.activate(t, n, s, n.scope)));
        this.queue((() => this.swap(t, s, this.value)));
        return this.promise;
    }
    detaching(t, e, s) {
        this.queue((() => {
            const e = this.view;
            return e.deactivate(t, this.$controller, s);
        }));
        return this.promise;
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    valueChanged(t, e, s) {
        if (!this.$controller.isActive) return;
        this.queue((() => this.swap(null, s, this.value)));
    }
    caseChanged(t, e) {
        this.queue((() => this.Ps(t, e)));
    }
    Ps(t, e) {
        const i = t.isMatch(this.value, e);
        const n = this.activeCases;
        const r = n.length;
        if (!i) {
            if (r > 0 && n[0].id === t.id) return this.$s(null, e);
            return;
        }
        if (r > 0 && n[0].id < t.id) return;
        const o = [];
        let l = t.fallThrough;
        if (!l) o.push(t); else {
            const e = this.cases;
            const s = e.indexOf(t);
            for (let t = s, i = e.length; t < i && l; t++) {
                const s = e[t];
                o.push(s);
                l = s.fallThrough;
            }
        }
        return s.onResolve(this.$s(null, e, o), (() => {
            this.activeCases = o;
            return this.Os(null, e);
        }));
    }
    swap(t, e, i) {
        const n = [];
        let r = false;
        for (const t of this.cases) {
            if (r || t.isMatch(i, e)) {
                n.push(t);
                r = t.fallThrough;
            }
            if (n.length > 0 && !r) break;
        }
        const o = this.defaultCase;
        if (0 === n.length && void 0 !== o) n.push(o);
        return s.onResolve(this.activeCases.length > 0 ? this.$s(t, e, n) : void 0, (() => {
            this.activeCases = n;
            if (0 === n.length) return;
            return this.Os(t, e);
        }));
    }
    Os(t, e) {
        const i = this.$controller;
        if (!i.isActive) return;
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        const o = i.scope;
        if (1 === r) return n[0].activate(t, e, o);
        return s.resolveAll(...n.map((s => s.activate(t, e, o))));
    }
    $s(t, e, i = []) {
        const n = this.activeCases;
        const r = n.length;
        if (0 === r) return;
        if (1 === r) {
            const s = n[0];
            if (!i.includes(s)) {
                n.length = 0;
                return s.deactivate(t, e);
            }
            return;
        }
        return s.onResolve(s.resolveAll(...n.reduce(((s, n) => {
            if (!i.includes(n)) s.push(n.deactivate(t, e));
            return s;
        }), [])), (() => {
            n.length = 0;
        }));
    }
    queue(t) {
        const e = this.promise;
        let i;
        i = this.promise = s.onResolve(s.onResolve(e, t), (() => {
            if (this.promise === i) this.promise = void 0;
        }));
    }
    accept(t) {
        if (true === this.$controller.accept(t)) return true;
        if (this.activeCases.some((e => e.accept(t)))) return true;
    }
};

n([ C ], exports.Switch.prototype, "value", void 0);

exports.Switch = n([ Et("switch"), r(0, ge), r(1, Qe) ], exports.Switch);

exports.Case = class Case {
    constructor(t, e, i, n) {
        this.Ls = e;
        this.id = s.nextId("au$component");
        this.fallThrough = false;
        this.qs = n.config.level <= 1;
        this._t = n.scopeTo(`${this.constructor.name}-#${this.id}`);
        this.view = t.create().setLocation(i);
    }
    link(t, e, s, i) {
        const n = t.parent;
        const r = null === n || void 0 === n ? void 0 : n.viewModel;
        if (r instanceof exports.Switch) {
            this.$switch = r;
            this.linkToSwitch(r);
        } else throw new Error("AUR0815");
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    isMatch(t, e) {
        this._t.debug("isMatch()");
        const s = this.value;
        if (Array.isArray(s)) {
            if (void 0 === this.gs) this.gs = this.Us(e, s);
            return s.includes(t);
        }
        return s === t;
    }
    valueChanged(t, e, s) {
        var i;
        if (Array.isArray(t)) {
            null === (i = this.gs) || void 0 === i ? void 0 : i.unsubscribe(this);
            this.gs = this.Us(s, t);
        } else if (void 0 !== this.gs) this.gs.unsubscribe(this);
        this.$switch.caseChanged(this, s);
    }
    handleCollectionChange(t, e) {
        this.$switch.caseChanged(this, e);
    }
    activate(t, e, s) {
        const i = this.view;
        if (i.isActive) return;
        return i.activate(null !== t && void 0 !== t ? t : i, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (!s.isActive) return;
        return s.deactivate(null !== t && void 0 !== t ? t : s, this.$controller, e);
    }
    dispose() {
        var t, e;
        null === (t = this.gs) || void 0 === t ? void 0 : t.unsubscribe(this);
        null === (e = this.view) || void 0 === e ? void 0 : e.dispose();
        this.view = void 0;
    }
    linkToSwitch(t) {
        t.cases.push(this);
    }
    Us(t, e) {
        const s = this.Ls.getArrayObserver(e);
        s.subscribe(this);
        return s;
    }
    accept(t) {
        var e;
        if (true === this.$controller.accept(t)) return true;
        return null === (e = this.view) || void 0 === e ? void 0 : e.accept(t);
    }
};

exports.Case.inject = [ ge, i.IObserverLocator, Qe, s.ILogger ];

n([ C ], exports.Case.prototype, "value", void 0);

n([ C({
    set: t => {
        switch (t) {
          case "true":
            return true;

          case "false":
            return false;

          default:
            return !!t;
        }
    },
    mode: i.BindingMode.oneTime
}) ], exports.Case.prototype, "fallThrough", void 0);

exports.Case = n([ Et("case") ], exports.Case);

exports.DefaultCase = class DefaultCase extends exports.Case {
    linkToSwitch(t) {
        if (void 0 !== t.defaultCase) throw new Error("AUR0816");
        t.defaultCase = this;
    }
};

exports.DefaultCase = n([ Et("default-case") ], exports.DefaultCase);

exports.PromiseTemplateController = class PromiseTemplateController {
    constructor(t, e, i, n) {
        this.f = t;
        this.l = e;
        this.p = i;
        this.id = s.nextId("au$component");
        this.preSettledTask = null;
        this.postSettledTask = null;
        this.logger = n.scopeTo("promise.resolve");
    }
    link(t, e, s, i) {
        this.view = this.f.create(this.$controller).setLocation(this.l);
    }
    attaching(t, e, n) {
        const r = this.view;
        const o = this.$controller;
        return s.onResolve(r.activate(t, o, n, this.viewScope = i.Scope.fromParent(o.scope, {})), (() => this.swap(t, n)));
    }
    valueChanged(t, e, s) {
        if (!this.$controller.isActive) return;
        this.swap(null, s);
    }
    swap(t, e) {
        var i, n;
        const r = this.value;
        if (!(r instanceof Promise)) {
            this.logger.warn(`The value '${String(r)}' is not a promise. No change will be done.`);
            return;
        }
        const o = this.p.domWriteQueue;
        const l = this.fulfilled;
        const h = this.rejected;
        const c = this.pending;
        const a = this.viewScope;
        let u;
        const f = {
            reusable: false
        };
        const d = () => {
            void s.resolveAll(u = (this.preSettledTask = o.queueTask((() => s.resolveAll(null === l || void 0 === l ? void 0 : l.deactivate(t, e), null === h || void 0 === h ? void 0 : h.deactivate(t, e), null === c || void 0 === c ? void 0 : c.activate(t, e, a))), f)).result.catch((t => {
                if (!(t instanceof s.TaskAbortError)) throw t;
            })), r.then((i => {
                if (this.value !== r) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = o.queueTask((() => s.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(t, e), null === h || void 0 === h ? void 0 : h.deactivate(t, e), null === l || void 0 === l ? void 0 : l.activate(t, e, a, i))), f)).result;
                };
                if (1 === this.preSettledTask.status) void u.then(n); else {
                    this.preSettledTask.cancel();
                    n();
                }
            }), (i => {
                if (this.value !== r) return;
                const n = () => {
                    this.postSettlePromise = (this.postSettledTask = o.queueTask((() => s.resolveAll(null === c || void 0 === c ? void 0 : c.deactivate(t, e), null === l || void 0 === l ? void 0 : l.deactivate(t, e), null === h || void 0 === h ? void 0 : h.activate(t, e, a, i))), f)).result;
                };
                if (1 === this.preSettledTask.status) void u.then(n); else {
                    this.preSettledTask.cancel();
                    n();
                }
            })));
        };
        if (1 === (null === (i = this.postSettledTask) || void 0 === i ? void 0 : i.status)) void this.postSettlePromise.then(d); else {
            null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.cancel();
            d();
        }
    }
    detaching(t, e, s) {
        var i, n;
        null === (i = this.preSettledTask) || void 0 === i ? void 0 : i.cancel();
        null === (n = this.postSettledTask) || void 0 === n ? void 0 : n.cancel();
        this.preSettledTask = this.postSettledTask = null;
        return this.view.deactivate(t, this.$controller, s);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

n([ C ], exports.PromiseTemplateController.prototype, "value", void 0);

exports.PromiseTemplateController = n([ Et("promise"), r(0, ge), r(1, Qe), r(2, N), r(3, s.ILogger) ], exports.PromiseTemplateController);

exports.PendingTemplateController = class PendingTemplateController {
    constructor(t, e) {
        this.factory = t;
        this.id = s.nextId("au$component");
        this.view = this.factory.create().setLocation(e);
    }
    link(t, e, s, i) {
        nn(t).pending = this;
    }
    activate(t, e, s) {
        const i = this.view;
        if (i.isActive) return;
        return i.activate(i, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (!s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

n([ C({
    mode: i.BindingMode.toView
}) ], exports.PendingTemplateController.prototype, "value", void 0);

exports.PendingTemplateController = n([ Et("pending"), r(0, ge), r(1, Qe) ], exports.PendingTemplateController);

exports.FulfilledTemplateController = class FulfilledTemplateController {
    constructor(t, e) {
        this.factory = t;
        this.id = s.nextId("au$component");
        this.view = this.factory.create().setLocation(e);
    }
    link(t, e, s, i) {
        nn(t).fulfilled = this;
    }
    activate(t, e, s, i) {
        this.value = i;
        const n = this.view;
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (!s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

n([ C({
    mode: i.BindingMode.fromView
}) ], exports.FulfilledTemplateController.prototype, "value", void 0);

exports.FulfilledTemplateController = n([ Et("then"), r(0, ge), r(1, Qe) ], exports.FulfilledTemplateController);

exports.RejectedTemplateController = class RejectedTemplateController {
    constructor(t, e) {
        this.factory = t;
        this.id = s.nextId("au$component");
        this.view = this.factory.create().setLocation(e);
    }
    link(t, e, s, i) {
        nn(t).rejected = this;
    }
    activate(t, e, s, i) {
        this.value = i;
        const n = this.view;
        if (n.isActive) return;
        return n.activate(n, this.$controller, e, s);
    }
    deactivate(t, e) {
        const s = this.view;
        if (!s.isActive) return;
        return s.deactivate(s, this.$controller, e);
    }
    detaching(t, e, s) {
        return this.deactivate(t, s);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
};

n([ C({
    mode: i.BindingMode.fromView
}) ], exports.RejectedTemplateController.prototype, "value", void 0);

exports.RejectedTemplateController = n([ Et("catch"), r(0, ge), r(1, Qe) ], exports.RejectedTemplateController);

function nn(t) {
    const e = t.parent;
    const s = null === e || void 0 === e ? void 0 : e.viewModel;
    if (s instanceof exports.PromiseTemplateController) return s;
    throw new Error("AUR0813");
}

let rn = class PromiseAttributePattern {
    "promise.resolve"(t, e, s) {
        return new AttrSyntax(t, e, "promise", "bind");
    }
};

rn = n([ U({
    pattern: "promise.resolve",
    symbols: ""
}) ], rn);

let on = class FulfilledAttributePattern {
    then(t, e, s) {
        return new AttrSyntax(t, e, "then", "from-view");
    }
};

on = n([ U({
    pattern: "then",
    symbols: ""
}) ], on);

let ln = class RejectedAttributePattern {
    catch(t, e, s) {
        return new AttrSyntax(t, e, "catch", "from-view");
    }
};

ln = n([ U({
    pattern: "catch",
    symbols: ""
}) ], ln);

function hn(t, e, s, i) {
    if (k(e)) return cn(t, e, s, i);
    if (Zt.isType(e)) return an(t, e, s, i);
    throw new Error(`Invalid Tag or Type.`);
}

class RenderPlan {
    constructor(t, e, s) {
        this.node = t;
        this.instructions = e;
        this.Fs = s;
        this._s = void 0;
    }
    get definition() {
        if (void 0 === this._s) this._s = CustomElementDefinition.create({
            name: Zt.generateName(),
            template: this.node,
            needsCompile: k(this.node),
            instructions: this.instructions,
            dependencies: this.Fs
        });
        return this._s;
    }
    createView(t) {
        return this.getViewFactory(t).create();
    }
    getViewFactory(t) {
        return t.root.get(Se).getViewFactory(this.definition, t.createChild().register(...this.Fs));
    }
    mergeInto(t, e, s) {
        t.appendChild(this.node);
        e.push(...this.instructions);
        s.push(...this.Fs);
    }
}

function cn(t, e, s, i) {
    const n = [];
    const r = [];
    const o = [];
    const l = t.document.createElement(e);
    let h = false;
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (ps(e)) {
            h = true;
            n.push(e);
        } else l.setAttribute(t, e);
    }));
    if (h) {
        l.className = "au";
        r.push(n);
    }
    if (i) un(t, l, i, r, o);
    return new RenderPlan(l, r, o);
}

function an(t, e, s, i) {
    const n = Zt.getDefinition(e);
    const r = [];
    const o = [ r ];
    const l = [];
    const h = [];
    const c = n.bindables;
    const a = t.document.createElement(n.name);
    a.className = "au";
    if (!l.includes(e)) l.push(e);
    r.push(new HydrateElementInstruction(n, void 0, h, null, false, void 0));
    if (s) Object.keys(s).forEach((t => {
        const e = s[t];
        if (ps(e)) h.push(e); else if (void 0 === c[t]) h.push(new SetAttributeInstruction(e, t)); else h.push(new SetPropertyInstruction(e, t));
    }));
    if (i) un(t, a, i, o, l);
    return new RenderPlan(a, o, l);
}

function un(t, e, s, i, n) {
    for (let r = 0, o = s.length; r < o; ++r) {
        const o = s[r];
        switch (typeof o) {
          case "string":
            e.appendChild(t.document.createTextNode(o));
            break;

          case "object":
            if (o instanceof t.Node) e.appendChild(o); else if ("mergeInto" in o) o.mergeInto(e, i, n);
        }
    }
}

function fn(t, e) {
    const s = e.to;
    if (void 0 !== s && "subject" !== s && "composing" !== s) t[s] = e;
    return t;
}

class AuRender {
    constructor(t, e, i, n) {
        this.p = t;
        this.Ms = e;
        this.Vs = i;
        this.r = n;
        this.id = s.nextId("au$component");
        this.component = void 0;
        this.composing = false;
        this.view = void 0;
        this.js = void 0;
        this.Ns = e.props.reduce(fn, {});
    }
    attaching(t, e, s) {
        const {component: i, view: n} = this;
        if (void 0 === n || this.js !== i) {
            this.js = i;
            this.composing = true;
            return this.compose(void 0, i, t, s);
        }
        return this.compose(n, i, t, s);
    }
    detaching(t, e, s) {
        return this.us(this.view, t, s);
    }
    componentChanged(t, e, i) {
        const {$controller: n} = this;
        if (!n.isActive) return;
        if (this.js === t) return;
        this.js = t;
        this.composing = true;
        i |= n.flags;
        const r = s.onResolve(this.us(this.view, null, i), (() => this.compose(void 0, t, null, i)));
        if (r instanceof Promise) r.catch((t => {
            throw t;
        }));
    }
    compose(t, e, i, n) {
        return s.onResolve(void 0 === t ? s.onResolve(e, (t => this.Ws(t, n))) : t, (t => this.ls(this.view = t, i, n)));
    }
    us(t, e, s) {
        return null === t || void 0 === t ? void 0 : t.deactivate(null !== e && void 0 !== e ? e : t, this.$controller, s);
    }
    ls(t, e, i) {
        const {$controller: n} = this;
        return s.onResolve(null === t || void 0 === t ? void 0 : t.activate(null !== e && void 0 !== e ? e : t, n, i, n.scope), (() => {
            this.composing = false;
        }));
    }
    Ws(t, e) {
        const s = this.Hs(t, e);
        if (s) {
            s.setLocation(this.$controller.location);
            s.lockScope(this.$controller.scope);
            return s;
        }
        return;
    }
    Hs(t, e) {
        if (!t) return;
        const s = this.Vs.controller.container;
        if ("object" === typeof t) {
            if (dn(t)) return t;
            if ("createView" in t) return t.createView(s);
            if ("create" in t) return t.create();
            if ("template" in t) return this.r.getViewFactory(CustomElementDefinition.getOrCreate(t), s).create();
        }
        if (k(t)) {
            const e = s.find(Zt, t);
            if (null == e) throw new Error(`AUR0809:${t}`);
            t = e.Type;
        }
        return hn(this.p, t, this.Ns, this.$controller.host.childNodes).createView(s);
    }
    dispose() {
        var t;
        null === (t = this.view) || void 0 === t ? void 0 : t.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

AuRender.inject = [ N, ds, je, Se ];

n([ C ], AuRender.prototype, "component", void 0);

n([ C({
    mode: i.BindingMode.fromView
}) ], AuRender.prototype, "composing", void 0);

qt({
    name: "au-render",
    template: null,
    containerless: true,
    capture: true
})(AuRender);

function dn(t) {
    return "lockScope" in t;
}

class AuCompose {
    constructor(t, e, s, i, n, r) {
        this.c = t;
        this.parent = e;
        this.host = s;
        this.p = i;
        this.scopeBehavior = "auto";
        this.zs = void 0;
        this.l = n.containerless ? is(this.host) : void 0;
        this.r = t.get(Se);
        this.Ms = n;
        this.Gs = r;
    }
    static get inject() {
        return [ s.IContainer, Ve, Ze, N, ds, s.transient(CompositionContextFactory) ];
    }
    get pending() {
        return this.Xs;
    }
    get composition() {
        return this.zs;
    }
    attaching(t, e, i) {
        return this.Xs = s.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, void 0), t), (t => {
            if (this.Gs.isCurrent(t)) this.Xs = void 0;
        }));
    }
    detaching(t) {
        const e = this.zs;
        const i = this.Xs;
        this.Gs.invalidate();
        this.zs = this.Xs = void 0;
        return s.onResolve(i, (() => null === e || void 0 === e ? void 0 : e.deactivate(t)));
    }
    propertyChanged(t) {
        if ("model" === t && null != this.zs) {
            this.zs.update(this.model);
            return;
        }
        this.Xs = s.onResolve(this.Xs, (() => s.onResolve(this.queue(new ChangeInfo(this.view, this.viewModel, this.model, t), void 0), (t => {
            if (this.Gs.isCurrent(t)) this.Xs = void 0;
        }))));
    }
    queue(t, e) {
        const i = this.Gs;
        const n = this.zs;
        return s.onResolve(i.create(t), (t => {
            if (i.isCurrent(t)) return s.onResolve(this.compose(t), (r => {
                if (i.isCurrent(t)) return s.onResolve(r.activate(e), (() => {
                    if (i.isCurrent(t)) {
                        this.zs = r;
                        return s.onResolve(null === n || void 0 === n ? void 0 : n.deactivate(e), (() => t));
                    } else return s.onResolve(r.controller.deactivate(r.controller, this.$controller, 4), (() => {
                        r.controller.dispose();
                        return t;
                    }));
                }));
                r.controller.dispose();
                return t;
            }));
            return t;
        }));
    }
    compose(t) {
        let e;
        let n;
        let r;
        const {view: o, viewModel: l, model: h} = t.change;
        const {c: c, host: a, $controller: u, l: f} = this;
        const d = this.getDef(l);
        const p = c.createChild();
        const m = null == f ? a.parentNode : f.parentNode;
        if (null !== d) {
            if (d.containerless) throw new Error("AUR0806");
            if (null == f) {
                n = a;
                r = () => {};
            } else {
                n = m.insertBefore(this.p.document.createElement(d.name), f);
                r = () => {
                    n.remove();
                };
            }
            e = this.getVm(p, l, n);
        } else {
            n = null == f ? a : f;
            e = this.getVm(p, l, n);
        }
        const v = () => {
            if (null !== d) {
                const i = Controller.$el(p, e, n, {
                    projections: this.Ms.projections
                }, d);
                return new CompositionController(i, (t => i.activate(null !== t && void 0 !== t ? t : i, u, 2, u.scope.parentScope)), (t => s.onResolve(i.deactivate(null !== t && void 0 !== t ? t : i, u, 4), r)), (t => {
                    var s;
                    return null === (s = e.activate) || void 0 === s ? void 0 : s.call(e, t);
                }), t);
            } else {
                const s = CustomElementDefinition.create({
                    name: Zt.generateName(),
                    template: o
                });
                const r = this.r.getViewFactory(s, p);
                const l = Controller.$view(r, u);
                const h = "auto" === this.scopeBehavior ? i.Scope.fromParent(this.parent.scope, e) : i.Scope.create(e);
                if (ns(n)) l.setLocation(n); else l.setHost(n);
                return new CompositionController(l, (t => l.activate(null !== t && void 0 !== t ? t : l, u, 2, h)), (t => l.deactivate(null !== t && void 0 !== t ? t : l, u, 4)), (t => {
                    var s;
                    return null === (s = e.activate) || void 0 === s ? void 0 : s.call(e, t);
                }), t);
            }
        };
        if ("activate" in e) return s.onResolve(e.activate(h), (() => v())); else return v();
    }
    getVm(t, e, i) {
        if (null == e) return new EmptyComponent$1;
        if ("object" === typeof e) return e;
        const n = this.p;
        const r = ns(i);
        t.registerResolver(n.Element, t.registerResolver(Ze, new s.InstanceProvider("ElementResolver", r ? null : i)));
        t.registerResolver(Qe, new s.InstanceProvider("IRenderLocation", r ? i : null));
        const o = t.invoke(e);
        t.registerResolver(e, new s.InstanceProvider("au-compose.viewModel", o));
        return o;
    }
    getDef(t) {
        const e = y(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Zt.isType(e) ? Zt.getDefinition(e) : null;
    }
}

n([ C ], AuCompose.prototype, "view", void 0);

n([ C ], AuCompose.prototype, "viewModel", void 0);

n([ C ], AuCompose.prototype, "model", void 0);

n([ C({
    set: t => {
        if ("scoped" === t || "auto" === t) return t;
        throw new Error("AUR0805");
    }
}) ], AuCompose.prototype, "scopeBehavior", void 0);

qt("au-compose")(AuCompose);

class EmptyComponent$1 {}

class CompositionContextFactory {
    constructor() {
        this.id = 0;
    }
    isCurrent(t) {
        return t.id === this.id;
    }
    create(t) {
        return s.onResolve(t.load(), (t => new CompositionContext(++this.id, t)));
    }
    invalidate() {
        this.id++;
    }
}

class ChangeInfo {
    constructor(t, e, s, i) {
        this.view = t;
        this.viewModel = e;
        this.model = s;
        this.src = i;
    }
    load() {
        if (b(this.view) || b(this.viewModel)) return Promise.all([ this.view, this.viewModel ]).then((([t, e]) => new LoadedChangeInfo(t, e, this.model, this.src))); else return new LoadedChangeInfo(this.view, this.viewModel, this.model, this.src);
    }
}

class LoadedChangeInfo {
    constructor(t, e, s, i) {
        this.view = t;
        this.viewModel = e;
        this.model = s;
        this.src = i;
    }
}

class CompositionContext {
    constructor(t, e) {
        this.id = t;
        this.change = e;
    }
}

class CompositionController {
    constructor(t, e, s, i, n) {
        this.controller = t;
        this.start = e;
        this.stop = s;
        this.update = i;
        this.context = n;
        this.state = 0;
    }
    activate(t) {
        if (0 !== this.state) throw new Error(`AUR0807:${this.controller.name}`);
        this.state = 1;
        return this.start(t);
    }
    deactivate(t) {
        switch (this.state) {
          case 1:
            this.state = -1;
            return this.stop(t);

          case -1:
            throw new Error("AUR0808");

          default:
            this.state = -1;
        }
    }
}

class AuSlot {
    constructor(t, e, s, i) {
        var n, r;
        this.Ks = null;
        this.Ys = null;
        let o;
        const l = e.auSlot;
        const h = null === (r = null === (n = s.instruction) || void 0 === n ? void 0 : n.projections) || void 0 === r ? void 0 : r[l.name];
        if (null == h) {
            o = i.getViewFactory(l.fallback, s.controller.container);
            this.Zs = false;
        } else {
            o = i.getViewFactory(h, s.parent.controller.container);
            this.Zs = true;
        }
        this.Vs = s;
        this.view = o.create().setLocation(t);
    }
    static get inject() {
        return [ Qe, ds, je, Se ];
    }
    binding(t, e, s) {
        var n;
        this.Ks = this.$controller.scope.parentScope;
        let r;
        if (this.Zs) {
            r = this.Vs.controller.scope.parentScope;
            (this.Ys = i.Scope.fromParent(r, r.bindingContext)).overrideContext.$host = null !== (n = this.expose) && void 0 !== n ? n : this.Ks.bindingContext;
        }
    }
    attaching(t, e, s) {
        return this.view.activate(t, this.$controller, s, this.Zs ? this.Ys : this.Ks);
    }
    detaching(t, e, s) {
        return this.view.deactivate(t, this.$controller, s);
    }
    exposeChanged(t) {
        if (this.Zs && null != this.Ys) this.Ys.overrideContext.$host = t;
    }
    dispose() {
        this.view.dispose();
        this.view = void 0;
    }
    accept(t) {
        var e;
        if (true === (null === (e = this.view) || void 0 === e ? void 0 : e.accept(t))) return true;
    }
}

n([ C ], AuSlot.prototype, "expose", void 0);

qt({
    name: "au-slot",
    template: null,
    containerless: true
})(AuSlot);

const pn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

const mn = s.DI.createInterface("ISanitizer", (t => t.singleton(class {
    sanitize(t) {
        return t.replace(pn, "");
    }
})));

exports.SanitizeValueConverter = class SanitizeValueConverter {
    constructor(t) {
        this.Js = t;
    }
    toView(t) {
        if (null == t) return null;
        return this.Js.sanitize(t);
    }
};

exports.SanitizeValueConverter = n([ r(0, mn) ], exports.SanitizeValueConverter);

i.valueConverter("sanitize")(exports.SanitizeValueConverter);

exports.ViewValueConverter = class ViewValueConverter {
    constructor(t) {
        this.Qs = t;
    }
    toView(t, e) {
        return this.Qs.getViewComponentForObject(t, e);
    }
};

exports.ViewValueConverter = n([ r(0, Re) ], exports.ViewValueConverter);

i.valueConverter("view")(exports.ViewValueConverter);

const vn = DebounceBindingBehavior;

const xn = OneTimeBindingBehavior;

const gn = ToViewBindingBehavior;

const wn = FromViewBindingBehavior;

const bn = SignalBindingBehavior;

const yn = ThrottleBindingBehavior;

const kn = TwoWayBindingBehavior;

const Cn = TemplateCompiler;

const An = NodeObserverLocator;

const Rn = [ Cn, An ];

const Sn = SVGAnalyzer;

const En = exports.AtPrefixedTriggerAttributePattern;

const Bn = exports.ColonPrefixedBindAttributePattern;

const In = exports.RefAttributePattern;

const Tn = exports.DotSeparatedAttributePattern;

const Dn = j;

const Pn = [ In, Tn, Dn ];

const $n = [ En, Bn ];

const On = exports.CallBindingCommand;

const Ln = exports.DefaultBindingCommand;

const qn = exports.ForBindingCommand;

const Un = exports.FromViewBindingCommand;

const Fn = exports.OneTimeBindingCommand;

const _n = exports.ToViewBindingCommand;

const Mn = exports.TwoWayBindingCommand;

const Vn = ni;

const jn = exports.TriggerBindingCommand;

const Nn = exports.DelegateBindingCommand;

const Wn = exports.CaptureBindingCommand;

const Hn = exports.AttrBindingCommand;

const zn = exports.ClassBindingCommand;

const Gn = exports.StyleBindingCommand;

const Xn = ri;

const Kn = [ Ln, Fn, Un, _n, Mn, On, qn, Vn, jn, Nn, Wn, zn, Gn, Hn, Xn ];

const Yn = exports.SanitizeValueConverter;

const Zn = exports.ViewValueConverter;

const Jn = FrequentMutations;

const Qn = ObserveShallow;

const tr = If;

const er = Else;

const sr = Repeat;

const ir = With;

const nr = exports.Switch;

const rr = exports.Case;

const or = exports.DefaultCase;

const lr = exports.PromiseTemplateController;

const hr = exports.PendingTemplateController;

const cr = exports.FulfilledTemplateController;

const ar = exports.RejectedTemplateController;

const ur = rn;

const fr = on;

const dr = ln;

const pr = AttrBindingBehavior;

const mr = SelfBindingBehavior;

const vr = UpdateTriggerBindingBehavior;

const xr = AuRender;

const gr = AuCompose;

const wr = Portal;

const br = Focus;

const yr = Ki;

const kr = [ vn, xn, gn, wn, bn, yn, kn, Yn, Zn, Jn, Qn, tr, er, sr, ir, nr, rr, or, lr, hr, cr, ar, ur, fr, dr, pr, mr, vr, xr, gr, wr, br, yr, AuSlot ];

const Cr = Ss;

const Ar = Cs;

const Rr = ks;

const Sr = Bs;

const Er = Ts;

const Br = Rs;

const Ir = Is;

const Tr = Es;

const Dr = ys;

const Pr = As;

const $r = Ls;

const Or = Ms;

const Lr = qs;

const qr = Us;

const Ur = Fs;

const Fr = _s;

const _r = Os;

const Mr = Vs;

const Vr = [ Ir, Er, Cr, Tr, Sr, Dr, Rr, Ar, Pr, Br, $r, Or, Lr, qr, Ur, Fr, _r, Mr ];

const jr = Nr(s.noop);

function Nr(t) {
    return {
        optionsProvider: t,
        register(e) {
            const n = {
                coercingOptions: {
                    enableCoercion: false,
                    coerceNullish: false
                }
            };
            t(n);
            return e.register(s.Registration.instance(i.ICoercionConfiguration, n.coercingOptions), ...Rn, ...kr, ...Pn, ...Kn, ...Vr);
        },
        customize(e) {
            return Nr(null !== e && void 0 !== e ? e : t);
        }
    };
}

const Wr = s.DI.createInterface("IAurelia");

class Aurelia {
    constructor(t = s.DI.createContainer()) {
        this.container = t;
        this.ir = false;
        this.ti = false;
        this.ei = false;
        this.si = void 0;
        this.next = void 0;
        this.ii = void 0;
        this.ni = void 0;
        if (t.has(Wr, true)) throw new Error("AUR0768");
        t.registerResolver(Wr, new s.InstanceProvider("IAurelia", this));
        t.registerResolver(Ge, this.ri = new s.InstanceProvider("IAppRoot"));
    }
    get isRunning() {
        return this.ir;
    }
    get isStarting() {
        return this.ti;
    }
    get isStopping() {
        return this.ei;
    }
    get root() {
        if (null == this.si) {
            if (null == this.next) throw new Error("AUR0767");
            return this.next;
        }
        return this.si;
    }
    register(...t) {
        this.container.register(...t);
        return this;
    }
    app(t) {
        this.next = new AppRoot(t, this.oi(t.host), this.container, this.ri);
        return this;
    }
    enhance(t, e) {
        var i;
        const n = null !== (i = t.container) && void 0 !== i ? i : this.container.createChild();
        const r = t.host;
        const o = this.oi(r);
        const l = t.component;
        let h;
        if (y(l)) {
            n.registerResolver(o.HTMLElement, n.registerResolver(o.Element, n.registerResolver(Ze, new s.InstanceProvider("ElementResolver", r))));
            h = n.invoke(l);
        } else h = l;
        n.registerResolver(Je, new s.InstanceProvider("IEventTarget", r));
        e = null !== e && void 0 !== e ? e : null;
        const c = Controller.$el(n, h, r, null, CustomElementDefinition.create({
            name: Zt.generateName(),
            template: r,
            enhance: true
        }));
        return s.onResolve(c.activate(c, e, 2), (() => c));
    }
    async waitForIdle() {
        const t = this.root.platform;
        await t.domWriteQueue.yield();
        await t.domReadQueue.yield();
        await t.taskQueue.yield();
    }
    oi(t) {
        let i;
        if (!this.container.has(N, false)) {
            if (null === t.ownerDocument.defaultView) throw new Error("AUR0769");
            i = new e.BrowserPlatform(t.ownerDocument.defaultView);
            this.container.register(s.Registration.instance(N, i));
        } else i = this.container.get(N);
        return i;
    }
    start(t = this.next) {
        if (null == t) throw new Error("AUR0770");
        if (this.ii instanceof Promise) return this.ii;
        return this.ii = s.onResolve(this.stop(), (() => {
            Reflect.set(t.host, "$aurelia", this);
            this.ri.prepare(this.si = t);
            this.ti = true;
            return s.onResolve(t.activate(), (() => {
                this.ir = true;
                this.ti = false;
                this.ii = void 0;
                this.li(t, "au-started", t.host);
            }));
        }));
    }
    stop(t = false) {
        if (this.ni instanceof Promise) return this.ni;
        if (true === this.ir) {
            const e = this.si;
            this.ir = false;
            this.ei = true;
            return this.ni = s.onResolve(e.deactivate(), (() => {
                Reflect.deleteProperty(e.host, "$aurelia");
                if (t) e.dispose();
                this.si = void 0;
                this.ri.dispose();
                this.ei = false;
                this.li(e, "au-stopped", e.host);
            }));
        }
    }
    dispose() {
        if (this.ir || this.ei) throw new Error("AUR0771");
        this.container.dispose();
    }
    li(t, e, s) {
        const i = new t.platform.window.CustomEvent(e, {
            detail: this,
            bubbles: true,
            cancelable: true
        });
        s.dispatchEvent(i);
    }
}

exports.DefinitionType = void 0;

(function(t) {
    t[t["Element"] = 1] = "Element";
    t[t["Attribute"] = 2] = "Attribute";
})(exports.DefinitionType || (exports.DefinitionType = {}));

const Hr = s.DI.createInterface("IDialogService");

const zr = s.DI.createInterface("IDialogController");

const Gr = s.DI.createInterface("IDialogDomRenderer");

const Xr = s.DI.createInterface("IDialogDom");

const Kr = s.DI.createInterface("IDialogGlobalSettings");

class DialogOpenResult {
    constructor(t, e) {
        this.wasCancelled = t;
        this.dialog = e;
    }
    static create(t, e) {
        return new DialogOpenResult(t, e);
    }
}

class DialogCloseResult {
    constructor(t, e) {
        this.status = t;
        this.value = e;
    }
    static create(t, e) {
        return new DialogCloseResult(t, e);
    }
}

exports.DialogDeactivationStatuses = void 0;

(function(t) {
    t["Ok"] = "ok";
    t["Error"] = "error";
    t["Cancel"] = "cancel";
    t["Abort"] = "abort";
})(exports.DialogDeactivationStatuses || (exports.DialogDeactivationStatuses = {}));

class DialogController {
    constructor(t, e) {
        this.p = t;
        this.ctn = e;
        this.closed = new Promise(((t, e) => {
            this.Ot = t;
            this.Bt = e;
        }));
    }
    static get inject() {
        return [ N, s.IContainer ];
    }
    activate(t) {
        var e;
        const i = this.ctn.createChild();
        const {model: n, template: r, rejectOnCancel: o} = t;
        const l = i.get(Gr);
        const h = null !== (e = t.host) && void 0 !== e ? e : this.p.document.body;
        const c = this.dom = l.render(h, t);
        const a = i.has(Je, true) ? i.get(Je) : null;
        const u = c.contentHost;
        this.settings = t;
        if (null == a || !a.contains(h)) i.register(s.Registration.instance(Je, h));
        i.register(s.Registration.instance(Ze, u), s.Registration.instance(Xr, c));
        return new Promise((e => {
            var s, r;
            const o = Object.assign(this.cmp = this.getOrCreateVm(i, t, u), {
                $dialog: this
            });
            e(null !== (r = null === (s = o.canActivate) || void 0 === s ? void 0 : s.call(o, n)) && void 0 !== r ? r : true);
        })).then((e => {
            var l;
            if (true !== e) {
                c.dispose();
                if (o) throw Yr(null, "Dialog activation rejected");
                return DialogOpenResult.create(true, this);
            }
            const h = this.cmp;
            return s.onResolve(null === (l = h.activate) || void 0 === l ? void 0 : l.call(h, n), (() => {
                var e;
                const n = this.controller = Controller.$el(i, h, u, null, CustomElementDefinition.create(null !== (e = this.getDefinition(h)) && void 0 !== e ? e : {
                    name: Zt.generateName(),
                    template: r
                }));
                return s.onResolve(n.activate(n, null, 2), (() => {
                    var e;
                    c.overlay.addEventListener(null !== (e = t.mouseEvent) && void 0 !== e ? e : "click", this);
                    return DialogOpenResult.create(false, this);
                }));
            }));
        }), (t => {
            c.dispose();
            throw t;
        }));
    }
    deactivate(t, e) {
        if (this.hi) return this.hi;
        let i = true;
        const {controller: n, dom: r, cmp: o, settings: {mouseEvent: l, rejectOnCancel: h}} = this;
        const c = DialogCloseResult.create(t, e);
        const a = new Promise((a => {
            var u, f;
            a(s.onResolve(null !== (f = null === (u = o.canDeactivate) || void 0 === u ? void 0 : u.call(o, c)) && void 0 !== f ? f : true, (a => {
                var u;
                if (true !== a) {
                    i = false;
                    this.hi = void 0;
                    if (h) throw Yr(null, "Dialog cancellation rejected");
                    return DialogCloseResult.create("abort");
                }
                return s.onResolve(null === (u = o.deactivate) || void 0 === u ? void 0 : u.call(o, c), (() => s.onResolve(n.deactivate(n, null, 4), (() => {
                    r.dispose();
                    r.overlay.removeEventListener(null !== l && void 0 !== l ? l : "click", this);
                    if (!h && "error" !== t) this.Ot(c); else this.Bt(Yr(e, "Dialog cancelled with a rejection on cancel"));
                    return c;
                }))));
            })));
        })).catch((t => {
            this.hi = void 0;
            throw t;
        }));
        this.hi = i ? a : void 0;
        return a;
    }
    ok(t) {
        return this.deactivate("ok", t);
    }
    cancel(t) {
        return this.deactivate("cancel", t);
    }
    error(t) {
        const e = Zr(t);
        return new Promise((t => {
            var i, n;
            return t(s.onResolve(null === (n = (i = this.cmp).deactivate) || void 0 === n ? void 0 : n.call(i, DialogCloseResult.create("error", e)), (() => s.onResolve(this.controller.deactivate(this.controller, null, 4), (() => {
                this.dom.dispose();
                this.Bt(e);
            })))));
        }));
    }
    handleEvent(t) {
        if (this.settings.overlayDismiss && !this.dom.contentHost.contains(t.target)) this.cancel();
    }
    getOrCreateVm(t, e, i) {
        const n = e.component;
        if (null == n) return new EmptyComponent;
        if ("object" === typeof n) return n;
        const r = this.p;
        t.registerResolver(r.HTMLElement, t.registerResolver(r.Element, t.registerResolver(Ze, new s.InstanceProvider("ElementResolver", i))));
        return t.invoke(n);
    }
    getDefinition(t) {
        const e = y(t) ? t : null === t || void 0 === t ? void 0 : t.constructor;
        return Zt.isType(e) ? Zt.getDefinition(e) : null;
    }
}

class EmptyComponent {}

function Yr(t, e) {
    const s = new Error(e);
    s.wasCancelled = true;
    s.value = t;
    return s;
}

function Zr(t) {
    const e = new Error;
    e.wasCancelled = false;
    e.value = t;
    return e;
}

class DialogService {
    constructor(t, e, s) {
        this.ut = t;
        this.p = e;
        this.ai = s;
        this.dlgs = [];
    }
    get controllers() {
        return this.dlgs.slice(0);
    }
    get top() {
        const t = this.dlgs;
        return t.length > 0 ? t[t.length - 1] : null;
    }
    static get inject() {
        return [ s.IContainer, N, Kr ];
    }
    static register(t) {
        t.register(s.Registration.singleton(Hr, this), pt.beforeDeactivate(Hr, (t => s.onResolve(t.closeAll(), (t => {
            if (t.length > 0) throw new Error(`AUR0901:${t.length}`);
        })))));
    }
    open(t) {
        return Qr(new Promise((e => {
            var i;
            const n = DialogSettings.from(this.ai, t);
            const r = null !== (i = n.container) && void 0 !== i ? i : this.ut.createChild();
            e(s.onResolve(n.load(), (t => {
                const e = r.invoke(DialogController);
                r.register(s.Registration.instance(zr, e));
                r.register(s.Registration.callback(DialogController, (() => {
                    throw new Error("AUR0902");
                })));
                return s.onResolve(e.activate(t), (t => {
                    if (!t.wasCancelled) {
                        if (1 === this.dlgs.push(e)) this.p.window.addEventListener("keydown", this);
                        const t = () => this.remove(e);
                        e.closed.then(t, t);
                    }
                    return t;
                }));
            })));
        })));
    }
    closeAll() {
        return Promise.all(Array.from(this.dlgs).map((t => {
            if (t.settings.rejectOnCancel) return t.cancel().then((() => null));
            return t.cancel().then((e => "cancel" === e.status ? null : t));
        }))).then((t => t.filter((t => !!t))));
    }
    remove(t) {
        const e = this.dlgs;
        const s = e.indexOf(t);
        if (s > -1) this.dlgs.splice(s, 1);
        if (0 === e.length) this.p.window.removeEventListener("keydown", this);
    }
    handleEvent(t) {
        const e = t;
        const s = to(e);
        if (null == s) return;
        const i = this.top;
        if (null === i || 0 === i.settings.keyboard.length) return;
        const n = i.settings.keyboard;
        if ("Escape" === s && n.includes(s)) void i.cancel(); else if ("Enter" === s && n.includes(s)) void i.ok();
    }
}

class DialogSettings {
    static from(...t) {
        return Object.assign(new DialogSettings, ...t).fi().ui();
    }
    load() {
        const t = this;
        const e = this.component;
        const i = this.template;
        const n = s.resolveAll(null == e ? void 0 : s.onResolve(e(), (e => {
            t.component = e;
        })), y(i) ? s.onResolve(i(), (e => {
            t.template = e;
        })) : void 0);
        return n instanceof Promise ? n.then((() => t)) : t;
    }
    fi() {
        if (null == this.component && null == this.template) throw new Error("AUR0903");
        return this;
    }
    ui() {
        if (null == this.keyboard) this.keyboard = this.lock ? [] : [ "Enter", "Escape" ];
        if ("boolean" !== typeof this.overlayDismiss) this.overlayDismiss = !this.lock;
        return this;
    }
}

function Jr(t, e) {
    return this.then((s => s.dialog.closed.then(t, e)), e);
}

function Qr(t) {
    t.whenClosed = Jr;
    return t;
}

function to(t) {
    if ("Escape" === (t.code || t.key) || 27 === t.keyCode) return "Escape";
    if ("Enter" === (t.code || t.key) || 13 === t.keyCode) return "Enter";
    return;
}

class DefaultDialogGlobalSettings {
    constructor() {
        this.lock = true;
        this.startingZIndex = 1e3;
        this.rejectOnCancel = false;
    }
    static register(t) {
        s.Registration.singleton(Kr, this).register(t);
    }
}

const eo = "position:absolute;width:100%;height:100%;top:0;left:0;";

class DefaultDialogDomRenderer {
    constructor(t) {
        this.p = t;
        this.wrapperCss = `${eo} display:flex;`;
        this.overlayCss = eo;
        this.hostCss = "position:relative;margin:auto;";
    }
    static register(t) {
        s.Registration.singleton(Gr, this).register(t);
    }
    render(t) {
        const e = this.p.document;
        const s = (t, s) => {
            const i = e.createElement(t);
            i.style.cssText = s;
            return i;
        };
        const i = t.appendChild(s("au-dialog-container", this.wrapperCss));
        const n = i.appendChild(s("au-dialog-overlay", this.overlayCss));
        const r = i.appendChild(s("div", this.hostCss));
        return new DefaultDialogDom(i, n, r);
    }
}

DefaultDialogDomRenderer.inject = [ N ];

class DefaultDialogDom {
    constructor(t, e, s) {
        this.wrapper = t;
        this.overlay = e;
        this.contentHost = s;
    }
    dispose() {
        this.wrapper.remove();
    }
}

function so(t, e) {
    return {
        settingsProvider: t,
        register: s => s.register(...e, pt.beforeCreate((() => t(s.get(Kr))))),
        customize(t, s) {
            return so(t, null !== s && void 0 !== s ? s : e);
        }
    };
}

const io = so((() => {
    throw new Error("AUR0904");
}), [ class NoopDialogGlobalSettings {
    static register(t) {
        t.register(s.Registration.singleton(Kr, this));
    }
} ]);

const no = so(s.noop, [ DialogService, DefaultDialogGlobalSettings, DefaultDialogDomRenderer ]);

const ro = s.DI.createInterface((t => t.singleton(WcCustomElementRegistry)));

class WcCustomElementRegistry {
    constructor(t, e, s) {
        this.ctn = t;
        this.p = e;
        this.r = s;
    }
    define(t, e, i) {
        if (!t.includes("-")) throw new Error('Invalid web-components custom element name. It must include a "-"');
        let n;
        if (null == e) throw new Error("Invalid custom element definition");
        switch (typeof e) {
          case "function":
            n = Zt.isType(e) ? Zt.getDefinition(e) : CustomElementDefinition.create(Zt.generateName(), e);
            break;

          default:
            n = CustomElementDefinition.getOrCreate(e);
            break;
        }
        if (n.containerless) throw new Error("Containerless custom element is not supported. Consider using buitl-in extends instead");
        const r = !(null === i || void 0 === i ? void 0 : i.extends) ? HTMLElement : this.p.document.createElement(i.extends).constructor;
        const o = this.ctn;
        const l = this.r;
        const h = n.bindables;
        const c = this.p;
        class CustomElementClass extends r {
            auInit() {
                if (this.auInited) return;
                this.auInited = true;
                const t = o.createChild();
                t.registerResolver(c.HTMLElement, t.registerResolver(c.Element, t.registerResolver(Ze, new s.InstanceProvider("ElementProvider", this))));
                const e = l.compile(n, t, {
                    projections: null
                });
                const i = t.invoke(e.Type);
                const r = this.auCtrl = Controller.$el(t, i, this, null, e);
                Ye(this, e.key, r);
            }
            connectedCallback() {
                this.auInit();
                this.auCtrl.activate(this.auCtrl, null, 0);
            }
            disconnectedCallback() {
                this.auCtrl.deactivate(this.auCtrl, null, 0);
            }
            adoptedCallback() {
                this.auInit();
            }
            attributeChangedCallback(t, e, s) {
                this.auInit();
                this.auCtrl.viewModel[t] = s;
            }
        }
        CustomElementClass.observedAttributes = Object.keys(h);
        for (const t in h) Object.defineProperty(CustomElementClass.prototype, t, {
            configurable: true,
            enumerable: false,
            get() {
                return this["auCtrl"].viewModel[t];
            },
            set(e) {
                if (!this["auInited"]) this["auInit"]();
                this["auCtrl"].viewModel[t] = e;
            }
        });
        this.p.customElements.define(t, CustomElementClass, i);
        return CustomElementClass;
    }
}

WcCustomElementRegistry.inject = [ s.IContainer, N, Se ];

exports.Platform = t.Platform;

exports.Task = t.Task;

exports.TaskAbortError = t.TaskAbortError;

exports.TaskQueue = t.TaskQueue;

exports.TaskQueuePriority = t.TaskQueuePriority;

exports.TaskStatus = t.TaskStatus;

exports.BrowserPlatform = e.BrowserPlatform;

exports.Access = i.Access;

exports.AccessKeyedExpression = i.AccessKeyedExpression;

exports.AccessMemberExpression = i.AccessMemberExpression;

exports.AccessScopeExpression = i.AccessScopeExpression;

exports.AccessThisExpression = i.AccessThisExpression;

exports.AccessorType = i.AccessorType;

exports.ArrayBindingPattern = i.ArrayBindingPattern;

exports.ArrayIndexObserver = i.ArrayIndexObserver;

exports.ArrayLiteralExpression = i.ArrayLiteralExpression;

exports.ArrayObserver = i.ArrayObserver;

exports.AssignExpression = i.AssignExpression;

exports.BinaryExpression = i.BinaryExpression;

exports.BindingBehavior = i.BindingBehavior;

exports.BindingBehaviorDefinition = i.BindingBehaviorDefinition;

exports.BindingBehaviorExpression = i.BindingBehaviorExpression;

exports.BindingBehaviorFactory = i.BindingBehaviorFactory;

exports.BindingBehaviorStrategy = i.BindingBehaviorStrategy;

exports.BindingContext = i.BindingContext;

exports.BindingIdentifier = i.BindingIdentifier;

exports.BindingInterceptor = i.BindingInterceptor;

exports.BindingMediator = i.BindingMediator;

exports.BindingMode = i.BindingMode;

exports.CallFunctionExpression = i.CallFunctionExpression;

exports.CallMemberExpression = i.CallMemberExpression;

exports.CallScopeExpression = i.CallScopeExpression;

exports.Char = i.Char;

exports.CollectionKind = i.CollectionKind;

exports.CollectionLengthObserver = i.CollectionLengthObserver;

exports.CollectionSizeObserver = i.CollectionSizeObserver;

exports.ComputedObserver = i.ComputedObserver;

exports.ConditionalExpression = i.ConditionalExpression;

exports.CustomExpression = i.CustomExpression;

exports.DelegationStrategy = i.DelegationStrategy;

exports.DirtyCheckProperty = i.DirtyCheckProperty;

exports.DirtyCheckSettings = i.DirtyCheckSettings;

exports.ExpressionKind = i.ExpressionKind;

exports.ExpressionType = i.ExpressionType;

exports.ForOfStatement = i.ForOfStatement;

exports.HtmlLiteralExpression = i.HtmlLiteralExpression;

exports.IDirtyChecker = i.IDirtyChecker;

exports.IExpressionParser = i.IExpressionParser;

exports.INodeObserverLocator = i.INodeObserverLocator;

exports.IObserverLocator = i.IObserverLocator;

exports.ISignaler = i.ISignaler;

exports.Interpolation = i.Interpolation;

exports.LifecycleFlags = i.LifecycleFlags;

exports.MapObserver = i.MapObserver;

exports.ObjectBindingPattern = i.ObjectBindingPattern;

exports.ObjectLiteralExpression = i.ObjectLiteralExpression;

exports.ObserverLocator = i.ObserverLocator;

exports.OverrideContext = i.OverrideContext;

exports.Precedence = i.Precedence;

exports.PrimitiveLiteralExpression = i.PrimitiveLiteralExpression;

exports.PrimitiveObserver = i.PrimitiveObserver;

exports.PropertyAccessor = i.PropertyAccessor;

exports.Scope = i.Scope;

exports.SetObserver = i.SetObserver;

exports.SetterObserver = i.SetterObserver;

exports.TaggedTemplateExpression = i.TaggedTemplateExpression;

exports.TemplateExpression = i.TemplateExpression;

exports.UnaryExpression = i.UnaryExpression;

exports.ValueConverter = i.ValueConverter;

exports.ValueConverterDefinition = i.ValueConverterDefinition;

exports.ValueConverterExpression = i.ValueConverterExpression;

exports.alias = i.alias;

exports.applyMutationsToIndices = i.applyMutationsToIndices;

exports.bindingBehavior = i.bindingBehavior;

exports.cloneIndexMap = i.cloneIndexMap;

exports.connectable = i.connectable;

exports.copyIndexMap = i.copyIndexMap;

exports.createIndexMap = i.createIndexMap;

exports.disableArrayObservation = i.disableArrayObservation;

exports.disableMapObservation = i.disableMapObservation;

exports.disableSetObservation = i.disableSetObservation;

exports.enableArrayObservation = i.enableArrayObservation;

exports.enableMapObservation = i.enableMapObservation;

exports.enableSetObservation = i.enableSetObservation;

exports.getCollectionObserver = i.getCollectionObserver;

exports.isIndexMap = i.isIndexMap;

exports.observable = i.observable;

exports.parseExpression = i.parseExpression;

exports.registerAliases = i.registerAliases;

exports.subscriberCollection = i.subscriberCollection;

exports.synchronizeIndices = i.synchronizeIndices;

exports.valueConverter = i.valueConverter;

exports.AdoptedStyleSheetsStyles = AdoptedStyleSheetsStyles;

exports.AppRoot = AppRoot;

exports.AppTask = pt;

exports.AtPrefixedTriggerAttributePatternRegistration = En;

exports.AttrBindingBehavior = AttrBindingBehavior;

exports.AttrBindingBehaviorRegistration = pr;

exports.AttrBindingCommandRegistration = Hn;

exports.AttrSyntax = AttrSyntax;

exports.AttributeBinding = AttributeBinding;

exports.AttributeBindingInstruction = AttributeBindingInstruction;

exports.AttributeBindingRendererRegistration = Or;

exports.AttributeNSAccessor = AttributeNSAccessor;

exports.AttributePattern = V;

exports.AuCompose = AuCompose;

exports.AuRender = AuRender;

exports.AuRenderRegistration = xr;

exports.AuSlot = AuSlot;

exports.AuSlotsInfo = AuSlotsInfo;

exports.Aurelia = Aurelia;

exports.Bindable = S;

exports.BindableDefinition = BindableDefinition;

exports.BindableObserver = BindableObserver;

exports.BindablesInfo = BindablesInfo;

exports.BindingCommand = ii;

exports.BindingCommandDefinition = BindingCommandDefinition;

exports.BindingModeBehavior = BindingModeBehavior;

exports.CSSModulesProcessorRegistry = CSSModulesProcessorRegistry;

exports.CallBinding = CallBinding;

exports.CallBindingCommandRegistration = On;

exports.CallBindingInstruction = CallBindingInstruction;

exports.CallBindingRendererRegistration = Cr;

exports.CaptureBindingCommandRegistration = Wn;

exports.CheckedObserver = CheckedObserver;

exports.Children = wt;

exports.ChildrenDefinition = ChildrenDefinition;

exports.ChildrenObserver = ChildrenObserver;

exports.ClassAttributeAccessor = ClassAttributeAccessor;

exports.ClassBindingCommandRegistration = zn;

exports.ColonPrefixedBindAttributePatternRegistration = Bn;

exports.ComputedWatcher = ComputedWatcher;

exports.Controller = Controller;

exports.CustomAttribute = Dt;

exports.CustomAttributeDefinition = CustomAttributeDefinition;

exports.CustomAttributeRendererRegistration = Ar;

exports.CustomElement = Zt;

exports.CustomElementDefinition = CustomElementDefinition;

exports.CustomElementRendererRegistration = Rr;

exports.DataAttributeAccessor = DataAttributeAccessor;

exports.DebounceBindingBehavior = DebounceBindingBehavior;

exports.DebounceBindingBehaviorRegistration = vn;

exports.DefaultBindingCommandRegistration = Ln;

exports.DefaultBindingLanguage = Kn;

exports.DefaultBindingSyntax = Pn;

exports.DefaultComponents = Rn;

exports.DefaultDialogDom = DefaultDialogDom;

exports.DefaultDialogDomRenderer = DefaultDialogDomRenderer;

exports.DefaultDialogGlobalSettings = DefaultDialogGlobalSettings;

exports.DefaultRenderers = Vr;

exports.DefaultResources = kr;

exports.DelegateBindingCommandRegistration = Nn;

exports.DialogCloseResult = DialogCloseResult;

exports.DialogConfiguration = io;

exports.DialogController = DialogController;

exports.DialogDefaultConfiguration = no;

exports.DialogOpenResult = DialogOpenResult;

exports.DialogService = DialogService;

exports.DotSeparatedAttributePatternRegistration = Tn;

exports.Else = Else;

exports.ElseRegistration = er;

exports.EventDelegator = EventDelegator;

exports.EventSubscriber = EventSubscriber;

exports.ExpressionWatcher = ExpressionWatcher;

exports.Focus = Focus;

exports.ForBindingCommandRegistration = qn;

exports.FragmentNodeSequence = FragmentNodeSequence;

exports.FrequentMutations = FrequentMutations;

exports.FromViewBindingBehavior = FromViewBindingBehavior;

exports.FromViewBindingBehaviorRegistration = wn;

exports.FromViewBindingCommandRegistration = Un;

exports.HydrateAttributeInstruction = HydrateAttributeInstruction;

exports.HydrateElementInstruction = HydrateElementInstruction;

exports.HydrateLetElementInstruction = HydrateLetElementInstruction;

exports.HydrateTemplateController = HydrateTemplateController;

exports.IAppRoot = Ge;

exports.IAppTask = dt;

exports.IAttrMapper = z;

exports.IAttributeParser = q;

exports.IAttributePattern = L;

exports.IAuSlotsInfo = fs;

exports.IAurelia = Wr;

exports.IController = Ve;

exports.IDialogController = zr;

exports.IDialogDom = Xr;

exports.IDialogDomRenderer = Gr;

exports.IDialogGlobalSettings = Kr;

exports.IDialogService = Hr;

exports.IEventDelegator = as;

exports.IEventTarget = Je;

exports.IHistory = ls;

exports.IHydrationContext = je;

exports.IInstruction = ds;

exports.ILifecycleHooks = de;

exports.ILocation = os;

exports.INode = Ze;

exports.INodeObserverLocatorRegistration = An;

exports.IPlatform = N;

exports.IProjections = us;

exports.IRenderLocation = Qe;

exports.IRenderer = vs;

exports.IRendering = Se;

exports.ISVGAnalyzer = W;

exports.ISanitizer = mn;

exports.IShadowDOMGlobalStyles = le;

exports.IShadowDOMStyleFactory = re;

exports.IShadowDOMStyles = oe;

exports.ISyntaxInterpreter = P;

exports.ITemplateCompiler = ms;

exports.ITemplateCompilerHooks = ki;

exports.ITemplateCompilerRegistration = Cn;

exports.ITemplateElementFactory = oi;

exports.IViewFactory = ge;

exports.IViewLocator = Re;

exports.IWcElementRegistry = ro;

exports.IWindow = rs;

exports.IWorkTracker = Xe;

exports.If = If;

exports.IfRegistration = tr;

exports.InterpolationBinding = InterpolationBinding;

exports.InterpolationBindingRendererRegistration = Sr;

exports.InterpolationInstruction = InterpolationInstruction;

exports.Interpretation = Interpretation;

exports.IteratorBindingInstruction = IteratorBindingInstruction;

exports.IteratorBindingRendererRegistration = Er;

exports.LetBinding = LetBinding;

exports.LetBindingInstruction = LetBindingInstruction;

exports.LetElementRendererRegistration = Br;

exports.LifecycleHooks = ve;

exports.LifecycleHooksDefinition = LifecycleHooksDefinition;

exports.LifecycleHooksEntry = LifecycleHooksEntry;

exports.Listener = Listener;

exports.ListenerBindingInstruction = ListenerBindingInstruction;

exports.ListenerBindingRendererRegistration = $r;

exports.NodeObserverConfig = NodeObserverConfig;

exports.NodeObserverLocator = NodeObserverLocator;

exports.NoopSVGAnalyzer = NoopSVGAnalyzer;

exports.ObserveShallow = ObserveShallow;

exports.OneTimeBindingBehavior = OneTimeBindingBehavior;

exports.OneTimeBindingBehaviorRegistration = xn;

exports.OneTimeBindingCommandRegistration = Fn;

exports.Portal = Portal;

exports.PropertyBinding = PropertyBinding;

exports.PropertyBindingInstruction = PropertyBindingInstruction;

exports.PropertyBindingRendererRegistration = Ir;

exports.RefAttributePatternRegistration = In;

exports.RefBinding = RefBinding;

exports.RefBindingCommandRegistration = Vn;

exports.RefBindingInstruction = RefBindingInstruction;

exports.RefBindingRendererRegistration = Tr;

exports.RenderPlan = RenderPlan;

exports.Rendering = Rendering;

exports.Repeat = Repeat;

exports.RepeatRegistration = sr;

exports.SVGAnalyzer = SVGAnalyzer;

exports.SVGAnalyzerRegistration = Sn;

exports.SanitizeValueConverterRegistration = Yn;

exports.SelectValueObserver = SelectValueObserver;

exports.SelfBindingBehavior = SelfBindingBehavior;

exports.SelfBindingBehaviorRegistration = mr;

exports.SetAttributeInstruction = SetAttributeInstruction;

exports.SetAttributeRendererRegistration = Lr;

exports.SetClassAttributeInstruction = SetClassAttributeInstruction;

exports.SetClassAttributeRendererRegistration = qr;

exports.SetPropertyInstruction = SetPropertyInstruction;

exports.SetPropertyRendererRegistration = Dr;

exports.SetStyleAttributeInstruction = SetStyleAttributeInstruction;

exports.SetStyleAttributeRendererRegistration = Ur;

exports.ShadowDOMRegistry = ShadowDOMRegistry;

exports.ShortHandBindingSyntax = $n;

exports.SignalBindingBehavior = SignalBindingBehavior;

exports.SignalBindingBehaviorRegistration = bn;

exports.StandardConfiguration = jr;

exports.StyleAttributeAccessor = StyleAttributeAccessor;

exports.StyleBindingCommandRegistration = Gn;

exports.StyleConfiguration = he;

exports.StyleElementStyles = StyleElementStyles;

exports.StylePropertyBindingInstruction = StylePropertyBindingInstruction;

exports.StylePropertyBindingRendererRegistration = Fr;

exports.TemplateCompiler = TemplateCompiler;

exports.TemplateCompilerHooks = Ri;

exports.TemplateControllerRendererRegistration = Pr;

exports.TextBindingInstruction = TextBindingInstruction;

exports.TextBindingRendererRegistration = _r;

exports.ThrottleBindingBehavior = ThrottleBindingBehavior;

exports.ThrottleBindingBehaviorRegistration = yn;

exports.ToViewBindingBehavior = ToViewBindingBehavior;

exports.ToViewBindingBehaviorRegistration = gn;

exports.ToViewBindingCommandRegistration = _n;

exports.TriggerBindingCommandRegistration = jn;

exports.TwoWayBindingBehavior = TwoWayBindingBehavior;

exports.TwoWayBindingBehaviorRegistration = kn;

exports.TwoWayBindingCommandRegistration = Mn;

exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;

exports.UpdateTriggerBindingBehaviorRegistration = vr;

exports.ValueAttributeObserver = ValueAttributeObserver;

exports.ViewFactory = ViewFactory;

exports.ViewLocator = ViewLocator;

exports.ViewValueConverterRegistration = Zn;

exports.Views = Ce;

exports.Watch = Lt;

exports.WcCustomElementRegistry = WcCustomElementRegistry;

exports.With = With;

exports.WithRegistration = ir;

exports.allResources = hi;

exports.attributePattern = U;

exports.bindable = C;

exports.bindingCommand = Qs;

exports.children = vt;

exports.coercer = E;

exports.containerless = Ft;

exports.convertToRenderLocation = is;

exports.createElement = hn;

exports.cssModules = ie;

exports.customAttribute = St;

exports.customElement = qt;

exports.getEffectiveParentNode = es;

exports.getRef = Ke;

exports.isCustomElementController = qe;

exports.isCustomElementViewModel = Ue;

exports.isInstruction = ps;

exports.isRenderLocation = ns;

exports.lifecycleHooks = xe;

exports.processContent = Qt;

exports.renderer = xs;

exports.setEffectiveParentNode = ss;

exports.setRef = Ye;

exports.shadowCSS = ne;

exports.templateCompilerHooks = Si;

exports.templateController = Et;

exports.useShadowDOM = Ut;

exports.view = Ae;

exports.watch = Pt;
//# sourceMappingURL=index.js.map
