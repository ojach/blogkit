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

`site.json` は公開URL・サイト名・説明・著者名を設定するファイルです。自分のブログに使う場合は、公開URLなどを変更します。記事は `content/` にMarkdownで追加します。

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
    "permalink": "my-new-article",
    "published": "2026-10-09",
    "category": "任意の表示ラベル"
  }
}
```

指定できる項目はすべて任意です。明示した値をビルドが優先します。v1ではカテゴリー別一覧やタグ分類は行いません。

## 含まれる機能

- Markdown記事を静的HTMLへ変換（見出しID、目次、表、画像、コードハイライト）
- 新着順の記事一覧とページ内検索（タイトル・説明文）
- 記事ごとのcanonical、meta description、OGP、Twitter Card、BlogPosting JSON-LD
- `sitemap.xml`、`rss.xml`、`robots.txt`
- PC・スマートフォン向けの読みやすいレイアウト

## 関連記事の設計メモ

v1では関連記事を自動表示しません。将来実装する場合は、紹介文を `excerpt` → `meta_description` → 本文冒頭の順に選び、記事への内部リンクを保ちます。候補から自分自身と明示された「次に読む記事」を除外します。記事同士の主題を明確に保つための設計で、検索順位を保証するものではありません。

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

## 注意

記事Markdownは信頼できる編集者が書く前提です。Markdown内のraw HTMLは変換時にそのまま出力されます。外部投稿を受け付ける用途には使わないでください。
