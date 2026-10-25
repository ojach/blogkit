<div class="bkdl">
  <section class="bkdl-hero">
    <div class="bkdl-inner">
      <p class="bkdl-eyebrow"><span class="bkdl-dot"></span> OJAPP BLOG KIT · DOWNLOAD</p>
      <h1>自分のブログを、<br><em>ここから始めよう。</em></h1>
      <p class="bkdl-lead">Blog Kitをダウンロードして、Markdownで記事を書く。<br>ビルドしたファイルを公開するだけで、自分のブログが完成します。</p>
      <div class="bkdl-actions">
        <a class="bkdl-btn bkdl-btn-primary"" href="https://ojapp.app/files/ojapp-blogkit.zip" aria-disabled="true">ZIPをダウンロード</a>
        <a class="bkdl-btn bkdl-btn-outline" href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">GitHubテンプレート ↗</a>
      </div>
      <p class="bkdl-hero-note">必要なもの：Node.js / テキストエディター / 公開先（Cloudflare Pagesなど）</p>
    </div>
  </section>

  <section class="bkdl-section">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">QUICK START</p>
      <h2>公開まで、4ステップ。</h2>
      <p class="bkdl-intro">コマンドを使うのは最初の準備とビルドだけ。記事は普通のMarkdownファイルで管理できます。</p>
      <div class="bkdl-steps">
        <article class="bkdl-step"><span class="bkdl-step-number">01</span><div><h3>Node.jsを準備してZIPを展開</h3><p><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js公式サイト ↗</a>からLTS版をインストール。Blog KitのZIPを解凍し、展開したフォルダをVS Codeなどで開きます。</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">02</span><div><h3><code>site.json</code> を設定</h3><p>ブログのタイトル、公開URL、言語などを自分のサイトに合わせて変更します。公開URLは実際の配置先に合わせて設定してください。</p><div class="bkdl-code"><div class="bkdl-code-head"><span>site.json（設定例）</span><button type="button" class="bkdl-copy" data-copy-target="bkdl-config">コピー</button></div><pre id="bkdl-config"><code>{
  "title": "My Blog",
  "url": "https://example.com/",
  "lang": "ja"
}</code></pre></div><p class="bkdl-small">※ 上記は主要項目の例です。既存のsite.jsonを丸ごと置き換えず、必要な値を編集してください。</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">03</span><div><h3>インストールしてビルド</h3><p>展開したBlog Kitのルートフォルダで、ターミナルを開いて実行します。</p><div class="bkdl-code"><div class="bkdl-code-head"><span>Terminal</span><button type="button" class="bkdl-copy" data-copy-target="bkdl-commands">コピー</button></div><pre id="bkdl-commands"><code>npm install
npm run build</code></pre></div><p>完了すると、公開用の静的ファイルが <code>dist/</code> に生成されます。</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">04</span><div><h3>Cloudflare Pagesで公開</h3><p><a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflareダッシュボード ↗</a>からWorkers &amp; PagesのPagesプロジェクトを作成し、ドラッグ＆ドロップ方式で <code>dist/</code> フォルダをアップロード。発行されたURLで表示を確認します。</p><p class="bkdl-small">独自ドメインは公開後に追加できます。Cloudflareの画面表記や操作手順は変更される場合があります。</p></div></article>
      </div>
    </div>
  </section>

  <section class="bkdl-section bkdl-section-soft">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">WRITE &amp; REBUILD</p>
      <h2>公開後も、やることはシンプル。</h2>
      <div class="bkdl-grid">
        <article class="bkdl-tile"><span class="bkdl-tile-icon">✍</span><h3>記事を書く</h3><p><code>content/</code> にMarkdownファイルを追加。記事のタイトルや公開日などは <code>articles.json</code> で設定できます。</p></article>
        <article class="bkdl-tile"><span class="bkdl-tile-icon">↻</span><h3>再ビルドする</h3><p>記事を更新したら <code>npm run build</code>。記事一覧やRSS、サイトマップなども再生成します。</p></article>
        <article class="bkdl-tile"><span class="bkdl-tile-icon">↗</span><h3>もう一度公開</h3><p>更新された <code>dist/</code> を再アップロード。GitHub連携による自動公開へ切り替えることもできます。</p></article>
      </div>
    </div>
  </section>

  <section class="bkdl-section">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">CHOOSE YOUR WORKFLOW</p>
      <h2>ZIPでも、GitHubでも。</h2>
      <div class="bkdl-choices">
        <div class="bkdl-choice"><p class="bkdl-choice-tag">LOCAL FIRST</p><h3>ZIPから始める</h3><p>まずは自分のPCで作って、完成した <code>dist/</code> をアップロード。構成を確認しながら進めたい人向け。</p><span class="bkdl-choice-muted">ZIP公開後にダウンロード可能</span></div>
        <div class="bkdl-choice"><p class="bkdl-choice-tag">GITHUB WORKFLOW</p><h3>テンプレートから始める</h3><p>GitHubに自分のリポジトリを作成。GitHub ActionsやCloudflare Pagesとの連携で公開を自動化できます。</p><a href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">GitHubテンプレートを見る ↗</a></div>
      </div>
    </div>
  </section>

  <section class="bkdl-footer-cta"><div class="bkdl-inner"><p class="bkdl-kicker">YOUR BLOG, YOUR DOMAIN</p><h2>書いたものを、自分の場所に。</h2><p>WordPressから移行したい場合は、Blog Kit Migratorも利用できます。</p><div class="bkdl-actions"><a class="bkdl-btn bkdl-btn-primary" href="/migrator/">Migratorを見る ↗</a><a class="bkdl-btn bkdl-btn-outline" href="/blogkit/">Blog Kitについて ↗</a></div></div></section>
</div>
<script>
(function () {
  document.querySelectorAll('.bkdl-copy').forEach(function (button) {
    button.addEventListener('click', async function () {
      var target = document.getElementById(button.getAttribute('data-copy-target'));
      if (!target) return;
      var value = target.textContent;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'コピーしました ✓';
        setTimeout(function () { button.textContent = 'コピー'; }, 1800);
      } catch (error) {
        button.textContent = 'コピーできませんでした';
        setTimeout(function () { button.textContent = 'コピー'; }, 1800);
      }
    });
  });
})();
</script>
