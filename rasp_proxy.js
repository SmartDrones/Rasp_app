var serial = require('serialport');
var SerialPort = serial.SerialPort;
 
var TAKEOFF = "takeoff";
var LANDING = "landing";
 
var sp = new SerialPort("/dev/ttyAMA0", { 
	parser: serial.parsers.raw,
	baudrate: 9600 
});
 
function sendCmd(cmd) {
	sp.write(cmd, function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
}
 
sp.on('open', function(error) {
	console.log('connection openized : ' + error + '...');
     
	sendCmd(TAKEOFF);
	
	setTimeout(function(){
		sendCmd(LANDING);
	}, 7000);
});
