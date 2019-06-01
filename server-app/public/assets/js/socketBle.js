const socket = io();


function refeshTable(){

}


socket.on('bleList', function(data){
	console.log(data);

});

