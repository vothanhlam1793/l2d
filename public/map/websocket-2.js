let socket = new WebSocket("ws://ws.uudamstudio.com:1880/map");

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
    var data;
    try {
        data = JSON.parse(event.data);
    } catch (e) {
        console.log(e);
    }
    var location = {
        lng: parseFloat(data.longitude),
        lat: parseFloat(data.latitude)
    };
    addMarker(location, data.city);
}

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

let sTotal = new WebSocket("ws://ws.uudamstudio.com:1880/total");

sTotal.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
};

sTotal.onmessage = function(event) {
    var data;
    try {
        data = JSON.parse(event.data);
    } catch (e) {
        console.log(e);
    }
    console.log(data);
    var total = data.reduce(function(t, e){
      return {
        total: t.total + e.total
      }
    })
    setTotal(total.total);
    setContries(data.length);
}

sTotal.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

sTotal.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};