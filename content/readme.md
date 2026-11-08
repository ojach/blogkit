# OJapp Blog Kit 完全ガイド｜設定ファイルから記事作成・公開まで

OJapp Blog Kitは、MarkdownとJSONでブログを管理する静的サイトジェネレーターです。

管理画面やデータベースは必要ありません。記事をMarkdownで書き、設定ファイルを編集してビルドすると、公開用のHTMLが生成されます。

このガイドでは、ブログの設定、記事の管理、固定ページの作成、公開までの流れを説明します。

## 1. Blog Kitのファイル構成

まずは、どのファイルを編集するのか確認しましょう。

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

| ファイル・フォルダ | 用途 |
|---|---|
| `site.json` | ブログ全体の設定 |
| `articles.json` | 記事ごとの設定 |
| `content/` | 記事Markdown |
| `pages.json` | 固定ページの設定 |
| `pages/` | 固定ページMarkdown |
| `public/images/` | 記事画像、アイコン、広告画像など |
| `templates/` | HTMLテンプレートや追加HTML |
| `dist/` | ビルド後の公開用ファイル |

`dist/` はビルド時に作り直されます。生成されたHTMLを直接編集する必要はありません。

## 2. site.json｜ブログ全体の設定

`site.json` は、ブログ名、公開URL、著者情報、デザイン、機能などを管理するファイルです。

### 設定例

```json
{
  "title": "My Tech Blog",
  "description": "Web技術について発信するブログです。",
  "url": "https://example.com/",
  "author": "Blog Author",
  "author_description": "Web開発について発信しています。",
  "author_url": "https://example.com/about/",
  "author_image": "author.png",
  "brand_color": "#187a68",
  "icon": "icon.png",
  "pwa_icon": "pwa-icon.png",
  "language": "ja-JP",
  "features": {
    "article_summary": true,
    "article_pwa_icons": false
  }
}
```

### 基本設定

| 項目 | 説明 |
|---|---|
| `title` | ブログ名。ヘッダーやページタイトルなどに使用 |
| `description` | ブログ全体の説明文。トップページのメタ情報やRSSに使用 |
| `url` | ブログの公開URL。canonical URL、サイトマップ、RSSなどの生成に使用 |
| `language` | ブログの標準言語。例：`ja-JP`、`en` |
| `brand_color` | アクセントカラー。例：`#187a68` |
| `icon` | ブログのファビコン。PWAアイコンの代替にも使用 |
| `pwa_icon` | サイト共通のPWAアイコン。省略すると`icon`を使用 |

**特に重要なのは `url` です。** 公開先のURLを正しく指定してください。

```json
"url": "https://example.com/"
```

サブディレクトリで公開する場合は、そのパスまで含めます。

```json
"url": "https://example.com/blog/"
```

この値を基準に記事URL、画像URL、canonical URLなどが生成されます。

### 著者情報

記事の下部には、著者プロフィールが表示されます。

| 項目 | 説明 |
|---|---|
| `author` | 著者名 |
| `author_description` | 著者の紹介文 |
| `author_url` | プロフィールへのリンク |
| `author_image` | 著者画像のファイル名、パス、またはURL |
| `author_locales` | 言語別の著者情報 |

著者画像を設定しない場合は、著者名の先頭文字が代わりに表示されます。

### 言語別の著者情報

日本語と英語でプロフィールを分けたい場合は、`author_locales` を使います。

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

記事の言語に合わせて、対応する著者情報が使用されます。設定されていない項目は、通常の `author` などの値が使われます。

### 機能設定

```json
"features": {
  "article_summary": true,
  "article_pwa_icons": false
}
```

| 項目 | 説明 |
|---|---|
| `article_summary` | 記事の要約欄を表示するか。`false` で無効 |
| `article_pwa_icons` | 記事ごとのPWAアイコンを自動生成するか。`true` で有効 |

`article_summary` が有効でも、記事側に `summary` がなければ要約欄は表示されません。

`article_pwa_icons` を有効にすると、記事専用のPWAアイコンが未指定の場合に自動生成します。

### 広告設定

Blog Kitでは、記事内の好きな位置に画像広告を挿入できます。

```json
"ads": {
  "1": {
    "image": "banner1.png",
    "url": "https://example.com/service/",
    "alt": "サービス紹介"
  },
  "2": {
    "image": "banner2.png",
    "url": "https://example.com/product/",
    "alt": "製品紹介"
  }
}
```

| 項目 | 説明 |
|---|---|
| `image` | 広告画像 |
| `url` | 広告のリンク先。HTTPまたはHTTPSのURL |
| `alt` | 広告画像の代替テキスト |

広告枠は最大6種類です。`"1"` から `"6"` まで設定できます。記事Markdownには独立した行でマーカーを記述します。

```md
本文の途中に広告を表示します。

[[ad]]

別の広告を表示します。

[[ad2]]
```

`[[ad]]` は広告1、`[[ad2]]` は広告2です。`[[ad6]]` まで使用できます。

従来形式の `ad` も広告1として利用できます。

```json
"ad": {
  "image": "banner.png",
  "url": "https://example.com/",
  "alt": "広告"
}
```

ただし、`ads` の `"1"` が設定されている場合は、そちらが優先されます。画像や有効なリンク先が設定されていない広告枠は表示されません。

## 3. articles.json｜記事ごとの設定

`articles.json` は、記事タイトル、公開URL、説明文、カテゴリなどを管理するファイルです。記事本文はMarkdown、記事の設定はJSONという形で分離しています。

記事markdown内のフロントマターでも設定できますが、特殊な内容は`articles.json`のみの対応になっています。[記事Markdownの書き方へ](#4. 記事Markdownの書き方)

### 設定例

```json
{
  "welcome": {
    "title": "はじめまして",
    "meta_description": "このブログの紹介と運営方針を説明します。",
    "excerpt": "このブログで発信する内容をご紹介します。",
    "summary": "このブログではWeb技術を中心に発信しています。",
    "permalink": "welcome",
    "language": "ja",
    "category": "お知らせ",
    "published": "2026-11-02",
    "next_article": "getting-started",
    "thumbnail": "welcome.png",
    "thumbnail_alt": "ブログの紹介画像",
    "show_thumbnail": true
  }
}
```

この例では、`content/welcome.md` というMarkdownファイルを用意します。**JSONのキーとMarkdownのファイル名を一致させてください。**

```text
content/welcome.md
        ↓
articles.json の "welcome"
```

### 記事の基本設定

| 項目 | 説明 |
|---|---|
| `title` | 記事タイトル。Markdownの最初のH1より優先 |
| `permalink` | 公開URLのパス |
| `language` | 記事の言語。例：`ja`、`en` |
| `category` | 記事のカテゴリ |
| `published` | 公開日。`YYYY-MM-DD` 形式 |
| `updated` | 更新日。設定可能だが、Markdown側での管理を推奨 |

例えば `"permalink": "pwa-guide"` と設定すると、公開URLは `https://example.com/pwa-guide/` になります。

`permalink` を省略すると、基本的にMarkdownのファイル名が使われます。英語記事で `language` を `en` に設定し、`permalink` を省略した場合は、標準で `en/ファイル名` というパスが使われます。

### 説明文の設定

記事の説明文には、`meta_description` と `excerpt` の2種類があります。

| 項目 | 説明 |
|---|---|
| `meta_description` | SEO用の説明文。画面上には表示しない |
| `excerpt` | 記事タイトル下、記事一覧、おすすめ欄などに表示する紹介文 |

```json
{
  "meta_description": "PWAの仕組みや導入方法を解説します。",
  "excerpt": "PWAって何？という疑問を、基本からわかりやすく説明します。"
}
```

この場合、HTMLのdescriptionには `meta_description` が使用され、読者向けの紹介文には `excerpt` が使用されます。

| 使用場所 | 優先順位 |
|---|---|
| HTMLのmeta description | `meta_description` → `excerpt` → 本文 |
| 記事タイトル下 | `excerpt` → 本文冒頭 |
| 記事一覧・おすすめ欄 | `excerpt` → 本文冒頭 |

`excerpt` を省略した場合、本文の最初の段落から最大160文字が紹介文として使われます。その場合、最初の段落は本文中では重複表示されません。

`meta_description` は、記事のSEO情報を個別に調整したいときに使ってください。

### 1分で読める要約

`summary` は、記事冒頭に表示する要約欄です。

```json
"summary": "PWAは、Webサイトをホーム画面に追加してアプリのように利用する仕組みです。"
```

記事の要点を短時間で確認できるようにするための機能です。要約欄は折りたたみ形式で表示され、読者が開いて内容を確認できます。

`summary` にはMarkdown形式のテキストも使用できます。表示するには `site.json` の `features.article_summary` が有効である必要があります。

### 次に読む記事

`next_article` では、記事の下に表示する「次に読む」記事を指定できます。

```json
"next_article": "getting-started"
```

指定できるのは、対象記事のJSONキーまたはパーマリンクです。`next_article` を省略した場合は、同じ言語の記事から自動的に選ばれます。

「次に読む」の下には、別のおすすめ記事も最大3件表示されます。

### 翻訳記事

`translation` は、別言語の記事との対応関係を設定する項目です。

```json
"translation": "welcome-en"
```

対象記事のキーまたはパーマリンクを指定します。対応する記事が見つかると、記事ページに言語切り替えリンクが表示され、検索エンジン向けの `hreflang` 情報も生成されます。

### サムネイル設定

| 項目 | 説明 |
|---|---|
| `thumbnail` | 記事のサムネイル画像 |
| `thumbnail_alt` | 画像の代替テキスト |
| `show_thumbnail` | 記事本文にサムネイルを表示するか |
| `pwa_icon` | 記事専用のPWAアイコン |

```json
"thumbnail": "pwa-guide.png",
"thumbnail_alt": "PWAの仕組みを説明する図",
"show_thumbnail": true
```

`show_thumbnail` を `false` にすると、記事ページ上部のサムネイル表示を無効にできます。

なお、記事のOGP画像は別途自動生成されます。`thumbnail` がそのままOGP画像になるわけではありません。

### 公開日と更新日

公開日は基本的に `articles.json` に記載します。

```json
"published": "2026-11-02"
```

更新日は、記事を更新したときだけMarkdownのフロントマターに書く方法を推奨します。

```md
---
updated: 2026-11-10
---

# 記事タイトル

ここから本文です。
```

`updated` はサイトマップの `lastmod` や記事の構造化データに使用されます。更新していない記事に無理に設定する必要はありません。

## 4. 記事Markdownの書き方

記事は `content/` フォルダに `.md` ファイルとして保存します。

```text
content/
├── welcome.md
├── getting-started.md
└── pwa-guide.md
```

### 基本的なMarkdown

```md
# 記事タイトル

ここに本文を書きます。

## 見出し

通常の文章です。

### 小見出し

- 項目1
- 項目2
- 項目3

**太字**や[リンク](https://example.com/)も使えます。
```

Markdownの最初のH1は、`articles.json` に `title` がない場合のタイトルとして使われます。最初のH1は記事本文から取り除かれ、ページのタイトルとして表示されます。

### フロントマター

フロントマターを使うことで`articles.json`を使わずに運用することもできます。記事mdの先頭に記載してください。
設定できるのは下記の5項目です。

```md
---
permalink: articles-template
excerpt: "excerptはタイトル下の内容です。"
published: 2026-11-01
updated: 2026-11-10
category: TEST
---

# タイトル
```

### 画像の挿入

画像は `public/images/` に保存します。例えば `public/images/sample.png` を配置した場合、Markdownでは次のように書きます。

```md
![サンプル画像](sample.png)
```

画像パスを `/images/sample.png` と指定することもできます。

### 画像のWebP自動変換

Blog Kitは、`public/images/` 内のJPEG・PNG画像をビルド時にWebP形式へ変換します。

Markdownの画像も、対応するWebP画像が生成されていれば自動的にそちらを参照します。元画像はそのまま残ります。

WebPに変換せず元画像を使いたい場合は、画像のタイトルに `blogkit:original` を指定します。

```md
![サンプル画像](sample.png "blogkit:original")
```

### コードブロック

コードは、言語名を付けたコードフェンスで記述します。

````md
```javascript
const message = "Hello Blog Kit";
console.log(message);
```
````

Shikiによるシンタックスハイライトが適用されます。コードブロックには言語名とコピーボタンが表示されます。

差分を表示したい場合は `diff` を指定します。

````md
```diff
- const mode = "old";
+ const mode = "new";
```
````

追加行と削除行が区別されます。

### 見出しと目次

記事にH2以降の見出しを書くと、目次が自動生成されます。

```md
## 基本設定

### ブログ名

## 記事の作成
```

目次の項目から各見出しへ移動できます。目次を手作業で作る必要はありません。

### 広告の挿入

`site.json` で広告を設定している場合は、Markdownの独立した行にマーカーを記述します。

```md
## 広告の前

本文です。

[[ad]]

## 広告の後

続きの本文です。
```

`[[ad2]]` から `[[ad6]]` も使用できます。

## 5. pages.json｜固定ページの設定

固定ページは、ブログ記事とは別に管理するページです。プロフィール、プライバシーポリシー、お問い合わせ案内などに利用できます。

記事一覧には表示されず、公開日や「次に読む」などの記事用機能も付きません。

### 設定例

```json
{
  "about": {
    "title": "このブログについて",
    "description": "ブログの運営者と運営方針について紹介します。",
    "permalink": "about",
    "language": "ja",
    "footer_label": "このブログについて",
    "show_in_footer": true
  },
  "privacy": {
    "title": "プライバシーポリシー",
    "description": "個人情報の取り扱いについて説明します。",
    "permalink": "privacy",
    "language": "ja",
    "footer_label": "プライバシーポリシー",
    "show_in_footer": true
  }
}
```

### 設定項目

| 項目 | 説明 |
|---|---|
| `title` | 固定ページのタイトル。Markdownの最初のH1より優先 |
| `description` | SEO用の説明文。タイトル下にも表示 |
| `permalink` | 公開URLのパス |
| `language` | 固定ページの言語 |
| `footer_label` | フッターに表示するリンク名 |
| `show_in_footer` | フッターにリンクを表示するか |

`show_in_footer` は、`false` を指定した場合のみ非表示になります。省略した場合はフッターに表示されます。

固定ページの `description` は記事の `meta_description` と異なり、ページタイトル下にも表示されます。

## 6. 固定ページMarkdownの作成

固定ページは `pages/` に配置します。

```text
pages/
├── about.md
├── privacy.md
└── contact.md
```

例えば `pages/about.md` なら、`pages.json` の `"about"` に設定を記載します。

```md
# このブログについて

このブログでは、Web技術について発信しています。

## 運営者

個人開発者として活動しています。
```

`permalink` に `"about"` を指定すると、`https://example.com/about/` で公開されます。

固定ページも通常のMarkdownで記述でき、画像やコードブロックも使用できます。

なお、記事と固定ページで同じパーマリンクを指定すると、ビルド時にエラーになります。公開URLが重複しないようにしてください。

## 7. その他のファイルとカスタマイズ

### CSS

デザインに関するファイルは `public/css/` にあります。

- `style.css`：サイト全体のデザイン
- `highlight.css`：コードブロックのデザイン

### JavaScript

ブラウザー側で使用するJavaScriptは `public/js/` にあります。記事共有などの機能に使用されます。

### HTMLテンプレート

`templates/` には、記事一覧や固定ページのHTMLテンプレートがあります。

| ファイル | 用途 |
|---|---|
| `custom-head.html` | 各ページの `<head>` 内にHTMLを追加 |
| `custom-body-end.html` | 各ページの `</body>` 直前にHTMLを追加 |

解析タグや独自スクリプトなどを挿入したい場合に使用できます。通常の記事作成では編集する必要はありません。

## 8. ビルドと公開

Blog Kitは、MarkdownとJSONから公開用の静的HTMLを生成します。

基本的な流れは次のとおりです。

1. `site.json` でブログ全体を設定する
2. `content/` に記事Markdownを追加する
3. `articles.json` に記事情報を登録する
4. 必要に応じて固定ページを追加する
5. ビルドして公開する

### ローカルでビルドする場合

Node.jsを使用できる環境では、プロジェクトのルートで次のコマンドを実行します。

```bash
npm install
npm run build
```

ビルドが成功すると、`dist/` に公開用ファイルが生成されます。このフォルダを静的サイトホスティングへ配置すれば公開できます。

GitHubとCloudflare Pagesなどを連携している場合は、設定したビルド・デプロイ処理によって更新できます。

### 公開時に自動生成されるもの

- 記事ページと固定ページ
- 記事一覧とページ送り（1ページ15件）
- 検索用インデックス
- 記事ごとのOGP画像
- RSSフィード
- XMLサイトマップ
- robots.txt
- 記事の構造化データ
- 対応画像のWebP版
- 設定に応じた記事専用PWAアイコン

これらを記事ごとに手作業で作る必要はありません。

### 導入方法と運用方法

初めてBlog Kitを使う場合は、次のページを確認してください。

**[導入ガイド](https://blogkit.ojapp.app/download/)**

Blog Kitのダウンロードと導入手順を案内しています。

**[運用方法ガイド](https://blogkit.ojapp.app/guide/)**

スマートフォン、PC、ローカル環境など、自分に合った記事の作成・公開方法を確認できます。

## まとめ

OJapp Blog Kitで普段行う作業は、基本的に3つです。

**記事を書く、JSONで設定する、公開する。**

記事本文はMarkdown、設定情報はJSONで管理するため、記事が増えてもファイルの役割が明確です。

ブログのデザインや機能を変更したいときは、必要なファイルを直接編集できます。

記事や設定は自分のファイルとして手元に残り、公開先も自分で選べます。

**Write freely. Own what you build.**
