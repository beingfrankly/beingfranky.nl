---
created_at: 2021-08-20 09:48
updated_at: Friday 20th August 2021 19:48:10
type: blog
title:  The rules on using ARIA
published: false
published_on:
tags: [accessibility, aria, semantic]
description: small description on the blog post
keywords: [accessibility, semantic, html, rules, aria, focusable, interactive, accessible name, accessibility tree]
slug: rules-on-using-aria
id: 2021w43b1
updatedOn: '2021-11-01T10:29:17.036Z'
---

# Rules on using ARIA

In my previous post about [the differences between the ARIA labeling variants](https://beingfrankly.nl/blog/differences-between-aria-labeling-variants) I mentioned the first rule of [ARIA](https://www.w3.org/TR/wai-aria/) — which is often mentioned as **“Don’t use ARIA”** — and that I would dive deeper into the five rules of ARIA.

If you never heard of ARIA before, let me give you a short introduction. It’s a set of attributes to enable frontend developers create accessible web apps. Look at it as an add-on, or a layer, on top of HTML. Often it’s not necessary to use ARIA because HTML offers a native solution for us. But sometimes our UI components are so complex that they just don’t fit anywhere in the native HTML options. Then it’s time to bring out ARIA and use it to create an accessible experience for everyone.

But, we should be careful with ARIA, because of its double-edged sword characteristic. When it’s used properly, it greatly improves the user experience. But when it’s used incorrectly — or partially — it could break the user experience. To a point where it's completely unusable.

Enough about the intro, let’s go over the five rules on how to use ARIA!

## 1. Prefer semantic HTML over ARIA

> If you _can_ use a native HTML element or attribute with the semantics and behavior you require **already built in**, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible**, then do so**.
> – W3C, [First rule of ARIA](https://www.w3.org/TR/using-aria/#firstrule)

We should prefer to use the semantic HTML option, if it's available to us. We shouldn’t opt for ARIA for the sake of using ARIA. Although the intent of ARIA is to make things accessible, it’s not the only option available to us. It’s still the only option when things get complex in the UI. But, we have to remember that ARIA came before HTML 5. And when HTML 5 came, it introduced a lot of semantic elements that we no longer have to reproduce through ARIA.

Let’s elaborate on this further with an example.

**Let’s not do this**

```html
<div role="button">This is a button</div>
```

**Let’s do this instead**

```html
<button>This is a button</button>
```

What’s the difference between `role="button"` and `<button>` in this example? They’re the same semantic wise. Both elements should are buttons. So why should we prefer semantic HTML over ARIA? Well, if we would use the `role="button"` approach we’re not even halfway of what a semantic `<button>` would give us.

Let’s take the `<div role="button">` example and see what’s missing, step by step. The element has its role, so it's recognised as a button. But we can’t focus this element with a keyboard, because there’s no `tabindex` attribute present. Which the `<button>` would have given us, out of the box.

It's not only focus management we're missing. It's also the keyboard functionality for interacting with the button that's missing. For instance, when a button has focus, we should be able to press the <kbd>Space</kbd> key to activate the button. To check which other interactions we’re missing out on I recommend to read [the design patterns for a button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) from W3C.

In short, let’s use semantic HTML over ARIA, so that we don't have to do the work! This is the main takeaway that I want to give you.

## 2. Don’t alter the meaning of a semantic HTML element

> Do not change native semantics, unless you really have to.
> – W3C, [Second rule of ARIA](https://www.w3.org/TR/using-aria/#secondtrule)

When we use a semantic HTML element its meaning has been **implicitly** given by the element. In other words, a `<button>` has the role of a “button”. But, what happens if we’re using that same `<button>` and we give it the ARIA `role="header"`? Well, we've **explicitly** gave it a different meaning. And this could lead to unwanted side effects.

Let’s take an unordered list, `<ul>`, as an example. Everything we expect from an `<ul>` are right. For instance, it should have a list of `<li>`. And if we leave it at that, screen readers will be able to understand it. We enable the screen reader to announce how many list items are present. And it will then proceed to announce each list item one by one.

But, wen we add the `role="navigation"` on the `<ul>`, it becomes a [navigation landmark](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role). The semantics are overridden. and screen readers have lost the ability to do what they could do before. Leaving screen reader users guessing what it means.

## 3. All interactive elements must be usable by a keyboard

> All interactive ARIA controls must be usable with the keyboard.
> – W3C, [Third rule of ARIA](https://www.w3.org/TR/using-aria/#3rdrule)

The third rule is somewhat linked to the first rule. Let’s use example from the first rule — the `<div role="button">` — to explain how they relate to each other. We’ve learned, in the first rule, that when we use the `role` attribute that we're not done. That we don't have any keyboard functionality. So again, for this rule it's best to go for the semantic HTML element. Because by doing so, we gain the keyboard functionality out of the box.

But, what if we have a complex UI component — often referred as a custom widget — which needs to be interactive. Well, we first need to determine what our complex UI component should act as. To do that we could visit the [design patterns](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex) and see how it fits. From there we could check which keyboard interactions are expected. In other words, what do we expect to happen when we press the <kbd>Space</kbd> key.

## 4. Focusable elements shouldn’t be hidden

> Do not use `role="presentation"` or `aria-hidden="true"` on a **focusable** element.
> – W3C, [Fourth rule of ARIA](https://www.w3.org/TR/using-aria/#4thrule)

The fourth rule focusses — no pun intended, I swear — on ensuring that focusable elements are present in the [Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree). Otherwise, they're hidden from assistive technologies (e.g. a screen reader).

The `aria-hidden="true"`, `role="presentation"` and `role="none"` attributes may look similar. But their intent is quite different!

- `aria-hidden="true"` will remove the element and all its child elements from the accessibility API. This means that it won’t show up in the Accessibility Tree. And if it’s not present there then it’s invisible to assistive technologies.
- `role="presentation"` and `role="none"` will remove the semantic meaning of an element while still exposing it to assistive technology.

> The `role="presentation"` and `role="none"` attributes are the same. The `role="none"` attribute is actually an alias for `role="presentation"`.

When the button has the `aria-hidden="true"` attribute, it’s still present in the HTML DOM. So it's still possible to focus the button with a keyboard. But, when we navigate with the screen reader, it will not know of the button's existence.

We shouldn't use the `aria-hidden="true"` attribute on any focusable or interactive element. Because it will then be impossible to focus or interact with such elements for a lot of people.

## 5. All interactive elements require an Accessible Name

> All interactive elements must have an accessible name.
> – W3C, [Fifth rule of ARIA](https://www.w3.org/TR/using-aria/#fifthrule)

All [interactive elements](https://html.spec.whatwg.org/#interactive-content-2) (e.g. an `<input>`) require an Accessible Name. Otherwise, assistive technologies have no clue what the interactive element means.

Let’s take a plain `<input>` with a `<span>` next to it, which acts as the visual label. So no `<label>`, `aria-label` or `aria-labelledby`. What would a screen reader announce, when the user has focus on the input?

```html
<span>Username</span>
<input type="text">
```

> Voice Over on MacOS would say something like: Edit text

The screen reader user is confused and needs to guess what the input means, since they can only hear “Edit text”.

This would impact voice recognition users (e.g. VoiceControl on MacOS) as well. If the Accessible Name is present, then it's possible to interact with the `<input>` element directly. For example, with the VoiceOver command: “Click [insert accessible name]”. If the Accessible Name isn't available, they need to resort to other means to interact with the element. Which could seriously affect their user experience.

### How could we provide the Accessible Name?

There are three separate techniques to provide the Accessible Name:

1. For `<a>` and `<button>` we provide the Accessible Name through the link text/button value we’ve given them
2. For `<input>` elements we provide the Accessible Name through either a explicit `<label>`, `aria-label` or the `aria-labelledby`
3. For anything else (e.g. custom elements, landmarks, etc) we provide the Accessible Name either through `aria-label` or the `aria-labelledby` attributes

## Conclusion

You’ve made it to the end! That was quite a lot of information on how we should use ARIA. So, let’s summarise all the things we’ve learned:

- Prefer semantic HTML over ARIA, because they’ll do the hard work for us!
- When we use ARIA instead, check the [design patterns](https://www.w3.org/TR/wai-aria-practices-1.1/) to check what’s expected.
- We shouldn’t alter the meaning of semantic HTML, otherwise we could end up having nasty side effects
- Keyboard focus/navigation isn’t the same as screen reader focus/navigation
- We shouldn’t hide focusable elements, otherwise they’re not usable for assistive technologies
- All interactive elements should have an Accessible Name. Otherwise, (again) it won’t be usable for assistive technologies
