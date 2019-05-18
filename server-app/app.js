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

var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
    console.log('Found device with local name: ' + peripheral.advertisement.localName);
    console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
    console.log();
});



app.get('/', function(req, res){
	res.send("BLE Scanner");
});


http.listen(4001);
