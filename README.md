# OJapp Blog Kit v1

**Built for the AI Writing Era.** · **Write freely. Own what you build.**

Markdownで記事を書き、GitHubへのPushからCloudflare Pagesで静的公開する、小さな個人ブログエンジンです。記事データは普通のMarkdownとJSON。データベースや管理画面はありません。

## 必要環境

- Node.js 20以上
- npm

## はじめる

```sh
npm install
```

`site.json` は公開URL・サイト名・説明・著者名・ブログカラーなどを設定するファイルです。自分のブログに使う場合は、公開URLなどを変更します。記事は `content/` にMarkdownで追加します。

```sh
npm run build
```

生成物は `dist/` です。`dist/index.html` を開くか、ローカルの静的サーバーで確認できます。

## 記事を追加する

1. `content/my-new-article.md` を作成します。
2. 必要な場合だけ `articles.json` に同じファイル名（拡張子なし）のメタ情報を追加します。
3. `npm run build` して `dist/` を確認し、GitHubへPushします。

Markdownの最初のH1がタイトルになります。メタ情報がない場合、URLはファイル名、説明文は本文冒頭から自動生成されます。公開日は任意で、未指定の記事は一覧の末尾に並びます。

```json
{
  "my-new-article": {
    "title": "必要ならタイトルを上書き",
    "meta_description": "検索結果などに使う説明文",
    "excerpt": "一覧表示用の短い説明",
    "summary": "目次の上に表示する要約。Markdownで書けます。",
    "permalink": "my-new-article",
    "published": "2026-10-09",
    "category": "任意の表示ラベル",
    "next_article": "別の記事のファイル名またはpermalink"
  }
}
```

指定できる項目はすべて任意です。明示した値をビルドが優先します。v1ではカテゴリー別一覧やタグ分類は行いません。

### 日本語・英語の記事

サイトの既定言語は `site.json` の `language` で指定します。個別記事には `articles.json` の `language` を `ja` または `en` で指定できます。英語記事では日付、ナビゲーション、目次、要約、作者欄、共有状態などのUIも英語になります。記事本文・タイトル・説明文はそれぞれの記事に書いた内容を使います。

日英記事を対応付ける場合は、お互いのファイル名（拡張子なし）を `translation` に指定します。記事上部に相手言語へのリンクが表示されます。古い記事のURLを維持したい場合は、`permalink` にこれまでのパスをそのまま指定してください。

`language: "en"` を指定して `permalink` を省略すると、URLは `/en/ファイル名/` になります。旧記事のように `/en/pwa-icon-2/` を維持する場合は、例のように `permalink` を明示します。

```json
{
  "pwa-icon-ja": {
    "language": "ja",
    "permalink": "pwa-icon",
    "translation": "pwa-icon-en"
  },
  "pwa-icon-en": {
    "language": "en",
    "permalink": "en/pwa-icon-2",
    "translation": "pwa-icon-ja"
  }
}
```

作者名・紹介文・プロフィールURLは `site.json` の `author_locales` で言語ごとに設定できます。作者カードと自動生成OGP画像に反映されます。省略した言語は従来の `author`、`author_description`、`author_url` にフォールバックします。

```json
{
  "author": "おじゃち",
  "author_description": "PWAやWeb制作について書いています。",
  "author_url": "https://ojapp.app/",
  "author_locales": {
    "ja": {
      "name": "おじゃち",
      "description": "PWAやWeb制作について書いています。",
      "url": "https://ojapp.app/"
    },
    "en": {
      "name": "Ojachi",
      "description": "Writing about PWAs and web development.",
      "url": "https://ojapp.app/en/"
    }
  }
}
```

コードブロックのコピー操作はアイコン表示です。スクリーンリーダー向けのラベルとコピー結果は記事の言語に合わせて切り替わります。

### 記事の要約

`articles.json` の記事データに `summary` を追加すると、記事ページの目次の上に開閉できる「1分で読める要約」を表示します。要約はMarkdownで書けます。設定済みの「次に読む」記事があれば、そのタイトルだけのリンクも要約の下に表示します。記事ごとに省略でき、`site.json` の `features.article_summary` を `false` にするとブログ全体で非表示になります。

## 含まれる機能

- Markdown記事を静的HTMLへ変換（見出しID、目次、表、画像、コードブロック）
- 新着順の記事一覧とページ内検索（タイトル・説明文）
- 記事ごとのcanonical、meta description、OGP、Twitter Card、BlogPosting JSON-LD
- 記事タイトル・ブログ情報・作者情報を使ったOGP画像の自動生成（1200×630 PNG）
- `sitemap.xml`、`rss.xml`、`robots.txt`
- PC・スマートフォン向けの読みやすいレイアウト

### コードブロック

コードフェンスに言語名を書くと、ビルド時に構文に合わせて色分けします。ブロック上部に言語名とコピー操作が付き、字下げの深さに合わせてインデントガイドを表示します。行番号は表示しません。`diff` は追加行・削除行も色分けします。

````md
```js
function greet(name) {
  console.log(`こんにちは、${name}さん`);
}
```

```diff
-const theme = "plain";
+const theme = "vitesse-dark";
```
````

閲覧時にシンタックスハイライト用のJavaScriptは不要です。言語名を省略した場合や未対応の言語名は、通常のテキストとして表示します。

## 記事ページ下部の構成

記事本文の後に「次に読む」→作者情報・共有→おすすめ記事の順で表示します。

- `next_article` に記事のファイル名（拡張子なし）または `permalink` を指定すると、その記事を表示します。学習順やシリーズ、案内したい導線を記事ごとに設定できます。
- 未指定の場合は公開日の並びで次に来る記事を表示します。最後の記事では最新の別記事を表示します。記事が1件だけなら「次に読む」は表示しません。
- 作者名は `site.json` の `author` を使います。任意で `author_description` と `author_url` を追加できます。
- `author_image` に `public/` 内の画像パス（例: `/images/author.webp`）を指定すると、作者カードに丸いアイコンを表示します。未指定時は名前の先頭文字を表示します。
- 画像は `public/images/` に置きます。作者画像はファイル名だけ（例: `author.webp`）で指定でき、GitHub Pagesのプロジェクト用パスもビルド時に補完します。
- 共有ボタンはスマートフォンなどでは共有メニューを開き、対応しない環境では記事URLをコピーします。
- おすすめ記事は同じ言語の記事から最大3件を表示し、自分自身と「次に読む」記事は候補から除外します。紹介文は `excerpt` → `meta_description` → 本文冒頭の順で生成します。

```json
{
  "author": "Your Name",
  "author_image": "author.webp",
  "author_description": "書いている人の短い紹介。",
  "author_url": "https://example.com/about/"
}
```

### 記事内画像とサムネイル

記事内画像はMarkdownでファイル名だけを指定できます。画像は `public/images/` に置いてください。

```md
![画面のスクリーンショット](screen.webp)
```

記事のサムネイルは `articles.json` に設定します。指定すると記事上部に表示されます。`show_thumbnail` を `false` にすると記事上部にも表示しません。OGP画像はサムネイルとは別に、記事タイトル・ブログ情報・作者情報から自動生成します。

```json
{
  "my-new-article": {
    "thumbnail": "article-cover.webp",
    "thumbnail_alt": "記事のカバー画像",
    "show_thumbnail": true
  }
}
```

`thumbnail` と `author_image` はファイル名だけで指定できます。サブフォルダを使う場合は `covers/article-cover.webp` のように `images/` 以下のパスを書けます。

### OGP画像

記事ごとのOGP画像は `dist/ogp/` にPNGで自動生成され、記事HTMLの `og:image` とTwitter Cardに設定されます。画像にはブログアイコンとブログ名（左上）、記事タイトル（中央）、作者アイコンと名前（右下）、ブログカラーの外枠と右上の丸いモチーフを表示します。

ブログアイコン・作者アイコンは `public/images/` に置き、`site.json` でファイル名を指定します。ブログアイコン（`icon`）はOGP画像と各ページのfaviconに共通で使われます。未指定時はOGP上で名前の先頭文字をアイコン代わりに表示します。`brand_color` はリンク色とOGPのアクセント色に共通で使います。

```json
{
  "title": "My Blog",
  "author": "Your Name",
  "brand_color": "#187a68",
  "icon": "blog-icon.webp",
  "author_image": "author.webp"
}
```

OGP生成にはPNG出力用の `sharp` を使います。通常どおり `npm install` を実行すれば導入されます。
日本語を含むOGP画像の生成には、ビルド環境に日本語フォントが必要です。Windows/macOSでは通常そのまま使えます。GitHub PagesのActionsにはNoto CJKの導入処理を含めています。Cloudflare Pagesで生成時に日本語が欠ける場合は、ビルド環境にNoto CJKフォントを追加してください。

## `blogkit.ojapp.app` へ公開

1. 初回はプロジェクト直下で `npm install` を実行し、生成された `package-lock.json` も含めてGitHubへPushします。
2. Cloudflare Dashboardで **Workers & Pages → Create application → Pages → Connect to Git** を選び、このリポジトリを接続します。
3. Production branchを `main`、Build commandを `npm run build`、Build output directoryを `dist` に設定します。Framework presetは **None** で構いません。
4. 最初のデプロイ完了後、Pagesプロジェクトの **Custom domains → Set up a domain** から `blogkit.ojapp.app` を追加します。
5. Cloudflare DNSの案内に従ってドメインを有効化します。記事への変更をGitHubへPushすると、Pagesが再ビルドして公開します。

サイトマップ・canonicalなどのURLは `site.json` をもとに生成します。公開先を変える場合は、Push前に `site.json` の `url` を変更してください。URLのパス部分もビルド時に各ページ・CSS・検索データのリンクへ反映されます。

## GitHub Pagesで公開

独自ドメインがなくてもGitHub Pagesで公開できます。`ojach.github.io/my-blog` のようなプロジェクトサイトでは、`site.json` の `url` を実際の公開URLにします。

```json
{
  "title": "My Blog",
  "description": "Markdownで書く個人ブログ。",
  "url": "https://ojach.github.io/my-blog",
  "author": "Your Name",
  "language": "ja-JP"
}
```

GitHub Pages用のワークフローを `.github/workflows/pages.yml` に同梱しています。リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に変更すると、`main` へのPushごとにActionsが `npm install` → `npm run build` を実行し、`dist/` を公開します。最初の実行状況と公開URLは **Actions** タブで確認できます。

ユーザーサイト（`ojach.github.io`）として公開する場合も同じワークフローを使えます。その場合の `site.json` の `url` は `https://ojach.github.io` です。

生成後の `dist/` は任意の静的ホスティングでも配信できます。記事データと表示処理は分離されているため、ホスティング先に応じて記事データを書き換える必要はありません。

## WranglerからCloudflare Pagesへ直接公開する

GitHub Actionsを使わず、ローカルでビルドした `dist/` をWranglerからCloudflare Pagesへアップロードする方法です。Cloudflare Pagesのプロジェクトは最初に一度だけ作成します。Cloudflareの画面で **Workers & Pages → Create application → Pages → Direct Upload** を選び、プロジェクトを作成してください。プロジェクト名は後で使うので控えておきます。

プロジェクトのフォルダでWranglerを一度インストールし、Cloudflareにログインします。

```sh
npm install --save-dev wrangler
npx wrangler login
```

`package.json` の `scripts` に、`deploy` を追加します。`your-pages-project` は先ほど作成したPagesのプロジェクト名に置き換えてください。

```json
"scripts": {
  "build": "node scripts/build.js",
  "deploy": "wrangler pages deploy dist --project-name your-pages-project"
}
```

`site.json` の `url` を公開URLに設定したら、記事を更新するたびに次のコマンドを実行します。

```sh
npm run build
npm run deploy
```

独自ドメインを使う場合は、Pagesプロジェクトの **Custom domains** で設定し、`site.json` の `url` も同じ独自ドメインにします。この方法ではGitHubへのPushは不要です。

## 注意

記事Markdownは信頼できる編集者が書く前提です。Markdown内のraw HTMLは変換時にそのまま出力されます。外部投稿を受け付ける用途には使わないでください。
