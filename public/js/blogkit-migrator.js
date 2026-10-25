/* OJapp Blog Kit Migrator v0.5.4 — browser adapter. Original conversion logic preserved. */
(function(global){
'use strict';
const markdownModule=(function(){
'use strict';
// Conservative WordPress HTML -> mixed Markdown converter. No external dependencies.
function decode(s){return String(s).replace(/&#(x[0-9a-f]+|\d+);|&(amp|lt|gt|quot|apos|nbsp);/gi,(m,n,k)=>{if(n){try{return String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))}catch{return m}}return {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[k.toLowerCase()]})}
function escapeMd(s){return s.replace(/([\\`*_\[\]])/g,'\\$1')}
function detectLanguage(s){let t=s.trim();if(!t)return 'text';if(/^[\[{]/.test(t)){try{JSON.parse(t);return 'json'}catch{}}if(/<\/?(?:!doctype|html|head|body|meta|script|style|div|span|p|a|img|section|link|input|button|h[1-6])\b/i.test(t))return 'html';if(/(^|\n)\s*(?:const|let|var|function|import|export|async\s+function|console\.|document\.|window\.)\b|=>|\bawait\s+\w+\(/m.test(t))return 'js';if(/(^|\n)\s*(?:\.[\w-]+|#[\w-]+|@media\b|body\s*\{|:root\s*\{)[^\n]*\{|\b(?:display|color|background|padding|margin|font-size)\s*:/m.test(t))return 'css';if(/\bSELECT\b[\s\S]*\bFROM\b|\bINSERT\s+INTO\b|\bCREATE\s+TABLE\b/i.test(t))return 'sql';if(/^\s*(?:#!\/bin\/(?:ba)?sh|(?:npm|git|node|curl|cd|mkdir)\s+\S+)/m.test(t))return 'bash';return 'text'}

// Convert HTML lists structurally. Regex matching individual <li> cannot handle nested lists.
function convertLists(html) {
  const tag=/<\/?(?:ul|ol|li)\b[^>]*>/gi;
  const root={type:'root',children:[]};
  let stack=[root],pos=0,m;
  const current=()=>stack[stack.length-1];
  function appendText(t){if(!t)return;current().children.push({type:'text',value:t});}
  while((m=tag.exec(html))){
    appendText(html.slice(pos,m.index));
    const name=(m[0].match(/^<\/?(ul|ol|li)/i)||[])[1].toLowerCase();
    const closing=/^<\//.test(m[0]);
    if(!closing){const node={type:name,children:[]};current().children.push(node);stack.push(node);}
    else {let idx=stack.length-1;while(idx>0&&stack[idx].type!==name)idx--;if(idx>0)stack.length=idx;else appendText(m[0]);}
    pos=tag.lastIndex;
  }
  appendText(html.slice(pos));
  function render(nodes,depth=0){let out='';for(const node of nodes){
    if(node.type==='text'){out+=node.value;continue;}
    if(node.type==='ul'||node.type==='ol'){
      const items=node.children.filter(x=>x.type==='li');
      const extra=node.children.filter(x=>x.type==='text').map(x=>x.value).join('');
      if(!items.length){out+=extra;continue;}
      const lines=items.map((item,i)=>{
        const sub=item.children.filter(x=>x.type==='ul'||x.type==='ol');
        const text=item.children.filter(x=>x.type!=='ul'&&x.type!=='ol').map(x=>render([x],depth+1)).join('')
          .replace(/<\/?p\b[^>]*>/gi,'').replace(/<br\s*\/?>/gi,'  \n').trim();
        const marker=node.type==='ol'?`${i+1}. `:'- ';
        const base='  '.repeat(depth)+marker+text.replace(/\n/g,'\n'+'  '.repeat(depth+1));
        return base+(sub.length?'\n'+sub.map(x=>render([x],depth+1).replace(/^\n+|\n+$/g,'')).join('\n'):'');
      });
      out+='\n\n'+lines.join('\n')+'\n\n'+extra;
    } else if(node.type==='li')out+=render(node.children,depth);
  }return out;}
  return render(root.children);
}

function convert(source,opts={}){let warnings=[],detected=[];let s=String(source).replace(/\r\n/g,'\n');let tokens=[];function protect(v){let id='OJMDTOKEN'+tokens.length+'END';tokens.push(v);return '\n\n'+id+'\n\n'}
// Gutenberg wrappers are editor metadata; do not remove rendered HTML. Unknown blocks are reported.
s=s.replace(/<!--\s*\/?wp:([\w/-]+)(?:\s+\{[^]*?\})?\s*-->/g,(_,name)=>{if(!/^(?:paragraph|heading|list|list-item|image|quote|code|preformatted|html|group|columns|column|separator|spacer|buttons|button|table|embed|shortcode|media-text|gallery|cover|details)$/.test(name))warnings.push('gutenberg_custom_block:'+name);return ''});
// Caption shortcodes: preserve image and caption, without WP wrapper.
s=s.replace(/\[caption\b[^\]]*\]([\s\S]*?)\[\/caption\]/gi,(_,inside)=>{let im=inside.match(/<img\b[^>]*>/i);if(!im){warnings.push('caption_without_image');return protect(inside)}let src=(im[0].match(/\bsrc\s*=\s*(["'])(.*?)\1/i)||[])[2];let alt=(im[0].match(/\balt\s*=\s*(["'])(.*?)\1/i)||[])[2]||'';if(!src){warnings.push('caption_without_src');return protect(inside)}let cap=inside.replace(im[0],'').replace(/<[^>]+>/g,'').trim();let label=decode(alt||cap);return protect(`![${escapeMd(label)}](${src})${cap?'\n\n*'+escapeMd(decode(cap))+'*':''}`)});
// Protect preformatted code before general HTML conversion.
s=s.replace(/<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi,(_,attrs,inner)=>{let code=inner.match(/^\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*$/i);let attr=(code?code[1]:'')+' '+attrs;let content=code?code[2]:inner;let explicit=(attr.match(/(?:language|lang)-([\w+#.-]+)/i)||[])[1]||'';let lang=explicit.toLowerCase()||detectLanguage(decode(content));if(!explicit&&lang!=='text')detected.push(lang);let text=decode(content).replace(/^\n/,'').replace(/\n[ \t]*$/,'');let fence='`'.repeat(Math.max(3,...[...text.matchAll(/`+/g)].map(x=>x[0].length+1)));return protect(`${fence}${lang}\n${text}\n${fence}`)});
// Preserve unsupported structural HTML blocks rather than stripping styles/behavior.
s=s.replace(/<(table|figure|iframe|video|audio|svg|details|form|script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,m=>{warnings.push('preserved_html:'+m.match(/^<([\w-]+)/)[1]);return protect(m)});
// Common standalone images.
s=s.replace(/<img\b[^>]*>/gi,tag=>{let src=(tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)||[])[2];if(!src){warnings.push('image_without_src');return tag}let alt=(tag.match(/\balt\s*=\s*(["'])(.*?)\1/i)||[])[2]||'';return `![${escapeMd(decode(alt))}](${src})`});
// When a bold label ends in a colon, separate it from following text.
// Some Markdown renderers fail to close **name:** or **name：** immediately before Japanese text.
s=s.replace(/(<(?:strong|b)>[^<]*[:：]<\/(?:strong|b)>)(?=[^\s<])/gi, '$1 ');
// Links and simple inline emphasis; retain complex/custom tags.
s=s.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi,(all,a,inner)=>{let href=(a.match(/\bhref\s*=\s*(["'])(.*?)\1/i)||[])[2];return href&&!/<[a-z]/i.test(inner)?`[${decode(inner)}](${href})`:all});
s=s.replace(/<(strong|b)>([^<]*)<\/\1>/gi,(_,tag,v)=>`**${decode(v)}**`).replace(/<(em|i)>([^<]*)<\/\1>/gi,(_,tag,v)=>`*${decode(v)}*`).replace(/<code\b[^>]*>([^<]*)<\/code>/gi,(_,v)=>'`'+decode(v).replace(/`/g,'\\`')+'`');
s=s.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,(_,n,v)=>'\n\n'+'#'.repeat(Number(n))+' '+decode(v.replace(/<[^>]+>/g,'').replace(/^\*\*(.*?)\*\*$/,'$1'))+'\n\n');
s=s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi,(_,v)=>'\n\n'+v.replace(/<\/?p\b[^>]*>/gi,'').trim().split('\n').map(line=>'> '+decode(line)).join('\n')+'\n\n');
s=convertLists(s);
s=s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi,(_,v)=>'\n\n'+v.trim()+'\n\n').replace(/<br\s*\/?>/gi,'  \n').replace(/<hr\s*\/?>/gi,'\n\n---\n\n');
// Avoid stripping unknown HTML: preserving it is safer than silently changing layout.
s=s.replace(/\n{3,}/g,'\n\n').trim();for(let i=0;i<tokens.length;i++)s=s.replace('OJMDTOKEN'+i+'END',tokens[i].trim());
let shortcodes=[...s.matchAll(/\[([a-z][\w-]*)(?:\s[^\]]*)?\]/gi)].map(m=>m[1]).filter(n=>!['caption'].includes(n.toLowerCase()));for(let name of new Set(shortcodes))warnings.push('unhandled_shortcode:'+name);
return {body:s+'\n',warnings:[...new Set(warnings)],detected_languages:detected};}
return {convert,detectLanguage};

})();
function migrateBrowser(xml, translations, options={}) {
  const files = new Map();
  files.set('/work/wordpress.xml', xml);
  if (translations !== null && translations !== undefined) files.set('/work/translations.json', translations);
  const fs = {
    existsSync(p){return files.has(p) || [...files.keys()].some(k=>k.startsWith(p+'/'));},
    mkdirSync(){},
    readFileSync(p){if(!files.has(p))throw Error('ファイルが見つかりません: '+p);return files.get(p);},
    writeFileSync(p,s){files.set(p,s);},
    rmSync(p){for(const k of [...files.keys()])if(k===p||k.startsWith(p+'/'))files.delete(k);}
  };
  const path = {
    resolve(p){return p.startsWith('/')?p:'/work/'+p.replace(/^\.\//,'');},
    join(...parts){return parts.join('/').replace(/\/+/g,'/');},
    parse(p){return {root:'/'};},
    dirname(p){return p.substring(0,p.lastIndexOf('/'))||'/';},
    basename(p){return p.substring(p.lastIndexOf('/')+1);}
  };
  const args=['wordpress.xml','--output','output','--format',options.format||'markdown'];
  if(options.rewriteImages)args.push('--rewrite-images');
  if(options.includeDrafts)args.push('--include-drafts');
  if(options.excludePages)args.push('--exclude-pages');
  if(translations!==null&&translations!==undefined)args.push('--translations','translations.json');
  const process={argv:['node','migrate.js',...args],cwd:()=>'/work',exitCode:0};
  const console={log(){},error(){}};

'use strict';
const {convert}=markdownModule;
function decode(s){return (s||'').replace(/&#(x[0-9a-f]+|\d+);|&([a-z]+);/gi,(m,n,k)=>{if(n){let x=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n);try{return String.fromCodePoint(x)}catch{return m}}return {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[k]??m})}
function raw(s){return decode((s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,(_,v)=>v))}
function rawBody(s){return (s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,(_,v)=>v)}
function getBody(s){const m=s.match(/<content:encoded(?:\s[^>]*)?>([\s\S]*?)<\/content:encoded>/i);return m?rawBody(m[1]):''}
function get(s,tag){const t=tag.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const m=s.match(new RegExp('<'+t+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/'+t+'>','i'));return m?raw(m[1]):''}
function clean(s){return decode((s||'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim()}
function safe(s){return s.replace(/[^a-zA-Z0-9_.-]/g,'-').replace(/^[.\-]+|[.\-]+$/g,'')||'article'}
// Optional WordPress media URL rewrite. Does not download or verify files.
function imageTarget(url,format){
  const m=String(url).match(/^(?:https?:\/\/[^\s/]+)?\/wp-content\/uploads\/(?:\d{4}\/\d{1,2}\/)?([^\/?#]+)(?:[?#][^\s]*)?$/i);
  if(!m)return null;
  let filename=m[1];
  try{filename=decodeURIComponent(filename)}catch{}
  filename=filename.replace(/-\d+x\d+(?=\.[^.]+$)/i,'');
  return (format==='markdown'?'':'/images/')+filename;
}
function rewriteImages(body,format,changes){
  // Keep fenced code examples and HTML pre/code examples unchanged.
  const protectedParts=[];
  const protect=m=>{const id='OJAPP_IMAGE_PROTECT_'+protectedParts.length+'_END';protectedParts.push(m);return id};
  let s=body.replace(/(^|\n)(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2[^\n]*(?=\n|$)/g,protect)
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre\s*>|<code\b[^>]*>[\s\S]*?<\/code\s*>/gi,protect);
  function change(url,kind){const target=imageTarget(url,kind);if(target&&target!==url){changes.push({from:url,to:target});return target}return url}
  // Markdown images (not ordinary hyperlinks).
  s=s.replace(/(!\[[^\]\n]*(?:\\.[^\]\n]*)*\]\(\s*<?)([^\s)>]+)(>?)/g,(whole,start,url,end)=>start+change(url,'markdown')+end);
  // HTML images, including those inside preserved <figure> blocks.
  s=s.replace(/<img\b[^>]*>/gi,tag=>tag.replace(/\b(src|srcset)\s*=\s*(["'])(.*?)\2/gi,(whole,attr,q,value)=>{
    if(attr.toLowerCase()==='src')return attr+'='+q+change(value,'html')+q;
    const replaced=value.split(',').map(entry=>entry.replace(/^(\s*)(\S+)/,(_,ws,url)=>ws+change(url,'html'))).join(',');
    return attr+'='+q+replaced+q;
  }));
  return s.replace(/OJAPP_IMAGE_PROTECT_(\d+)_END/g,(_,n)=>protectedParts[Number(n)]);
}
function usage(){console.log('使い方: node migrate.js wordpress.xml [--output フォルダ] [--exclude-pages] [--exclude-page スラッグ] [--include-drafts] [--overwrite] [--translations 対応表.json] [--format preserve|markdown] [--rewrite-images]');}
function main(){let a=process.argv.slice(2);if(!a.length||a.includes('--help')){usage();return}let fi=a.indexOf('--format');let format=fi>=0?a[fi+1]:'preserve';if(!['preserve','markdown'].includes(format))throw Error('--format は preserve または markdown を指定してください');let rewriteImageUrls=a.includes('--rewrite-images');let input=a[0],out='migration-output',pages=!a.includes('--exclude-pages'),drafts=a.includes('--include-drafts'),overwrite=a.includes('--overwrite');let excluded=new Set();for(let i=0;i<a.length;i++){if(a[i]==='--exclude-page'){if(!a[i+1]||a[i+1].startsWith('--'))throw Error('--exclude-page の値がありません');excluded.add(a[++i].replace(/^\/+|\/+$/g,''))}}let ti=a.indexOf('--translations'),translationFile=ti>=0?a[ti+1]:null;if(ti>=0&&!translationFile)throw Error('--translations の値がありません');let oi=a.indexOf('--output');if(oi>=0){if(!a[oi+1])throw Error('--output の値がありません');out=a[oi+1]};let src=path.resolve(input),dest=path.resolve(out);if(!fs.existsSync(src))throw Error('XMLが見つかりません: '+src);if(dest===path.parse(dest).root||dest===process.cwd()||dest===path.dirname(src)||dest===src)throw Error('危険な出力先です');if(fs.existsSync(dest)){if(!overwrite)throw Error('出力先が存在します。別名を指定するか --overwrite を使ってください');fs.rmSync(dest,{recursive:true,force:true})}fs.mkdirSync(path.join(dest,'content'),{recursive:true});fs.mkdirSync(path.join(dest,'pages'),{recursive:true});let xml=fs.readFileSync(src,'utf8');let items=[...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/g)].map(m=>m[1]);let counts={},attachments={},warnings=[],posts=[];
for(let s of items){let typ=get(s,'wp:post_type'),status=get(s,'wp:status');counts[typ+':'+status]=(counts[typ+':'+status]||0)+1;if(typ==='attachment')attachments[get(s,'wp:post_id')]=get(s,'wp:attachment_url')}
for(let s of items){let typ=get(s,'wp:post_type'),status=get(s,'wp:status');if(!(typ==='post'||(pages&&typ==='page'))||(!drafts&&status!=='publish'))continue;let meta={};for(let m of s.matchAll(/<wp:postmeta>([\s\S]*?)<\/wp:postmeta>/g))meta[get(m[1],'wp:meta_key')]=get(m[1],'wp:meta_value');let link=get(s,'link'),slug=get(s,'wp:post_name'),urlPath='';try{urlPath=new URL(link).pathname.replace(/^\/+|\/+$/g,'')}catch{}let permalink=urlPath||slug||'post-'+get(s,'wp:post_id');if(typ==='page'&&(excluded.has(permalink)||excluded.has(slug)))continue;let key=safe(permalink.replace(/\//g,'--'));let title=clean(get(s,'title')),body=getBody(s),excerpt=clean(get(s,'excerpt:encoded')),desc=clean(meta.description||meta._aioseo_description||'');if(!excerpt)excerpt=desc||clean(body).slice(0,180);let original=body;let imageChanges=[];let conversion=null;if(format==='markdown'){conversion=convert(body);body=conversion.body;for(let type of conversion.warnings)warnings.push({article:permalink,type});}let h1=body.match(/^\s*(?:(?:<!--[\s\S]*?-->\s*)|(?:<p>\s*<\/p>\s*))*<h1\b[^>]*>([\s\S]*?)<\/h1>\s*/i);if(h1&&clean(h1[1]).toLowerCase()===title.toLowerCase()){body=body.slice(h1[0].length);warnings.push({article:permalink,type:'removed_duplicate_h1'})}else{let md=body.match(/^\s*#\s+(.+?)(?:\r?\n|$)/);if(md&&clean(md[1]).toLowerCase()===title.toLowerCase()){body=body.slice(md[0].length);warnings.push({article:permalink,type:'removed_duplicate_markdown_h1'})}}
if(rewriteImageUrls)body=rewriteImages(body,format,imageChanges);if(/<h1\b/i.test(body))warnings.push({article:permalink,type:'remaining_h1'});if(/\[[A-Za-z][\w-]*(?:\s[^\]]*)?\]/.test(body))warnings.push({article:permalink,type:'possible_shortcode'});if(/wp-content\/uploads/i.test(body))warnings.push({article:permalink,type:'wordpress_image_urls'});if(/balloon__img/.test(body))warnings.push({article:permalink,type:'appin_balloon'});if(/<!--\s*wp:/.test(body))warnings.push({article:permalink,type:'gutenberg_blocks'});
let cats=[...s.matchAll(/<category\b([^>]*)>([\s\S]*?)<\/category>/g)].filter(m=>/domain=["']category["']/.test(m[1])).map(m=>clean(raw(m[2])));let date=get(s,'wp:post_date').slice(0,10);let data={title,permalink,language:permalink.startsWith('en/')?'en':'ja',show_thumbnail:false};if(desc)data.meta_description=desc;if(excerpt)data.excerpt=excerpt;if(cats.length)data.category=cats[0];if(date&&!date.startsWith('0000'))data.published=date;posts.push({key,permalink,data,body,type:typ,original_link:link,wp_id:get(s,'wp:post_id'),thumbnail_source:attachments[meta._thumbnail_id||'']||'',imageChanges,conversion})}
let keys=new Set(),paths=new Set();for(let p of posts){let composite=p.type+':'+p.key;if(keys.has(composite)||paths.has(p.permalink))throw Error('重複したキーまたはURL: '+p.permalink);keys.add(composite);paths.add(p.permalink)}let articles=posts.filter(p=>p.type==='post'),fixedPages=posts.filter(p=>p.type==='page');for(let p of fixedPages){p.data={title:p.data.title,permalink:p.permalink,language:p.data.language,show_in_footer:false,...(p.data.meta_description?{description:p.data.meta_description}:{})}}let byPath=new Map(articles.map(p=>[p.permalink,p]));let byId=new Map(articles.map(p=>[String(p.wp_id),p]));let translationStats={source:translationFile?path.basename(translationFile):'url_heuristic',pairs_in_file:0,matched_pairs:0,missing_pairs:[],language_mismatches:[]};
if(translationFile){let tf=path.resolve(translationFile);if(!fs.existsSync(tf))throw Error('翻訳対応表が見つかりません: '+tf);let t=JSON.parse(fs.readFileSync(tf,'utf8'));if(t.format!=='ojapp-polylang-translations'||!Array.isArray(t.translations))throw Error('翻訳対応表の形式が正しくありません');translationStats.pairs_in_file=t.translations.length;for(let pair of t.translations){let ja=byId.get(String(pair.ja)),en=byId.get(String(pair.en));if(!ja||!en){translationStats.missing_pairs.push({ja:pair.ja,en:pair.en,missing:!ja&&!en?'both':!ja?'ja':'en'});continue}if(ja.data.language!=='ja'||en.data.language!=='en')translationStats.language_mismatches.push({ja:pair.ja,en:pair.en,ja_permalink:ja.permalink,en_permalink:en.permalink});ja.data.translation=en.key;en.data.translation=ja.key;translationStats.matched_pairs++}}
else{for(let p of articles){let other=p.permalink.startsWith('en/')?p.permalink.slice(3):'en/'+p.permalink;if(byPath.has(other))p.data.translation=byPath.get(other).key}}
let output=Object.fromEntries(articles.map(p=>[p.key,p.data]));let pageOutput=Object.fromEntries(fixedPages.map(p=>[p.key,p.data]));fs.writeFileSync(path.join(dest,'articles.json'),JSON.stringify(output,null,2)+'\n');fs.writeFileSync(path.join(dest,'pages.json'),JSON.stringify(pageOutput,null,2)+'\n');for(let p of articles)fs.writeFileSync(path.join(dest,'content',p.key+'.md'),p.body);for(let p of fixedPages)fs.writeFileSync(path.join(dest,'pages',p.key+'.md'),p.body);let imageRewrites=posts.flatMap(p=>p.imageChanges.map(c=>({article:p.permalink,...c})));let imageTargets=new Map();for(const c of imageRewrites){if(!imageTargets.has(c.to))imageTargets.set(c.to,new Set());imageTargets.get(c.to).add(c.from)}let imageCollisions=[...imageTargets].filter(([,sources])=>new Set([...sources].map(u=>u.replace(/-\d+x\d+(?=\.[^.]+(?:[?#]|$))/i,''))).size>1).map(([target,sources])=>({target,sources:[...sources]}));let report={source:path.basename(src),format,rewrite_images:rewriteImageUrls,image_rewrites:imageRewrites,image_name_collisions:imageCollisions,generated_at:new Date().toISOString(),total_articles:articles.length,total_pages:fixedPages.length,wordpress_item_counts:counts,translation_stats:translationStats,warnings,items:posts.map(p=>({file:(p.type==='page'?'pages/':'content/')+p.key+'.md',type:p.type,permalink:p.permalink,source_url:p.original_link,wp_id:p.wp_id,thumbnail_source:p.thumbnail_source,...(p.conversion?{detected_languages:p.conversion.detected_languages,conversion_warnings:p.conversion.warnings}:{})}))};fs.writeFileSync(path.join(dest,'migration-report.json'),JSON.stringify(report,null,2)+'\n');console.log(`変換完了: ${articles.length}記事・${fixedPages.length}固定ページ / 翻訳ペア ${translationStats.matched_pairs}組 / 要確認 ${warnings.length}件 → ${dest}`)}
main(); return files;

}
// ZIP writer (STORE method). No external scripts, CDN or server required.
const encoder=new TextEncoder();
const crcTable=new Uint32Array(256);
for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcTable[n]=c>>>0;}
function crc32(b){let c=0xffffffff;for(const x of b)c=crcTable[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function zipFiles(files){
 const local=[],central=[];let offset=0;const now=new Date();
 const time=((now.getHours()&31)<<11)|((now.getMinutes()&63)<<5)|((now.getSeconds()/2)&31);
 const date=(((now.getFullYear()-1980)&127)<<9)|(((now.getMonth()+1)&15)<<5)|(now.getDate()&31);
 function header(len){return new DataView(new ArrayBuffer(len));}
 function bytes(v){return new Uint8Array(v.buffer);}
 for(const [name,content] of files){
   const n=encoder.encode(name),d=encoder.encode(content),crc=crc32(d);
   const a=header(30);a.setUint32(0,0x04034b50,true);a.setUint16(4,20,true);a.setUint16(6,0x800,true);a.setUint16(10,time,true);a.setUint16(12,date,true);a.setUint32(14,crc,true);a.setUint32(18,d.length,true);a.setUint32(22,d.length,true);a.setUint16(26,n.length,true);
   local.push(bytes(a),n,d);
   const b=header(46);b.setUint32(0,0x02014b50,true);b.setUint16(4,20,true);b.setUint16(6,20,true);b.setUint16(8,0x800,true);b.setUint16(12,time,true);b.setUint16(14,date,true);b.setUint32(16,crc,true);b.setUint32(20,d.length,true);b.setUint32(24,d.length,true);b.setUint16(28,n.length,true);b.setUint32(42,offset,true);
   central.push(bytes(b),n);offset+=30+n.length+d.length;
 }
 const centralSize=central.reduce((s,a)=>s+a.length,0),count=files.length;
 const end=header(22);end.setUint32(0,0x06054b50,true);end.setUint16(8,count,true);end.setUint16(10,count,true);end.setUint32(12,centralSize,true);end.setUint32(16,offset,true);
 return new Blob([...local,...central,bytes(end)],{type:'application/zip'});
}
global.OJBlogKitMigrator={run(xml,translations,options){
 const all=migrateBrowser(xml,translations,options);
 const output=[...all.entries()].filter(([p])=>p.startsWith('/work/output/')).map(([p,v])=>[p.slice('/work/output/'.length),v]);
 const report=JSON.parse(all.get('/work/output/migration-report.json'));
 return {zip:zipFiles(output),report,files:output};
}};
})(typeof window!=='undefined'?window:globalThis);
