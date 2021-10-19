---
type: blog
title: The differences between the ARIA labeling variants
published: false
published_on: "2021-10-18"
category:
tags: []
description: small description on the blog post
keywords: [aria-label, aria-labelledby, aria-describedby]
slug: differences-between-aria-labeling-variants
status: writing
id: 2021w41b1
---

# The differences between the ARIA labeling variants

In this bite sized post, I’m going to take the time to explain the differences between `aria-label`, `aria-labelledby` and `aria-describedby`. Before I read the documentation on these attributes, they confused me because they seem so similar, while there are, in fact, some crucial differences between the three. I hope by the end of this post you’ll know when and how to use these three attributes.

Before I go on and explain the differences, I do want to stress something out which is the first rule of using ARIA: **Don't use ARIA**. This almost sounds like the [first rule of Fight club](https://www.rottentomatoes.com/m/fight_club/quotes/#:~:text=to%20Fight%20Club.-,The%20first%20rule%20of%20Fight%20Club%20is%3A%20you%20do%20not,out%2C%20the%20fight%20is%20over.). I’ll be honest here and say that I found this rather confusing in the beginning. Only after reading about it and understanding the intent behind the rule did it click with me. I think it might have been better to name the first rule like this: **Prefer native HTML over ARIA**. We shouldn’t use ARIA attributes without considering using the semantic HTML element first. I’ll dive deeper into the five rules of using ARIA in a different post since it’s beyond the scope of this topic.

## The aria-label

The `aria-label` attribute is somewhat similar to the `<label>` element. It doesn't have some of the advantages that the `<label>` element has, but its purpose is the same. Giving context, through the [Accessible Name](https://www.w3.org/TR/accname-1.2/), to the element it's associated with.

Unlike the `<label>` element (which is its own element) the `aria-label` attribute needs to be put on the element itself. It could look like this:

```html
<button aria-label="Close">
  <svg>
    <!-- svg content -->
  </svg>
</button>
```

The `aria-label` attribute takes a string value, which is then used to create the Accessible Name for the `<button>` element. The common use case for the `aria-label` attribute is when we’re not able to use the native `<label>` element, while still providing context for the Accessible Name.

## The aria-labelledby

Although the `aria-labelledby` attribute may look similar to `aria-label`, it works quite different. Instead of a string value, it requires the ID of the element we’re referencing.

Let’s say we would want to give meaning to the `<button>` through the ID of the `<svg>`element. It would look like this:

```html
<button aria-labelledby="close-icon">
  <svg aria-label="Close" id="close-icon" >
    <!-- svg content -->
  </svg>
</button>
```

We could view `aria-labelledby`, in this regard, that it’s inheriting the context from the `<svg>`. The benefit of this approach is that we gain flexibility on how we give meaning to our `<button>`. The bad part of this approach is that the [support isn’t that great](https://a11ysupport.io/tech/aria/aria-labelledby_attribute).

Another big difference, over the `aria-label`, is that it could also accept a space-separated list of element IDs. This lets us “build” a certain context from different parts of the UI. For now I haven’t found a practical example to go with this.

## The aria-describedby

The `aria-describedby` attribute is used to add a description for the element it’s used on. I wanted to include this attribute as well next to the `aria-label` and `aria-labelledby` since there’s some confusion on what they mean and when we should use them.

```html
<label for="password-input">Password</label>
<input id="password-input" type="password" aria-describedby="password-input-description">
<span id="password-input-description">Password must contain at least 8 characters<span>
```

In the example I’ve used the `aria-describedby` attribute to give a description to a password input. And because we’ve attached the description to the input field it will be recognized by the screen reader, enabling it to announce the description after the label of the input.

> Voice Over on MacOS would announce something like this: Password, secure edit text. Password must contain at least 8 characters.

## Conclusion

- The `aria-label` attribute accepts a string value which provides the **Accessible Name** on the element it’s used on
- The `aria-labelledby` attribute accepts either a single ID or multiple ID’s which will be used for the **Accessible Name**
- We should only use the `aria-label`, `aria-labelledby` and `aria-describedby` on interactive elements, landmarks or elements that have an explicit
- When both `aria-label` and `aria-labelledby` attributes are present on the same element, the value of `aria-labelledby` will take priority

### Further reading

- [w3 - Using aria-labelledby to provide a name for user interface controls](https://www.w3.org/TR/WCAG20-TECHS/ARIA16.html)
- [w3 - Using aria-labelledby to concatenate a label from several text nodes](https://www.w3.org/TR/WCAG20-TECHS/ARIA9)
- [MDN - Using the aria-labelledby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [WAI-ARIA - documentaion on aria-label](https://www.w3.org/TR/wai-aria/#aria-label)
- [WAI-ARIA - documentation on aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby)
