---
type: blog
title: 'The what, why and how behind labels'
published: true
publishedOn: '2021-06-09'
tags:
  - accessibility
  - labels
excerpt: Let's go over the importance of labels, and what they'll do for us, once we've added them. I'll also cover which approach is recommended to have the most support for assistive technologies.
keywords:
  - accessibility
  - labels
  - explicit
  - implicit
  - input
slug: what-why-and-how-on-labels
id: 2021w23b1
createdOn: "2021-12-17T14:28:21Z"
modifiedOn: "2021-12-17T14:28:46Z"
---

# The what, why and how on labels

Today I want to take the chance to tell you about the importance of labels and what they have to offer us. So with this bite-sized post I’ll cover the following: what a label is, what a label does if you use them, how we can use/add labels and which other HTML elements should have a label.

## So, what's a label to begin with?

Well, the `<label>` is a simple HTML element that holds a text value,[^1] which explains something about the related input element. And that's basically it for our humble label element. So how could such a simple HTML element have such an impact? Let's find out together.

## Why should we use labels?

Why we need to use labels, is to understand what they’ll do for us when we use them. So, what do we gain when we use a label? Well, when we’ve paired a label to an input field it does two things:

- Increases the **interactive area** of the associated input field. The browser does this for us when it sees a label paired with an input field. But what does it mean when the interactive area is increased? Well when the user clicks on the label it will instead focus on the associated input field. This improves the UX on mobile devices and for users with a physical disability (e.g. tremors).
- Screen readers are able to announce the name (the associated label) of an input field when it's focused. See the examples down below what the difference is with and without an associated label.

### Without label

```html
<input type="text" name="username" />
```

> This will say: "edit text blank" on MacBook Voice Over

### With label

```html
<label for="username_input">Username:</label>
<input id="username_input" type="text" name="username"/>
```

> This will say: "Username, edit text" on MacBook Voice Over

## How could we add a label?

There are two approaches for adding a label. The first approach is called **implicit** and the second approach is called **explicit**. We'll cover **implicit** first and then I'll continue with **explicit**. And I’ll explain why the second approach is the recommended option.

### Implicit

With the implicit method we use the label as a **wrapper/container.** It doesn’t require anything else from us. Just put the input field inside and you’re done. You’ve added the label and associated it ***implicitly*** with an input field.

```html
<label>
	Email:
	<input type="text" name="email" />
</label>
```

Let’s move on to the second approach.

### Explicit (recommended)

With the explicit approach we don’t use the label as a wrapper/container. And we're not required to put it directly before the input field in the DOM* to make it work (which you’ll see in every example, even the one down below). So how could we tell HTML that the label we’re using is for specific input field? Through two special attributes: `for` & `id`.

```html
<label for="email_input">Email:</label>
<input id="email_input" type="text" name="email"/>
```

The label element has a `for` attribute that will have a certain value. The input element on their turn has an `id` attribute which also holds a certain value. You may have guessed it, without peeking at the example above, that both attributes need to have the same value. By using the same value in the `for` and the `id` attribute you'll ***explicitly*** associate the label to an input field.

So why is this the recommended approach? To put it simply, because of accessibility support.[^2] At the moment it's not possible to select an input by its name (the associated label) through voice command (e.g. Voice Control from Apple). I've tested this myself on a MacBook with Safari and Voice Control. And it just didn't work, no matter how many times I've tried. I'll add a link down below for the current support results

Now we know how to use and associate a label with an input. But are we limited to just an input or are there more potential friends for our label? There sure are and they're grouped together under "labelable" fields.

## Labelable, excuse me?

As a non English speaker, that word is just a mouthful for me. Moving on. So this term groups a list of elements together that should be paired with a label.[^3] I won't go into it further details what each element does on its own.

Labelable fields:

- button
- inputs
- meter
- output
- progress
- select
- textarea

The odd one in the list above is the `button` element. Even though it's considered a labelable element it should **not** be paired with a label. This is because the button already comes with a label, which is the text value inside the tags.[^4] When using `<input type="button" value="Sign up"/>` the label comes from it's `value` attribute.

 > Credit goes to [InHuOfficial](https://dev.to/inhuofficial) for pointing out that I've missed this in the original post.

## Conclusion

- When labels are used screen readers are able to do their work and assist their users
- Labels increase the interactive area for input fields which improves the user experience
- Using labels *explicitly* is the recommended option when pairing up with a labelable element
- Labels used implicitly lack support for voice commands

In the next bite-sized blog we’re going to learn what to do when we can’t show a label visually. For whatever reason that might be.

### References

[^1]: [Read more - MDN Label documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
[^2]: [Read more  - Lacking support for **implicit** labels](https://a11ysupport.io/tests/html_label_element_implicit#support-summary-by-at-sr)
[^3]: [Read more - HTML labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)
[^4]: [Read more - Labeling buttons](https://www.w3.org/WAI/tutorials/forms/labels/#labeling-buttons)
