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

	let bleObj = {
		localName: peripheral.advertisement.localName,
		id: peripheral.id,
		address: peripheral.address
	}

	if(peripheral.advertisement.localName != null){
	  	io.emit('bleList', bleObj);
	}


  
})


//Recieve front-end data

io.on('connection', function(socket){

	socket.on('refresh', function(data){

		if(data) {
			console.log('aqui');
			 noble.stopScanning();
			 noble.startScanning();

		}	

	});
})

// var count = 0; 
// var intervalObject = setInterval(function () { 
//         count++; 
//         console.log(count, 'seconds passed'); 
//         if (count == 20) { 
//             console.log('exiting'); 
//             clearInterval(intervalObject); 
//         } 
//     }, 1000); 

// console.log('sai do loop');




app.get('/', function(req, res){
	res.render('dashboard', {});
});


http.listen(4000);
