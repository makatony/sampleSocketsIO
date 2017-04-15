

var port = 3000;
var express = require("express");
var app = express();
var server = app.listen(port);
app.use(express.static('public')); //makes the folder "public" be used in express
console.log("connected via port " + port);



// ######################
// #### SOCKETS: I/O ####
// ######################

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection); //event listener for a connection

function newConnection(client) { //insert here all functions for a connection
	console.log("new client connected: " + client.id);
	client.on("clientRequest", clientSendsRequest);
}

function clientSendsRequest(data) {
	console.log("received data from " + this.client.id);
	io.sockets.connected[this.client.id].emit("sendResponse", {
		"message": "some message response",
		"data": data
	});
}
