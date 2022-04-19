"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/runtime-html");

var i = require("@aurelia/route-recognizer");

class Batch {
    constructor(t, e, i) {
        this.stack = t;
        this.cb = e;
        this.done = false;
        this.next = null;
        this.head = null !== i && void 0 !== i ? i : this;
    }
    static start(t) {
        return new Batch(0, t, null);
    }
    push() {
        let t = this;
        do {
            ++t.stack;
            t = t.next;
        } while (null !== t);
    }
    pop() {
        let t = this;
        do {
            if (0 === --t.stack) t.invoke();
            t = t.next;
        } while (null !== t);
    }
    invoke() {
        const t = this.cb;
        if (null !== t) {
            this.cb = null;
            t(this);
            this.done = true;
        }
    }
    continueWith(t) {
        if (null === this.next) return this.next = new Batch(this.stack, t, this.head); else return this.next.continueWith(t);
    }
    start() {
        this.head.push();
        this.head.pop();
        return this;
    }
}

function s(t, e) {
    t = t.slice();
    e = e.slice();
    const i = [];
    while (t.length > 0) {
        const s = t.shift();
        if (i.every((t => t.context.vpa !== s.context.vpa))) {
            const t = e.findIndex((t => t.context.vpa === s.context.vpa));
            if (t >= 0) i.push(...e.splice(0, t + 1)); else i.push(s);
        }
    }
    i.push(...e);
    return i;
}

function n(t) {
    try {
        return JSON.stringify(t);
    } catch (e) {
        return Object.prototype.toString.call(t);
    }
}

function o(t) {
    return "string" === typeof t ? [ t ] : t;
}

function r(t) {
    return "string" === typeof t ? t : t[0];
}

function h(t) {
    return "object" === typeof t && null !== t && !e.isCustomElementViewModel(t);
}

function a(t) {
    return h(t) && true === Object.prototype.hasOwnProperty.call(t, "name");
}

function c(t) {
    return h(t) && true === Object.prototype.hasOwnProperty.call(t, "component");
}

function u(t) {
    return h(t) && true === Object.prototype.hasOwnProperty.call(t, "redirectTo");
}

function l(t) {
    return h(t) && true === Object.prototype.hasOwnProperty.call(t, "component");
}

function d(t, e, i) {
    throw new Error(`Invalid route config property: "${e}". Expected ${t}, but got ${n(i)}.`);
}

function f(t, e) {
    if (null === t || void 0 === t) throw new Error(`Invalid route config: expected an object or string, but got: ${String(t)}.`);
    const i = Object.keys(t);
    for (const s of i) {
        const i = t[s];
        const n = [ e, s ].join(".");
        switch (s) {
          case "id":
          case "viewport":
          case "redirectTo":
          case "fallback":
            if ("string" !== typeof i) d("string", n, i);
            break;

          case "caseSensitive":
            if ("boolean" !== typeof i) d("boolean", n, i);
            break;

          case "data":
            if ("object" !== typeof i || null === i) d("object", n, i);
            break;

          case "title":
            switch (typeof i) {
              case "string":
              case "function":
                break;

              default:
                d("string or function", n, i);
            }
            break;

          case "path":
            if (i instanceof Array) {
                for (let t = 0; t < i.length; ++t) if ("string" !== typeof i[t]) d("string", `${n}[${t}]`, i[t]);
            } else if ("string" !== typeof i) d("string or Array of strings", n, i);
            break;

          case "component":
            v(i, n);
            break;

          case "routes":
            if (!(i instanceof Array)) d("Array", n, i);
            for (const t of i) {
                const e = `${n}[${i.indexOf(t)}]`;
                v(t, e);
            }
            break;

          case "transitionPlan":
            switch (typeof i) {
              case "string":
                switch (i) {
                  case "none":
                  case "replace":
                  case "invoke-lifecycles":
                    break;

                  default:
                    d("string('none'|'replace'|'invoke-lifecycles') or function", n, i);
                }
                break;

              case "function":
                break;

              default:
                d("string('none'|'replace'|'invoke-lifecycles') or function", n, i);
            }
            break;

          default:
            throw new Error(`Unknown route config property: "${e}.${s}". Please specify known properties only.`);
        }
    }
}

function p(t, e) {
    if (null === t || void 0 === t) throw new Error(`Invalid route config: expected an object or string, but got: ${String(t)}.`);
    const i = Object.keys(t);
    for (const s of i) {
        const i = t[s];
        const n = [ e, s ].join(".");
        switch (s) {
          case "path":
          case "redirectTo":
            if ("string" !== typeof i) d("string", n, i);
            break;

          default:
            throw new Error(`Unknown redirect config property: "${e}.${s}". Only 'path' and 'redirectTo' should be specified for redirects.`);
        }
    }
}

function v(t, i) {
    switch (typeof t) {
      case "function":
        break;

      case "object":
        if (t instanceof Promise) break;
        if (u(t)) {
            p(t, i);
            break;
        }
        if (c(t)) {
            f(t, i);
            break;
        }
        if (!e.isCustomElementViewModel(t) && !a(t)) d(`an object with at least a 'component' property (see Routeable)`, i, t);
        break;

      case "string":
        break;

      default:
        d("function, object or string (see Routeable)", i, t);
    }
}

function g(t, e) {
    if (t === e) return true;
    if (typeof t !== typeof e) return false;
    if (null === t || null === e) return false;
    if (Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return false;
    const i = Object.keys(t);
    const s = Object.keys(e);
    if (i.length !== s.length) return false;
    for (let n = 0, o = i.length; n < o; ++n) {
        const o = i[n];
        if (o !== s[n]) return false;
        if (t[o] !== e[o]) return false;
    }
    return true;
}

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
***************************************************************************** */ function w(t, e, i, s) {
    var n = arguments.length, o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s); else for (var h = t.length - 1; h >= 0; h--) if (r = t[h]) o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o;
    return n > 3 && o && Object.defineProperty(e, i, o), o;
}

function m(t, e) {
    return function(i, s) {
        e(i, s, t);
    };
}

class Subscription {
    constructor(t, e, i) {
        this.events = t;
        this.serial = e;
        this.inner = i;
        this.disposed = false;
    }
    dispose() {
        if (!this.disposed) {
            this.disposed = true;
            this.inner.dispose();
            const t = this.events["subscriptions"];
            t.splice(t.indexOf(this), 1);
        }
    }
}

const x = t.DI.createInterface("IRouterEvents", (t => t.singleton($)));

let $ = class RouterEvents {
    constructor(t, e) {
        this.ea = t;
        this.logger = e;
        this.subscriptionSerial = 0;
        this.subscriptions = [];
        this.logger = e.scopeTo("RouterEvents");
    }
    publish(t) {
        this.logger.trace(`publishing %s`, t);
        this.ea.publish(t.name, t);
    }
    subscribe(t, e) {
        const i = new Subscription(this, ++this.subscriptionSerial, this.ea.subscribe(t, (s => {
            this.logger.trace(`handling %s for subscription #${i.serial}`, t);
            e(s);
        })));
        this.subscriptions.push(i);
        return i;
    }
};

$ = w([ m(0, t.IEventAggregator), m(1, t.ILogger) ], $);

class LocationChangeEvent {
    constructor(t, e, i, s) {
        this.id = t;
        this.url = e;
        this.trigger = i;
        this.state = s;
    }
    get name() {
        return "au:router:location-change";
    }
    toString() {
        return `LocationChangeEvent(id:${this.id},url:'${this.url}',trigger:'${this.trigger}')`;
    }
}

class NavigationStartEvent {
    constructor(t, e, i, s) {
        this.id = t;
        this.instructions = e;
        this.trigger = i;
        this.managedState = s;
    }
    get name() {
        return "au:router:navigation-start";
    }
    toString() {
        return `NavigationStartEvent(id:${this.id},instructions:'${this.instructions}',trigger:'${this.trigger}')`;
    }
}

class NavigationEndEvent {
    constructor(t, e, i) {
        this.id = t;
        this.instructions = e;
        this.finalInstructions = i;
    }
    get name() {
        return "au:router:navigation-end";
    }
    toString() {
        return `NavigationEndEvent(id:${this.id},instructions:'${this.instructions}',finalInstructions:'${this.finalInstructions}')`;
    }
}

class NavigationCancelEvent {
    constructor(t, e, i) {
        this.id = t;
        this.instructions = e;
        this.reason = i;
    }
    get name() {
        return "au:router:navigation-cancel";
    }
    toString() {
        return `NavigationCancelEvent(id:${this.id},instructions:'${this.instructions}',reason:${String(this.reason)})`;
    }
}

class NavigationErrorEvent {
    constructor(t, e, i) {
        this.id = t;
        this.instructions = e;
        this.error = i;
    }
    get name() {
        return "au:router:navigation-error";
    }
    toString() {
        return `NavigationErrorEvent(id:${this.id},instructions:'${this.instructions}',error:${String(this.error)})`;
    }
}

const E = t.DI.createInterface("IBaseHrefProvider", (t => t.singleton(y)));

class BaseHref {
    constructor(t, e) {
        this.path = t;
        this.rootedPath = e;
    }
}

let y = class BrowserBaseHrefProvider {
    constructor(t) {
        this.window = t;
    }
    getBaseHref() {
        var t;
        const e = this.window.document.head.querySelector("base");
        if (null === e) return null;
        const i = S(e.href);
        const s = S(null !== (t = e.getAttribute("href")) && void 0 !== t ? t : "");
        return new BaseHref(s, i);
    }
};

y = w([ m(0, e.IWindow) ], y);

const b = t.DI.createInterface("ILocationManager", (t => t.singleton(R)));

let R = class BrowserLocationManager {
    constructor(t, e, i, s, n, o) {
        var r;
        this.logger = t;
        this.events = e;
        this.history = i;
        this.location = s;
        this.window = n;
        this.baseHrefProvider = o;
        this.eventId = 0;
        this.logger = t.root.scopeTo("LocationManager");
        const h = o.getBaseHref();
        if (null === h) {
            const t = null !== (r = s.origin) && void 0 !== r ? r : "";
            const e = this.baseHref = new BaseHref("", S(t));
            this.logger.warn(`no baseHref provided, defaulting to origin '${e.rootedPath}' (normalized from '${t}')`);
        } else {
            this.baseHref = h;
            this.logger.debug(`baseHref set to path: '${h.path}', rootedPath: '${h.rootedPath}'`);
        }
    }
    startListening() {
        this.logger.trace(`startListening()`);
        this.window.addEventListener("popstate", this.onPopState, false);
        this.window.addEventListener("hashchange", this.onHashChange, false);
    }
    stopListening() {
        this.logger.trace(`stopListening()`);
        this.window.removeEventListener("popstate", this.onPopState, false);
        this.window.removeEventListener("hashchange", this.onHashChange, false);
    }
    onPopState(t) {
        this.logger.trace(`onPopState()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), "popstate", t.state));
    }
    onHashChange(t) {
        this.logger.trace(`onHashChange()`);
        this.events.publish(new LocationChangeEvent(++this.eventId, this.getPath(), "hashchange", null));
    }
    pushState(t, e, i) {
        i = this.addBaseHref(i);
        try {
            const s = JSON.stringify(t);
            this.logger.trace(`pushState(state:${s},title:'${e}',url:'${i}')`);
        } catch (t) {
            this.logger.warn(`pushState(state:NOT_SERIALIZABLE,title:'${e}',url:'${i}')`);
        }
        this.history.pushState(t, e, i);
    }
    replaceState(t, e, i) {
        i = this.addBaseHref(i);
        try {
            const s = JSON.stringify(t);
            this.logger.trace(`replaceState(state:${s},title:'${e}',url:'${i}')`);
        } catch (t) {
            this.logger.warn(`replaceState(state:NOT_SERIALIZABLE,title:'${e}',url:'${i}')`);
        }
        this.history.replaceState(t, e, i);
    }
    getPath() {
        const {pathname: t, search: e, hash: i} = this.location;
        const s = this.removeBaseHref(`${t}${k(e)}${i}`);
        this.logger.trace(`getPath() -> '${s}'`);
        return s;
    }
    currentPathEquals(t) {
        const e = this.getPath() === this.removeBaseHref(t);
        this.logger.trace(`currentPathEquals(path:'${t}') -> ${e}`);
        return e;
    }
    addBaseHref(t) {
        const e = t;
        let i;
        let s = this.baseHref.rootedPath;
        if (s.endsWith("/")) s = s.slice(0, -1);
        if (0 === s.length) i = t; else {
            if (t.startsWith("/")) t = t.slice(1);
            i = `${s}/${t}`;
        }
        this.logger.trace(`addBaseHref(path:'${e}') -> '${i}'`);
        return i;
    }
    removeBaseHref(t) {
        const e = t;
        if (t.startsWith(this.baseHref.path)) t = t.slice(this.baseHref.path.length);
        t = S(t);
        this.logger.trace(`removeBaseHref(path:'${e}') -> '${t}'`);
        return t;
    }
};

w([ t.bound ], R.prototype, "onPopState", null);

w([ t.bound ], R.prototype, "onHashChange", null);

R = w([ m(0, t.ILogger), m(1, x), m(2, e.IHistory), m(3, e.ILocation), m(4, e.IWindow), m(5, E) ], R);

function S(t) {
    let e;
    let i;
    let s;
    if ((s = t.indexOf("?")) >= 0 || (s = t.indexOf("#")) >= 0) {
        e = t.slice(0, s);
        i = t.slice(s);
    } else {
        e = t;
        i = "";
    }
    if (e.endsWith("/")) e = e.slice(0, -1); else if (e.endsWith("/index.html")) e = e.slice(0, -11);
    return `${e}${i}`;
}

function k(t) {
    return t.length > 0 && !t.startsWith("?") ? `?${t}` : t;
}

const C = [ "?", "#", "/", "+", "(", ")", ".", "@", "!", "=", ",", "&", "'", "~", ";" ];

class ParserState {
    constructor(t) {
        this.input = t;
        this.buffers = [];
        this.bufferIndex = 0;
        this.index = 0;
        this.rest = t;
    }
    get done() {
        return 0 === this.rest.length;
    }
    startsWith(...t) {
        const e = this.rest;
        return t.some((function(t) {
            return e.startsWith(t);
        }));
    }
    consumeOptional(t) {
        if (this.startsWith(t)) {
            this.rest = this.rest.slice(t.length);
            this.index += t.length;
            this.append(t);
            return true;
        }
        return false;
    }
    consume(t) {
        if (!this.consumeOptional(t)) this.expect(`'${t}'`);
    }
    expect(t) {
        throw new Error(`Expected ${t} at index ${this.index} of '${this.input}', but got: '${this.rest}' (rest='${this.rest}')`);
    }
    ensureDone() {
        if (!this.done) throw new Error(`Unexpected '${this.rest}' at index ${this.index} of '${this.input}'`);
    }
    advance() {
        const t = this.rest[0];
        this.rest = this.rest.slice(1);
        ++this.index;
        this.append(t);
    }
    record() {
        this.buffers[this.bufferIndex++] = "";
    }
    playback() {
        const t = --this.bufferIndex;
        const e = this.buffers;
        const i = e[t];
        e[t] = "";
        return i;
    }
    discard() {
        this.buffers[--this.bufferIndex] = "";
    }
    append(t) {
        const e = this.bufferIndex;
        const i = this.buffers;
        for (let s = 0; s < e; ++s) i[s] += t;
    }
}

exports.ExpressionKind = void 0;

(function(t) {
    t[t["Route"] = 0] = "Route";
    t[t["CompositeSegment"] = 1] = "CompositeSegment";
    t[t["ScopedSegment"] = 2] = "ScopedSegment";
    t[t["SegmentGroup"] = 3] = "SegmentGroup";
    t[t["Segment"] = 4] = "Segment";
    t[t["Component"] = 5] = "Component";
    t[t["Action"] = 6] = "Action";
    t[t["Viewport"] = 7] = "Viewport";
    t[t["ParameterList"] = 8] = "ParameterList";
    t[t["Parameter"] = 9] = "Parameter";
})(exports.ExpressionKind || (exports.ExpressionKind = {}));

const I = new Map;

const N = new Map;

class RouteExpression {
    constructor(t, e, i, s, n, o) {
        this.raw = t;
        this.isAbsolute = e;
        this.root = i;
        this.queryParams = s;
        this.fragment = n;
        this.fragmentIsRoute = o;
    }
    get kind() {
        return 0;
    }
    static parse(t, e) {
        const i = e ? I : N;
        let s = i.get(t);
        if (void 0 === s) i.set(t, s = RouteExpression.$parse(t, e));
        return s;
    }
    static $parse(t, e) {
        let i;
        const s = t.indexOf("#");
        if (s >= 0) {
            const n = t.slice(s + 1);
            i = decodeURIComponent(n);
            if (e) t = i; else t = t.slice(0, s);
        } else {
            if (e) t = "";
            i = null;
        }
        let n = null;
        const o = t.indexOf("?");
        if (o >= 0) {
            const e = t.slice(o + 1);
            t = t.slice(0, o);
            n = new URLSearchParams(e);
        }
        if ("" === t) return new RouteExpression("", false, SegmentExpression.EMPTY, null != n ? Object.freeze(n) : _, i, e);
        const r = new ParserState(t);
        r.record();
        const h = r.consumeOptional("/");
        const a = CompositeSegmentExpression.parse(r);
        r.ensureDone();
        const c = r.playback();
        return new RouteExpression(c, h, a, null != n ? Object.freeze(n) : _, i, e);
    }
    toInstructionTree(t) {
        let e = this.queryParams;
        const i = t.queryParams;
        if (null != i) e = new URLSearchParams({
            ...Object.fromEntries(e.entries()),
            ...i
        });
        return new ViewportInstructionTree(t, this.isAbsolute, this.root.toInstructions(t.append, 0, 0), e, this.fragment);
    }
    toString() {
        return this.raw;
    }
}

class CompositeSegmentExpression {
    constructor(t, e, i) {
        this.raw = t;
        this.siblings = e;
        this.append = i;
    }
    get kind() {
        return 1;
    }
    static parse(t) {
        t.record();
        const e = t.consumeOptional("+");
        const i = [];
        do {
            i.push(ScopedSegmentExpression.parse(t));
        } while (t.consumeOptional("+"));
        if (!e && 1 === i.length) {
            t.discard();
            return i[0];
        }
        const s = t.playback();
        return new CompositeSegmentExpression(s, i, e);
    }
    toInstructions(t, e, i) {
        switch (this.siblings.length) {
          case 0:
            return [];

          case 1:
            return this.siblings[0].toInstructions(t, e, i);

          case 2:
            return [ ...this.siblings[0].toInstructions(t, e, 0), ...this.siblings[1].toInstructions(t, 0, i) ];

          default:
            return [ ...this.siblings[0].toInstructions(t, e, 0), ...this.siblings.slice(1, -1).flatMap((function(e) {
                return e.toInstructions(t, 0, 0);
            })), ...this.siblings[this.siblings.length - 1].toInstructions(t, 0, i) ];
        }
    }
    toString() {
        return this.raw;
    }
}

class ScopedSegmentExpression {
    constructor(t, e, i) {
        this.raw = t;
        this.left = e;
        this.right = i;
    }
    get kind() {
        return 2;
    }
    static parse(t) {
        t.record();
        const e = SegmentGroupExpression.parse(t);
        if (t.consumeOptional("/")) {
            const i = ScopedSegmentExpression.parse(t);
            const s = t.playback();
            return new ScopedSegmentExpression(s, e, i);
        }
        t.discard();
        return e;
    }
    toInstructions(t, e, i) {
        const s = this.left.toInstructions(t, e, 0);
        const n = this.right.toInstructions(false, 0, i);
        let o = s[s.length - 1];
        while (o.children.length > 0) o = o.children[o.children.length - 1];
        o.children.push(...n);
        return s;
    }
    toString() {
        return this.raw;
    }
}

class SegmentGroupExpression {
    constructor(t, e) {
        this.raw = t;
        this.expression = e;
    }
    get kind() {
        return 3;
    }
    static parse(t) {
        t.record();
        if (t.consumeOptional("(")) {
            const e = CompositeSegmentExpression.parse(t);
            t.consume(")");
            const i = t.playback();
            return new SegmentGroupExpression(i, e);
        }
        t.discard();
        return SegmentExpression.parse(t);
    }
    toInstructions(t, e, i) {
        return this.expression.toInstructions(t, e + 1, i + 1);
    }
    toString() {
        return this.raw;
    }
}

class SegmentExpression {
    constructor(t, e, i, s, n) {
        this.raw = t;
        this.component = e;
        this.action = i;
        this.viewport = s;
        this.scoped = n;
    }
    get kind() {
        return 4;
    }
    static get EMPTY() {
        return new SegmentExpression("", ComponentExpression.EMPTY, ActionExpression.EMPTY, ViewportExpression.EMPTY, true);
    }
    static parse(t) {
        t.record();
        const e = ComponentExpression.parse(t);
        const i = ActionExpression.parse(t);
        const s = ViewportExpression.parse(t);
        const n = !t.consumeOptional("!");
        const o = t.playback();
        return new SegmentExpression(o, e, i, s, n);
    }
    toInstructions(t, e, i) {
        return [ ViewportInstruction.create({
            component: this.component.name,
            params: this.component.parameterList.toObject(),
            viewport: this.viewport.name,
            append: t,
            open: e,
            close: i
        }) ];
    }
    toString() {
        return this.raw;
    }
}

class ComponentExpression {
    constructor(t, e, i) {
        this.raw = t;
        this.name = e;
        this.parameterList = i;
        switch (e.charAt(0)) {
          case ":":
            this.isParameter = true;
            this.isStar = false;
            this.isDynamic = true;
            this.parameterName = e.slice(1);
            break;

          case "*":
            this.isParameter = false;
            this.isStar = true;
            this.isDynamic = true;
            this.parameterName = e.slice(1);
            break;

          default:
            this.isParameter = false;
            this.isStar = false;
            this.isDynamic = false;
            this.parameterName = e;
            break;
        }
    }
    get kind() {
        return 5;
    }
    static get EMPTY() {
        return new ComponentExpression("", "", ParameterListExpression.EMPTY);
    }
    static parse(t) {
        t.record();
        t.record();
        if (!t.done) if (t.startsWith("./")) t.advance(); else if (t.startsWith("../")) {
            t.advance();
            t.advance();
        } else while (!t.done && !t.startsWith(...C)) t.advance();
        const e = decodeURIComponent(t.playback());
        if (0 === e.length) t.expect("component name");
        const i = ParameterListExpression.parse(t);
        const s = t.playback();
        return new ComponentExpression(s, e, i);
    }
    toString() {
        return this.raw;
    }
}

class ActionExpression {
    constructor(t, e, i) {
        this.raw = t;
        this.name = e;
        this.parameterList = i;
    }
    get kind() {
        return 6;
    }
    static get EMPTY() {
        return new ActionExpression("", "", ParameterListExpression.EMPTY);
    }
    static parse(t) {
        t.record();
        let e = "";
        if (t.consumeOptional(".")) {
            t.record();
            while (!t.done && !t.startsWith(...C)) t.advance();
            e = decodeURIComponent(t.playback());
            if (0 === e.length) t.expect("method name");
        }
        const i = ParameterListExpression.parse(t);
        const s = t.playback();
        return new ActionExpression(s, e, i);
    }
    toString() {
        return this.raw;
    }
}

class ViewportExpression {
    constructor(t, e) {
        this.raw = t;
        this.name = e;
    }
    get kind() {
        return 7;
    }
    static get EMPTY() {
        return new ViewportExpression("", "");
    }
    static parse(t) {
        t.record();
        let e = "";
        if (t.consumeOptional("@")) {
            t.record();
            while (!t.done && !t.startsWith(...C)) t.advance();
            e = decodeURIComponent(t.playback());
            if (0 === e.length) t.expect("viewport name");
        }
        const i = t.playback();
        return new ViewportExpression(i, e);
    }
    toString() {
        return this.raw;
    }
}

class ParameterListExpression {
    constructor(t, e) {
        this.raw = t;
        this.expressions = e;
    }
    get kind() {
        return 8;
    }
    static get EMPTY() {
        return new ParameterListExpression("", []);
    }
    static parse(t) {
        t.record();
        const e = [];
        if (t.consumeOptional("(")) {
            do {
                e.push(ParameterExpression.parse(t, e.length));
                if (!t.consumeOptional(",")) break;
            } while (!t.done && !t.startsWith(")"));
            t.consume(")");
        }
        const i = t.playback();
        return new ParameterListExpression(i, e);
    }
    toObject() {
        const t = {};
        for (const e of this.expressions) t[e.key] = e.value;
        return t;
    }
    toString() {
        return this.raw;
    }
}

class ParameterExpression {
    constructor(t, e, i) {
        this.raw = t;
        this.key = e;
        this.value = i;
    }
    get kind() {
        return 9;
    }
    static get EMPTY() {
        return new ParameterExpression("", "", "");
    }
    static parse(t, e) {
        t.record();
        t.record();
        while (!t.done && !t.startsWith(...C)) t.advance();
        let i = decodeURIComponent(t.playback());
        if (0 === i.length) t.expect("parameter key");
        let s;
        if (t.consumeOptional("=")) {
            t.record();
            while (!t.done && !t.startsWith(...C)) t.advance();
            s = decodeURIComponent(t.playback());
            if (0 === s.length) t.expect("parameter value");
        } else {
            s = i;
            i = e.toString();
        }
        const n = t.playback();
        return new ParameterExpression(n, i, s);
    }
    toString() {
        return this.raw;
    }
}

const T = Object.freeze({
    RouteExpression: RouteExpression,
    CompositeSegmentExpression: CompositeSegmentExpression,
    ScopedSegmentExpression: ScopedSegmentExpression,
    SegmentGroupExpression: SegmentGroupExpression,
    SegmentExpression: SegmentExpression,
    ComponentExpression: ComponentExpression,
    ActionExpression: ActionExpression,
    ViewportExpression: ViewportExpression,
    ParameterListExpression: ParameterListExpression,
    ParameterExpression: ParameterExpression
});

class ViewportRequest {
    constructor(t, e, i, s) {
        this.viewportName = t;
        this.componentName = e;
        this.resolution = i;
        this.append = s;
    }
    toString() {
        return `VR(viewport:'${this.viewportName}',component:'${this.componentName}',resolution:'${this.resolution}',append:${this.append})`;
    }
}

const A = new WeakMap;

class ViewportAgent {
    constructor(e, i, s) {
        this.viewport = e;
        this.hostController = i;
        this.ctx = s;
        this.isActive = false;
        this.curCA = null;
        this.nextCA = null;
        this.state = 8256;
        this.$resolution = "dynamic";
        this.$plan = "replace";
        this.currNode = null;
        this.nextNode = null;
        this.currTransition = null;
        this.prevTransition = null;
        this.logger = s.container.get(t.ILogger).scopeTo(`ViewportAgent<${s.friendlyPath}>`);
        this.logger.trace(`constructor()`);
    }
    get $state() {
        return O(this.state);
    }
    get currState() {
        return 16256 & this.state;
    }
    set currState(t) {
        this.state = 127 & this.state | t;
    }
    get nextState() {
        return 127 & this.state;
    }
    set nextState(t) {
        this.state = 16256 & this.state | t;
    }
    static for(t, i) {
        let s = A.get(t);
        if (void 0 === s) {
            const n = e.Controller.getCachedOrThrow(t);
            A.set(t, s = new ViewportAgent(t, n, i));
        }
        return s;
    }
    activateFromViewport(t, e, i) {
        const s = this.currTransition;
        if (null !== s) P(s);
        this.isActive = true;
        switch (this.nextState) {
          case 64:
            switch (this.currState) {
              case 8192:
                this.logger.trace(`activateFromViewport() - nothing to activate at %s`, this);
                return;

              case 4096:
                this.logger.trace(`activateFromViewport() - activating existing componentAgent at %s`, this);
                return this.curCA.activate(t, e, i);

              default:
                this.unexpectedState("activateFromViewport 1");
            }

          case 2:
            {
                if (null === this.currTransition) throw new Error(`Unexpected viewport activation outside of a transition context at ${this}`);
                if ("static" !== this.$resolution) throw new Error(`Unexpected viewport activation at ${this}`);
                this.logger.trace(`activateFromViewport() - running ordinary activate at %s`, this);
                const e = Batch.start((e => {
                    this.activate(t, this.currTransition, e);
                }));
                const i = new Promise((t => {
                    e.continueWith((() => {
                        t();
                    }));
                }));
                return e.start().done ? void 0 : i;
            }

          default:
            this.unexpectedState("activateFromViewport 2");
        }
    }
    deactivateFromViewport(t, e, i) {
        const s = this.currTransition;
        if (null !== s) P(s);
        this.isActive = false;
        switch (this.currState) {
          case 8192:
            this.logger.trace(`deactivateFromViewport() - nothing to deactivate at %s`, this);
            return;

          case 4096:
            this.logger.trace(`deactivateFromViewport() - deactivating existing componentAgent at %s`, this);
            return this.curCA.deactivate(t, e, i);

          case 128:
            this.logger.trace(`deactivateFromViewport() - already deactivating at %s`, this);
            return;

          default:
            {
                if (null === this.currTransition) throw new Error(`Unexpected viewport deactivation outside of a transition context at ${this}`);
                this.logger.trace(`deactivateFromViewport() - running ordinary deactivate at %s`, this);
                const e = Batch.start((e => {
                    this.deactivate(t, this.currTransition, e);
                }));
                const i = new Promise((t => {
                    e.continueWith((() => {
                        t();
                    }));
                }));
                return e.start().done ? void 0 : i;
            }
        }
    }
    handles(t) {
        if (!this.isAvailable(t.resolution)) return false;
        if (t.append && 4096 === this.currState) {
            this.logger.trace(`handles(req:%s) -> false (append mode, viewport already has content %s)`, t, this.curCA);
            return false;
        }
        const e = t.viewportName;
        const i = this.viewport.name;
        if (e !== at && i !== at && i !== e) {
            this.logger.trace(`handles(req:%s) -> false (viewport names don't match '%s')`, t, i);
            return false;
        }
        if (this.viewport.usedBy.length > 0 && !this.viewport.usedBy.split(",").includes(t.componentName)) {
            this.logger.trace(`handles(req:%s) -> false (componentName not included in usedBy)`, t);
            return false;
        }
        this.logger.trace(`viewport '%s' handles(req:%s) -> true`, i, t);
        return true;
    }
    isAvailable(t) {
        if ("dynamic" === t && !this.isActive) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (viewport is not active and we're in dynamic resolution resolution)`, t);
            return false;
        }
        if (64 !== this.nextState) {
            this.logger.trace(`isAvailable(resolution:%s) -> false (update already scheduled for %s)`, t, this.nextNode);
            return false;
        }
        return true;
    }
    canUnload(t, e) {
        if (null === this.currTransition) this.currTransition = t;
        P(t);
        if (true !== t.guardsResult) return;
        e.push();
        Batch.start((e => {
            this.logger.trace(`canUnload() - invoking on children at %s`, this);
            for (const i of this.currNode.children) i.context.vpa.canUnload(t, e);
        })).continueWith((e => {
            switch (this.currState) {
              case 4096:
                this.logger.trace(`canUnload() - invoking on existing component at %s`, this);
                switch (this.$plan) {
                  case "none":
                    this.currState = 1024;
                    return;

                  case "invoke-lifecycles":
                  case "replace":
                    this.currState = 2048;
                    e.push();
                    Batch.start((e => {
                        this.logger.trace(`canUnload() - finished invoking on children, now invoking on own component at %s`, this);
                        this.curCA.canUnload(t, this.nextNode, e);
                    })).continueWith((() => {
                        this.logger.trace(`canUnload() - finished at %s`, this);
                        this.currState = 1024;
                        e.pop();
                    })).start();
                    return;
                }

              case 8192:
                this.logger.trace(`canUnload() - nothing to unload at %s`, this);
                return;

              default:
                t.handleError(new Error(`Unexpected state at canUnload of ${this}`));
            }
        })).continueWith((() => {
            e.pop();
        })).start();
    }
    canLoad(e, i) {
        if (null === this.currTransition) this.currTransition = e;
        P(e);
        if (true !== e.guardsResult) return;
        i.push();
        Batch.start((t => {
            switch (this.nextState) {
              case 32:
                this.logger.trace(`canLoad() - invoking on new component at %s`, this);
                this.nextState = 16;
                switch (this.$plan) {
                  case "none":
                    return;

                  case "invoke-lifecycles":
                    return this.curCA.canLoad(e, this.nextNode, t);

                  case "replace":
                    this.nextCA = this.nextNode.context.createComponentAgent(this.hostController, this.nextNode);
                    return this.nextCA.canLoad(e, this.nextNode, t);
                }

              case 64:
                this.logger.trace(`canLoad() - nothing to load at %s`, this);
                return;

              default:
                this.unexpectedState("canLoad");
            }
        })).continueWith((e => {
            const i = this.nextNode;
            switch (this.$plan) {
              case "none":
              case "invoke-lifecycles":
                this.logger.trace(`canLoad(next:%s) - plan set to '%s', compiling residue`, i, this.$plan);
                e.push();
                void t.onResolve(H(i), (() => {
                    e.pop();
                }));
                return;

              case "replace":
                switch (this.$resolution) {
                  case "dynamic":
                    this.logger.trace(`canLoad(next:%s) - (resolution: 'dynamic'), delaying residue compilation until activate`, i, this.$plan);
                    return;

                  case "static":
                    this.logger.trace(`canLoad(next:%s) - (resolution: '${this.$resolution}'), creating nextCA and compiling residue`, i, this.$plan);
                    e.push();
                    void t.onResolve(H(i), (() => {
                        e.pop();
                    }));
                    return;
                }
            }
        })).continueWith((t => {
            switch (this.nextState) {
              case 16:
                this.logger.trace(`canLoad() - finished own component, now invoking on children at %s`, this);
                this.nextState = 8;
                for (const i of this.nextNode.children) i.context.vpa.canLoad(e, t);
                return;

              case 64:
                return;

              default:
                this.unexpectedState("canLoad");
            }
        })).continueWith((() => {
            this.logger.trace(`canLoad() - finished at %s`, this);
            i.pop();
        })).start();
    }
    unload(t, e) {
        P(t);
        V(this, t);
        e.push();
        Batch.start((e => {
            this.logger.trace(`unload() - invoking on children at %s`, this);
            for (const i of this.currNode.children) i.context.vpa.unload(t, e);
        })).continueWith((i => {
            switch (this.currState) {
              case 1024:
                this.logger.trace(`unload() - invoking on existing component at %s`, this);
                switch (this.$plan) {
                  case "none":
                    this.currState = 256;
                    return;

                  case "invoke-lifecycles":
                  case "replace":
                    this.currState = 512;
                    i.push();
                    Batch.start((e => {
                        this.logger.trace(`unload() - finished invoking on children, now invoking on own component at %s`, this);
                        this.curCA.unload(t, this.nextNode, e);
                    })).continueWith((() => {
                        this.logger.trace(`unload() - finished at %s`, this);
                        this.currState = 256;
                        i.pop();
                    })).start();
                    return;
                }

              case 8192:
                this.logger.trace(`unload() - nothing to unload at %s`, this);
                for (const i of this.currNode.children) i.context.vpa.unload(t, e);
                return;

              default:
                this.unexpectedState("unload");
            }
        })).continueWith((() => {
            e.pop();
        })).start();
    }
    load(t, e) {
        P(t);
        V(this, t);
        e.push();
        Batch.start((e => {
            switch (this.nextState) {
              case 8:
                this.logger.trace(`load() - invoking on new component at %s`, this);
                this.nextState = 4;
                switch (this.$plan) {
                  case "none":
                    return;

                  case "invoke-lifecycles":
                    return this.curCA.load(t, this.nextNode, e);

                  case "replace":
                    return this.nextCA.load(t, this.nextNode, e);
                }

              case 64:
                this.logger.trace(`load() - nothing to load at %s`, this);
                return;

              default:
                this.unexpectedState("load");
            }
        })).continueWith((e => {
            switch (this.nextState) {
              case 4:
                this.logger.trace(`load() - finished own component, now invoking on children at %s`, this);
                this.nextState = 2;
                for (const i of this.nextNode.children) i.context.vpa.load(t, e);
                return;

              case 64:
                return;

              default:
                this.unexpectedState("load");
            }
        })).continueWith((() => {
            this.logger.trace(`load() - finished at %s`, this);
            e.pop();
        })).start();
    }
    deactivate(t, e, i) {
        P(e);
        V(this, e);
        i.push();
        switch (this.currState) {
          case 256:
            this.logger.trace(`deactivate() - invoking on existing component at %s`, this);
            this.currState = 128;
            switch (this.$plan) {
              case "none":
              case "invoke-lifecycles":
                i.pop();
                return;

              case "replace":
                {
                    const s = this.hostController;
                    const n = this.viewport.stateful ? 0 : 32;
                    e.run((() => this.curCA.deactivate(t, s, n)), (() => {
                        i.pop();
                    }));
                }
            }
            return;

          case 8192:
            this.logger.trace(`deactivate() - nothing to deactivate at %s`, this);
            i.pop();
            return;

          case 128:
            this.logger.trace(`deactivate() - already deactivating at %s`, this);
            i.pop();
            return;

          default:
            this.unexpectedState("deactivate");
        }
    }
    activate(t, e, i) {
        P(e);
        V(this, e);
        i.push();
        if (32 === this.nextState && "dynamic" === this.$resolution) {
            this.logger.trace(`activate() - invoking canLoad(), load() and activate() on new component due to resolution 'dynamic' at %s`, this);
            Batch.start((t => {
                this.canLoad(e, t);
            })).continueWith((t => {
                this.load(e, t);
            })).continueWith((i => {
                this.activate(t, e, i);
            })).continueWith((() => {
                i.pop();
            })).start();
            return;
        }
        switch (this.nextState) {
          case 2:
            this.logger.trace(`activate() - invoking on existing component at %s`, this);
            this.nextState = 1;
            Batch.start((i => {
                switch (this.$plan) {
                  case "none":
                  case "invoke-lifecycles":
                    return;

                  case "replace":
                    {
                        const s = this.hostController;
                        const n = 0;
                        e.run((() => {
                            i.push();
                            return this.nextCA.activate(t, s, n);
                        }), (() => {
                            i.pop();
                        }));
                    }
                }
            })).continueWith((t => {
                this.processDynamicChildren(e, t);
            })).continueWith((() => {
                i.pop();
            })).start();
            return;

          case 64:
            this.logger.trace(`activate() - nothing to activate at %s`, this);
            i.pop();
            return;

          default:
            this.unexpectedState("activate");
        }
    }
    swap(t, e) {
        if (8192 === this.currState) {
            this.logger.trace(`swap() - running activate on next instead, because there is nothing to deactivate at %s`, this);
            this.activate(null, t, e);
            return;
        }
        if (64 === this.nextState) {
            this.logger.trace(`swap() - running deactivate on current instead, because there is nothing to activate at %s`, this);
            this.deactivate(null, t, e);
            return;
        }
        P(t);
        V(this, t);
        if (!(256 === this.currState && 2 === this.nextState)) this.unexpectedState("swap");
        this.currState = 128;
        this.nextState = 1;
        switch (this.$plan) {
          case "none":
          case "invoke-lifecycles":
            {
                this.logger.trace(`swap() - skipping this level and swapping children instead at %s`, this);
                const i = s(this.nextNode.children, this.currNode.children);
                for (const s of i) s.context.vpa.swap(t, e);
                return;
            }

          case "replace":
            {
                this.logger.trace(`swap() - running normally at %s`, this);
                const i = this.hostController;
                const s = this.curCA;
                const n = this.nextCA;
                const o = this.viewport.stateful ? 0 : 32;
                const r = 0;
                e.push();
                Batch.start((e => {
                    t.run((() => {
                        e.push();
                        return s.deactivate(null, i, o);
                    }), (() => {
                        e.pop();
                    }));
                })).continueWith((e => {
                    t.run((() => {
                        e.push();
                        return n.activate(null, i, r);
                    }), (() => {
                        e.pop();
                    }));
                })).continueWith((e => {
                    this.processDynamicChildren(t, e);
                })).continueWith((() => {
                    e.pop();
                })).start();
                return;
            }
        }
    }
    processDynamicChildren(t, e) {
        this.logger.trace(`processDynamicChildren() - %s`, this);
        const i = this.nextNode;
        t.run((() => {
            e.push();
            return q(i);
        }), (i => {
            Batch.start((e => {
                for (const s of i) t.run((() => {
                    e.push();
                    return s.context.vpa.canLoad(t, e);
                }), (() => {
                    e.pop();
                }));
            })).continueWith((e => {
                for (const s of i) t.run((() => {
                    e.push();
                    return s.context.vpa.load(t, e);
                }), (() => {
                    e.pop();
                }));
            })).continueWith((e => {
                for (const s of i) t.run((() => {
                    e.push();
                    return s.context.vpa.activate(null, t, e);
                }), (() => {
                    e.pop();
                }));
            })).continueWith((() => {
                e.pop();
            })).start();
        }));
    }
    scheduleUpdate(t, e) {
        var i, s;
        switch (this.nextState) {
          case 64:
            this.nextNode = e;
            this.nextState = 32;
            this.$resolution = t.resolutionMode;
            break;

          default:
            this.unexpectedState("scheduleUpdate 1");
        }
        switch (this.currState) {
          case 8192:
          case 4096:
          case 1024:
            break;

          default:
            this.unexpectedState("scheduleUpdate 2");
        }
        const n = null !== (s = null === (i = this.curCA) || void 0 === i ? void 0 : i.routeNode) && void 0 !== s ? s : null;
        if (null === n || n.component !== e.component) this.$plan = "replace"; else {
            const t = e.context.definition.config.transitionPlan;
            if ("function" === typeof t) this.$plan = t(n, e); else this.$plan = t;
        }
        this.logger.trace(`scheduleUpdate(next:%s) - plan set to '%s'`, e, this.$plan);
    }
    cancelUpdate() {
        if (null !== this.currNode) this.currNode.children.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
        if (null !== this.nextNode) this.nextNode.children.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
        this.logger.trace(`cancelUpdate(nextNode:%s)`, this.nextNode);
        switch (this.currState) {
          case 8192:
          case 4096:
            break;

          case 2048:
          case 1024:
            this.currState = 4096;
            break;
        }
        switch (this.nextState) {
          case 64:
          case 32:
          case 16:
          case 8:
            this.nextNode = null;
            this.nextState = 64;
            break;
        }
    }
    endTransition() {
        if (null !== this.currNode) this.currNode.children.forEach((function(t) {
            t.context.vpa.endTransition();
        }));
        if (null !== this.nextNode) this.nextNode.children.forEach((function(t) {
            t.context.vpa.endTransition();
        }));
        if (null !== this.currTransition) {
            P(this.currTransition);
            switch (this.nextState) {
              case 64:
                switch (this.currState) {
                  case 128:
                    this.logger.trace(`endTransition() - setting currState to State.nextIsEmpty at %s`, this);
                    this.currState = 8192;
                    this.curCA = null;
                    break;

                  default:
                    this.unexpectedState("endTransition 1");
                }
                break;

              case 1:
                switch (this.currState) {
                  case 8192:
                  case 128:
                    switch (this.$plan) {
                      case "none":
                      case "invoke-lifecycles":
                        this.logger.trace(`endTransition() - setting currState to State.currIsActive at %s`, this);
                        this.currState = 4096;
                        break;

                      case "replace":
                        this.logger.trace(`endTransition() - setting currState to State.currIsActive and reassigning curCA at %s`, this);
                        this.currState = 4096;
                        this.curCA = this.nextCA;
                        break;
                    }
                    this.currNode = this.nextNode;
                    break;

                  default:
                    this.unexpectedState("endTransition 2");
                }
                break;

              default:
                this.unexpectedState("endTransition 3");
            }
            this.$plan = "replace";
            this.nextState = 64;
            this.nextNode = null;
            this.nextCA = null;
            this.prevTransition = this.currTransition;
            this.currTransition = null;
        }
    }
    toString() {
        return `VPA(state:${this.$state},plan:'${this.$plan}',resolution:'${this.$resolution}',n:${this.nextNode},c:${this.currNode},viewport:${this.viewport})`;
    }
    dispose() {
        var t;
        if (this.viewport.stateful) this.logger.trace(`dispose() - not disposing stateful viewport at %s`, this); else {
            this.logger.trace(`dispose() - disposing %s`, this);
            null === (t = this.curCA) || void 0 === t ? void 0 : t.dispose();
        }
    }
    unexpectedState(t) {
        throw new Error(`Unexpected state at ${t} of ${this}`);
    }
}

function V(t, e) {
    if (true !== e.guardsResult) throw new Error(`Unexpected guardsResult ${e.guardsResult} at ${t}`);
}

function P(t) {
    if (void 0 !== t.error) throw t.error;
}

var L;

(function(t) {
    t[t["curr"] = 16256] = "curr";
    t[t["currIsEmpty"] = 8192] = "currIsEmpty";
    t[t["currIsActive"] = 4096] = "currIsActive";
    t[t["currCanUnload"] = 2048] = "currCanUnload";
    t[t["currCanUnloadDone"] = 1024] = "currCanUnloadDone";
    t[t["currUnload"] = 512] = "currUnload";
    t[t["currUnloadDone"] = 256] = "currUnloadDone";
    t[t["currDeactivate"] = 128] = "currDeactivate";
    t[t["next"] = 127] = "next";
    t[t["nextIsEmpty"] = 64] = "nextIsEmpty";
    t[t["nextIsScheduled"] = 32] = "nextIsScheduled";
    t[t["nextCanLoad"] = 16] = "nextCanLoad";
    t[t["nextCanLoadDone"] = 8] = "nextCanLoadDone";
    t[t["nextLoad"] = 4] = "nextLoad";
    t[t["nextLoadDone"] = 2] = "nextLoadDone";
    t[t["nextActivate"] = 1] = "nextActivate";
    t[t["bothAreEmpty"] = 8256] = "bothAreEmpty";
})(L || (L = {}));

const U = new Map;

function O(t) {
    let e = U.get(t);
    if (void 0 === e) U.set(t, e = j(t));
    return e;
}

function j(t) {
    const e = [];
    if (8192 === (8192 & t)) e.push("currIsEmpty");
    if (4096 === (4096 & t)) e.push("currIsActive");
    if (2048 === (2048 & t)) e.push("currCanUnload");
    if (1024 === (1024 & t)) e.push("currCanUnloadDone");
    if (512 === (512 & t)) e.push("currUnload");
    if (256 === (256 & t)) e.push("currUnloadDone");
    if (128 === (128 & t)) e.push("currDeactivate");
    if (64 === (64 & t)) e.push("nextIsEmpty");
    if (32 === (32 & t)) e.push("nextIsScheduled");
    if (16 === (16 & t)) e.push("nextCanLoad");
    if (8 === (8 & t)) e.push("nextCanLoadDone");
    if (4 === (4 & t)) e.push("nextLoad");
    if (2 === (2 & t)) e.push("nextLoadDone");
    if (1 === (1 & t)) e.push("nextActivate");
    return e.join("|");
}

let B = 0;

class RouteNode {
    constructor(t, e, i, s, n, o, r, h, a, c, u, l, d, f, p, v) {
        this.id = t;
        this.path = e;
        this.finalPath = i;
        this.context = s;
        this.originalInstruction = n;
        this.instruction = o;
        this.params = r;
        this.queryParams = h;
        this.fragment = a;
        this.data = c;
        this.viewport = u;
        this.title = l;
        this.component = d;
        this.append = f;
        this.children = p;
        this.residue = v;
        this.version = 1;
        this.originalInstruction = o;
    }
    get root() {
        return this.tree.root;
    }
    static create(t) {
        var e, i, s, n, o, r, h, a;
        const {[dt]: c, ...u} = null !== (e = t.params) && void 0 !== e ? e : {};
        return new RouteNode(++B, t.path, t.finalPath, t.context, t.instruction, t.instruction, u, null !== (i = t.queryParams) && void 0 !== i ? i : _, null !== (s = t.fragment) && void 0 !== s ? s : null, null !== (n = t.data) && void 0 !== n ? n : {}, null !== (o = t.viewport) && void 0 !== o ? o : null, null !== (r = t.title) && void 0 !== r ? r : null, t.component, t.append, null !== (h = t.children) && void 0 !== h ? h : [], null !== (a = t.residue) && void 0 !== a ? a : []);
    }
    contains(t) {
        var e, i;
        if (this.context === t.options.context) {
            const s = this.children;
            const n = t.children;
            for (let t = 0, o = s.length; t < o; ++t) for (let r = 0, h = n.length; r < h; ++r) if (t + r < o && (null !== (i = null === (e = s[t + r].instruction) || void 0 === e ? void 0 : e.contains(n[r])) && void 0 !== i ? i : false)) {
                if (r + 1 === h) return true;
            } else break;
        }
        return this.children.some((function(e) {
            return e.contains(t);
        }));
    }
    appendChild(t) {
        this.children.push(t);
        t.setTree(this.tree);
    }
    appendChildren(...t) {
        for (const e of t) this.appendChild(e);
    }
    clearChildren() {
        for (const t of this.children) {
            t.clearChildren();
            t.context.vpa.cancelUpdate();
        }
        this.children.length = 0;
    }
    getTitle(t) {
        const e = [ ...this.children.map((e => e.getTitle(t))), this.getTitlePart() ].filter((t => null !== t));
        if (0 === e.length) return null;
        return e.join(t);
    }
    getTitlePart() {
        if ("function" === typeof this.title) return this.title.call(void 0, this);
        return this.title;
    }
    computeAbsolutePath() {
        if (this.context.isRoot) return "";
        const t = this.context.parent.node.computeAbsolutePath();
        const e = this.instruction.toUrlComponent(false);
        if (t.length > 0) {
            if (e.length > 0) return [ t, e ].join("/");
            return t;
        }
        return e;
    }
    setTree(t) {
        this.tree = t;
        for (const e of this.children) e.setTree(t);
    }
    finalizeInstruction() {
        const t = this.children.map((t => t.finalizeInstruction()));
        const e = this.instruction.clone();
        e.children.splice(0, e.children.length, ...t);
        return this.instruction = e;
    }
    clone() {
        const t = new RouteNode(this.id, this.path, this.finalPath, this.context, this.originalInstruction, this.instruction, {
            ...this.params
        }, {
            ...this.queryParams
        }, this.fragment, {
            ...this.data
        }, this.viewport, this.title, this.component, this.append, this.children.map((t => t.clone())), [ ...this.residue ]);
        t.version = this.version + 1;
        if (t.context.node === this) t.context.node = t;
        return t;
    }
    toString() {
        var t, e, i, s, n, o;
        const r = [];
        const h = null !== (i = null === (e = null === (t = this.context) || void 0 === t ? void 0 : t.definition.component) || void 0 === e ? void 0 : e.name) && void 0 !== i ? i : "";
        if (h.length > 0) r.push(`c:'${h}'`);
        const a = null !== (n = null === (s = this.context) || void 0 === s ? void 0 : s.definition.config.path) && void 0 !== n ? n : "";
        if (a.length > 0) r.push(`path:'${a}'`);
        if (this.children.length > 0) r.push(`children:[${this.children.map(String).join(",")}]`);
        if (this.residue.length > 0) r.push(`residue:${this.residue.map((function(t) {
            if ("string" === typeof t) return `'${t}'`;
            return String(t);
        })).join(",")}`);
        return `RN(ctx:'${null === (o = this.context) || void 0 === o ? void 0 : o.friendlyPath}',${r.join(",")})`;
    }
}

class RouteTree {
    constructor(t, e, i, s) {
        this.options = t;
        this.queryParams = e;
        this.fragment = i;
        this.root = s;
    }
    contains(t) {
        return this.root.contains(t);
    }
    clone() {
        const t = new RouteTree(this.options.clone(), {
            ...this.queryParams
        }, this.fragment, this.root.clone());
        t.root.setTree(this);
        return t;
    }
    finalizeInstructions() {
        return new ViewportInstructionTree(this.options, true, this.root.children.map((t => t.finalizeInstruction())), this.queryParams, this.fragment);
    }
    toString() {
        return this.root.toString();
    }
}

function D(e, i, s) {
    const n = s.container.get(t.ILogger).scopeTo("RouteTree");
    const o = s.root;
    e.options = i.options;
    e.queryParams = i.queryParams;
    e.fragment = i.fragment;
    if (i.isAbsolute) s = o;
    if (s === o) {
        e.root.setTree(e);
        o.node = e.root;
    }
    const r = s.resolved instanceof Promise ? " - awaiting promise" : "";
    n.trace(`updateRouteTree(rootCtx:%s,rt:%s,vit:%s)${r}`, o, e, i);
    return t.onResolve(s.resolved, (() => M(n, i, s, o.node)));
}

function M(e, i, s, n) {
    e.trace(`updateNode(ctx:%s,node:%s)`, s, n);
    n.queryParams = i.queryParams;
    n.fragment = i.fragment;
    let o;
    if (!n.context.isRoot) o = n.context.vpa.scheduleUpdate(n.tree.options, n); else o = void 0;
    return t.onResolve(o, (() => {
        if (n.context === s) {
            n.clearChildren();
            return t.onResolve(t.resolveAll(...i.children.map((t => z(e, n, t, n.tree.options.append || t.append)))), (() => t.resolveAll(...s.getAvailableViewportAgents("dynamic").map((t => {
                const i = ViewportInstruction.create({
                    component: t.viewport.default,
                    viewport: t.viewport.name
                });
                return z(e, n, i, n.append);
            })))));
        }
        return t.resolveAll(...n.children.map((t => M(e, i, s, t))));
    }));
}

function H(e) {
    const i = e.context;
    const s = i.container.get(t.ILogger).scopeTo("RouteTree");
    const n = i.resolved instanceof Promise ? " - awaiting promise" : "";
    s.trace(`processResidue(node:%s)${n}`, e);
    return t.onResolve(i.resolved, (() => t.resolveAll(...e.residue.splice(0).map((t => z(s, e, t, e.append))), ...i.getAvailableViewportAgents("static").map((t => {
        const i = ViewportInstruction.create({
            component: t.viewport.default,
            viewport: t.viewport.name
        });
        return z(s, e, i, e.append);
    })))));
}

function q(e) {
    const i = e.context;
    const s = i.container.get(t.ILogger).scopeTo("RouteTree");
    const n = i.resolved instanceof Promise ? " - awaiting promise" : "";
    s.trace(`getDynamicChildren(node:%s)${n}`, e);
    return t.onResolve(i.resolved, (() => {
        const n = e.children.slice();
        return t.onResolve(t.resolveAll(...e.residue.splice(0).map((t => z(s, e, t, e.append))), ...i.getAvailableViewportAgents("dynamic").map((t => {
            const i = ViewportInstruction.create({
                component: t.viewport.default,
                viewport: t.viewport.name
            });
            return z(s, e, i, e.append);
        }))), (() => e.children.filter((t => !n.includes(t)))));
    }));
}

function z(e, s, n, o) {
    var r, h, a;
    e.trace(`createAndAppendNodes(node:%s,vi:%s,append:${o})`, s, n);
    switch (n.component.type) {
      case 0:
        switch (n.component.value) {
          case "..":
            s.clearChildren();
            s = null !== (h = null === (r = s.context.parent) || void 0 === r ? void 0 : r.node) && void 0 !== h ? h : s;

          case ".":
            return t.resolveAll(...n.children.map((t => z(e, s, t, t.append))));

          default:
            {
                e.trace(`createAndAppendNodes invoking createNode`);
                const t = F(e, s, n, o);
                if (null === t) return;
                return G(e, s, t);
            }
        }

      case 4:
      case 2:
        {
            const r = RouteDefinition.resolve(n.component.value);
            const h = null !== (a = n.params) && void 0 !== a ? a : t.emptyObject;
            const c = new $RecognizedRoute(new i.RecognizedRoute(new i.Endpoint(new i.ConfigurableRoute(r.path[0], r.caseSensitive, r), t.toArray(Object.values(h))), h), null);
            const u = W(e, s, n, o, c);
            return G(e, s, u);
        }
    }
}

function F(t, e, i, s) {
    var n;
    const o = e.context;
    let r = 0;
    let h = i.component.value;
    let a = i;
    while (1 === a.children.length) {
        a = a.children[0];
        if (0 === a.component.type) {
            ++r;
            h = `${h}/${a.component.value}`;
        } else break;
    }
    const c = o.recognize(h);
    if (null === c) {
        const n = i.component.value;
        if ("" === n) return null;
        let r = i.viewport;
        if (null === r || 0 === r.length) r = at;
        const h = o.getFallbackViewportAgent("dynamic", r);
        const a = null === h ? o.definition.fallback : h.viewport.fallback;
        if (null === a) throw new Error(`Neither the route '${n}' matched any configured route at '${o.friendlyPath}' nor a fallback is configured for the viewport '${r}' - did you forget to add '${n}' to the routes list of the route decorator of '${o.component.name}'?`);
        t.trace(`Fallback is set to '${a}'. Looking for a recognized route.`);
        const c = o.childRoutes.find((t => t.id === a));
        if (void 0 !== c) return Y(t, c, e, i, s);
        t.trace(`No route definition for the fallback '${a}' is found; trying to recognize the route.`);
        const u = o.recognize(a);
        if (null !== u) return W(t, e, i, s, u);
        t.trace(`The fallback '${a}' is not recognized as a route; treating as custom element name.`);
        return Y(t, RouteDefinition.resolve(a, o), e, i, s);
    }
    const u = c.residue;
    t.trace("createNode residue:", c.residue);
    const l = null === u;
    c.residue = null;
    i.component.value = l ? h : h.slice(0, -(u.length + 1));
    for (let t = 0; t < r; ++t) {
        const t = i.children[0];
        if (null !== (n = null === u || void 0 === u ? void 0 : u.startsWith(t.component.value)) && void 0 !== n ? n : false) break;
        i.children = t.children;
    }
    t.trace("createNode after adjustment vi:%s", i);
    return W(t, e, i, s, c);
}

function W(e, i, s, n, o, r = o.route.endpoint.route) {
    const h = i.context;
    const a = i.tree;
    return t.onResolve(r.handler, (t => {
        var c, u, l;
        r.handler = t;
        e.trace(`creatingConfiguredNode(rd:%s, vi:%s)`, t, s);
        if (null === t.redirectTo) {
            const l = (null !== (u = null === (c = s.viewport) || void 0 === c ? void 0 : c.length) && void 0 !== u ? u : 0) > 0 ? s.viewport : t.viewport;
            const d = t.component;
            const f = h.resolveViewportAgent(new ViewportRequest(l, d.name, a.options.resolutionMode, n));
            const p = h.container.get(X);
            const v = p.getRouteContext(f, d, f.hostController.container);
            e.trace("createConfiguredNode setting the context node");
            v.node = RouteNode.create({
                path: o.route.endpoint.route.path,
                finalPath: r.path,
                context: v,
                instruction: s,
                params: {
                    ...i.params,
                    ...o.route.params
                },
                queryParams: a.queryParams,
                fragment: a.fragment,
                data: t.data,
                viewport: l,
                component: d,
                append: n,
                title: t.config.title,
                residue: [ ...null === o.residue ? [] : [ ViewportInstruction.create(o.residue) ], ...s.children ]
            });
            v.node.setTree(i.tree);
            e.trace(`createConfiguredNode(vi:%s) -> %s`, s, v.node);
            return v.node;
        }
        const d = RouteExpression.parse(r.path, false);
        const f = RouteExpression.parse(t.redirectTo, false);
        let p;
        let v;
        const g = [];
        switch (d.root.kind) {
          case 2:
          case 4:
            p = d.root;
            break;

          default:
            throw new Error(`Unexpected expression kind ${d.root.kind}`);
        }
        switch (f.root.kind) {
          case 2:
          case 4:
            v = f.root;
            break;

          default:
            throw new Error(`Unexpected expression kind ${f.root.kind}`);
        }
        let w;
        let m;
        let x = false;
        let $ = false;
        while (!(x && $)) {
            if (x) w = null; else if (4 === p.kind) {
                w = p;
                x = true;
            } else if (4 === p.left.kind) {
                w = p.left;
                switch (p.right.kind) {
                  case 2:
                  case 4:
                    p = p.right;
                    break;

                  default:
                    throw new Error(`Unexpected expression kind ${p.right.kind}`);
                }
            } else throw new Error(`Unexpected expression kind ${p.left.kind}`);
            if ($) m = null; else if (4 === v.kind) {
                m = v;
                $ = true;
            } else if (4 === v.left.kind) {
                m = v.left;
                switch (v.right.kind) {
                  case 2:
                  case 4:
                    v = v.right;
                    break;

                  default:
                    throw new Error(`Unexpected expression kind ${v.right.kind}`);
                }
            } else throw new Error(`Unexpected expression kind ${v.left.kind}`);
            if (null !== m) if (m.component.isDynamic && (null !== (l = null === w || void 0 === w ? void 0 : w.component.isDynamic) && void 0 !== l ? l : false)) g.push(o.route.params[w.component.name]); else g.push(m.raw);
        }
        const E = g.filter(Boolean).join("/");
        const y = h.recognize(E);
        if (null === y) throw new Error(`'${E}' did not match any configured route or registered component name at '${h.friendlyPath}' - did you forget to add '${E}' to the routes list of the route decorator of '${h.component.name}'?`);
        return W(e, i, s, n, o, y.route.endpoint.route);
    }));
}

function G(e, i, s) {
    return t.onResolve(s, (t => {
        e.trace(`appendNode($childNode:%s)`, t);
        i.appendChild(t);
        return t.context.vpa.scheduleUpdate(i.tree.options, t);
    }));
}

function Y(e, s, n, o, r) {
    const h = new $RecognizedRoute(new i.RecognizedRoute(new i.Endpoint(new i.ConfigurableRoute(s.path[0], s.caseSensitive, s), []), t.emptyObject), null);
    return W(e, n, o, r, h);
}

const _ = Object.freeze(new URLSearchParams);

const J = "au-nav-id";

function Z(e) {
    return t.isObject(e) && true === Object.prototype.hasOwnProperty.call(e, J);
}

function K(t, e) {
    return {
        ...t,
        [J]: e
    };
}

function Q(t, e) {
    if ("function" === typeof e) return e(t);
    return e;
}

class RouterOptions {
    constructor(t, e, i, s, n, o) {
        this.useUrlFragmentHash = t;
        this.useHref = e;
        this.resolutionMode = i;
        this.historyStrategy = s;
        this.sameUrlStrategy = n;
        this.buildTitle = o;
    }
    static get DEFAULT() {
        return RouterOptions.create({});
    }
    static create(t) {
        var e, i, s, n, o, r;
        return new RouterOptions(null !== (e = t.useUrlFragmentHash) && void 0 !== e ? e : false, null !== (i = t.useHref) && void 0 !== i ? i : true, null !== (s = t.resolutionMode) && void 0 !== s ? s : "dynamic", null !== (n = t.historyStrategy) && void 0 !== n ? n : "push", null !== (o = t.sameUrlStrategy) && void 0 !== o ? o : "ignore", null !== (r = t.buildTitle) && void 0 !== r ? r : null);
    }
    getHistoryStrategy(t) {
        return Q(t, this.historyStrategy);
    }
    getSameUrlStrategy(t) {
        return Q(t, this.sameUrlStrategy);
    }
    stringifyProperties() {
        return [ [ "resolutionMode", "resolution" ], [ "historyStrategy", "history" ], [ "sameUrlStrategy", "sameUrl" ] ].map((([t, e]) => {
            const i = this[t];
            return `${e}:${"function" === typeof i ? i : `'${i}'`}`;
        })).join(",");
    }
    clone() {
        return new RouterOptions(this.useUrlFragmentHash, this.useHref, this.resolutionMode, this.historyStrategy, this.sameUrlStrategy, this.buildTitle);
    }
    toString() {
        return `RO(${this.stringifyProperties()})`;
    }
}

class NavigationOptions extends RouterOptions {
    constructor(t, e, i, s, n, o, r, h) {
        super(t.useUrlFragmentHash, t.useHref, t.resolutionMode, t.historyStrategy, t.sameUrlStrategy, t.buildTitle);
        this.title = e;
        this.titleSeparator = i;
        this.append = s;
        this.context = n;
        this.queryParams = o;
        this.fragment = r;
        this.state = h;
    }
    static get DEFAULT() {
        return NavigationOptions.create({});
    }
    static create(t) {
        var e, i, s, n, o, r, h;
        return new NavigationOptions(RouterOptions.create(t), null !== (e = t.title) && void 0 !== e ? e : null, null !== (i = t.titleSeparator) && void 0 !== i ? i : " | ", null !== (s = t.append) && void 0 !== s ? s : false, null !== (n = t.context) && void 0 !== n ? n : null, null !== (o = t.queryParams) && void 0 !== o ? o : null, null !== (r = t.fragment) && void 0 !== r ? r : "", null !== (h = t.state) && void 0 !== h ? h : null);
    }
    clone() {
        return new NavigationOptions(super.clone(), this.title, this.titleSeparator, this.append, this.context, {
            ...this.queryParams
        }, this.fragment, null === this.state ? null : {
            ...this.state
        });
    }
    toString() {
        return `NO(${super.stringifyProperties()})`;
    }
}

class Navigation {
    constructor(t, e, i, s, n, o) {
        this.id = t;
        this.instructions = e;
        this.trigger = i;
        this.options = s;
        this.prevNavigation = n;
        this.finalInstructions = o;
    }
    static create(t) {
        return new Navigation(t.id, t.instructions, t.trigger, t.options, t.prevNavigation, t.finalInstructions);
    }
    toString() {
        return `N(id:${this.id},instructions:${this.instructions},trigger:'${this.trigger}')`;
    }
}

class Transition {
    constructor(t, e, i, s, n, o, r, h, a, c, u, l, d, f, p) {
        this.id = t;
        this.prevInstructions = e;
        this.instructions = i;
        this.finalInstructions = s;
        this.instructionsChanged = n;
        this.trigger = o;
        this.options = r;
        this.managedState = h;
        this.previousRouteTree = a;
        this.routeTree = c;
        this.promise = u;
        this.resolve = l;
        this.reject = d;
        this.guardsResult = f;
        this.error = p;
    }
    static create(t) {
        return new Transition(t.id, t.prevInstructions, t.instructions, t.finalInstructions, t.instructionsChanged, t.trigger, t.options, t.managedState, t.previousRouteTree, t.routeTree, t.promise, t.resolve, t.reject, t.guardsResult, void 0);
    }
    run(t, e) {
        if (true !== this.guardsResult) return;
        try {
            const i = t();
            if (i instanceof Promise) i.then(e).catch((t => {
                this.handleError(t);
            })); else e(i);
        } catch (t) {
            this.handleError(t);
        }
    }
    handleError(t) {
        this.reject(this.error = t);
    }
    toString() {
        return `T(id:${this.id},trigger:'${this.trigger}',instructions:${this.instructions},options:${this.options})`;
    }
}

const X = t.DI.createInterface("IRouter", (t => t.singleton(exports.Router)));

exports.Router = class Router {
    constructor(t, e, i, s, n) {
        this.container = t;
        this.p = e;
        this.logger = i;
        this.events = s;
        this.locationMgr = n;
        this.t = null;
        this.i = null;
        this.h = null;
        this.options = RouterOptions.DEFAULT;
        this.navigated = false;
        this.navigationId = 0;
        this.lastSuccessfulNavigation = null;
        this.activeNavigation = null;
        this.instructions = ViewportInstructionTree.create("");
        this.nextTr = null;
        this.locationChangeSubscription = null;
        this.u = false;
        this.vpaLookup = new Map;
        this.logger = i.root.scopeTo("Router");
    }
    get ctx() {
        let t = this.t;
        if (null === t) {
            if (!this.container.has(lt, true)) throw new Error(`Root RouteContext is not set. Did you forget to register RouteConfiguration, or try to navigate before calling Aurelia.start()?`);
            t = this.t = this.container.get(lt);
        }
        return t;
    }
    get routeTree() {
        let t = this.i;
        if (null === t) {
            const e = this.ctx;
            t = this.i = new RouteTree(NavigationOptions.create({
                ...this.options
            }), _, null, RouteNode.create({
                path: "",
                finalPath: "",
                context: e,
                instruction: null,
                component: e.definition.component,
                append: false,
                title: e.definition.config.title
            }));
        }
        return t;
    }
    get currentTr() {
        let t = this.h;
        if (null === t) t = this.h = Transition.create({
            id: 0,
            prevInstructions: this.instructions,
            instructions: this.instructions,
            finalInstructions: this.instructions,
            instructionsChanged: true,
            trigger: "api",
            options: NavigationOptions.DEFAULT,
            managedState: null,
            previousRouteTree: this.routeTree.clone(),
            routeTree: this.routeTree,
            resolve: null,
            reject: null,
            promise: null,
            guardsResult: true,
            error: void 0
        });
        return t;
    }
    set currentTr(t) {
        this.h = t;
    }
    resolveContext(t) {
        return RouteContext.resolve(this.ctx, t);
    }
    start(t, e) {
        this.options = RouterOptions.create(t);
        this.u = "function" === typeof this.options.buildTitle;
        this.locationMgr.startListening();
        this.locationChangeSubscription = this.events.subscribe("au:router:location-change", (t => {
            this.p.taskQueue.queueTask((() => {
                const e = Z(t.state) ? t.state : null;
                const i = NavigationOptions.create({
                    ...this.options,
                    historyStrategy: "replace"
                });
                const s = ViewportInstructionTree.create(t.url, i);
                this.enqueue(s, t.trigger, e, null);
            }));
        }));
        if (!this.navigated && e) return this.load(this.locationMgr.getPath(), {
            historyStrategy: "replace"
        });
    }
    stop() {
        var t;
        this.locationMgr.stopListening();
        null === (t = this.locationChangeSubscription) || void 0 === t ? void 0 : t.dispose();
    }
    load(t, e) {
        const i = this.createViewportInstructions(t, e);
        this.logger.trace("load(instructions:%s)", i);
        return this.enqueue(i, "api", null, null);
    }
    isActive(t, e) {
        const i = this.resolveContext(e);
        const s = this.createViewportInstructions(t, {
            context: i
        });
        this.logger.trace("isActive(instructions:%s,ctx:%s)", s, i);
        return this.routeTree.contains(s);
    }
    getRouteContext(e, i, s) {
        const n = s.get(t.ILogger).scopeTo("RouteContext");
        const o = RouteDefinition.resolve(i.Type);
        let r = this.vpaLookup.get(e);
        if (void 0 === r) this.vpaLookup.set(e, r = new WeakMap);
        let h = r.get(o);
        if (void 0 === h) {
            n.trace(`creating new RouteContext for %s`, o);
            const t = s.has(lt, true) ? s.get(lt) : null;
            r.set(o, h = new RouteContext(e, t, i, o, s));
        } else {
            n.trace(`returning existing RouteContext for %s`, o);
            if (null !== e) h.vpa = e;
        }
        return h;
    }
    createViewportInstructions(t, e) {
        if ("string" === typeof t) t = this.locationMgr.removeBaseHref(t);
        return ViewportInstructionTree.create(t, this.getNavigationOptions(e));
    }
    enqueue(t, e, i, s) {
        const n = this.currentTr;
        if ("api" !== e && "api" === n.trigger && n.instructions.equals(t)) {
            this.logger.debug(`Ignoring navigation triggered by '%s' because it is the same URL as the previous navigation which was triggered by 'api'.`, e);
            return true;
        }
        let o;
        let r;
        let h;
        if (null === s) h = new Promise((function(t, e) {
            o = t;
            r = e;
        })); else {
            this.logger.debug(`Reusing promise/resolve/reject from the previously failed transition %s`, s);
            h = s.promise;
            o = s.resolve;
            r = s.reject;
        }
        const a = this.nextTr = Transition.create({
            id: ++this.navigationId,
            trigger: e,
            managedState: i,
            prevInstructions: n.finalInstructions,
            finalInstructions: t,
            instructionsChanged: !n.finalInstructions.equals(t),
            instructions: t,
            options: t.options,
            promise: h,
            resolve: o,
            reject: r,
            previousRouteTree: this.routeTree,
            routeTree: this.i = this.routeTree.clone(),
            guardsResult: true,
            error: void 0
        });
        this.logger.debug(`Scheduling transition: %s`, a);
        if (null === this.activeNavigation) try {
            this.run(a);
        } catch (t) {
            a.handleError(t);
        }
        return a.promise.then((t => {
            this.logger.debug(`Transition succeeded: %s`, a);
            return t;
        })).catch((t => {
            this.logger.error(`Navigation failed: %s`, a, t);
            throw t;
        }));
    }
    run(t) {
        this.currentTr = t;
        this.nextTr = null;
        const e = null === this.lastSuccessfulNavigation ? null : Navigation.create({
            ...this.lastSuccessfulNavigation,
            prevNavigation: null
        });
        this.activeNavigation = Navigation.create({
            id: t.id,
            instructions: t.instructions,
            trigger: t.trigger,
            options: t.options,
            prevNavigation: e,
            finalInstructions: t.finalInstructions
        });
        const i = this.resolveContext(t.options.context);
        const n = !this.navigated || t.instructions.children.length !== i.node.children.length || t.instructions.children.some(((t, e) => {
            var s, n;
            return !(null !== (n = null === (s = i.node.children[e]) || void 0 === s ? void 0 : s.originalInstruction.equals(t)) && void 0 !== n ? n : false);
        }));
        const o = n || "reload" === t.options.getSameUrlStrategy(this.instructions);
        if (!o) {
            this.logger.trace(`run(tr:%s) - NOT processing route`, t);
            this.navigated = true;
            this.activeNavigation = null;
            t.resolve(false);
            this.runNextTransition(t);
            return;
        }
        this.logger.trace(`run(tr:%s) - processing route`, t);
        this.events.publish(new NavigationStartEvent(t.id, t.instructions, t.trigger, t.managedState));
        if (null !== this.nextTr) {
            this.logger.debug(`run(tr:%s) - aborting because a new transition was queued in response to the NavigationStartEvent`, t);
            return this.run(this.nextTr);
        }
        this.activeNavigation = Navigation.create({
            ...this.activeNavigation,
            finalInstructions: t.finalInstructions
        });
        t.run((() => {
            this.logger.trace(`run() - compiling route tree: %s`, t.finalInstructions);
            return D(t.routeTree, t.finalInstructions, i);
        }), (() => {
            const e = t.previousRouteTree.root.children;
            const i = t.routeTree.root.children;
            const n = s(e, i);
            Batch.start((i => {
                this.logger.trace(`run() - invoking canUnload on ${e.length} nodes`);
                for (const s of e) s.context.vpa.canUnload(t, i);
            })).continueWith((e => {
                if (true !== t.guardsResult) {
                    e.push();
                    this.cancelNavigation(t);
                }
            })).continueWith((e => {
                this.logger.trace(`run() - invoking canLoad on ${i.length} nodes`);
                for (const s of i) s.context.vpa.canLoad(t, e);
            })).continueWith((e => {
                if (true !== t.guardsResult) {
                    e.push();
                    this.cancelNavigation(t);
                }
            })).continueWith((i => {
                this.logger.trace(`run() - invoking unload on ${e.length} nodes`);
                for (const s of e) s.context.vpa.unload(t, i);
            })).continueWith((e => {
                this.logger.trace(`run() - invoking load on ${i.length} nodes`);
                for (const s of i) s.context.vpa.load(t, e);
            })).continueWith((e => {
                this.logger.trace(`run() - invoking swap on ${n.length} nodes`);
                for (const i of n) i.context.vpa.swap(t, e);
            })).continueWith((() => {
                this.logger.trace(`run() - finalizing transition`);
                n.forEach((function(t) {
                    t.context.vpa.endTransition();
                }));
                this.navigated = true;
                this.instructions = t.finalInstructions = t.routeTree.finalizeInstructions();
                this.events.publish(new NavigationEndEvent(t.id, t.instructions, this.instructions));
                this.lastSuccessfulNavigation = this.activeNavigation;
                this.activeNavigation = null;
                this.applyHistoryState(t);
                t.resolve(true);
                this.runNextTransition(t);
            })).start();
        }));
    }
    applyHistoryState(t) {
        const e = t.finalInstructions.toUrl(this.options.useUrlFragmentHash);
        switch (t.options.getHistoryStrategy(this.instructions)) {
          case "none":
            break;

          case "push":
            this.locationMgr.pushState(K(t.options.state, t.id), this.updateTitle(t), e);
            break;

          case "replace":
            this.locationMgr.replaceState(K(t.options.state, t.id), this.updateTitle(t), e);
            break;
        }
    }
    getTitle(t) {
        var e, i;
        switch (typeof t.options.title) {
          case "function":
            return null !== (e = t.options.title.call(void 0, t.routeTree.root)) && void 0 !== e ? e : "";

          case "string":
            return t.options.title;

          default:
            return null !== (i = t.routeTree.root.getTitle(t.options.titleSeparator)) && void 0 !== i ? i : "";
        }
    }
    updateTitle(t = this.currentTr) {
        var e;
        const i = this.u ? null !== (e = this.options.buildTitle(t)) && void 0 !== e ? e : "" : this.getTitle(t);
        if (i.length > 0) this.p.document.title = i;
        return this.p.document.title;
    }
    cancelNavigation(e) {
        this.logger.trace(`cancelNavigation(tr:%s)`, e);
        const i = e.previousRouteTree.root.children;
        const n = e.routeTree.root.children;
        const o = s(i, n);
        o.forEach((function(t) {
            t.context.vpa.cancelUpdate();
        }));
        this.activeNavigation = null;
        this.instructions = e.prevInstructions;
        this.i = e.previousRouteTree;
        this.events.publish(new NavigationCancelEvent(e.id, e.instructions, `guardsResult is ${e.guardsResult}`));
        if (false === e.guardsResult) {
            e.resolve(false);
            this.runNextTransition(e);
        } else void t.onResolve(this.enqueue(e.guardsResult, "api", e.managedState, e), (() => {
            this.logger.trace(`cancelNavigation(tr:%s) - finished redirect`, e);
        }));
    }
    runNextTransition(t) {
        if (null !== this.nextTr) {
            this.logger.trace(`runNextTransition(tr:%s) -> scheduling nextTransition: %s`, t, this.nextTr);
            this.p.taskQueue.queueTask((() => {
                const t = this.nextTr;
                if (null !== t) try {
                    this.run(t);
                } catch (e) {
                    t.handleError(e);
                }
            }));
        }
    }
    getNavigationOptions(t) {
        return NavigationOptions.create({
            ...this.options,
            ...t
        });
    }
};

exports.Router = w([ m(0, t.IContainer), m(1, e.IPlatform), m(2, t.ILogger), m(3, x), m(4, b) ], exports.Router);

const tt = t.DI.createInterface("IViewportInstruction");

class ViewportInstruction {
    constructor(t, e, i, s, n, o, r, h) {
        this.context = t;
        this.append = e;
        this.open = i;
        this.close = s;
        this.component = n;
        this.viewport = o;
        this.params = r;
        this.children = h;
    }
    static create(t, e) {
        var i, s, n, o, r, h, a, c, u;
        if (t instanceof ViewportInstruction) return t;
        if (l(t)) {
            const l = TypedNavigationInstruction.create(t.component);
            const d = null !== (s = null === (i = t.children) || void 0 === i ? void 0 : i.map(ViewportInstruction.create)) && void 0 !== s ? s : [];
            return new ViewportInstruction(null !== (o = null !== (n = t.context) && void 0 !== n ? n : e) && void 0 !== o ? o : null, null !== (r = t.append) && void 0 !== r ? r : false, null !== (h = t.open) && void 0 !== h ? h : 0, null !== (a = t.close) && void 0 !== a ? a : 0, l, null !== (c = t.viewport) && void 0 !== c ? c : null, null !== (u = t.params) && void 0 !== u ? u : null, d);
        }
        const d = TypedNavigationInstruction.create(t);
        return new ViewportInstruction(null !== e && void 0 !== e ? e : null, false, 0, 0, d, null, null, []);
    }
    contains(t) {
        const e = this.children;
        const i = t.children;
        if (e.length < i.length) return false;
        if (!this.component.equals(t.component)) return false;
        for (let t = 0, s = i.length; t < s; ++t) if (!e[t].contains(i[t])) return false;
        return true;
    }
    equals(t) {
        const e = this.children;
        const i = t.children;
        if (e.length !== i.length) return false;
        if (!this.component.equals(t.component) || this.viewport !== t.viewport || !g(this.params, t.params)) return false;
        for (let t = 0, s = e.length; t < s; ++t) if (!e[t].equals(i[t])) return false;
        return true;
    }
    clone() {
        return new ViewportInstruction(this.context, this.append, this.open, this.close, this.component.clone(), this.viewport, null === this.params ? null : {
            ...this.params
        }, [ ...this.children ]);
    }
    toUrlComponent(t = true) {
        const e = this.component.toUrlComponent();
        const i = null === this.params || 0 === Object.keys(this.params).length ? "" : `(${et(this.params)})`;
        const s = 0 === e.length || null === this.viewport || 0 === this.viewport.length ? "" : `@${this.viewport}`;
        const n = `${"(".repeat(this.open)}${e}${i}${s}${")".repeat(this.close)}`;
        const o = t ? this.children.map((t => t.toUrlComponent())).join("+") : "";
        if (n.length > 0) {
            if (o.length > 0) return [ n, o ].join("/");
            return n;
        }
        return o;
    }
    toString() {
        const t = `c:${this.component}`;
        const e = null === this.viewport || 0 === this.viewport.length ? "" : `viewport:${this.viewport}`;
        const i = 0 === this.children.length ? "" : `children:[${this.children.map(String).join(",")}]`;
        const s = [ t, e, i ].filter(Boolean).join(",");
        return `VPI(${s})`;
    }
}

function et(e) {
    const i = Object.keys(e);
    const s = Array(i.length);
    const n = [];
    const o = [];
    for (const e of i) if (t.isArrayIndex(e)) n.push(Number(e)); else o.push(e);
    for (let t = 0; t < i.length; ++t) {
        const i = n.indexOf(t);
        if (i > -1) {
            s[t] = e[t];
            n.splice(i, 1);
        } else {
            const i = o.shift();
            s[t] = `${i}=${e[i]}`;
        }
    }
    return s.join(",");
}

const it = function() {
    let t = 0;
    const e = new Map;
    return function(i) {
        let s = e.get(i);
        if (void 0 === s) e.set(i, s = ++t);
        return s;
    };
}();

class ViewportInstructionTree {
    constructor(t, e, i, s, n) {
        this.options = t;
        this.isAbsolute = e;
        this.children = i;
        this.queryParams = s;
        this.fragment = n;
    }
    static create(t, e) {
        const i = NavigationOptions.create({
            ...e
        });
        if (t instanceof ViewportInstructionTree) return new ViewportInstructionTree(i, t.isAbsolute, t.children.map((t => ViewportInstruction.create(t, i.context))), t.queryParams, t.fragment);
        if (t instanceof Array) return new ViewportInstructionTree(i, false, t.map((t => ViewportInstruction.create(t, i.context))), _, null);
        if ("string" === typeof t) {
            const e = RouteExpression.parse(t, i.useUrlFragmentHash);
            return e.toInstructionTree(i);
        }
        return new ViewportInstructionTree(i, false, [ ViewportInstruction.create(t, i.context) ], _, null);
    }
    equals(t) {
        const e = this.children;
        const i = t.children;
        if (e.length !== i.length) return false;
        for (let t = 0, s = e.length; t < s; ++t) if (!e[t].equals(i[t])) return false;
        return true;
    }
    toUrl(t = false) {
        var e;
        let i;
        let s;
        if (t) {
            i = "";
            s = `#${this.toPath()}`;
        } else {
            i = this.toPath();
            s = null !== (e = this.fragment) && void 0 !== e ? e : "";
        }
        let n = this.queryParams.toString();
        n = "" === n ? "" : `?${n}`;
        const o = `${i}${s}${n}`;
        return o;
    }
    toPath() {
        const t = this.children.map((t => t.toUrlComponent())).join("+");
        return t;
    }
    toString() {
        return `[${this.children.map(String).join(",")}]`;
    }
}

var st;

(function(t) {
    t[t["string"] = 0] = "string";
    t[t["ViewportInstruction"] = 1] = "ViewportInstruction";
    t[t["CustomElementDefinition"] = 2] = "CustomElementDefinition";
    t[t["Promise"] = 3] = "Promise";
    t[t["IRouteViewModel"] = 4] = "IRouteViewModel";
})(st || (st = {}));

class TypedNavigationInstruction {
    constructor(t, e) {
        this.type = t;
        this.value = e;
    }
    static create(i) {
        if (i instanceof TypedNavigationInstruction) return i;
        if ("string" === typeof i) return new TypedNavigationInstruction(0, i);
        if (!t.isObject(i)) d("function/class or object", "", i);
        if ("function" === typeof i) if (e.CustomElement.isType(i)) {
            const t = e.CustomElement.getDefinition(i);
            return new TypedNavigationInstruction(2, t);
        } else return TypedNavigationInstruction.create(i());
        if (i instanceof Promise) return new TypedNavigationInstruction(3, i);
        if (l(i)) {
            const t = ViewportInstruction.create(i);
            return new TypedNavigationInstruction(1, t);
        }
        if (e.isCustomElementViewModel(i)) return new TypedNavigationInstruction(4, i);
        if (i instanceof e.CustomElementDefinition) return new TypedNavigationInstruction(2, i);
        if (a(i)) {
            const t = e.CustomElement.define(i);
            const s = e.CustomElement.getDefinition(t);
            return new TypedNavigationInstruction(2, s);
        }
        throw new Error(`Invalid component ${n(i)}: must be either a class, a custom element ViewModel, or a (partial) custom element definition`);
    }
    equals(t) {
        switch (this.type) {
          case 2:
          case 4:
          case 3:
          case 0:
            return this.type === t.type && this.value === t.value;

          case 1:
            return this.type === t.type && this.value.equals(t.value);
        }
    }
    clone() {
        return new TypedNavigationInstruction(this.type, this.value);
    }
    toUrlComponent() {
        switch (this.type) {
          case 2:
            return this.value.name;

          case 4:
          case 3:
            return `au$obj${it(this.value)}`;

          case 1:
            return this.value.toUrlComponent();

          case 0:
            return this.value;
        }
    }
    toString() {
        switch (this.type) {
          case 2:
            return `CEDef(name:'${this.value.name}')`;

          case 3:
            return `Promise`;

          case 4:
            return `VM(name:'${e.CustomElement.getDefinition(this.value.constructor).name}')`;

          case 1:
            return this.value.toString();

          case 0:
            return `'${this.value}'`;
        }
    }
}

const nt = t.emptyArray;

function ot(t, e) {
    if (!g(t.params, e.params)) return "invoke-lifecycles";
    return "none";
}

class RouteConfig {
    constructor(t, e, i, s, n, o, r, h, a, c, u) {
        this.id = t;
        this.path = e;
        this.title = i;
        this.redirectTo = s;
        this.caseSensitive = n;
        this.transitionPlan = o;
        this.viewport = r;
        this.data = h;
        this.routes = a;
        this.fallback = c;
        this.component = u;
    }
    static create(t, e) {
        var i, s, n, o, r, h, a, c, u, l, p, v, g, w, m, x, $, E, y, b, R, S, k, C, I, N, T, A;
        if ("string" === typeof t || t instanceof Array) {
            const l = t;
            const d = null !== (i = null === e || void 0 === e ? void 0 : e.redirectTo) && void 0 !== i ? i : null;
            const f = null !== (s = null === e || void 0 === e ? void 0 : e.caseSensitive) && void 0 !== s ? s : false;
            const p = null !== (n = null === e || void 0 === e ? void 0 : e.id) && void 0 !== n ? n : l instanceof Array ? l[0] : l;
            const v = null !== (o = null === e || void 0 === e ? void 0 : e.title) && void 0 !== o ? o : null;
            const g = null !== (r = null === e || void 0 === e ? void 0 : e.transitionPlan) && void 0 !== r ? r : ot;
            const w = null !== (h = null === e || void 0 === e ? void 0 : e.viewport) && void 0 !== h ? h : null;
            const m = null !== (a = null === e || void 0 === e ? void 0 : e.data) && void 0 !== a ? a : {};
            const x = null !== (c = null === e || void 0 === e ? void 0 : e.routes) && void 0 !== c ? c : nt;
            return new RouteConfig(p, l, v, d, f, g, w, m, x, null !== (u = null === e || void 0 === e ? void 0 : e.fallback) && void 0 !== u ? u : null, null);
        } else if ("object" === typeof t) {
            const i = t;
            f(i, "");
            const s = null !== (p = null !== (l = i.path) && void 0 !== l ? l : null === e || void 0 === e ? void 0 : e.path) && void 0 !== p ? p : null;
            const n = null !== (g = null !== (v = i.title) && void 0 !== v ? v : null === e || void 0 === e ? void 0 : e.title) && void 0 !== g ? g : null;
            const o = null !== (m = null !== (w = i.redirectTo) && void 0 !== w ? w : null === e || void 0 === e ? void 0 : e.redirectTo) && void 0 !== m ? m : null;
            const r = null !== ($ = null !== (x = i.caseSensitive) && void 0 !== x ? x : null === e || void 0 === e ? void 0 : e.caseSensitive) && void 0 !== $ ? $ : false;
            const h = null !== (y = null !== (E = i.id) && void 0 !== E ? E : null === e || void 0 === e ? void 0 : e.id) && void 0 !== y ? y : s instanceof Array ? s[0] : s;
            const a = null !== (R = null !== (b = i.transitionPlan) && void 0 !== b ? b : null === e || void 0 === e ? void 0 : e.transitionPlan) && void 0 !== R ? R : ot;
            const c = null !== (k = null !== (S = i.viewport) && void 0 !== S ? S : null === e || void 0 === e ? void 0 : e.viewport) && void 0 !== k ? k : null;
            const u = {
                ...null === e || void 0 === e ? void 0 : e.data,
                ...i.data
            };
            const d = [ ...null !== (C = i.routes) && void 0 !== C ? C : nt, ...null !== (I = null === e || void 0 === e ? void 0 : e.routes) && void 0 !== I ? I : nt ];
            return new RouteConfig(h, s, n, o, r, a, c, u, d, null !== (T = null !== (N = i.fallback) && void 0 !== N ? N : null === e || void 0 === e ? void 0 : e.fallback) && void 0 !== T ? T : null, null !== (A = i.component) && void 0 !== A ? A : null);
        } else d("string, function/class or object", "", t);
    }
    applyChildRouteConfig(t) {
        var e, i, s, n, o, r, h, a, c, u, l, d;
        let p = null !== (e = this.path) && void 0 !== e ? e : "";
        if ("string" !== typeof p) p = p[0];
        f(t, p);
        return new RouteConfig(null !== (i = t.id) && void 0 !== i ? i : this.id, null !== (s = t.path) && void 0 !== s ? s : this.path, null !== (n = t.title) && void 0 !== n ? n : this.title, null !== (o = t.redirectTo) && void 0 !== o ? o : this.redirectTo, null !== (r = t.caseSensitive) && void 0 !== r ? r : this.caseSensitive, null !== (h = t.transitionPlan) && void 0 !== h ? h : this.transitionPlan, null !== (a = t.viewport) && void 0 !== a ? a : this.viewport, null !== (c = t.data) && void 0 !== c ? c : this.data, null !== (u = t.routes) && void 0 !== u ? u : this.routes, null !== (l = t.fallback) && void 0 !== l ? l : this.fallback, null !== (d = t.component) && void 0 !== d ? d : this.component);
    }
}

const rt = {
    name: t.Protocol.resource.keyFor("route-configuration"),
    isConfigured(e) {
        return t.Metadata.hasOwn(rt.name, e);
    },
    configure(e, i) {
        const s = RouteConfig.create(e, i);
        t.Metadata.define(rt.name, s, i);
        return i;
    },
    getConfig(e) {
        if (!rt.isConfigured(e)) rt.configure({}, e);
        return t.Metadata.getOwn(rt.name, e);
    }
};

function ht(t) {
    return function(e) {
        return rt.configure(t, e);
    };
}

const at = "default";

class RouteDefinition {
    constructor(t, e) {
        var i, s, n, h, a, c;
        this.config = t;
        this.component = e;
        this.hasExplicitPath = null !== t.path;
        this.caseSensitive = t.caseSensitive;
        this.path = o(null !== (i = t.path) && void 0 !== i ? i : e.name);
        this.redirectTo = null !== (s = t.redirectTo) && void 0 !== s ? s : null;
        this.viewport = null !== (n = t.viewport) && void 0 !== n ? n : at;
        this.id = r(null !== (h = t.id) && void 0 !== h ? h : this.path);
        this.data = null !== (a = t.data) && void 0 !== a ? a : {};
        this.fallback = null !== (c = t.fallback) && void 0 !== c ? c : null;
    }
    static resolve(e, i) {
        if (u(e)) return new RouteDefinition(RouteConfig.create(e, null), null);
        return t.onResolve(this.resolveCustomElementDefinition(e, i), (t => {
            const i = t.Type;
            const s = c(e) ? rt.isConfigured(i) ? rt.getConfig(i).applyChildRouteConfig(e) : RouteConfig.create(e, i) : rt.getConfig(t.Type);
            let n = ct.get(t);
            if (null === n) {
                n = new RouteDefinition(s, t);
                ct.define(n, t);
            }
            return n;
        }));
    }
    static resolveCustomElementDefinition(t, i) {
        if (c(t)) return this.resolveCustomElementDefinition(t.component, i);
        const s = TypedNavigationInstruction.create(t);
        switch (s.type) {
          case 0:
            {
                if (void 0 === i) throw new Error(`When retrieving the RouteDefinition for a component name, a RouteContext (that can resolve it) must be provided`);
                const t = i.container.find(e.CustomElement, s.value);
                if (null === t) throw new Error(`Could not find a CustomElement named '${s.value}' in the current container scope of ${i}. This means the component is neither registered at Aurelia startup nor via the 'dependencies' decorator or static property.`);
                return t;
            }

          case 2:
            return s.value;

          case 4:
            return e.CustomElement.getDefinition(s.value.constructor);

          case 3:
            if (void 0 === i) throw new Error(`RouteContext must be provided when resolving an imported module`);
            return i.resolveLazy(s.value);
        }
    }
    register(t) {
        var e;
        null === (e = this.component) || void 0 === e ? void 0 : e.register(t);
    }
    toUrlComponent() {
        return "not-implemented";
    }
    toString() {
        const t = null === this.config.path ? "null" : `'${this.config.path}'`;
        if (null !== this.component) return `RD(config.path:${t},c.name:'${this.component.name}',vp:'${this.viewport}')`; else return `RD(config.path:${t},redirectTo:'${this.redirectTo}')`;
    }
}

const ct = {
    name: t.Protocol.resource.keyFor("route-definition"),
    isDefined(e) {
        return t.Metadata.hasOwn(ct.name, e);
    },
    define(e, i) {
        t.Metadata.define(ct.name, e, i);
    },
    get(e) {
        return ct.isDefined(e) ? t.Metadata.getOwn(ct.name, e) : null;
    }
};

const ut = new WeakMap;

class ComponentAgent {
    constructor(e, i, s, n, o) {
        var r, h, a, c;
        this.instance = e;
        this.controller = i;
        this.definition = s;
        this.routeNode = n;
        this.ctx = o;
        this.$ = o.container.get(t.ILogger).scopeTo(`ComponentAgent<${o.friendlyPath}>`);
        this.$.trace(`constructor()`);
        const u = i.lifecycleHooks;
        this.canLoadHooks = (null !== (r = u.canLoad) && void 0 !== r ? r : []).map((t => t.instance));
        this.loadHooks = (null !== (h = u.load) && void 0 !== h ? h : []).map((t => t.instance));
        this.canUnloadHooks = (null !== (a = u.canUnload) && void 0 !== a ? a : []).map((t => t.instance));
        this.unloadHooks = (null !== (c = u.unload) && void 0 !== c ? c : []).map((t => t.instance));
        this.R = "canLoad" in e;
        this.C = "load" in e;
        this.I = "canUnload" in e;
        this.N = "unload" in e;
    }
    static for(t, i, s, n) {
        let o = ut.get(t);
        if (void 0 === o) {
            const r = n.container;
            const h = RouteDefinition.resolve(t.constructor);
            const a = e.Controller.$el(r, t, i.host, null);
            ut.set(t, o = new ComponentAgent(t, a, h, s, n));
        }
        return o;
    }
    activate(t, e, i) {
        if (null === t) {
            this.$.trace(`activate() - initial`);
            return this.controller.activate(this.controller, e, i);
        }
        this.$.trace(`activate()`);
        void this.controller.activate(t, e, i);
    }
    deactivate(t, e, i) {
        if (null === t) {
            this.$.trace(`deactivate() - initial`);
            return this.controller.deactivate(this.controller, e, i);
        }
        this.$.trace(`deactivate()`);
        void this.controller.deactivate(t, e, i);
    }
    dispose() {
        this.$.trace(`dispose()`);
        this.controller.dispose();
    }
    canUnload(t, e, i) {
        this.$.trace(`canUnload(next:%s) - invoking ${this.canUnloadHooks.length} hooks`, e);
        i.push();
        for (const s of this.canUnloadHooks) t.run((() => {
            i.push();
            return s.canUnload(this.instance, e, this.routeNode);
        }), (e => {
            if (true === t.guardsResult && true !== e) t.guardsResult = false;
            i.pop();
        }));
        if (this.I) t.run((() => {
            i.push();
            return this.instance.canUnload(e, this.routeNode);
        }), (e => {
            if (true === t.guardsResult && true !== e) t.guardsResult = false;
            i.pop();
        }));
        i.pop();
    }
    canLoad(t, e, i) {
        this.$.trace(`canLoad(next:%s) - invoking ${this.canLoadHooks.length} hooks`, e);
        i.push();
        for (const s of this.canLoadHooks) t.run((() => {
            i.push();
            return s.canLoad(this.instance, e.params, e, this.routeNode);
        }), (e => {
            if (true === t.guardsResult && true !== e) t.guardsResult = false === e ? false : ViewportInstructionTree.create(e);
            i.pop();
        }));
        if (this.R) t.run((() => {
            i.push();
            return this.instance.canLoad(e.params, e, this.routeNode);
        }), (e => {
            if (true === t.guardsResult && true !== e) t.guardsResult = false === e ? false : ViewportInstructionTree.create(e);
            i.pop();
        }));
        i.pop();
    }
    unload(t, e, i) {
        this.$.trace(`unload(next:%s) - invoking ${this.unloadHooks.length} hooks`, e);
        i.push();
        for (const s of this.unloadHooks) t.run((() => {
            i.push();
            return s.unload(this.instance, e, this.routeNode);
        }), (() => {
            i.pop();
        }));
        if (this.N) t.run((() => {
            i.push();
            return this.instance.unload(e, this.routeNode);
        }), (() => {
            i.pop();
        }));
        i.pop();
    }
    load(t, e, i) {
        this.$.trace(`load(next:%s) - invoking ${this.loadHooks.length} hooks`, e);
        i.push();
        for (const s of this.loadHooks) t.run((() => {
            i.push();
            return s.load(this.instance, e.params, e, this.routeNode);
        }), (() => {
            i.pop();
        }));
        if (this.C) t.run((() => {
            i.push();
            return this.instance.load(e.params, e, this.routeNode);
        }), (() => {
            i.pop();
        }));
        i.pop();
    }
    toString() {
        return `CA(ctx:'${this.ctx.friendlyPath}',c:'${this.definition.component.name}')`;
    }
}

const lt = t.DI.createInterface("IRouteContext");

const dt = "au$residue";

class RouteContext {
    constructor(s, n, r, h, a) {
        var u;
        this.parent = n;
        this.component = r;
        this.definition = h;
        this.parentContainer = a;
        this.childViewportAgents = [];
        this.childRoutes = [];
        this.T = null;
        this.A = null;
        this.prevNode = null;
        this.V = null;
        this.P = null;
        this.P = s;
        if (null === n) {
            this.root = this;
            this.path = [ this ];
            this.friendlyPath = r.name;
        } else {
            this.root = n.root;
            this.path = [ ...n.path, this ];
            this.friendlyPath = `${n.friendlyPath}/${r.name}`;
        }
        this.logger = a.get(t.ILogger).scopeTo(`RouteContext<${this.friendlyPath}>`);
        this.logger.trace("constructor()");
        this.moduleLoader = a.get(t.IModuleLoader);
        const l = this.container = a.createChild();
        l.registerResolver(e.IController, this.hostControllerProvider = new t.InstanceProvider, true);
        l.registerResolver(lt, new t.InstanceProvider("IRouteContext", this));
        l.register(h);
        l.register(...r.dependencies);
        this.recognizer = new i.RouteRecognizer;
        const d = [];
        const f = [];
        for (const e of h.config.routes) if (e instanceof Promise) {
            const t = this.addRoute(e);
            d.push(t);
            f.push(t);
        } else {
            const i = RouteDefinition.resolve(e, this);
            if (i instanceof Promise) if (c(e) && null != e.path) {
                for (const t of o(e.path)) this.$addRoute(t, null !== (u = e.caseSensitive) && void 0 !== u ? u : false, i);
                const s = this.childRoutes.length;
                const n = i.then((t => this.childRoutes[s] = t));
                this.childRoutes.push(n);
                f.push(n.then(t.noop));
            } else throw new Error(`Invalid route config. When the component property is a lazy import, the path must be specified.`); else {
                for (const t of i.path) this.$addRoute(t, i.caseSensitive, i);
                this.childRoutes.push(i);
            }
        }
        if (d.length > 0) this.T = Promise.all(d).then((() => {
            this.T = null;
        }));
        if (f.length > 0) this.A = Promise.all(f).then((() => {
            this.A = null;
        }));
    }
    get id() {
        return this.container.id;
    }
    get isRoot() {
        return null === this.parent;
    }
    get depth() {
        return this.path.length - 1;
    }
    get resolved() {
        return this.T;
    }
    get allResolved() {
        return this.A;
    }
    get node() {
        const t = this.V;
        if (null === t) throw new Error(`Invariant violation: RouteNode should be set immediately after the RouteContext is created. Context: ${this}`);
        return t;
    }
    set node(t) {
        const e = this.prevNode = this.V;
        if (e !== t) {
            this.V = t;
            this.logger.trace(`Node changed from %s to %s`, this.prevNode, t);
        }
    }
    get vpa() {
        const t = this.P;
        if (null === t) throw new Error(`RouteContext has no ViewportAgent: ${this}`);
        return t;
    }
    set vpa(t) {
        if (null === t || void 0 === t) throw new Error(`Cannot set ViewportAgent to ${t} for RouteContext: ${this}`);
        const e = this.P;
        if (e !== t) {
            this.P = t;
            this.logger.trace(`ViewportAgent changed from %s to %s`, e, t);
        }
    }
    static setRoot(i) {
        const s = i.get(t.ILogger).scopeTo("RouteContext");
        if (!i.has(e.IAppRoot, true)) pt(new Error(`The provided container has no registered IAppRoot. RouteContext.setRoot can only be used after Aurelia.app was called, on a container that is within that app's component tree.`), s);
        if (i.has(lt, true)) pt(new Error(`A root RouteContext is already registered. A possible cause is the RouterConfiguration being registered more than once in the same container tree. If you have a multi-rooted app, make sure you register RouterConfiguration only in the "forked" containers and not in the common root.`), s);
        const {controller: n} = i.get(e.IAppRoot);
        if (void 0 === n) pt(new Error(`The provided IAppRoot does not (yet) have a controller. A possible cause is calling this API manually before Aurelia.start() is called`), s);
        const o = i.get(X);
        const r = o.getRouteContext(null, n.definition, n.container);
        i.register(t.Registration.instance(lt, r));
        r.node = o.routeTree.root;
    }
    static resolve(i, s) {
        const n = i.container;
        const o = n.get(t.ILogger).scopeTo("RouteContext");
        if (null === s || void 0 === s) {
            o.trace(`resolve(context:%s) - returning root RouteContext`, s);
            return i;
        }
        if (ft(s)) {
            o.trace(`resolve(context:%s) - returning provided RouteContext`, s);
            return s;
        }
        if (s instanceof n.get(e.IPlatform).Node) try {
            const t = e.CustomElement.for(s, {
                searchParents: true
            });
            o.trace(`resolve(context:Node(nodeName:'${s.nodeName}'),controller:'${t.definition.name}') - resolving RouteContext from controller's RenderContext`);
            return t.container.get(lt);
        } catch (t) {
            o.error(`Failed to resolve RouteContext from Node(nodeName:'${s.nodeName}')`, t);
            throw t;
        }
        if (e.isCustomElementViewModel(s)) {
            const t = s.$controller;
            o.trace(`resolve(context:CustomElementViewModel(name:'${t.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return t.container.get(lt);
        }
        if (e.isCustomElementController(s)) {
            const t = s;
            o.trace(`resolve(context:CustomElementController(name:'${t.definition.name}')) - resolving RouteContext from controller's RenderContext`);
            return t.container.get(lt);
        }
        pt(new Error(`Invalid context type: ${Object.prototype.toString.call(s)}`), o);
    }
    dispose() {
        this.container.dispose();
    }
    resolveViewportAgent(t) {
        this.logger.trace(`resolveViewportAgent(req:%s)`, t);
        const e = this.childViewportAgents.find((e => e.handles(t)));
        if (void 0 === e) throw new Error(`Failed to resolve ${t} at:\n${this.printTree()}`);
        return e;
    }
    getAvailableViewportAgents(t) {
        return this.childViewportAgents.filter((e => e.isAvailable(t)));
    }
    getFallbackViewportAgent(t, e) {
        var i;
        return null !== (i = this.childViewportAgents.find((i => i.isAvailable(t) && i.viewport.name === e && i.viewport.fallback.length > 0))) && void 0 !== i ? i : null;
    }
    createComponentAgent(t, e) {
        this.logger.trace(`createComponentAgent(routeNode:%s)`, e);
        this.hostControllerProvider.prepare(t);
        const i = RouteDefinition.resolve(e.component);
        const s = this.container.get(i.component.key);
        const n = ComponentAgent.for(s, t, e, this);
        this.hostControllerProvider.dispose();
        return n;
    }
    registerViewport(t) {
        const e = ViewportAgent.for(t, this);
        if (this.childViewportAgents.includes(e)) this.logger.trace(`registerViewport(agent:%s) -> already registered, so skipping`, e); else {
            this.logger.trace(`registerViewport(agent:%s) -> adding`, e);
            this.childViewportAgents.push(e);
        }
        return e;
    }
    unregisterViewport(t) {
        const e = ViewportAgent.for(t, this);
        if (this.childViewportAgents.includes(e)) {
            this.logger.trace(`unregisterViewport(agent:%s) -> unregistering`, e);
            this.childViewportAgents.splice(this.childViewportAgents.indexOf(e), 1);
        } else this.logger.trace(`unregisterViewport(agent:%s) -> not registered, so skipping`, e);
    }
    recognize(t) {
        var e;
        this.logger.trace(`recognize(path:'${t}')`);
        const i = this.recognizer.recognize(t);
        if (null === i) return null;
        let s;
        if (Reflect.has(i.params, dt)) s = null !== (e = i.params[dt]) && void 0 !== e ? e : null; else s = null;
        return new $RecognizedRoute(i, s);
    }
    addRoute(e) {
        this.logger.trace(`addRoute(routeable:'${e}')`);
        return t.onResolve(RouteDefinition.resolve(e, this), (t => {
            for (const e of t.path) this.$addRoute(e, t.caseSensitive, t);
            this.childRoutes.push(t);
        }));
    }
    $addRoute(t, e, i) {
        this.recognizer.add({
            path: t,
            caseSensitive: e,
            handler: i
        });
        this.recognizer.add({
            path: `${t}/*${dt}`,
            caseSensitive: e,
            handler: i
        });
    }
    resolveLazy(t) {
        return this.moduleLoader.load(t, (e => {
            let i;
            let s;
            for (const t of e.items) if (t.isConstructable) {
                const e = t.definitions.find(vt);
                if (void 0 !== e) if ("default" === t.key) i = e; else if (void 0 === s) s = e;
            }
            if (void 0 === i) {
                if (void 0 === s) throw new Error(`${t} does not appear to be a component or CustomElement recognizable by Aurelia`);
                return s;
            }
            return i;
        }));
    }
    toString() {
        const t = this.childViewportAgents;
        const e = t.map(String).join(",");
        return `RC(path:'${this.friendlyPath}',viewports:[${e}])`;
    }
    printTree() {
        const t = [];
        for (let e = 0; e < this.path.length; ++e) t.push(`${" ".repeat(e)}${this.path[e]}`);
        return t.join("\n");
    }
}

function ft(t) {
    return t instanceof RouteContext;
}

function pt(t, e) {
    e.error(t);
    throw t;
}

function vt(t) {
    return e.CustomElement.isType(t.Type);
}

class $RecognizedRoute {
    constructor(t, e) {
        this.route = t;
        this.residue = e;
    }
}

exports.ViewportCustomElement = class ViewportCustomElement {
    constructor(t, e) {
        this.logger = t;
        this.ctx = e;
        this.name = at;
        this.usedBy = "";
        this.default = "";
        this.fallback = "";
        this.stateful = false;
        this.agent = void 0;
        this.controller = void 0;
        this.logger = t.scopeTo(`au-viewport<${e.friendlyPath}>`);
        this.logger.trace("constructor()");
    }
    hydrated(t) {
        this.logger.trace("hydrated()");
        this.controller = t;
        this.agent = this.ctx.registerViewport(this);
    }
    attaching(t, e, i) {
        this.logger.trace("attaching()");
        return this.agent.activateFromViewport(t, this.controller, i);
    }
    detaching(t, e, i) {
        this.logger.trace("detaching()");
        return this.agent.deactivateFromViewport(t, this.controller, i);
    }
    dispose() {
        this.logger.trace("dispose()");
        this.ctx.unregisterViewport(this);
        this.agent.dispose();
        this.agent = void 0;
    }
    toString() {
        const t = [];
        for (const e of gt) {
            const i = this[e];
            switch (typeof i) {
              case "string":
                if ("" !== i) t.push(`${e}:'${i}'`);
                break;

              case "boolean":
                if (i) t.push(`${e}:${i}`);
                break;

              default:
                t.push(`${e}:${String(i)}`);
            }
        }
        return `VP(ctx:'${this.ctx.friendlyPath}',${t.join(",")})`;
    }
};

w([ e.bindable ], exports.ViewportCustomElement.prototype, "name", void 0);

w([ e.bindable ], exports.ViewportCustomElement.prototype, "usedBy", void 0);

w([ e.bindable ], exports.ViewportCustomElement.prototype, "default", void 0);

w([ e.bindable ], exports.ViewportCustomElement.prototype, "fallback", void 0);

w([ e.bindable ], exports.ViewportCustomElement.prototype, "stateful", void 0);

exports.ViewportCustomElement = w([ e.customElement({
    name: "au-viewport"
}), m(0, t.ILogger), m(1, lt) ], exports.ViewportCustomElement);

const gt = [ "name", "usedBy", "default", "fallback", "stateful" ];

exports.LoadCustomAttribute = class LoadCustomAttribute {
    constructor(t, e, i, s, n, o, r) {
        this.target = t;
        this.el = e;
        this.router = i;
        this.events = s;
        this.delegator = n;
        this.ctx = o;
        this.locationMgr = r;
        this.attribute = "href";
        this.active = false;
        this.href = null;
        this.instructions = null;
        this.eventListener = null;
        this.navigationEndListener = null;
        this.onClick = t => {
            if (null === this.instructions) return;
            if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey || 0 !== t.button) return;
            t.preventDefault();
            void this.router.load(this.instructions, {
                context: this.ctx
            });
        };
        this.isEnabled = !e.hasAttribute("external") && !e.hasAttribute("data-external");
    }
    binding() {
        if (this.isEnabled) this.eventListener = this.delegator.addEventListener(this.target, this.el, "click", this.onClick);
        this.valueChanged();
        this.navigationEndListener = this.events.subscribe("au:router:navigation-end", (t => {
            this.valueChanged();
            this.active = null !== this.instructions && this.router.isActive(this.instructions, this.ctx);
        }));
    }
    attaching() {
        if (null !== this.ctx.allResolved) return this.ctx.allResolved.then((() => {
            this.valueChanged();
        }));
    }
    unbinding() {
        if (this.isEnabled) this.eventListener.dispose();
        this.navigationEndListener.dispose();
    }
    valueChanged() {
        const t = this.router.options.useUrlFragmentHash;
        if (null !== this.route && void 0 !== this.route && null === this.ctx.allResolved) {
            const e = this.ctx.childRoutes.find((t => t.id === this.route));
            if (void 0 !== e) {
                const i = this.ctx.node.computeAbsolutePath();
                let s = e.path[0];
                if ("object" === typeof this.params && null !== this.params) {
                    const t = Object.keys(this.params);
                    for (const e of t) {
                        const t = this.params[e];
                        if (null != t && String(t).length > 0) s = s.replace(new RegExp(`[*:]${e}[?]?`), t);
                    }
                }
                s = s.replace(/\/[*:][^/]+[?]/g, "").replace(/[*:][^/]+[?]\//g, "");
                if (i) if (s) this.href = `${t ? "#" : ""}${[ i, s ].join("/")}`; else this.href = `${t ? "#" : ""}${i}`; else this.href = `${t ? "#" : ""}${s}`;
                this.instructions = this.router.createViewportInstructions(`${t ? "#" : ""}${s}`, {
                    context: this.ctx
                });
            } else {
                if ("object" === typeof this.params && null !== this.params) this.instructions = this.router.createViewportInstructions({
                    component: this.route,
                    params: this.params
                }, {
                    context: this.ctx
                }); else this.instructions = this.router.createViewportInstructions(this.route, {
                    context: this.ctx
                });
                this.href = this.instructions.toUrl(this.router.options.useUrlFragmentHash);
            }
        } else {
            this.instructions = null;
            this.href = null;
        }
        const i = e.CustomElement.for(this.el, {
            optional: true
        });
        if (null !== i) i.viewModel[this.attribute] = this.instructions; else if (null === this.href) this.el.removeAttribute(this.attribute); else {
            const e = t ? this.href : this.locationMgr.addBaseHref(this.href);
            this.el.setAttribute(this.attribute, e);
        }
    }
};

w([ e.bindable({
    mode: e.BindingMode.toView,
    primary: true,
    callback: "valueChanged"
}) ], exports.LoadCustomAttribute.prototype, "route", void 0);

w([ e.bindable({
    mode: e.BindingMode.toView,
    callback: "valueChanged"
}) ], exports.LoadCustomAttribute.prototype, "params", void 0);

w([ e.bindable({
    mode: e.BindingMode.toView
}) ], exports.LoadCustomAttribute.prototype, "attribute", void 0);

w([ e.bindable({
    mode: e.BindingMode.fromView
}) ], exports.LoadCustomAttribute.prototype, "active", void 0);

exports.LoadCustomAttribute = w([ e.customAttribute("load"), m(0, e.IEventTarget), m(1, e.INode), m(2, X), m(3, x), m(4, e.IEventDelegator), m(5, lt), m(6, b) ], exports.LoadCustomAttribute);

exports.HrefCustomAttribute = class HrefCustomAttribute {
    constructor(t, e, i, s, n, o) {
        this.target = t;
        this.el = e;
        this.router = i;
        this.delegator = s;
        this.ctx = n;
        this.isInitialized = false;
        if (i.options.useHref && "A" === e.nodeName) switch (e.getAttribute("target")) {
          case null:
          case o.name:
          case "_self":
            this.isEnabled = true;
            break;

          default:
            this.isEnabled = false;
            break;
        } else this.isEnabled = false;
    }
    get isExternal() {
        return this.el.hasAttribute("external") || this.el.hasAttribute("data-external");
    }
    binding() {
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.isEnabled = this.isEnabled && null === e.getRef(this.el, e.CustomAttribute.getDefinition(exports.LoadCustomAttribute).key);
        }
        if (null == this.value) this.el.removeAttribute("href"); else this.el.setAttribute("href", this.value);
        this.eventListener = this.delegator.addEventListener(this.target, this.el, "click", this);
    }
    unbinding() {
        this.eventListener.dispose();
    }
    valueChanged(t) {
        if (null == t) this.el.removeAttribute("href"); else this.el.setAttribute("href", t);
    }
    handleEvent(t) {
        this.L(t);
    }
    L(t) {
        if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey || 0 !== t.button || this.isExternal || !this.isEnabled) return;
        const e = this.el.getAttribute("href");
        if (null !== e) {
            t.preventDefault();
            void this.router.load(e, {
                context: this.ctx
            });
        }
    }
};

w([ e.bindable({
    mode: e.BindingMode.toView
}) ], exports.HrefCustomAttribute.prototype, "value", void 0);

exports.HrefCustomAttribute = w([ e.customAttribute({
    name: "href",
    noMultiBindings: true
}), m(0, e.IEventTarget), m(1, e.INode), m(2, X), m(3, e.IEventDelegator), m(4, lt), m(5, e.IWindow) ], exports.HrefCustomAttribute);

const wt = X;

const mt = [ wt ];

const xt = exports.ViewportCustomElement;

const $t = exports.LoadCustomAttribute;

const Et = exports.HrefCustomAttribute;

const yt = [ exports.ViewportCustomElement, exports.LoadCustomAttribute, exports.HrefCustomAttribute ];

function bt(i, s) {
    return i.register(e.AppTask.hydrated(t.IContainer, RouteContext.setRoot), e.AppTask.afterActivate(X, (e => {
        if (t.isObject(s)) if ("function" === typeof s) return s(e); else return e.start(s, true);
        return e.start({}, true);
    })), e.AppTask.afterDeactivate(X, (t => {
        t.stop();
    })), ...mt, ...yt);
}

const Rt = {
    register(t) {
        return bt(t);
    },
    customize(t) {
        return {
            register(e) {
                return bt(e, t);
            }
        };
    }
};

class ScrollState {
    constructor(t) {
        this.el = t;
        this.top = t.scrollTop;
        this.left = t.scrollLeft;
    }
    static has(t) {
        return t.scrollTop > 0 || t.scrollLeft > 0;
    }
    restore() {
        this.el.scrollTo(this.left, this.top);
        this.el = null;
    }
}

function St(t) {
    t.restore();
}

class HostElementState {
    constructor(t) {
        this.scrollStates = [];
        this.save(t.children);
    }
    save(t) {
        let e;
        for (let i = 0, s = t.length; i < s; ++i) {
            e = t[i];
            if (ScrollState.has(e)) this.scrollStates.push(new ScrollState(e));
            this.save(e.children);
        }
    }
    restore() {
        this.scrollStates.forEach(St);
        this.scrollStates = null;
    }
}

const kt = t.DI.createInterface("IStateManager", (t => t.singleton(ScrollStateManager)));

class ScrollStateManager {
    constructor() {
        this.cache = new WeakMap;
    }
    saveState(t) {
        this.cache.set(t.host, new HostElementState(t.host));
    }
    restoreState(t) {
        const e = this.cache.get(t.host);
        if (void 0 !== e) {
            e.restore();
            this.cache.delete(t.host);
        }
    }
}

exports.AST = T;

exports.ActionExpression = ActionExpression;

exports.AuNavId = J;

exports.ComponentAgent = ComponentAgent;

exports.ComponentExpression = ComponentExpression;

exports.CompositeSegmentExpression = CompositeSegmentExpression;

exports.DefaultComponents = mt;

exports.DefaultResources = yt;

exports.HrefCustomAttributeRegistration = Et;

exports.IBaseHrefProvider = E;

exports.ILocationManager = b;

exports.IRouteContext = lt;

exports.IRouter = X;

exports.IRouterEvents = x;

exports.IStateManager = kt;

exports.IViewportInstruction = tt;

exports.LoadCustomAttributeRegistration = $t;

exports.LocationChangeEvent = LocationChangeEvent;

exports.Navigation = Navigation;

exports.NavigationCancelEvent = NavigationCancelEvent;

exports.NavigationEndEvent = NavigationEndEvent;

exports.NavigationErrorEvent = NavigationErrorEvent;

exports.NavigationOptions = NavigationOptions;

exports.NavigationStartEvent = NavigationStartEvent;

exports.ParameterExpression = ParameterExpression;

exports.ParameterListExpression = ParameterListExpression;

exports.Route = rt;

exports.RouteConfig = RouteConfig;

exports.RouteContext = RouteContext;

exports.RouteDefinition = RouteDefinition;

exports.RouteExpression = RouteExpression;

exports.RouteNode = RouteNode;

exports.RouteTree = RouteTree;

exports.RouterConfiguration = Rt;

exports.RouterOptions = RouterOptions;

exports.RouterRegistration = wt;

exports.ScopedSegmentExpression = ScopedSegmentExpression;

exports.SegmentExpression = SegmentExpression;

exports.SegmentGroupExpression = SegmentGroupExpression;

exports.Transition = Transition;

exports.ViewportAgent = ViewportAgent;

exports.ViewportCustomElementRegistration = xt;

exports.ViewportExpression = ViewportExpression;

exports.isManagedState = Z;

exports.route = ht;

exports.toManagedState = K;
//# sourceMappingURL=index.js.map
