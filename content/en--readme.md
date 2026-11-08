---
published: 2026-10-15
---

# OJapp Blog Kit Complete Guide | From Configuration to Writing and Publishing

OJapp Blog Kit is a static site generator that manages blogs using Markdown and JSON.

You don't need an admin dashboard or a database. Write articles in Markdown, edit the configuration files, and run a build to generate HTML ready for publishing.

This guide covers site configuration, article management, static pages, and publishing.

## 1. Blog Kit File Structure

First, let's look at the files you'll edit.

```text
blogkit/
├── site.json
├── articles.json
├── pages.json
├── content/
│   └── welcome.md
├── pages/
│   └── about.md
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── templates/
├── scripts/
│   ├── build.js
│   ├── ogp.js
│   └── locales.js
└── dist/
```

| File or folder | Purpose |
|---|---|
| `site.json` | Site-wide blog settings |
| `articles.json` | Settings for individual articles |
| `content/` | Article Markdown files |
| `pages.json` | Settings for static pages |
| `pages/` | Static page Markdown files |
| `public/images/` | Article images, icons, ad images, and more |
| `templates/` | HTML templates and additional HTML |
| `dist/` | Generated files ready to publish |

`dist/` is recreated during each build. You don't need to edit the generated HTML directly.

## 2. site.json | Site-Wide Settings

`site.json` manages the blog name, public URL, author information, design, and features.

### Example Configuration

```json
{
  "title": "My Tech Blog",
  "description": "A blog about web technologies.",
  "url": "https://example.com/",
  "author": "Blog Author",
  "author_description": "Writing about web development.",
  "author_url": "https://example.com/about/",
  "author_image": "author.png",
  "brand_color": "#187a68",
  "icon": "icon.png",
  "pwa_icon": "pwa-icon.png",
  "language": "en",
  "features": {
    "article_summary": true,
    "article_pwa_icons": false
  }
}
```

### Basic Settings

| Field | Description |
|---|---|
| `title` | Blog name used in the header and page titles |
| `description` | Site description used in homepage metadata and RSS |
| `url` | Public URL used to generate canonical URLs, sitemap entries, RSS links, and more |
| `language` | Default blog language, such as `ja-JP` or `en` |
| `brand_color` | Accent color, such as `#187a68` |
| `icon` | Blog favicon; also used as a fallback PWA icon |
| `pwa_icon` | Site-wide PWA icon; falls back to `icon` if omitted |

**The `url` setting is especially important.** Set it to the actual public URL.

```json
"url": "https://example.com/"
```

If you publish under a subdirectory, include that path:

```json
"url": "https://example.com/blog/"
```

This value is used as the basis for article URLs, image URLs, canonical URLs, and other generated links.

### Author Information

An author profile appears below each article.

| Field | Description |
|---|---|
| `author` | Author name |
| `author_description` | Author bio |
| `author_url` | Profile link |
| `author_image` | Filename, path, or URL of the author image |
| `author_locales` | Localized author information |

If no author image is specified, the first character of the author name is displayed instead.

### Localized Author Information

Use `author_locales` if you want different profiles for Japanese and English articles.

```json
"author_locales": {
  "ja": {
    "name": "ブログ運営者",
    "description": "Web技術について発信しています。",
    "url": "https://example.com/about/"
  },
  "en": {
    "name": "Blog Author",
    "description": "Writing about web technologies.",
    "url": "https://example.com/en/about/"
  }
}
```

Blog Kit uses the author information matching the article's language. Any missing localized fields fall back to the standard `author` settings.

### Feature Settings

```json
"features": {
  "article_summary": true,
  "article_pwa_icons": false
}
```

| Field | Description |
|---|---|
| `article_summary` | Controls whether the article summary section is available; set `false` to disable |
| `article_pwa_icons` | Set `true` to automatically generate article-specific PWA icons |

Even when `article_summary` is enabled, the summary section is not shown unless the article has a `summary` value.

When `article_pwa_icons` is enabled, Blog Kit generates an article-specific icon if none is explicitly provided.

### Advertising Settings

You can insert image ads at selected positions within an article.

```json
"ads": {
  "1": {
    "image": "banner1.png",
    "url": "https://example.com/service/",
    "alt": "Service information"
  },
  "2": {
    "image": "banner2.png",
    "url": "https://example.com/product/",
    "alt": "Product information"
  }
}
```

| Field | Description |
|---|---|
| `image` | Ad image |
| `url` | Ad destination, using an HTTP or HTTPS URL |
| `alt` | Alternative text for the ad image |

You can configure up to six ad slots, numbered `"1"` through `"6"`. Place an ad marker on its own line in the article Markdown:

```md
Show an ad in the middle of the article.

[[ad]]

Show another ad.

[[ad2]]
```

`[[ad]]` displays ad 1, `[[ad2]]` displays ad 2, and so on through `[[ad6]]`.

The legacy `ad` setting is also supported as ad 1:

```json
"ad": {
  "image": "banner.png",
  "url": "https://example.com/",
  "alt": "Advertisement"
}
```

If `ads["1"]` is set, it takes precedence over the legacy `ad` setting. An ad slot is not displayed unless it has an image and a valid destination URL.

## 3. articles.json | Article Settings

`articles.json` manages titles, URLs, descriptions, categories, and other article metadata. Article bodies live in Markdown files, while their settings live in JSON.

### Example Configuration

```json
{
  "welcome": {
    "title": "Welcome",
    "meta_description": "An introduction to this blog and its goals.",
    "excerpt": "Here's what you can expect to read on this blog.",
    "summary": "This blog focuses on web technologies.",
    "permalink": "welcome",
    "language": "en",
    "category": "Announcements",
    "published": "2026-11-02",
    "next_article": "getting-started",
    "thumbnail": "welcome.png",
    "thumbnail_alt": "Blog introduction image",
    "show_thumbnail": true
  }
}
```

In this example, create the Markdown file `content/welcome.md`. **The JSON key must match the Markdown filename without `.md`.**

```text
content/welcome.md
        ↓
"welcome" in articles.json
```

### Basic Article Settings

| Field | Description |
|---|---|
| `title` | Article title; takes precedence over the first Markdown H1 |
| `permalink` | Path used in the public URL |
| `language` | Article language, such as `ja` or `en` |
| `category` | Article category |
| `published` | Publication date in `YYYY-MM-DD` format |
| `updated` | Update date; supported here, but Markdown front matter is recommended |

For example, `"permalink": "pwa-guide"` publishes the article at `https://example.com/pwa-guide/`.

If `permalink` is omitted, the Markdown filename is generally used. For an English article with `"language": "en"` and no permalink, the default path is `en/filename`.

### Article Descriptions

Articles support both `meta_description` and `excerpt`.

| Field | Description |
|---|---|
| `meta_description` | SEO description; not displayed in the page body |
| `excerpt` | Visible introduction below the article title, in listings, and in recommendations |

```json
{
  "meta_description": "Learn how PWAs work and how to implement them.",
  "excerpt": "What is a PWA? A beginner-friendly introduction to the basics."
}
```

The HTML description uses `meta_description`, while the reader-facing introduction uses `excerpt`.

| Where it appears | Priority |
|---|---|
| HTML meta description | `meta_description` → `excerpt` → article body |
| Below the article title | `excerpt` → beginning of article body |
| Article listings and recommendations | `excerpt` → beginning of article body |

If `excerpt` is omitted, Blog Kit uses up to 160 characters from the first paragraph of the article. In that case, the first paragraph is not duplicated in the article body.

Use `meta_description` when you want to customize an article's SEO description separately.

### One-Minute Summary

`summary` provides a short summary section at the beginning of an article.

```json
"summary": "A PWA lets users add a website to their home screen and use it like an app."
```

This feature helps readers understand the main points quickly. The summary appears in a collapsible section that readers can open.

The `summary` value can contain Markdown. To display it, enable `features.article_summary` in `site.json`.

### Next Article

Use `next_article` to choose the article displayed in the “Next to Read” section below an article.

```json
"next_article": "getting-started"
```

Specify the target article's JSON key or permalink. If omitted, Blog Kit automatically chooses an article in the same language.

Up to three additional recommended articles appear below the “Next to Read” section.

### Translated Articles

`translation` links an article to its counterpart in another language.

```json
"translation": "welcome-en"
```

Specify the other article's JSON key or permalink. When the matching article exists, Blog Kit displays a language-switch link and generates `hreflang` metadata for search engines.

### Thumbnail Settings

| Field | Description |
|---|---|
| `thumbnail` | Article thumbnail image |
| `thumbnail_alt` | Alternative text for the image |
| `show_thumbnail` | Whether to show the thumbnail in the article body |
| `pwa_icon` | Article-specific PWA icon |

```json
"thumbnail": "pwa-guide.png",
"thumbnail_alt": "Diagram explaining how a PWA works",
"show_thumbnail": true
```

Set `show_thumbnail` to `false` to hide the thumbnail at the top of the article page.

Note that Open Graph images are generated separately. The `thumbnail` file is not automatically used as the Open Graph image.

### Publication and Update Dates

Publication dates normally belong in `articles.json`:

```json
"published": "2026-11-02"
```

For update dates, the recommended approach is to add Markdown front matter only when the article is actually updated:

```md
---
updated: 2026-11-10
---

# Article title

The article starts here.
```

`updated` is used for the sitemap's `lastmod` and article structured data. There is no need to set it on an article that has not been updated.

Front matter can also supply `published`, `updated`, `category`, `meta_description`, and `language`. However, keeping most metadata in `articles.json` and only update dates in Markdown is generally easier to manage.

## 4. Writing Article Markdown

Save articles as `.md` files in `content/`:

```text
content/
├── welcome.md
├── getting-started.md
└── pwa-guide.md
```

### Basic Markdown

```md
# Article title

Write your article here.

## Heading

A normal paragraph.

### Subheading

- Item 1
- Item 2
- Item 3

You can also use **bold text** and [links](https://example.com/).
```

If no `title` is set in `articles.json`, the first Markdown H1 becomes the article title. That first H1 is removed from the article body and displayed as the page title.

### Adding Images

Save images in `public/images/`. For example, if you add `public/images/sample.png`, use:

```md
![Sample image](sample.png)
```

You can also use `/images/sample.png` as the image path.

### Automatic WebP Conversion

Blog Kit converts JPEG and PNG images in `public/images/` to WebP during the build.

Markdown image references automatically use the corresponding WebP image when one has been generated. The original image files remain unchanged.

To keep an original image format, add `blogkit:original` as the image title:

```md
![Sample image](sample.png "blogkit:original")
```

### Code Blocks

Use fenced code blocks with a language name:

````md
```javascript
const message = "Hello Blog Kit";
console.log(message);
```
````

Shiki provides syntax highlighting. Code blocks also display the language and a copy button.

To show a change, use `diff`:

````md
```diff
- const mode = "old";
+ const mode = "new";
```
````

Added and removed lines are highlighted separately.

### Headings and Table of Contents

Headings from H2 onward are used to generate an automatic table of contents.

```md
## Basic settings

### Blog name

## Writing articles
```

Readers can jump from the table of contents to each heading. You don't need to build it manually.

### Inserting Ads

If ads are configured in `site.json`, add a marker on its own line in Markdown:

```md
## Before the ad

Article text.

[[ad]]

## After the ad

More article text.
```

You can also use `[[ad2]]` through `[[ad6]]`.

## 5. pages.json | Static Page Settings

Static pages are managed separately from blog articles. Use them for About pages, privacy policies, contact information, and similar content.

They do not appear in article listings and do not have article-specific features such as publication dates or “Next to Read.”

### Example Configuration

```json
{
  "about": {
    "title": "About This Blog",
    "description": "About the author and the purpose of this blog.",
    "permalink": "about",
    "language": "en",
    "footer_label": "About",
    "show_in_footer": true
  },
  "privacy": {
    "title": "Privacy Policy",
    "description": "How personal information is handled.",
    "permalink": "privacy",
    "language": "en",
    "footer_label": "Privacy Policy",
    "show_in_footer": true
  }
}
```

### Available Fields

| Field | Description |
|---|---|
| `title` | Static page title; takes precedence over the first Markdown H1 |
| `description` | SEO description; also displayed below the page title |
| `permalink` | Public URL path |
| `language` | Page language |
| `footer_label` | Link label shown in the footer |
| `show_in_footer` | Whether the page link appears in the footer |

Only setting `show_in_footer` to `false` hides the link. If omitted, the link is shown.

Unlike an article's `meta_description`, a static page's `description` is also displayed below the page title.

## 6. Creating Static Page Markdown

Put static pages in `pages/`:

```text
pages/
├── about.md
├── privacy.md
└── contact.md
```

For `pages/about.md`, add the settings under `"about"` in `pages.json`.

```md
# About This Blog

This blog covers web technologies.

## About the Author

I'm an independent developer.
```

Setting `"permalink": "about"` publishes the page at `https://example.com/about/`.

Static pages use ordinary Markdown and can include images and code blocks.

If an article and a static page use the same permalink, the build fails. Make sure public URLs are unique.

## 7. Other Files and Customization

### CSS

Design-related files live in `public/css/`:

- `style.css`: Site-wide styling
- `highlight.css`: Code block styling

### JavaScript

Browser-side JavaScript lives in `public/js/`. It is used for features such as article sharing.

### HTML Templates

The `templates/` folder contains HTML templates for article listings and static pages.

| File | Purpose |
|---|---|
| `custom-head.html` | Add HTML inside each page's `<head>` |
| `custom-body-end.html` | Add HTML immediately before each page's `</body>` |

Use these for analytics tags, custom scripts, or similar additions. You normally don't need to edit them to write articles.

## 8. Building and Publishing

Blog Kit generates static HTML ready to publish from Markdown and JSON.

The basic workflow is:

1. Configure your blog in `site.json`.
2. Add article Markdown files to `content/`.
3. Register article metadata in `articles.json`.
4. Add static pages if needed.
5. Build and publish.

### Building Locally

In an environment with Node.js, run these commands from the project root:

```bash
npm install
npm run build
```

When the build succeeds, `dist/` contains the files ready to publish. Upload that folder to a static hosting service to put the site online.

If you have connected GitHub to Cloudflare Pages or another host, updates can be published through your configured build and deployment workflow.

### Files Generated Automatically

- Article pages and static pages
- Article listings and pagination (15 articles per page)
- Search index
- Per-article Open Graph images
- RSS feed
- XML sitemap
- robots.txt
- Article structured data
- WebP versions of supported images
- Article-specific PWA icons when enabled

You don't need to create these files manually for each article.

### Installation and Workflow Guides

If you're new to Blog Kit, start here:

**[Installation Guide](https://blogkit.ojapp.app/download/)**

Download Blog Kit and follow the setup instructions.

**[Publishing Workflow Guide](https://blogkit.ojapp.app/guide/)**

Find a way to write and publish that suits you, whether on a phone, PC, or local environment.

## Summary

There are essentially three things you do when using OJapp Blog Kit:

**Write articles, configure JSON, and publish.**

Article bodies live in Markdown, and settings live in JSON, so the purpose of each file remains clear even as the blog grows.

When you want to change the design or functionality, edit the relevant files directly.

Your articles and settings remain in files you own, and you choose where to publish them.

**Write freely. Own what you build.**
