var wsin;
var url_control = "ws://ws.uudamstudio.com:1880/wsbot3";
function connect() {
    wsin = new WebSocket(url_control);
    wsin.onopen = function() {
        console.log("Open Websocket")
    };

    wsin.onmessage = function(e) {
        console.log(e.data);
        $("#status").text(e.data);
    };

    wsin.onclose = function(e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    };

    wsin.onerror = function(err) {
        console.log(err);
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        wsin.close();
    };
    return wsin;
}
connect();