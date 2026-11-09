---
permalink: en/blogkit-v2-frontmatter-test
excerpt: "A test article to verify Frontmatter settings and automatic translation links in Blog Kit v2."
published: 2026-11-09
updated: 2026-11-09
category: Blog Kit
---

# Blog Kit v2 Verification Test

This sample article checks whether Blog Kit v2 correctly reads Frontmatter and automatically links Japanese and English articles.

## Checking Frontmatter

The permalink, excerpt, publication date, update date, and category are defined at the top of this Markdown file.

## Checking Markdown Rendering

This paragraph contains **bold text**, a [link to OJapp](https://ojapp.app/), and a list:

- Markdown headings
- Links and bold text
- List rendering

## Checking Code Blocks

```javascript
const blogKit = { version: 2, mode: 'static' };
console.log(blogKit.version);
```

## Checking Language Switching

This file is named `en--blogkit-v2-test.md` to pair it with `blogkit-v2-test.md` automatically. Neither article has a `translation` field in `articles.json`.
