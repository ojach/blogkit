(()=>{'use strict';
const $=id=>document.getElementById(id),xml=$('ojm-xml'),trans=$('ojm-trans'),run=$('ojm-run'),status=$('ojm-status');
if(!xml||!run)return;
xml.addEventListener('change',()=>{$('ojm-xml-name').textContent=xml.files[0]?.name||'Select WordPress XML';});
trans.addEventListener('change',()=>{$('ojm-trans-name').textContent=trans.files[0]?.name||'Add Polylang translation JSON';});
run.addEventListener('click',async()=>{
 if(!xml.files.length){status.textContent='Please select a WordPress XML file.';status.dataset.type='error';return;}
 run.disabled=true;status.dataset.type='';status.textContent='Converting…';$('ojm-result').hidden=true;
 try{
  const input=await xml.files[0].text(),translation=trans.files.length?await trans.files[0].text():null;
  const format=document.querySelector('input[name="ojm-format"]:checked').value;
  const result=window.OJBlogKitMigrator.run(input,translation,{format,rewriteImages:$('ojm-images').checked,includeDrafts:$('ojm-drafts').checked,excludePages:!$('ojm-pages').checked});
  if(!result.report.total_articles&&!result.report.total_pages)throw Error('No published posts or pages found. Make sure this is a WordPress export XML file.');
  const url=URL.createObjectURL(result.zip),a=document.createElement('a');a.href=url;a.download='blogkit-migration.zip';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  const r=result.report;$('ojm-stats').textContent=`${r.total_articles} posts / ${r.total_pages} pages / ${r.translation_stats.matched_pairs} translation pairs`;
  $('ojm-warnings').textContent=`${r.warnings.length} items need review. Check migration-report.json inside the ZIP.`;
  $('ojm-result').hidden=false;status.textContent='Conversion complete. Save the ZIP file.';
 }catch(e){status.dataset.type='error';status.textContent='Conversion failed: '+(e.message||String(e));}
 finally{run.disabled=false;}
});
})();
