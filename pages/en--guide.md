<div class="bkguide">
  <section class="bkguide-hero"><div class="bkguide-wrap">
    <p class="bkguide-eyebrow">OJAPP BLOG KIT · GETTING STARTED</p>
    <h1>Choose the way that suits you,<br><em>and grow your blog.</em></h1>
    <p class="bkguide-lead">On mobile or desktop. With GitHub or locally.<br>Blog Kit lets you choose where to write and how to publish.</p>
    <div class="bkguide-actions"><a class="bkguide-btn bkguide-primary" href="#choose">Choose your workflow ↓</a><a class="bkguide-btn bkguide-outline" href="/download/">Get Blog Kit ↗</a></div>
  </div></section>

  <section class="bkguide-section" id="choose"><div class="bkguide-wrap">
    <p class="bkguide-kicker">CHOOSE YOUR STYLE</p><h2>How would you like to write?</h2>
    <p class="bkguide-intro">There is no single right answer. Choose the workflow you can keep using.</p>
    <div class="bkguide-cards">
      <article class="bkguide-card"><div class="bkguide-emoji">📱</div><span class="bkguide-tag">SMARTPHONE</span><h3>Update easily from your phone</h3><p>Edit article files in GitHub’s web interface. Saving changes triggers publishing if automation is already configured.</p><a href="#phone">How to update from your phone →</a></article>
      <article class="bkguide-card"><div class="bkguide-emoji">💻</div><span class="bkguide-tag">PC / VS CODE</span><h3>Edit comfortably on a PC</h3><p>With VS Code, edit articles and CSS together. Search and replace across files, and preview builds locally.</p><a href="#pc">How to update from a PC →</a></article>
      <article class="bkguide-card"><div class="bkguide-emoji">📁</div><span class="bkguide-tag">NO GIT REQUIRED</span><h3>Publish without GitHub</h3><p>Write articles on your PC, build them, and upload the resulting <code>dist/</code> folder to Cloudflare Pages.</p><a href="#local">How to publish locally →</a></article>
    </div>
    <div class="bkguide-note"><strong>You can choose your editor and hosting separately.</strong> For example: write in VS Code → push to GitHub → automatically publish on Cloudflare Pages. Or edit on GitHub from your phone → publish on GitHub Pages. The latter requires GitHub Actions or equivalent deployment configuration.</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="setup"><div class="bkguide-wrap">
    <p class="bkguide-kicker">FIRST SETUP</p><h2>Set up your blog first.</h2>
    <p class="bkguide-intro">These are the basic steps when using the ZIP. The configuration files work the same way if you start from the GitHub template.</p>
    <div class="bkguide-steps">
      <div class="bkguide-step"><span>01</span><div><h3>Get Blog Kit</h3><p><a href="/download/">download page</a>to download and extract the ZIP, or use the<a href="https://github.com/ojach/blogkit-template" target="_blank" rel="noopener noreferrer">GitHub template ↗</a>to create your own repository. For local builds, you need<a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js (LTS) ↗</a>.</p></div></div>
      <div class="bkguide-step"><span>02</span><div><h3><code>site.json</code> Edit</h3><p>Set the blog name, public URL, language, and other settings. Make sure <code>url</code> matches the URL where you publish. If publishing in a subdirectory, include the trailing <code>/</code> path as appropriate.</p><div class="bkguide-code"><div class="bkguide-code-label">site.json (key settings example)</div><pre><code>{
  "title": "My Blog",
  "url": "https://example.com/",
  "lang": "ja"
}</code></pre></div><p class="bkguide-fine">Note: Edit the relevant values; do not replace your entire existing site.json with this example.</p></div></div>
      <div class="bkguide-step"><span>03</span><div><h3>Write articles and build</h3><p>Article bodies are Markdown files in <code>content/</code> and article metadata lives in <code>articles.json</code> . To build on a PC, run the following from the Blog Kit root.</p><div class="bkguide-code"><div class="bkguide-code-label">Terminal</div><pre><code>npm install
npm run build</code></pre></div><p>Published files are generated in <code>dist/</code> .</p></div></div>
    </div>
  </div></section>

  <section class="bkguide-section" id="phone"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 01 · SMARTPHONE</p><h2>On mobile, edit with GitHub.</h2>
    <p class="bkguide-intro">If your GitHub repository and automatic deployment are already configured, you can update articles using only your phone.</p>
    <ol class="bkguide-list"><li>Open your Blog Kit repository on GitHub.</li><li><code>content/</code> Open an article in content/ and edit its Markdown, or add a new file for a new article.</li><li>Update the metadata in <code>articles.json</code> if needed.</li><li>Commit your changes. Your configured GitHub Actions or Cloudflare Pages build will run.</li><li>Check the published site.</li></ol>
    <div class="bkguide-note"><strong>Important:</strong> Editing files on GitHub alone does not enable automatic publishing. Set up GitHub Actions or Cloudflare Pages Git integration first. GitHub also keeps a change history, making it easy to review earlier versions.</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="pc"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 02 · PC / VS CODE</p><h2>On PC, edit everything in VS Code.</h2>
    <p class="bkguide-intro">Recommended if you want to edit CSS and static pages as well as articles. File search and bulk replacement are handy.</p>
    <ol class="bkguide-list"><li>Open the Blog Kit folder in VS Code. If using GitHub, clone your repository first.</li><li><code>content/</code> and <code>pages/</code> files, then update the relevant JSON settings.</li><li><code>npm run build</code> Check the generated output with a local build.</li><li>If using GitHub integration, commit and push your changes using VS Code Source Control or the terminal.</li><li>Check the published site.</li></ol>
    <div class="bkguide-code"><div class="bkguide-code-label">Terminal (Git example)</div><pre><code>git add .
git commit -m "Update articles"
git push</code></pre></div>
    <p class="bkguide-fine">Note: These Git commands are unnecessary if you are not using a repository. You can also build and upload manually.</p>
  </div></section>

  <section class="bkguide-section" id="local"><div class="bkguide-wrap bkguide-narrow">
    <p class="bkguide-kicker">WORKFLOW 03 · LOCAL UPLOAD</p><h2>Publish files without GitHub.</h2>
    <p class="bkguide-intro">For anyone trying Blog Kit for the first time or preferring to manage local files only.</p>
    <ol class="bkguide-list"><li>Install Node.js on your PC and extract the Blog Kit ZIP.</li><li><code>site.json</code> and the article files.</li><li><code>npm install</code>(first time), then <code>npm run build</code> .</li><li>Create a Cloudflare Pages project using Direct Upload and upload the generated <code>dist/</code> folder.</li><li>After editing articles, rebuild and upload the new <code>dist/</code> folder again.</li></ol>
    <div class="bkguide-note"><strong>Note:</strong> Cloudflare Pages may not let you convert a Direct Upload project to Git integration in place. If you plan to automate publishing long-term, consider choosing Git integration from the start.</div>
  </div></section>

  <section class="bkguide-section bkguide-soft" id="publish"><div class="bkguide-wrap">
    <p class="bkguide-kicker">PUBLISHING</p><h2>Choose hosting to suit your goals.</h2>
    <div class="bkguide-compare">
      <article><h3>Cloudflare Pages · Direct Upload</h3><p>Upload the built <code>npm run build</code> → <code>dist/</code> folder from your PC. No GitHub required.</p><span>For manual publishing</span></article>
      <article><h3>Cloudflare Pages · Git integration</h3><p>Connect a GitHub repository, set the build command to <code>npm run build</code>and the output directory to <code>dist</code> . Each push automatically builds and publishes.</p><span>For updating from both PC and phone</span></article>
      <article><h3>GitHub Pages · Actions</h3><p>Use GitHub Actions to build Blog Kit and deploy to Pages. If the template includes a workflow, check its configuration.</p><span>For an entirely GitHub-based workflow</span></article>
    </div>
    <p class="bkguide-fine">Note: Cloudflare and GitHub dashboards and menu names can change. If you change your public URL, review the <code>site.json</code> value in <code>url</code> too.</p>
  </div></section>

  <section class="bkguide-section" id="tips"><div class="bkguide-wrap">
    <p class="bkguide-kicker">GOOD TO KNOW</p><h2>What Blog Kit manages.</h2>
    <div class="bkguide-mini-grid"><div><code>content/*.md</code><p>Article bodies. HTML can also be used alongside Markdown.</p></div><div><code>articles.json</code><p>Article titles, publication dates, URLs, languages, and more.</p></div><div><code>pages/*.md</code><p>Static pages such as About and landing pages.</p></div><div><code>pages.json</code><p>Static page titles, public URLs, and more.</p></div><div><code>site.json</code><p>Site-wide blog settings.</p></div><div><code>dist/</code><p>Generated files ready to publish.</p></div></div>
  </div></section>

  <section class="bkguide-bottom"><div class="bkguide-wrap"><p class="bkguide-kicker">YOUR BLOG, YOUR WAY</p><h2>Write in the way that suits you,<br>and keep going.</h2><p>Choose the device, editor, and hosting that work for you.</p><div class="bkguide-actions"><a class="bkguide-btn bkguide-primary" href="/download/">Download Blog Kit ↗</a><a class="bkguide-btn bkguide-outline" href="/blogkit/">About Blog Kit ↗</a></div></div></section>
</div>
