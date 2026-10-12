import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { generateOgp } from './ogp.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const readJson = async (file) => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const slug = (value) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9ぁ-んァ-ヶ一-龠ー]+/g, '-').replace(/^-|-$/g, '') || 'section';
const codeEscape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function colorize(code, lang) {
  let safe = codeEscape(code);
  if (!lang) return safe;
  const rules = lang === 'json'
    ? [/(&quot;.*?&quot;)(?=\s*:)/g, /(:\s*)(&quot;.*?&quot;)/g, /\b(true|false|null)\b/g, /\b\d+\b/g]
    : lang === 'css'
      ? [/([.#]?[\w-]+)(\s*\{)/g, /([\w-]+)(\s*:)/g, /#[0-9a-fA-F]{3,8}\b/g]
      : [/\b(const|let|var|function|return|if|else|new|import|from|export|async|await|class)\b/g, /(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, /\b(true|false|null|undefined)\b/g, /\b\d+\b/g];
  for (const rule of rules) safe = safe.replace(rule, (match) => `<span class="tok">${match}</span>`);
  return safe.replace(/(\/\/[^\n]*|# [^\n]*)/g, '<span class="tok-comment">$1</span>');
}

function withBase(basePath, pathname) {
  const cleanPath = `/${String(pathname).replace(/^\/+/, '')}`;
  return `${basePath}${cleanPath}` || '/';
}

function imageUrl(basePath, value) {
  const image = String(value ?? '').trim();
  if (!image) return '';
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(image)) return image;
  const imagePath = image.startsWith('/')
    ? image
    : `/images/${image.replace(/^images\//, '')}`;
  return withBase(basePath, imagePath);
}

function shell({ title, description, canonical, site, basePath, body, extra = '', ogImage = '', lang = 'ja', brandColor = '#187a68' }) {
  const homeUrl = withBase(basePath, '/');
  const cssUrl = withBase(basePath, '/css/style.css');
  const highlightUrl = withBase(basePath, '/css/highlight.css');
  const rssUrl = withBase(basePath, '/rss.xml');
  const ogImageTags = ogImage
    ? `<meta property="og:image" content="${esc(ogImage)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${esc(ogImage)}">`
    : '<meta name="twitter:card" content="summary">';
  return `<!doctype html><html lang="${esc(lang)}" style="--brand:${brandColor}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><meta property="og:type" content="${extra ? 'article' : 'website'}"><meta property="og:site_name" content="${esc(site.title)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}">${ogImageTags}<meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><link rel="stylesheet" href="${esc(cssUrl)}"><link rel="stylesheet" href="${esc(highlightUrl)}"><link rel="alternate" type="application/rss+xml" title="${esc(site.title)} RSS" href="${esc(rssUrl)}">${extra}</head><body><header class="site-header"><div class="header-inner"><a class="brand" href="${esc(homeUrl)}">${esc(site.title)}</a><nav class="nav"><a href="${esc(homeUrl)}">記事一覧</a><a href="${esc(rssUrl)}">RSS</a></nav></div></header>${body}<footer class="footer">${esc(site.title)} · Built for the AI Writing Era.</footer></body></html>`;
}

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

const [site, metadata] = await Promise.all([readJson('site.json'), readJson('articles.json')]);
const shareScript = await fs.readFile(path.join(root, 'public/js/share.js'), 'utf8');
const siteUrl = new URL(site.url);
const basePath = siteUrl.pathname.replace(/\/$/, '');
const brandColor = /^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(String(site.brand_color || '')) ? site.brand_color : '#187a68';
const absoluteUrl = (pathname) => new URL(withBase(basePath, pathname), siteUrl.origin).href;
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => `<pre><code class="language-${esc(lang || 'text')}">${colorize(text, lang || '')}</code></pre>\n`;
renderer.image = ({ href, title, text }) => `<img src="${esc(imageUrl(basePath, href))}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`;

const files = (await fs.readdir(path.join(root, 'content'))).filter((file) => file.endsWith('.md'));
const articles = [];
for (const file of files) {
  const key = path.basename(file, '.md');
  const raw = await fs.readFile(path.join(root, 'content', file), 'utf8');
  const tokens = marked.lexer(raw);
  const firstHeading = tokens.find((token) => token.type === 'heading' && token.depth === 1);
  const headingText = (token) => token.tokens?.map((part) => part.text || part.raw || '').join('') || token.text || '';
  const meta = metadata[key] || {};
  const title = meta.title || (firstHeading && headingText(firstHeading)) || key.replace(/[-_]/g, ' ');
  const description = meta.meta_description || meta.excerpt || raw.replace(/^#+ .*$/gm, '').replace(/[`*_>#\[\]()-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) || title;
  const permalink = (meta.permalink || key).replace(/^\/+|\/+$/g, '');
  articles.push({ key, title, description, excerpt: meta.excerpt || description, permalink, published: meta.published || '', category: meta.category || '', nextArticleKey: meta.next_article || '', thumbnail: meta.thumbnail || '', thumbnailAlt: meta.thumbnail_alt || title, showThumbnail: meta.show_thumbnail !== false, tokens, firstHeading });
}
articles.sort((a, b) => (b.published || '').localeCompare(a.published || '') || a.title.localeCompare(b.title));

const searchIndex = articles.map((article) => ({
  title: article.title,
  description: article.description,
  excerpt: article.excerpt,
  url: absoluteUrl(`/${article.permalink}/`),
  published: article.published,
  category: article.category,
}));
const cards = articles.map((article) => `<li class="article-card" data-card><div class="article-meta">${article.published ? `<time datetime="${esc(article.published)}">${esc(article.published)}</time>` : '<span>日付未設定</span>'}${article.category ? ` · ${esc(article.category)}` : ''}</div><h2><a href="${esc(withBase(basePath, `/${article.permalink}/`))}">${esc(article.title)}</a></h2><p>${esc(article.excerpt)}</p></li>`).join('');
const searchIndexUrl = withBase(basePath, '/search-index.json');
const home = `<main class="page"><div class="home-grid"><section><div class="intro"><div class="eyebrow">PERSONAL BLOG ENGINE</div><h1>記事を書くことに、集中する。</h1><p class="muted">Markdownで書いて、自分のドメインに公開。</p></div><label class="eyebrow" for="article-search">記事を検索</label><input id="article-search" class="search" type="search" placeholder="タイトル・説明文から検索" data-search data-index-url="${esc(searchIndexUrl)}"><ul class="article-list" data-results>${cards || '<li class="empty">記事はまだありません。</li>'}</ul></section><aside class="side-note"><strong>Write freely.<br>Own what you build.</strong><p class="muted">普通のMarkdownファイルから、自分のブログを育てます。</p></aside></div></main><script src="${esc(withBase(basePath, '/js/search.js'))}" defer></script>`;

await fs.writeFile(path.join(out, 'index.html'), shell({ title: site.title, description: site.description, canonical: absoluteUrl('/'), site, basePath, body: home, brandColor }));
const sitemap = [];
const rss = [];
for (const article of articles) {
  const toc = [];
  const usedIds = new Map();
  const articleRenderer = new marked.Renderer();
  articleRenderer.image = renderer.image;
  articleRenderer.heading = ({ tokens, depth }) => {
    const rendered = articleRenderer.parser.parseInline(tokens);
    const plain = rendered.replace(/<[^>]*>/g, '');
    const base = slug(plain);
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    if (depth >= 2) toc.push({ id, text: plain, level: depth });
    return `<h${depth} id="${id}">${rendered}</h${depth}>\n`;
  };
  const contentTokens = article.firstHeading ? article.tokens.slice(article.tokens.indexOf(article.firstHeading) + 1) : article.tokens;
  const html = marked.parser(contentTokens, { renderer: articleRenderer });
  const tocHtml = toc.length ? `<details class="toc" open><summary>目次</summary><ul>${toc.map((item) => `<li class="${item.level === 3 ? 'toc-h3' : ''}"><a href="#${esc(item.id)}">${esc(item.text)}</a></li>`).join('')}</ul></details>` : '';
  const canonical = absoluteUrl(`/${article.permalink}/`);
  const ogpFilename = `${slug(article.key)}.png`;
  const ogpPath = path.join(out, 'ogp', ogpFilename);
  await generateOgp({ root, destination: ogpPath, title: article.title, site, brandColor });
  const ogImage = absoluteUrl(`/ogp/${ogpFilename}`);
  const articleIndex = articles.indexOf(article);
  const explicitNext = article.nextArticleKey
    ? articles.find((candidate) => candidate !== article && (candidate.key === article.nextArticleKey || candidate.permalink === article.nextArticleKey))
    : null;
  const fallbackNext = articles[articleIndex + 1] || articles.find((candidate) => candidate !== article);
  const nextArticle = explicitNext || fallbackNext;
  const recommendations = articles.filter((candidate) => candidate !== article && candidate !== nextArticle).slice(0, 3);
  const nextSection = nextArticle
    ? `<section class="next-read" aria-labelledby="next-read-title"><div class="section-label">次に読む</div><h2 id="next-read-title"><a href="${esc(withBase(basePath, `/${nextArticle.permalink}/`))}">${esc(nextArticle.title)}</a></h2><p>${esc(nextArticle.excerpt)}</p></section>`
    : '';
  const authorDescription = site.author_description || '';
  const authorUrl = site.author_url || '';
  const authorImage = site.author_image
    ? `<img src="${esc(imageUrl(basePath, site.author_image))}" alt="" loading="lazy">`
    : `<span aria-hidden="true">${esc([...String(site.author || '著者')][0])}</span>`;
  const authorSection = `<section class="author-card" aria-label="この記事を書いた人"><div class="author-avatar">${authorImage}</div><div class="author-copy"><div class="section-label">この記事を書いた人</div><strong>${esc(site.author)}</strong>${authorDescription ? `<p>${esc(authorDescription)}</p>` : ''}${authorUrl ? `<a class="author-link" href="${esc(authorUrl)}" rel="author">プロフィールを見る</a>` : ''}</div></section>`;
  const thumbnailImageUrl = imageUrl(basePath, article.thumbnail);
  const thumbnail = thumbnailImageUrl && article.showThumbnail
    ? `<figure class="article-thumbnail"><img src="${esc(thumbnailImageUrl)}" alt="${esc(article.thumbnailAlt)}" fetchpriority="high"></figure>`
    : '';
  const articleActions = `<div class="article-actions" aria-label="記事の操作"><button type="button" class="icon-button" data-copy-link data-share-url="${esc(canonical)}" aria-label="記事リンクをコピー" title="リンクをコピー"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button><button type="button" class="icon-button" data-share data-share-title="${esc(article.title)}" data-share-url="${esc(canonical)}" aria-label="記事を共有" title="記事を共有"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"/></svg></button><span class="share-status" data-share-status role="status" aria-live="polite"></span></div>`;
  const recommendationSection = recommendations.length
    ? `<section class="recommendations" aria-labelledby="recommendations-title"><div class="section-label">おすすめ記事</div><h2 id="recommendations-title">ほかの記事も読む</h2><ul class="recommendation-list">${recommendations.map((candidate) => `<li><div class="article-meta">${candidate.published ? `<time datetime="${esc(candidate.published)}">${esc(candidate.published)}</time>` : ''}${candidate.category ? ` · ${esc(candidate.category)}` : ''}</div><h3><a href="${esc(withBase(basePath, `/${candidate.permalink}/`))}">${esc(candidate.title)}</a></h3><p>${esc(candidate.excerpt)}</p></li>`).join('')}</ul></section>`
    : '';
  const jsonld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.description, datePublished: article.published || undefined, author: { '@type': 'Person', name: site.author }, mainEntityOfPage: canonical, url: canonical, publisher: { '@type': 'Organization', name: site.title } };
  // Inline the small share handler so it still works when a static host's
  // fallback/rewrite rules return HTML for /js/share.js instead of the asset.
  const articleBody = `<main class="article"><header class="article-head"><div class="article-meta">${article.published ? `<time datetime="${esc(article.published)}">${esc(article.published)}</time>` : ''}${article.category ? ` · ${esc(article.category)}` : ''}</div><h1>${esc(article.title)}</h1><p class="article-description">${esc(article.description)}</p></header>${thumbnail}${tocHtml}<article class="prose">${html}</article>${articleActions}${nextSection}${authorSection}${recommendationSection}<p class="muted"><a href="${esc(withBase(basePath, '/'))}">← 記事一覧へ戻る</a></p></main><script>${shareScript}</script>`;
  const extra = `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`;
  const htmlPage = shell({ title: `${article.title} | ${site.title}`, description: article.description, canonical, site, basePath, body: articleBody, extra, ogImage, brandColor });
  const destination = path.join(out, article.permalink, 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, htmlPage);
  sitemap.push(`<url><loc>${esc(canonical)}</loc>${article.published ? `<lastmod>${esc(article.published)}</lastmod>` : ''}</url>`);
  rss.push(`<item><title>${esc(article.title)}</title><link>${esc(canonical)}</link><guid>${esc(canonical)}</guid>${article.published ? `<pubDate>${new Date(`${article.published}T00:00:00Z`).toUTCString()}</pubDate>` : ''}<description>${esc(article.description)}</description></item>`);
}

await fs.writeFile(path.join(out, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
await fs.writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${esc(absoluteUrl('/'))}</loc></url>${sitemap.join('')}</urlset>`);
await fs.writeFile(path.join(out, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.title)}</title><link>${esc(absoluteUrl('/'))}</link><description>${esc(site.description)}</description><language>${esc(site.language || 'ja-JP')}</language>${rss.join('')}</channel></rss>`);
await fs.writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`);
await fs.cp(path.join(root, 'public'), out, { recursive: true });
console.log(`Built ${articles.length} article(s) into dist/ (base path: ${basePath || '/'})`);
