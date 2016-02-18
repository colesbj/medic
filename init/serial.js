var io = require('./bin/www').io;
var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort;

// Lists the path to Serial Port
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

//config serial port
SerialPort = new SerialPort("COM7",{
	baudrate:9600,
	parser:serialport.parsers.readline("\n")
},false);

//open serial port
SerialPort.open(function(err){
  if(err){
    console.log("SerialError" +err);
  }else{
    console.log("Serial Online");
  }
});

//Handles data sent ON COM port
SerialPort.on("data", function (data) {
  //sys.puts("here: "+data);
  console.log('data received:' + data);
  SerialPort.write("got it\n"); 
});

io.on('connection',function(socket){
	console.log(socket.id);

	 socket.on('led:on', function (data) {
           SerialPort.write("ON\n");
           console.log('LED ON RECEIVED');
     });
 
    socket.on('led:off', function (data) {
          SerialPort.write("OFF\n");
          console.log('LED OFF RECEIVED');
 
     });


});
