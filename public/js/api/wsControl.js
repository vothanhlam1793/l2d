var wsin;
var wsout;
// Danh cho bang do map
if(!url_control){
    var url_control = "ws://svr3.creta.vn:1888/web001";
}

// Danh cho xe
if(!url_in){
    var url_in = "ws://svr3.creta.vn:1888/map001";
}

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

function connect_out() {
    wsout = new WebSocket(url_in);
    wsout.onopen = function() {
        // app.ready();
        $("#st1").text("Đã mở OUT");
    };

    wsout.onmessage = function(e) {
        console.log(e.data);
        $("#status").text(e.data);
    };

    wsout.onclose = function(e) {
        // app.not_ready();
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    };

    wsout.onerror = function(err) {
        console.log(err);
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        wsout.close();
    };
    return wsout;
}
connect_out();