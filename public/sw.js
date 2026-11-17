// Never cache private data or API responses.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===self.location.origin&&e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>new Response('<h1>Du är offline</h1><p>Anslut till internet.</p>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));});
