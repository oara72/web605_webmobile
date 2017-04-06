// Are service workers available?
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js'
        ).then(function(registration) {
            // Worker is registered
            console.log("SW Registered");
        }).catch(function(error){
            // error registering
            console.log("SW Error");
        });
}