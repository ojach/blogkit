<div class="bkguide">
  <section class="bkguide-hero"><div class="bkguide-wrap">
    <p class="bkguide-eyebrow">OJAPP BLOG KIT · GETTING STARTED</p>
    <h1>あなたに合った方法で、<br><em>ブログを育てよう。</em></h1>
    <p class="bkguide-lead">スマホでも、PCでも。GitHubでも、ローカルでも。<br>Blog Kitは、書く場所と公開方法を自分で選べます。</p>
    <div class="bkguide-actions"><a class="bkguide-btn bkguide-primary" href="#choose">自分に合う方法を選ぶ ↓</a><a class="bkguide-btn bkguide-outline" href="/download/">Blog Kitを入手 ↗</a></div>
  </div></section>

  <section class="bkguide-section" id="choose"><div class="bkguide-wrap">
    <p class="bkguide-kicker">CHOOSE YOUR STYLE</p><h2>どんな方法で書きたい？</h2>
    <p class="bkguide-intro">どれが正解ということはありません。自分が続けやすい方法を選んでください。</p>
    <div class="bkguide-cards">
      <article class="bkguide-card"><div class="bkguide-emoji">📱</div><span class="bkguide-tag">SMARTPHONE</span><h3>スマホで気軽に更新</h3><p>GitHubのWeb画面で記事ファイルを編集。変更を保存すると、設定済みの自動公開が動きます。</p><a href="#phone">スマホでの更新方法 →</a></article>
      <article class="bkguide-card"><div class="bkguide-emoji">💻</div><span class="bkguide-tag">PC / VS CODE</span><h3>PCでしっかり編集</h3><p>VS Codeなら記事もCSSもまとめて編集。一括検索・置換やローカル確認も便利です。</p><a href="#pc">PCでの更新方法 →</a></article>
      <article class="bkguide-card"><div class="bkguide-emoji">📁</div><span class="bkguide-tag">NO GIT REQUIRED</span><h3>GitHubなしで公開</h3><p>PCで記事を書き、ビルドしてできた <code>dist/</code> をCloudflare Pagesへアップロード。</p><a href="#local">ローカル公開の方法 →</a></article>
    </div>
    <div class="bkguide-note"><strong>編集方法と公開先は別々に選べます。</strong> 例えば「PCのVS Codeで書く → GitHubに反映 → Cloudflare Pagesで自動公開」も、「スマホのGitHubで書く → GitHub Pagesで公開」も可能です。後者はGitHub Actionsなどの公開設定が必要です。</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="setup"><div class="bkguide-wrap">
    <p class="bkguide-kicker">FIRST SETUP</p><h2>まずはブログを準備しよう。</h2>
    <p class="bkguide-intro">ZIPを使う場合の基本手順です。GitHubテンプレートから始める場合も、設定ファイルの考え方は同じです。</p>
    <div class="bkguide-steps">
      <div class="bkguide-step"><span>01</span><div><h3>Blog Kitを用意する</h3><p><a href="/download/">ダウンロードページ</a>からZIPを入手して展開するか、<a href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">GitHubテンプレート ↗</a>から自分のリポジトリを作ります。ローカルでビルドする場合は<a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js（LTS版）↗</a>が必要です。</p></div></div>
      <div class="bkguide-step"><span>02</span><div><h3><code>site.json</code> を編集する</h3><p>ブログ名、公開URL、言語などを設定。特に <code>url</code> は公開先のURLと合わせてください。サブディレクトリで公開する場合は末尾の <code>/</code> も含めて正しく指定します。</p><div class="bkguide-code"><div class="bkguide-code-label">site.json（主要項目の例）</div><pre><code>{
  "title": "My Blog",
  "url": "https://example.com/",
  "lang": "ja"
}</code></pre></div><p class="bkguide-fine">※ 既存のsite.json全体を置き換えるのではなく、必要な項目を編集してください。</p></div></div>
      <div class="bkguide-step"><span>03</span><div><h3>記事を書いてビルドする</h3><p>記事本文は <code>content/</code> のMarkdownファイル、記事情報は <code>articles.json</code> で管理します。PCでビルドする場合はBlog Kitのルートで次を実行します。</p><div class="bkguide-code"><div class="bkguide-code-label">Terminal</div><pre><code>npm install
npm run build</code></pre></div><p>公開用ファイルは <code>dist/</code> に生成されます。</p></div></div>
    </div>
  </div></section>

  <section class="bkguide-section" id="phone"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 01 · SMARTPHONE</p><h2>スマホなら、GitHubで編集。</h2>
    <p class="bkguide-intro">すでにGitHubリポジトリと自動公開の設定があるなら、スマホだけでも記事を更新できます。</p>
    <ol class="bkguide-list"><li>GitHubで自分のBlog Kitリポジトリを開く。</li><li><code>content/</code> 内の記事を開き、編集機能でMarkdownを修正する。新規記事ならファイルを追加する。</li><li>必要に応じて <code>articles.json</code> の記事情報も更新する。</li><li>変更をコミットする。設定済みのGitHub ActionsやCloudflare Pagesのビルドが実行される。</li><li>公開先で表示を確認する。</li></ol>
    <div class="bkguide-note"><strong>ポイント：</strong> GitHubでファイルを編集しただけでは、自動公開は始まりません。先にGitHub ActionsまたはCloudflare PagesのGit連携を設定してください。変更履歴が残るので、以前の状態を確認しやすいのも利点です。</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="pc"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 02 · PC / VS CODE</p><h2>PCなら、VS Codeでまとめて編集。</h2>
    <p class="bkguide-intro">記事だけでなく、CSSや固定ページも触りたい人におすすめ。ファイル検索・一括置換も便利です。</p>
    <ol class="bkguide-list"><li>Blog KitのフォルダをVS Codeで開く。GitHub運用ならリポジトリをクローンしておく。</li><li><code>content/</code> や <code>pages/</code> のファイルを編集し、必要なJSON設定を更新する。</li><li><code>npm run build</code> で生成結果を確認する。</li><li>GitHub連携なら変更をコミットしてpushする。VS Codeのソース管理画面やターミナルから操作できる。</li><li>公開先で表示を確認する。</li></ol>
    <div class="bkguide-code"><div class="bkguide-code-label">Terminal（Gitを使う場合の例）</div><pre><code>git add .
git commit -m "Update articles"
git push</code></pre></div>
    <p class="bkguide-fine">※ リポジトリを接続していない場合は、このGit操作は不要です。ビルドして手動アップロードする方法もあります。</p>
  </div></section>

  <section class="bkguide-section" id="local"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 03 · LOCAL UPLOAD</p><h2>GitHubを使わず、ファイルを公開。</h2>
    <p class="bkguide-intro">まずBlog Kitを試したい人や、ローカルのファイルだけで管理したい人向け。</p>
    <ol class="bkguide-list"><li>PCにNode.jsをインストールし、Blog KitのZIPを展開する。</li><li><code>site.json</code> と記事ファイルを編集する。</li><li><code>npm install</code>（初回）と <code>npm run build</code> を実行する。</li><li>Cloudflare PagesでDirect Upload方式のプロジェクトを作成し、生成された <code>dist/</code> をアップロードする。</li><li>記事を更新したら再ビルドし、新しい <code>dist/</code> を再アップロードする。</li></ol>
    <div class="bkguide-note"><strong>注意：</strong> Cloudflare Pagesでは、Direct Uploadで作成したプロジェクトをそのままGit連携方式へ切り替えられない場合があります。長期的に自動公開したいなら、最初からGit連携方式を選ぶのがおすすめです。</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="publish"><div class="bkguide-wrap">
    <p class="bkguide-kicker">PUBLISHING</p><h2>公開方法も、目的に合わせて。</h2>
    <div class="bkguide-compare">
      <article><h3>Cloudflare Pages · Direct Upload</h3><p>自分のPCで <code>npm run build</code> → <code>dist/</code> をアップロード。GitHubは不要です。</p><span>手動で公開したい人向け</span></article>
      <article><h3>Cloudflare Pages · Git連携</h3><p>GitHubリポジトリを接続し、ビルドコマンド <code>npm run build</code>、出力先 <code>dist</code> を設定。pushで自動ビルド・公開します。</p><span>PC・スマホ両方から更新したい人向け</span></article>
      <article><h3>GitHub Pages · Actions</h3><p>GitHub ActionsでBlog KitをビルドしてPagesへデプロイ。テンプレートにワークフローがある場合は、その設定を確認してください。</p><span>GitHub上で完結させたい人向け</span></article>
    </div>
    <p class="bkguide-fine">※ CloudflareやGitHubの管理画面・メニュー名は変更される場合があります。公開先のURLを変更したら <code>site.json</code> の <code>url</code> も見直してください。</p>
  </div></section>

  <section class="bkguide-section" id="tips"><div class="bkguide-wrap">
    <p class="bkguide-kicker">GOOD TO KNOW</p><h2>Blog Kitで管理するもの。</h2>
    <div class="bkguide-mini-grid"><div><code>content/*.md</code><p>記事本文。Markdownに加えてHTMLも利用できます。</p></div><div><code>articles.json</code><p>記事タイトル、公開日、URL、言語など。</p></div><div><code>pages/*.md</code><p>AboutやLPなどの固定ページ。</p></div><div><code>pages.json</code><p>固定ページのタイトルや公開URLなど。</p></div><div><code>site.json</code><p>ブログ全体の設定。</p></div><div><code>dist/</code><p>ビルド後に生成される公開用ファイル。</p></div></div>
  </div></section>

  <section class="bkguide-bottom"><div class="bkguide-wrap"><p class="bkguide-kicker">YOUR BLOG, YOUR WAY</p><h2>書きやすい方法で、<br>続けていこう。</h2><p>使う端末も、編集ツールも、公開先も。自分に合った方法を選べばいい。</p><div class="bkguide-actions"><a class="bkguide-btn bkguide-primary" href="/download/">Blog Kitをダウンロード ↗</a><a class="bkguide-btn bkguide-outline" href="/blogkit/">Blog Kitについて ↗</a></div></div></section>
</div>
