var SerialPort = require('serialport').SerialPort;
 
var sp = new SerialPort("/dev/ttyUSB0", { 
	baudrate: 9600 
});
 
sp.on('open', function(error) {
	console.log('connection openized : ' + error + '...');
     sp.write('takeoff\n', function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
})
