import fs from 'node:fs';
let html=fs.readFileSync('dist/index.html','utf8');
html=html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/,(_,path)=>'<script type="module">'+fs.readFileSync('dist/'+path.replace(/^\//,''),'utf8').replaceAll('</script','<\\/script')+'</script>');
html=html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/,(_,path)=>'<style>'+fs.readFileSync('dist/'+path.replace(/^\//,''),'utf8')+'</style>');
fs.writeFileSync('HEMEC-Prototipo.html',html);
