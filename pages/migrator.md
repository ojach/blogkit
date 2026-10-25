<div id="ojm" class="ojm">
  <div class="ojm-hero">
    <span class="ojm-eyebrow">OJapp Blog Kit · Free Tool</span>
    <h2>WordPressから、<br>Blog Kitへ。</h2>
    <p>記事も固定ページも、あなたのサイトへ。WordPressのエクスポートファイルから、Blog Kit用のデータを生成します。</p>
    <div class="ojm-tags"><span>ブラウザ内で変換</span><span>アップロード不要</span><span>Markdown / HTML</span></div>
  </div>
  <div class="ojm-panel">
    <div class="ojm-heading"><span class="ojm-step">01</span><div><h3>移行するファイル</h3><p>WordPress管理画面 → ツール → エクスポート →「すべてのコンテンツ」</p></div></div>
    <label class="ojm-file" for="ojm-xml"><span class="ojm-file-icon">↥</span><strong id="ojm-xml-name">WordPress XMLを選択</strong><small>XMLファイル（必須）</small><input type="file" id="ojm-xml" accept=".xml,text/xml,application/xml"></label>
    <label class="ojm-file ojm-file-secondary" for="ojm-trans"><span class="ojm-file-icon">＋</span><strong id="ojm-trans-name">Polylang翻訳JSONを追加</strong><small>日英記事の対応表（任意）</small><input type="file" id="ojm-trans" accept=".json,application/json"></label>
    <div class="ojm-heading"><span class="ojm-step">02</span><div><h3>変換設定</h3><p>あとから変更できるよう、元データは上書きしません。</p></div></div>
    <div class="ojm-choice"><label><input type="radio" name="ojm-format" value="markdown" checked><span><strong>Markdownに変換</strong><small>一般的なHTMLをMarkdownへ。特殊なHTMLはできるだけ保持</small></span></label><label><input type="radio" name="ojm-format" value="preserve"><span><strong>HTMLを保持</strong><small>元の本文をできるだけそのまま残す</small></span></label></div>
    <label class="ojm-check"><input type="checkbox" id="ojm-images"><span><strong>WordPress画像URLを変換</strong><small>例：/wp-content/uploads/2026/09/photo-312x500.png → photo.png（Markdown）。画像ファイル自体は移行しません。</small></span></label>
    <details class="ojm-details"><summary>詳細オプション</summary><label class="ojm-check"><input type="checkbox" id="ojm-drafts"><span>下書きも含める</span></label><label class="ojm-check"><input type="checkbox" id="ojm-pages" checked><span>固定ページも含める</span></label></details>
    <button type="button" class="ojm-submit" id="ojm-run">変換してZIPをダウンロード <span>↗</span></button>
    <div id="ojm-status" class="ojm-status" role="status" aria-live="polite"></div>
  </div>
  <div id="ojm-result" class="ojm-result" hidden><h3>変換結果</h3><div id="ojm-stats" class="ojm-stats"></div><p id="ojm-warnings"></p></div>
  <section class="ojm-info"><h3>変換後の使い方</h3><ol><li>ZIPを展開して <code>content/</code>、<code>pages/</code>、<code>articles.json</code>、<code>pages.json</code> をBlog Kitへ配置します。</li><li>画像URLを変換した場合は、画像ファイルを <code>public/images/</code> に別途配置してください。</li><li><code>migration-report.json</code> で変換時の注意点を確認します。</li><li><code>npm run build</code> でビルドし、記事・画像・内部リンクを確認してください。</li></ol><p>WordPress独自のショートコードやテーマ固有の装飾は、手動調整が必要な場合があります。画像・内部リンクはVS Codeの検索と置換でも一括修正できます。</p><p class="ojm-note">ファイルはブラウザ内だけで処理されます。このツールからサーバーへ送信しません。大きなXMLでは処理に時間がかかる場合があります。</p></section>
</div>
<script src="/js/blogkit-migrator.js" defer></script>
<script src="/js/blogkit-migrator-ui.js" defer></script>
