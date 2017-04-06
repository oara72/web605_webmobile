// files to cache offline
var urls = [
'css/bootstrap.css', 'css/bootstrap.min.css', 'css/style.css',    
'images/assign2.png', 'images/assign5.png', 'images/assign6b.png', 
'images/assign7a.png', 'images/assign7b.png', 'images/assign8.png', 'images/assign9.png', 
'images/bullet.gif', 'images/favicon.ico', 'images/footer.gif', 'images/logo_vconverter.gif',
'images/logo_vprospect.gif', 'images/logo_vretain.gif', 'images/log.gif', 

'lib/html5.js', 'lib/jquery.min.js', 
'localstorage/index.html', 'localstorage/ls_script.js',
'ping/index.html', 'ping/ping_script.js',

'index.html', 'offline.html', 'offline,js', 'pageone.html', 
'pagethree.html', 'pagetwo.html', 'script.js', 'solutions.html',
];
 
// cache file listed above
this.addEventListener('install', function(event) {
    console.log("Service Worker Installed");
    event.waitUntil(caches.open('myAppCache').then(function(cache){
        return cache.addAll(urls);
    }));
});
 
// Mock response for API
this.addEventListener('fetch', function(event){
    var url = event.request.url;
    event.respondWith(caches.match(event.request)
        .then(function(response){
            if(response) {
                // request is in the cache
                console.log('Cache Hit ' + url);
                return response;
            } else {
                // not in cache
                // if we are offline and it is the api
                if(!navigator.onLine && event.request.url.indexOf('api')>0) {
                    console.log('Offline ' + url);
                    return new Response('{"error": "offline"}', 
                         { "headers" :
                            { "Content-type": "application/json" }
                         }
                    );
                } else {
                    console.log('Fetch ' + url);
                    return fetch(event.request);
                         
                }
                 
            }
        })
    );
});