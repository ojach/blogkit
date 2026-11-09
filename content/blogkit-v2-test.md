---
permalink: blogkit-v2-frontmatter-test
excerpt: "Blog Kit v2のFrontmatterとarticles.jsonの役割分担を確認するテスト記事です。"
published: 2026-11-09
updated: 2026-11-09
category: Blog Kit
---

# Blog Kit v2の動作確認テスト

この記事は、Blog Kit v2でFrontmatterの設定が正しく反映されるかを確認するためのサンプルです。

## Frontmatterの確認

記事のURL、説明文、公開日、更新日、カテゴリーをMarkdownの先頭に記述しています。

## Markdown表示の確認

通常の**太字**、[OJapp公式サイト](https://ojapp.app/)、箇条書きを確認します。

- Markdownの見出し
- リンクと太字
- リスト表示

## コードブロックの確認

```javascript
const blogKit = { version: 2, mode: 'static' };
console.log(blogKit.version);
```

## 最後に

この記事のタイトルは最初のH1から取得される想定です。英語記事との連携はJSONで指定せず、ファイル名から自動判定される想定です。
