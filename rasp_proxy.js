var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("stty -F /dev/ttyO3 9600", puts);

var serial = require('serialport');
var SerialPort = serial.SerialPort;
 
var sp = new SerialPort("/dev/ttyAMA0", { 
	//parser: serial.parsers.raw,
	baudrate: 9600 
});

// fonction d'envoi des commandes vers le drone
function sendCmd(cmd) {
	console.log("sending cmd " + cmd + " to the drone !");

	var cmd_completed = "";

	for(i = 0; i < 16; i++)
		cmd_completed = cmd_completed.concat((i < cmd.length) ? cmd[i] : " ");
	
	console.log("cmd : " + cmd_completed);
	sp.write(cmd_completed, function(err, results){
		if(err != undefined)
      			console.log('error : ' + err);
      		console.log('results : ' + results);
    	});
}
 
var id = null;
 
// ouverture de la connection port serie vers le drone
sp.on('open', function(error) {
	console.log('drone connection openized : ' + error + '...');


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
});
