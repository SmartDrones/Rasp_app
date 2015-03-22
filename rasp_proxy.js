var socket = require('socket.io-client')('http://192.168.1.2:8080/');
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
	sp.write(cmd, function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
}
 
var id = null;
 
// ouverture de la connection port serie vers le drone
sp.on('open', function(error) {
	console.log('drone connection openized : ' + error + '...');
     
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
