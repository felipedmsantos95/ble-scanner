const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');


//Starting the app
const app = express();
//Connect to front-end server aplication
const http = require('http').Server(app);
const path = require('path');
const net = require('net');
const io = require('socket.io')(http);
var noble = require('noble');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "node_modules")));



noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});


var cont = 0;


noble.on('discover', function (peripheral) {
    console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
	  console.log('\thello my local name is:');
	  console.log('\t\t' + peripheral.advertisement.localName);

	  if(peripheral.advertisement.localName != null)
	  	io.emit('bleList', peripheral.advertisement.localName);

	  
	  console.log('\tcan I interest you in any of the following advertised services:');
	  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

	  var serviceData = peripheral.advertisement.serviceData;
	  if (serviceData && serviceData.length) {
	    console.log('\there is my service data:');
	    for (var i in serviceData) {
	      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
	    }
	  }
	  if (peripheral.advertisement.manufacturerData) {
	    console.log('\there is my manufacturer data:');
	    console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
	  }
	  if (peripheral.advertisement.txPowerLevel !== undefined) {
	    console.log('\tmy TX power level is:');
	    console.log('\t\t' + peripheral.advertisement.txPowerLevel);
	}


  
})


//setTimeout(, 2000);


app.get('/', function(req, res){
	res.render('dashboard', {});
});


http.listen(4000);
