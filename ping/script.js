// The online/offline events are not triggered unless there is a change.
// So you will want to start the ping if you are already online.
if (window.navigator.onLine) {
    console.log("Getting started.");
    document.querySelector("output").innerHTML = "You might be online.";
    startPing();
}

var timerPing;

function startPing() {
    console.log("startPing");
    timerPing = setInterval(function() {
        // Ajax call
        var ping = new XMLHttpRequest();
        ping.open("HEAD", "/index.html");
        ping.send();
        ping.addEventListener("load", function() {
            console.log("load event " + ping.status);
            if (ping.status === 200) {
                // We are still online
                console.log("good ping");
                document.querySelector("output").innerHTML = "You are online.";
            } else {
            // We failed but got a non-error response
            console.log("non-error event");
            document.querySelector("output").innerHTML = "Disconnect.";
            }
        });
        ping.addEventListener("error", function() {
            // We are offline
            console.log("error event");
            document.querySelector("output").innerHTML = "Huston, we have a problem.";

        });
    }, 1000);
}

function stopPing() {
    console.log("stopPing");
    if (timerPing) {
        clearInterval(timerPing);
    }
}

window.addEventListener("online", function(event) {
    document.querySelector("output").innerHTML = "You might be online.";
    startPing();
});

window.addEventListener("offline", function(event) {
    document.querySelector("output").innerHTML = "You are offline.";
    stopPing();
});
