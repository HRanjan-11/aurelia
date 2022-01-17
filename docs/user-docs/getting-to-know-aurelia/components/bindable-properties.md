---
description: How to create components that accept one or more bindable properties
---

# Bindable properties

When creating components, sometimes you will want the ability for data to be passed into them. The `@bindable` decorator allows you to specify one or more bindable properties for a component.

The `@bindable` attribute also can be used with custom attributes as well as custom elements.

## A simple example

Bindable properties on components are denoted by the `@bindable` decorator on the view model of a component.

{% tabs %}
{% tab title="loader.ts" %}
```typescript
import { bindable } from 'aurelia';

export class Loader {
    @bindable loading = false;
}
```
{% endtab %}
{% endtabs %}

This will allow our component to be passed in values. Our specified bindable property here is called `loading` and can be used like this:

```html
<loader loading.bind="true"></loader>
```

In the example above, we are binding the boolean literal `true` to the `loading` property.

Instead of literal, you can also bind another property (`loadingVal` in the following example) to the `loading` property.

```html
<loader loading.bind="loadingVal"></loader>
```

You can also bind values without the `.bind` part, as can be seen the following example.

```html
<loader loading="true"></loader>
```

However, there is a subtle difference. In this case, Aurelia considers the attribute value as a string. Thus, instead of a boolean `true` value the string `'true'` gets bound to the `loading` property. This might cause some unexpected issues. However, you can apply coercion using a bindable setter (further below in this section) or specifying the bindable type explicitly.

## Binding modes

Bindable properties support many different binding modes determining the direction the data is bound in as well as how it is bound.

### One way binding

By default, bindable properties will be one-way binding. This means values flow into your component, but not back out of it (hence the name, one way).

Specifying a `bindable` property without any configuration will result in it being one-way. You can also explicitly specify the binding mode.

```typescript
import { bindable, BindingMode } from 'aurelia';

export class Loader {
    @bindable({ mode: BindingMode.oneWay })
}
```

### Twoway binding

Unlike the default, the two-way binding mode allows data to flow in both directions. If the value is changed with your component it flows back out and so forth.

```typescript
import { bindable, BindingMode } from 'aurelia';

export class Loader {
    @bindable({ mode: BindingMode.twoWay})
}
```

## Bindable setter

In some cases, you want to make an impact on the value that is binding. For such a scenario you can use the possibility of new `set`.

```typescript
@bindable({ 
    set: value => function(value),  /* HERE */
    // Or set: value => value,
    mode: /* ... */ 
})
```

Suppose you have a `carousel` component in which you want to enable `navigator` feature for it. You probably imagine such a thing for yourself.

```markup
<!-- Enable -->
<my-carousel navigator.bind="true">
<my-carousel navigator="true">
<my-carousel navigator=true>
<my-carousel navigator>

<!-- Disable -->
<my-carousel navigator.bind="false">
<my-carousel navigator="false">
<my-carousel navigator=false>
<my-carousel>
```

In version two, you can easily implement such a capability with the `set` feature.

To make things easier, first design a new type that accepts `true` and `false` as a string and a boolean.

```typescript
export type BooleanString = "true" | "false" | true | false /* boolean */;
```

Define your property like this:

```typescript
@bindable({ set: /* ? */, mode: BindingMode.toView }) public navigator: BooleanString = false;
```

For `set` part, we need functionality to check the input, If the value is one of the following, we want to return `true`, otherwise we return the `false` value.

* `''`: No input for a standalone `navigator` property.
* `true`: When the `navigator` property set to `true`.
* `"true"`: When the `navigator` property set to `"true"`.

So our function will be like this

```typescript
export function truthyDetector(value: unknown) {
    return value === '' || value === true || value === "true";
}
```

Now, we should set `truthyDetector` function as following:

```typescript
@bindable({ set: truthyDetector, mode: BindingMode.toView }) public navigator: BooleanString = false;
```

Although, there is another way to write the functionality too

```typescript
@bindable({ set: v => v === '' || v === true || v === "true", mode: BindingMode.toView }) public navigator: BooleanString = false;
```

You can simply use any of the above four methods to enable/disable your feature.

## Bindable coercion

The bindable setter section shows how to adapt the value being bound to a `@bindable` property. One common usage of the setter is to coerce the values that are bound from the view. Consider the following example.

{% tabs %}
{% tab title="my-el.ts" %}
```typescript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable public num: number;
}
```
{% endtab %}

{% tab title="my-app.ts" %}
```typescript
@customElement({ name:'my-app', template: '<my-el num="42"></my-el>' })
export class MyApp { }
```
{% endtab %}
{% endtabs %}

Without any setter for the `@bindable` num we will end up with the string `'42'` as the value for `num` in `MyEl`. You can write a setter to coerce the value.

However, it is bit annoying to write setters for every `@bindable`s. To address this issue, Aurelia2 supports type coercion.

## How to use the type-coercion?

To maintain the backward-compatibility, automatic type-coercion is disabled by default, and it needs to be enabled explicitly.

```typescript
new Aurelia()
    .register(
      StandardConfiguration
        .customize((config) => {
          config.coercingOptions.enableCoercion = true;
          // config.coercingOptions.coerceNullish = true;
        }),
      ...
    );
```

There are two relevant configuration options.

* **`enableCoercion`**: The default value is `false`; that is Aurelia2 does not coerce the types of the `@bindable`s by default. It can be set to `true` to enable the automatic type-coercion.
* **`coerceNullish`**: The default value is `false`; that is Aurelia2 does not coerce the `null` and `undefined` values. It can be set to `true` to coerce the `null` and `undefined` values as well. This property can be thought of as the global counterpart of the `nullable` property in the bindable definition (see [Coercing nullable values](bindable-properties.md#coercing-nullable-values) section).

Additionally, depending on whether you are using TypeScript or JavaScript for your app, there can be several ways to use automatic type-coercion.

### For TypeScript development

For TypeScript development this gets easier when the `emitDecoratorMetadata` configuration property in `tsconfig.json` is set to `true`. When this property is set and the `@bindable` properties are annotated with types, there is no need to do anything else; Aurelia2 will do the rest.

If for some reason you cannot do that then refer the next section.

### For JavaScript development

For JavaScript development you need to explicitly specify the `type` in the `@bindable` definition.

```javascript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable({ type: Number }) num;
}
```

{% hint style="info" %}
The rest of the document is based on TypeScript examples. However, we trust that you can transfer that knowledge to your JavaScript codebase if need be.
{% endhint %}

## Coercing primitive types

Currently coercing four primitive types are supported out-of-the-box. These are `number`, `string`, `boolean`, and `bigint`. The coercion functions for these type are respectively `Number(value)`, `String(value)`, `Boolean(value)`, and `BigInt(value)`.

{% hint style="warning" %}
Be mindful when dealing with `bigint` as the `BigInt(value)` will throw if the `value` cannot be converted to bigint; for example `null`, `undefined`, or non-numeric string literal.
{% endhint %}

## Coercing to instances of classes

It is also possible to coerce values to instances of classes. There are two ways how that can be done.

### Using a static `coerce` method

You can define a static method named `coerce` in the class that is used as a `@bindable` type. This method will be called by Aurelia2 automatically in order to coerce the bound value.

This is shown in the following example with the `Person` class.

{% tabs %}
{% tab title="person.ts" %}
```typescript
export class Person {
  public constructor(
    public readonly name: string,
    public readonly age: number,
  ) { }
  public static coerce(value: unknown): Person {
    if (value instanceof Person) return value;
    if (typeof value === 'string') {
      try {
        const json = JSON.parse(value) as Person;
        return new this(json.name, json.age);
      } catch {
        return new this(value, null!);
      }
    }
    if (typeof value === 'number') {
      return new this(null!, value);
    }
    if (typeof value === 'object' && value != null) {
      return new this((value as any).name, (value as any).age);
    }
    return new this(null!, null!);
  }
}
```
{% endtab %}

{% tab title="my-el.ts" %}
```typescript
import { Person } from './person.ts';
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable public person: Person;
}
```
{% endtab %}

{% tab title="my-app.html" %}
```typescript
@customElement({ name:'my-app', template: '<my-el person="john"></my-el>' })
export class MyApp { }
```
{% endtab %}
{% endtabs %}

According to the `Person#coercer` implementation, for the example above `MyEl#person` will be assigned an instance of `Person` that is equivalent to `new Person('john', null)`.

### Using the `@coercer` decorator

Aurelia2 also offers a `@coercer` decorator to declare a static method in the class as the coercer. The previous example can be re-written as follows using the `@coercer` decorator.

{% tabs %}
{% tab title="person.ts" %}
```typescript
import { coercer } from '@aurelia/runtime-html';

export class Person {
  public constructor(
    public readonly name: string,
    public readonly age: number,
  ) { }

  @coercer
  public static createFrom(value: unknown): Person {
    if (value instanceof Person) return value;
    if (typeof value === 'string') {
      try {
        const json = JSON.parse(value) as Person;
        return new this(json.name, json.age);
      } catch {
        return new this(value, null!);
      }
    }
    if (typeof value === 'number') {
      return new this(null!, value);
    }
    if (typeof value === 'object' && value != null) {
      return new this((value as any).name, (value as any).age);
    }
    return new this(null!, null!);
  }
}
```
{% endtab %}

{% tab title="my-el.ts" %}
```typescript
import { Person } from './person.ts';

@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable public person: Person;
}
```
{% endtab %}

{% tab title="my-app.html" %}
```typescript
@customElement({ name:'my-app', template: '<my-el person="john"></my-el>' })
export class MyApp { }
```
{% endtab %}
{% endtabs %}

With the `@coercer` decorator you are free to name the static method as you like.

## Coercing nullable values

To maintain backward compatibility, Aurelia2 does not attempt to coerce `null` and `undefined` values. We believe that this default choice should avoid unnecessary surprises and code-breaks when migrating to newer versions of Aurelia.

However, you can explicitly mark a `@bindable` to be not nullable.

```typescript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable({ nullable: false }) public num: number;
}
```

When `nullable` is set to `false`, Aurelia2 will try to coerce the `null` and `undefined` values.

## `set` and auto-coercion

It is important to note that an explicit `set` (see [bindable setter](broken-reference)) function is always prioritized over the `type`. In fact, the auto-coercion is the fallback for the `set` function. Hence whenever `set` is defined, the auto-coercion becomes non-operational.

However, this gives you an opportunity to:

* Override any of the default primitive type coercing behavior, or
* Disable coercion selectively for few selective `@bindable`s by using a `noop` function for `set`.

{% hint style="info" %}
Aurelia2 already exposes a `noop` function saving your effort to write such boring functions.
{% endhint %}

## Union types

When using TypeScript, usages of union types are not rare. However, using union types for `@bindable` will deactivate the auto-coercion.

```typescript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable public num: number | string;
}
```

For the example above, the type metadata supplied by TypeScript will be `Object` disabling the auto-coercion.

To coerce union types you can explicitly specify a `type`.

```typescript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable({type: String}) public num: number | string;
}
```

However to use a setter would be more straightforward to this end.

```typescript
@customElement({ name:'my-el', template: 'not important' })
export class MyEl {
  @bindable({set(v: unknown) {... return coercedV;}}) public num: number | string;
}
```

{% hint style="info" %}
Even though using a `noop` function for `set` function is a straightforward choice, `Object` can also be used for `type` in the bindable definition to disable the auto-coercion for selective `@bindable`s (that is when the automatic type-coercion is enabled).
{% endhint %}
