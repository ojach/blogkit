(()=>{'use strict';
const $=id=>document.getElementById(id),xml=$('ojm-xml'),trans=$('ojm-trans'),run=$('ojm-run'),status=$('ojm-status');
if(!xml||!run)return;
xml.addEventListener('change',()=>{$('ojm-xml-name').textContent=xml.files[0]?.name||'WordPress XMLを選択';});
trans.addEventListener('change',()=>{$('ojm-trans-name').textContent=trans.files[0]?.name||'Polylang翻訳JSONを追加';});
run.addEventListener('click',async()=>{
 if(!xml.files.length){status.textContent='WordPress XMLを選択してください。';status.dataset.type='error';return;}
 run.disabled=true;status.dataset.type='';status.textContent='変換しています…';$('ojm-result').hidden=true;
 try{
  const input=await xml.files[0].text(),translation=trans.files.length?await trans.files[0].text():null;
  const format=document.querySelector('input[name="ojm-format"]:checked').value;
  const result=window.OJBlogKitMigrator.run(input,translation,{format,rewriteImages:$('ojm-images').checked,includeDrafts:$('ojm-drafts').checked,excludePages:!$('ojm-pages').checked});
  if(!result.report.total_articles&&!result.report.total_pages)throw Error('公開記事・固定ページが見つかりません。WordPressのエクスポートXMLか確認してください。');
  const url=URL.createObjectURL(result.zip),a=document.createElement('a');a.href=url;a.download='blogkit-migration.zip';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  const r=result.report;$('ojm-stats').textContent=`${r.total_articles} 記事 ／ ${r.total_pages} 固定ページ ／ 翻訳 ${r.translation_stats.matched_pairs} 組`;
  $('ojm-warnings').textContent=`確認項目 ${r.warnings.length} 件。ZIP内の migration-report.json を確認してください。`;
  $('ojm-result').hidden=false;status.textContent='変換が完了しました。ZIPを保存してください。';
 }catch(e){status.dataset.type='error';status.textContent='変換できませんでした：'+(e.message||String(e));}
 finally{run.disabled=false;}
});
})();
