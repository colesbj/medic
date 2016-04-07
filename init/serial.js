
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
SerialPort = new SerialPort("COM9",{
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

    socket.on('dispense', function (data) {
          if(data.amount<10){
            data.amount = "0"+data.amount;
          }
          SerialPort.write("01"+(data.inventory-1)+data.amount+"\n");
          console.log("01"+(data.inventory-1)+data.amount+"\n");
 
     });

    socket.on('insert', function (data){
        SerialPort.write("02"+(data.inventory-1) +"\n"); 
        console.log("02"+(data.inventory-1) +"\n"); 
    });


    socket.on('delete', function (data){
        SerialPort.write("03"+(data.inventory-1) +"\n"); 
        console.log("03"+(data.inventory-1)+"\n"); 
    });


     socket.on('codes', function (data){
        SerialPort.write(data.code+"\n"); 
         console.log(data.code+"\n");
    });

        //Handles data sent ON COM port
    SerialPort.on("data", function (data) {
      //sys.puts("here: "+data);
      socket.emit("sent",data);
      console.log('data received:' + data);

      //SerialPort.write("got it\n"); 
    });


});
