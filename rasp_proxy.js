var arDrone = require('ar-drone');
var client  = arDrone.createClient();

// fonction d'envoi des commandes vers le drone
function sendCmd(cmd) {
	console.log("sending cmd " + cmd + " to the drone !");
	
	//client[cmd]();
	client.takeoff();
}
 
 
	var socket = require('socket.io-client')('http://ec2-54-149-155-204.us-west-2.compute.amazonaws.com/');
	
	console.log('Trying to open server connection...');    
 
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
