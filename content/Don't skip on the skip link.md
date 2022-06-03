---
type: blog
title: Don't skip on the skip link
published: true
publishedOn: '2021-11-18T16:05:37.000Z'
excerpt: When you search for the definition of a skip link, you’ll often find that it’s described as a mechanism to skip past repeating blocks of content. This might be confusing at first, but it’s actually quite straight forward. I’ll explain what a skip link actually means and how we could implement one.
keywords: []
slug: dont-skip-the-skip-link
id: 2021w45
createdOn: "2021-11-19T21:33:31Z"
modifiedOn: "2021-12-17T14:12:25Z"
---

# Don't skip on the skip link

When you search for the definition of a skip link, you’ll often find that it’s described as a mechanism to skip past repeating blocks of content. This might be confusing at first, but it’s actually quite straight forward.

So, in this post I’ll explain what a skip link actually means and how we could implement one. Let’s begin!

## What's a skip link to begin with?

The mechanism that’s mentioned, is in fact an `<a>` element. It needs to link to a fragment (in other words, an `id`) on the current page. And when the user activates it, they “skip” all of the content before the fragment. It’s that simple.

The last bit of the description mentions repeating blocks of content. I’ll list a couple of examples that you’ll find almost anywhere.

**Examples of repeating blocks of content**
- the logo / brand of the website
- the top navigation links
- a search field (tucked inside the top navigation)
- perhaps even a banner with a call to action

## The importance of a skip link

So, why is it important to have a skip link? Let’s imagine what it would be like, if you would need to tab to reach the main content. Before you’ve reached the main content, you need to go through all of the repetitive content first. Every single time. This sounds like a poor user experience, which we could solve quite easily. If we implement a skip link we give users a shortcut to ignore those repetitive content blocks.

## So, how do we implement one?

The first thing is to add the skip link at the top of the page. This is to make sure that the skip link is the first thing the user will focus.

```html
<body>
	<a href="main" class="skip-link">Skip to main content</a>
	<!-- rest of the page -->
</body>
```

The second thing we need to do, is to wrap our main content (e.g. the content of a blog post, like this one) in a `<main>` element and give it an `id` to link from. This could be anything, but for the purpose of keeping it simple I’ve given it the `id` of “main”.

```html
<body>
	<a href="main" class="skip-link">Skip to main content</a>
	<main id="main">
		<!-- main content of a page (e.g. a blog post) -->
	</main>
	<!-- rest of the page -->
</body>
```

It’s also quite common to hide the skip link, until it’s focused. So, with the last step we’ll turn it invisible, unless it’s has `:focus`.

We’ll do that with the aid of an utility class, `.visually-hidden`, as shown below. The credit for this utility class needs to go to [Scott O’Hara](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html).

```html
<body>
	<a href="main" class="skip-link visually-hidden">Skip to main content</a>
	<main id="main">
		<!-- main content of a page (e.g. a blog post) -->
	</main>
	<!-- rest of the page -->
</body>
```

```css

.skip-link {
	/* insert styling rules for how it should look when it's visible  */
}

.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

And there you have it. If the end result looks similar to the example above, you’ve implemented your very own skip link!

If you’ve liked this piece of content and you want to get regular updates on other things I write about then follow me on [Twitter](https://twitter.com/frank_vaneldijk).

## Further reading

- [WCAG - Success Criterion 2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks)
- [The difference between keyboard and screen reader navigation](https://tink.uk/the-difference-between-keyboard-and-screen-reader-navigation/)

## Conclusion

To wrap things up, a short summary of what we’ve learned.

- The implementation of a skip link is actually a simple `<a>` elements, which links to the `id` of the `<main>` element. This enables the user to bypasses all of the repetitive content
- When we’ve implemented a skip link, it improves the user experience for our (keyboard/screen reader) users
- [One of the solutions for the Success Criterion 2.4.1 guideline](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html), is to implement a skip link.
