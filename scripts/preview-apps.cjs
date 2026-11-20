const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const baseline=path.join(root,'tmp/history-real-production-20261113');
const sourceFiles=new Set(['apps/index.html','apps/en/index.html','scripts/apps.js','styles/apps.css']);
let built='';
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let relative=decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if(!relative||relative.endsWith('/'))relative+='index.html';
  const base=sourceFiles.has(relative)?root:baseline;
  const file=path.resolve(base,relative);
  if(!file.startsWith(base+path.sep)){res.writeHead(403);return res.end();}
  if(relative==='apps/index.html'||relative==='apps/en/index.html'){
   const fingerprint=['apps/template.html','scripts/build-apps.mjs','data/apps-directory.json'].map(f=>fs.statSync(path.join(root,f)).mtimeMs).join(':');
   if(fingerprint!==built){execFileSync(process.execPath,['scripts/build-apps.mjs'],{cwd:root});built=fingerprint;}
  }
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Not found');}
  const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8'};
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
 }catch(e){res.writeHead(500);res.end('Preview error');}
}).listen(5181,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:5181/apps/en/?lang=en'));
