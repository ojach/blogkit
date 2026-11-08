---
published: 2026-10-14
---

# Code Blocks That Are Easy to Read and Write

Code is something we often revisit, modify, and test after writing it.

That's why OJapp Blog Kit does more than put code inside a dark box. It focuses on **showing the language, making syntax readable with color, allowing one-click copying, and making indentation levels easy to follow**.

This article explains how to write code blocks in Markdown and how Blog Kit presents them.

## Start by Specifying the Language

In Markdown, write the language name immediately after the three backticks that open a code fence. The language is shown at the top of the block, and syntax highlighting is applied accordingly.

````md
```js
console.log("Hello, Blog Kit!");
```
````

The result is a JavaScript code block like this:

```js
console.log("Hello, Blog Kit!");
```

## Use Syntax Colors to Understand the Code

Colors help distinguish keywords, strings, and other parts of code. Even in longer examples, they make it easier to follow what the code does.

```js
function createWelcomeMessage(name) {
  const message = `Hello, ${name}!`;
  return message;
}

const message = createWelcomeMessage("OJachi");
console.log(message);
```

Write the language name, such as `js` or `javascript`, right after the opening code fence. For JSON, use:

```json
{
  "title": "My Blog",
  "language": "en",
  "writeInMarkdown": true
}
```

## Follow Nested Code with Indentation Guides

When code contains nested blocks, it can be difficult to see which lines belong to the same level. Blog Kit displays vertical guides that follow the code's indentation.

```js
function publishArticle(article) {
  if (!article.title) {
    return { ok: false, reason: "Missing title" };
  }

  return {
    ok: true,
    article: {
      title: article.title,
      published: true,
    },
  };
}
```

These guides are added when the code is displayed. You don't need special Markdown syntax. Just indent the code consistently, and the structure becomes visible.

## Copy and Try Code Immediately

Code blocks include a copy button. Readers can copy the contents without selecting and dragging over the text.

```bash
npm install
npm run build
```

Only the code is copied, without display colors or borders. Paste it into a terminal or editor and use it directly.

## Show Changes with Diff Blocks

When explaining a change to a setting or code snippet, specify `diff` to highlight added and removed lines.

```diff
- const theme = "plain";
+ const theme = "vitesse-dark";
  const readable = true;
```

A short diff shows exactly what changed, without making readers compare two complete versions.

## HTML and CSS Work the Same Way

The code fence syntax is the same for every language. Use `html` for HTML and `css` for CSS.

```html
<article class="post">
  <h2>Article title</h2>
  <p>This article was generated from Markdown.</p>
</article>
```

```css
.post {
  max-width: 720px;
  margin-inline: auto;
  line-height: 1.9;
}
```

## Make Your Examples Easier to Understand

Readability also depends on what you choose to show, not just how the code looks.

- Explain what an example does in one sentence before the code block.
- Include only the parts needed for the explanation.
- If you omit code, make that clear with a comment.
- Specify the language to enable syntax highlighting and a language label.
- Use `diff` when you want to emphasize a change.

Blog Kit intentionally does not show line numbers. The goal is to help readers focus on the code itself and its indentation, rather than tracking line numbers.

## Keep Using Standard Markdown

Code blocks use ordinary Markdown code fences. You don't need to learn Blog Kit-specific syntax or embed HTML in your articles.

````markdown
```js
const blog = "Publish on your own domain";
```
````

Your source articles remain plain Markdown files. Blog Kit handles their presentation so you can focus on the content.

Code examples should be easy to read and easy to try. That's another part of building a blog where writing comes first.
