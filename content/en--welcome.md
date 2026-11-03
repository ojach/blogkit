# Welcome to OJapp Blog Kit

OJapp Blog Kit is a lightweight static blog engine for writing articles in Markdown and publishing them on your own domain.

You don't need a heavy CMS like WordPress, and you don't have to depend on an external publishing platform. Write in a space you control and keep building a library of content that belongs to you.

I built Blog Kit to make that kind of blogging as simple as possible.

## Why I Built Blog Kit

There are already plenty of ways to start a blog. WordPress gives you the freedom to build a highly customized site, while hosted platforms let you start writing as soon as you create an account.

But when I thought about maintaining a blog over the long term, something still bothered me.

With WordPress, there is too much work unrelated to writing: updating themes and plugins, maintaining a database, and managing the CMS itself. On external platforms, you're always subject to changes in the platform and restrictions on design.

What I wanted was **a system that lets me focus on writing articles while retaining complete control over my own domain**.

“Don't manage a complicated system.”  
“Keep what you write in a place you own.”

Blog Kit is built around those two principles.

## Build Your Content on Your Own Domain

Articles published on external services live on those services' domains.

With Blog Kit, everything is published on your domain, such as `blog.example.com`. As you add articles, you build up content and value on the domain itself.

You control the URL structure, design, loading speed, and publishing workflow. Instead of being tied to a platform's decisions, you own the place where you publish.

## Fast and Reliable Because It's Static

Blog Kit converts Markdown articles into HTML during the build process.

Unlike a dynamic CMS that queries a database and assembles a page for every visitor, Blog Kit serves finished HTML files directly.

* **No database required:** No database connection errors or query delays when serving pages
* **No server-side processing:** Serve static files quickly on Cloudflare Pages or GitHub Pages
* **Less maintenance:** No CMS core or plugin updates to manage
* **Smaller attack surface:** Removing dynamic processing reduces many common security risks

By avoiding unnecessary runtime processing from the start, Blog Kit takes advantage of the simplicity and reliability of static sites.

## Give Readers the Answer with a One-Minute Summary

Blog Kit can display a “One-Minute Summary” at the beginning of an article.

It's not just a summary box. **It's a way to give readers the answer to their question in under a minute.**

Someone looking for a technical solution usually wants to know what to do, not read a long introduction. By putting the conclusion and key points first, readers who only need a quick answer can move on immediately, while those who want the details can continue reading.

This approach makes the essential information easy for people, search engines, and AI systems to understand without unnecessary buildup.

## Help Readers Find What to Read Next

Solving one question often leads to another.

For example, someone who learns “What is a PWA?” may next want to know “How do I build a PWA?” and then “How do I configure a Web App Manifest?”

Blog Kit lets you connect articles through a “Next to Read” section that follows the reader's natural learning path. Instead of relying only on newest or most popular posts, you can organize relationships between articles and grow your blog into a connected body of documentation.

## Automate Everything Around Writing

Blog Kit generates many of the repetitive parts of running a blog at build time.

* **Convert Markdown to HTML** (headings, images, tables, and code blocks)
* **Enhanced code blocks** (syntax highlighting, language labels, copy buttons, and diff display)
* **Automatically generated Open Graph images** for social sharing
* **Automatically generated table of contents**
* **Article search**
* **WebP image optimization**
* **RSS feeds and XML sitemaps**
* **SEO metadata and structured data**

There is no dashboard or database to set up. Write in Markdown, manage settings in JSON, and run a local build.

## A Local-First Workflow for the AI Era

Blog Kit keeps articles as Markdown text files on your own computer.

That makes it a good fit for workflows where you draft with AI tools such as ChatGPT, revise the writing yourself, save the result as a local Markdown file, and build the site.

You don't need to enter content through a proprietary dashboard. Regardless of who writes an article or which tools they use, the finished text stays in your files and on your domain.

## Choose Your Deployment Environment

* **With GitHub:** Automatically deploy from your repository to Cloudflare Pages or another static host
* **Without GitHub:** Build locally and upload the generated files directly to static hosting

You can start with a free hosting URL and connect a custom domain later.

## Your Blog, in Your Hands

OJapp Blog Kit isn't a massive CMS packed with every imaginable feature.

It's a small tool that provides the essentials for blogging while letting you control your articles and publishing environment.

Write freely. Own what you build.

That's the idea behind this little blog engine.
