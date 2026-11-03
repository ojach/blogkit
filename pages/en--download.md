<div class="bkdl">
  <section class="bkdl-hero">
    <div class="bkdl-inner">
      <p class="bkdl-eyebrow"><span class="bkdl-dot"></span> OJAPP BLOG KIT · DOWNLOAD</p>
      <h1>Your own blog,<br><em>starts here.</em></h1>
      <p class="bkdl-lead">Download Blog Kit and write articles in Markdown.<br>Publish the generated files and your own blog is ready.</p>
      <div class="bkdl-actions">
        <a class="bkdl-btn bkdl-btn-primary"" href="https://ojapp.app/files/ojapp-blogkit.zip" aria-disabled="true">Download ZIP</a>
        <a class="bkdl-btn bkdl-btn-outline" href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">GitHub template ↗</a>
      </div>
      <p class="bkdl-hero-note">Requirements: Node.js / text editor / hosting (such as Cloudflare Pages)</p>
    </div>
  </section>

  <section class="bkdl-section">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">QUICK START</p>
      <h2>Four steps to publishing.</h2>
      <p class="bkdl-intro">You only need commands for initial setup and building. Articles are managed as ordinary Markdown files.</p>
      <div class="bkdl-steps">
        <article class="bkdl-step"><span class="bkdl-step-number">01</span><div><h3>Install Node.js and extract the ZIP</h3><p><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Official Node.js website ↗</a>to install the LTS release. Unzip Blog Kit and open the extracted folder in VS Code or another editor.</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">02</span><div><h3><code>site.json</code> Configure</h3><p>Set your blog title, public URL, language, and other settings. Make sure the URL matches where your site will be hosted.</p><div class="bkdl-code"><div class="bkdl-code-head"><span>site.json (example)</span><button type="button" class="bkdl-copy" data-copy-target="bkdl-config">Copy</button></div><pre id="bkdl-config"><code>{
  "title": "My Blog",
  "url": "https://example.com/",
  "lang": "ja"
}</code></pre></div><p class="bkdl-small">Note: This example shows only key settings. Edit the relevant values instead of replacing your entire site.json.</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">03</span><div><h3>Install and build</h3><p>Open a terminal in the extracted Blog Kit root folder and run:</p><div class="bkdl-code"><div class="bkdl-code-head"><span>Terminal</span><button type="button" class="bkdl-copy" data-copy-target="bkdl-commands">Copy</button></div><pre id="bkdl-commands"><code>npm install
npm run build</code></pre></div><p>Once complete, the static files ready to publish will be generated in <code>dist/</code> .</p></div></article>
        <article class="bkdl-step"><span class="bkdl-step-number">04</span><div><h3>Publish with Cloudflare Pages</h3><p><a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare dashboard ↗</a>to create a Pages project under Workers &amp; Pages, then upload the <code>dist/</code> folder using drag and drop. Check the site at the generated URL.</p><p class="bkdl-small">You can add a custom domain after publishing. Cloudflare interface labels and steps may change.</p></div></article>
      </div>
    </div>
  </section>

  <section class="bkdl-section bkdl-section-soft">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">WRITE &amp; REBUILD</p>
      <h2>After publishing, the workflow stays simple.</h2>
      <div class="bkdl-grid">
        <article class="bkdl-tile"><span class="bkdl-tile-icon">✍</span><h3>Write articles</h3><p><code>content/</code> Add Markdown files to <code>articles.json</code> and configure titles, publication dates, and other metadata in</p></article>
        <article class="bkdl-tile"><span class="bkdl-tile-icon">↻</span><h3>.</h3><p>Rebuild <code>npm run build</code>After updating an article, run</p></article>
        <article class="bkdl-tile"><span class="bkdl-tile-icon">↗</span><h3> . The article index, RSS, sitemap, and other files will be regenerated.</h3><p>Publish again <code>dist/</code> Upload the updated</p></article>
      </div>
    </div>
  </section>

  <section class="bkdl-section">
    <div class="bkdl-inner">
      <p class="bkdl-kicker">CHOOSE YOUR WORKFLOW</p>
      <h2>folder again. You can also switch to automated publishing through GitHub integration.</h2>
      <div class="bkdl-choices">
        <div class="bkdl-choice"><p class="bkdl-choice-tag">LOCAL FIRST</p><h3>ZIP or GitHub.</h3><p>Start with a ZIP <code>dist/</code> Build locally on your PC, then upload the finished</p><span class="bkdl-choice-muted">folder. Good if you want to inspect the file structure as you go.</span></div>
        <div class="bkdl-choice"><p class="bkdl-choice-tag">GITHUB WORKFLOW</p><h3>Available for download when the ZIP is published</h3><p>Start from the template</p><a href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">Create your own repository on GitHub. Automate publishing with GitHub Actions or Cloudflare Pages integration.</a></div>
      </div>
    </div>
  </section>

  <section class="bkdl-footer-cta"><div class="bkdl-inner"><p class="bkdl-kicker">YOUR BLOG, YOUR DOMAIN</p><h2>View GitHub template ↗</h2><p>Your writing, on your own domain.</p><div class="bkdl-actions"><a class="bkdl-btn bkdl-btn-primary" href="/migrator/">To migrate from WordPress, you can also use Blog Kit Migrator.</a><a class="bkdl-btn bkdl-btn-outline" href="/blogkit/">View Migrator ↗</a></div></div></section>
</div>
<script>
About Blog Kit ↗
</script>
