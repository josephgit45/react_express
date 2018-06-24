var ws = require("nodejs-websocket");

var websocketServer = ws.createServer(function (conn) {
    console.log("New connection");
    conn.on("close", function (code, reason) {
        console.log("websocketServer Connection closed");
    });
    conn.on("error", function (code, reason) {
        console.log("websocketServer error: " + code + " " + reason);
    });
});

websocketServer.broadcast = function(msg) {
    console.log("broadcast called");
    websocketServer.connections.forEach(function (conn) {
        conn.sendText(msg);
    });
}

module.exports = websocketServer;
