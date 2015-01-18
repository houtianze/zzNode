var http = require('http');
var net = require('net');
var url = require('url');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
proxy.on('error', function(err) { // ignore
});

var server = http.createServer();
server.on('clientError', function(err, socket) {
	socket.destroy();
});
server.on('request', function(req, res) {
	//console.log(util.inspect(req, { colors: true }));
	proxy.web(req, res, { target: req.url });
});
server.on('connect', function(request, clientSocket, head) {
    var reqData = url.parse('http://' + request.url);
      var remoteSocket = net.connect(reqData.port, reqData.hostname, function() {
        clientSocket.write('HTTP/1.1 200 \r\n\r\n');
        remoteSocket.write(head);
        remoteSocket.pipe(clientSocket);
        clientSocket.pipe(remoteSocket);
      });
});
server.listen(process.env.PORT || 8080);
