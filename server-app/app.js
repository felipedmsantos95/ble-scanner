const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

//Bluetooth scanner
//
//Create device bluetooth instance
//const device = new bluetooth.DeviceINQ();

//Starting the app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect to front-end server aplication
const http = require('http').Server(app);
const net = require('net');
const io = require('socket.io')(http);

// device.listPairedDevices(console.log);

// device
// .on('finished',  console.log.bind(console, 'finished'))
// .on('found', function found(address, name){
//   console.log('Found: ' + address + ' with name ' + name);
// }).scan();


Scanner = require("bluetooth-scanner");


var device = "hci0";


bleScanner = new Scanner(device, function(mac, name) {
    console.log('Found device: ' + name);
});



app.get('/', function(req, res){
	res.send("BLE Scanner");
});


http.listen(4001);
