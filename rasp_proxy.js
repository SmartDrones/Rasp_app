var serial = require('serialport');
var SerialPort = serial.SerialPort;
 
var TAKEOFF = "takeoff";
var LANDING = "landing";
 
var sp = new SerialPort("/dev/ttyAMA0", { 
	parser: serial.parsers.raw,
	baudrate: 9600 
});

// fonction d'envoi des commandes vers le drone
function sendCmd(cmd) {
	console.log("sending cmd " + cmd + " to the drone !");
	sp.write(cmd, function(err, results) {
		if(err == undefined)
      			console.log('error : ' + err);
      		console.log('results : ' + results);
    	});
}
 
var id = null;
 
// ouverture de la connection port serie vers le drone
sp.on('open', function(error) {
	console.log('drone connection openized : ' + error + '...');

	var socket = require('socket.io-client')('http://ec2-52-10-14-171.us-west-2.compute.amazonaws.com/');
     
	// ouverture de la connection socket vers le serveur
	socket.on('connect', function(){
		console.log("raspberry connected to the server !");
	});
	
	socket.on('disconnect', function(){
		// TODO : fermer la connexion port serie
	});
	
	// reception de l'identifiant unique
	socket.on('id', function(data){id = data; console.log("my id : "+id);});

	// reception d'une commande
	socket.on("server_cmd", function(data){
		if(data.id_drones.indexOf(id)!==-1)
		{
			sendCmd(data.cmd);
		}
	});
	 
	/*sendCmd(TAKEOFF);

	setTimeout(function(){
		sendCmd(LANDING);
	}, 7000);*/
});
