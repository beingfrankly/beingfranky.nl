---
type: blog
title: An accessible input without a visible label
published: true
published_on: '2021-10-03'
tags:
  - accessibility
  - aria
  - labels
  - css
description: small description on the blog post
keywords:
  - accessibility
  - screen reader
  - labels
  - css
  - accessibility tree
slug: accessible-input-without-label
id: 2021w39b1
updatedOn: '2021-10-21T10:29:17.033Z'
---

# How to have an accessible input while the label isn’t present?

In another bite-sized post I want to take the time to cover a common UI pattern that you’ll find on almost every website. Which is an input field with no visual label at all. Just a placeholder and perhaps with an icon.

I'll explain what's missing or what's flawed with the approaches you'll see on on most websites. As an example we’ll use a search field since it's quite common and it fits the UI pattern quite well.

## The bare essentials and why it's flawed to begin with

Let's dive into a basic search field example which represents this pattern. An input with no label.

```html
<form role="search">
  <input type="search" name="search" placeholder="Find repositories.."/>
</form>
```

> Perhaps you've noticed — or you already know this — that the input element has `search` as its type instead of `text`, and you might expect the latter. The difference of using `search` over `text` is that the user is able to reset the search query through the **Esc** key and it’s announced as a search

So our search field has a `placeholder` with **”Find repositories..“**.  It doesn't have a `label` associated with the input field, because why should we have one if it's visually not there. Right?

## What’s so flawed about it?

You might wonder what the problems are with the example above? Well, in this example there’s two problems I’ll cover.

1. The `placeholder` is used as a substitute for the `label`.
2. People who use Voice Control, or something similiar, aren’t able to interact directly with the search field.

### Placeholder shenanigans

When you do a search for **placeholder** combined with **accessibility**, you'll see a lot of articles on why you shouldn't use placeholders to begin with. This is because the `placeholder` attribute is tied to a lot of accessible problems. I’ll cover those problems on a different time because it’s beyond the scope of this post.

The main takeaway I want to share about the `placeholder` attribute is that we shouldn’t depend on it. The intent of a `placeholder` isn’t the same as the intent of a `label`. And this is important for assistive technologies, like screen readers. To give you an example. In 2019 JAWS, one the biggest screen readers,[^1] changed how they processed the `placeholder` attribute. Before this change the `placeholder` attribute was completely ignored.

### Voice Control can’t be fully utilised

The second problem is that assistive technology like Voice Control can’t interact with the search field directly. What do I mean by that? Well, it's not possible to use the command **“Click search”**. This command in Voice Control lets you select any interactible element based on the name of the `label`. Considering that we don't have a label (yet), we're not able to use this command.

## So how could we solve this?

We have a couple of options at our disposal:

1. The first option is to add an explicit `label`. If you want to read more on what an explicit `label` is and how we could add them: [The what, why and how on labels](https://www.beingfrankly.nl/blog/the-what-why-and-how-behind-labels).  The twist in this situation, however, is that we’ll hide the label visually through CSS.
2. As a second option we could use the  `aria-label` attribute. This doesn’t require any CSS magic to hide it since the `aria-label` attribute isn’t visually shown.

### First option: the invisible label

The first step is through adding an explicit `label` for our search field:

```html
<form role="search">
  <label for="search-input" class="sr-only">Find repositories..</label>
  <input id="search-input" type="search" name="search" placeholder="Find repositories.."/>
</form>
```

> **Note:** If a placeholder is present with a label, make sure that the values match exactly. Yes, including the dots. Otherwise the screen reader — in this case Voice Over on MacOS — will announce the value of the `label` followed by the value of the `placeholder`.

We’re not done of course, since we now have a `label` that’s still visible. And the requirement from the design (or from somewhere else) was quite clear. We shouldn’t have a visible `label`. So the next step is to perform some CSS magic which will turn our `label` invisible.

You might have spotted the `sr-only` class on the `label`. The following snippet is the CSS magic that will turn our `label` invisible.

```css
.sr-only {
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

> Credit for this CSS snippet goes to Scott O'Hara [^2]

Even though it’s visually not there, the `label` still remains visible in the `Accessible tree`[^3] which is exactly what we need to make our search field accessible.

### Second option: the other invisible label, aria-label

If, for whatever reason, it’s not possible to add an explicit `label` then we’ll turn to the second option. The `aria-label` attribute. It has the same semantic meaning as the `label`, so it’s doing a lot better than the `placeholder` attribute. And this is because the `aria-label` tries to act like the native `label` element. Let’s add it to our search field.

```html
<form role="search">
  <input aria-label="Find repositories..." type="search" name="search" placeholder="Find repositories.."/>
</form>
```

Because `aria-label` is just an attribute and not a HTML element, we don’t need to do any CSS magic to turn it invisible.

## Conclusion

So this is it. We’ve explored two options to make our search field more accessible. The explicit `label` and the `aria-label` attribute. A short recap.

- We shouldn’t use the `placeholder` attribute as a substitute for a `label`
- A label is required if we want to use Voice Control’s command **“Click”**
- When a HTML element is visually not shown it doesn’t necessarily mean it’s gone from the Accessibility Tree
- Don’t forget to match the text from a `label` with the `placeholder`. Unless you want the screen reader to announce it twice!
- If it’s not possible to add an explicit `label` we should use the `aria-label` attribute
[^3]:[Read more - MDN on Accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree)

[^1]: [Read more - Screen reader usage share]( https://webaim.org/projects/screenreadersurvey9/#primary)
[^2]: [Read more - Visually hidden CSS snippet](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
