<div id="ojm" class="ojm">
  <div class="ojm-hero">
    <span class="ojm-eyebrow">OJapp Blog Kit · Free Tool</span>
    <h2>From WordPress,<br>to Blog Kit.</h2>
    <p>Bring your articles and pages to your own site. Generate Blog Kit data from a WordPress export file.</p>
    <div class="ojm-tags"><span>Convert in your browser</span><span>No upload needed</span><span>Markdown / HTML</span></div>
  </div>
  <div class="ojm-panel">
    <div class="ojm-heading"><span class="ojm-step">01</span><div><h3>Files to migrate</h3><p>WordPress dashboard → Tools → Export → “All content”</p></div></div>
    <label class="ojm-file" for="ojm-xml"><span class="ojm-file-icon">↥</span><strong id="ojm-xml-name">Select WordPress XML</strong><small>XML file (required)</small><input type="file" id="ojm-xml" accept=".xml,text/xml,application/xml"></label>
    <label class="ojm-file ojm-file-secondary" for="ojm-trans"><span class="ojm-file-icon">＋</span><strong id="ojm-trans-name">Add Polylang translation JSON</strong><small>Japanese/English article mapping (optional)</small><input type="file" id="ojm-trans" accept=".json,application/json"></label>
    <div class="ojm-heading"><span class="ojm-step">02</span><div><h3>Conversion settings</h3><p>Your original files will not be overwritten, so you can make changes later.</p></div></div>
    <div class="ojm-choice"><label><input type="radio" name="ojm-format" value="markdown" checked><span><strong>Convert to Markdown</strong><small>Convert common HTML to Markdown and preserve special HTML wherever possible.</small></span></label><label><input type="radio" name="ojm-format" value="preserve"><span><strong>Preserve HTML</strong><small>Keep the original article body as intact as possible.</small></span></label></div>
    <label class="ojm-check"><input type="checkbox" id="ojm-images"><span><strong>Convert WordPress image URLs</strong><small>Example: /wp-content/uploads/2026/09/photo-312x500.png → photo.png (Markdown). Image files themselves are not migrated.</small></span></label>
    <details class="ojm-details"><summary>Advanced options</summary><label class="ojm-check"><input type="checkbox" id="ojm-drafts"><span>Include drafts</span></label><label class="ojm-check"><input type="checkbox" id="ojm-pages" checked><span>Include static pages</span></label></details>
    <button type="button" class="ojm-submit" id="ojm-run">Convert and download ZIP <span>↗</span></button>
    <div id="ojm-status" class="ojm-status" role="status" aria-live="polite"></div>
  </div>
  <div id="ojm-result" class="ojm-result" hidden><h3>Conversion results</h3><div id="ojm-stats" class="ojm-stats"></div><p id="ojm-warnings"></p></div>
  <section class="ojm-info"><h3>After conversion</h3><ol><li>Extract the ZIP and place <code>content/</code>、<code>pages/</code>、<code>articles.json</code>、<code>pages.json</code> in your Blog Kit project.</li><li>If you converted image URLs, place the actual image files in <code>public/images/</code> separately.</li><li><code>migration-report.json</code> Review migration warnings in the report.</li><li><code>npm run build</code> Build the site and check articles, images, and internal links.</li></ol><p>WordPress-specific shortcodes and theme styling may need manual adjustments. You can use VS Code search and replace to fix image URLs and internal links in bulk.</p><p class="ojm-note">Files are processed only in your browser and are not sent to a server by this tool. Large XML files may take some time to process.</p></section>
</div>
<script src="/js/blogkit-migrator-en.js" defer></script>
<script src="/js/blogkit-migrator-ui-en.js" defer></script>
<meta name="ojapp:icon" content="https://ojapp.app/icon/icon.webp">
<script defer src="https://ojapp.app/js/ojapp_1p1a.js"></script>