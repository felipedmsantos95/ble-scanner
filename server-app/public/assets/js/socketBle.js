const socket = io();

var table = document.getElementById('bleTable');
var lines = table.getElementsByTagName("tr");


//Table functions

function addDeviceTable(obj){
	
	let linesNumber = table.rows.length;
	let line = table.insertRow(linesNumber);
	let cel1 = line.insertCell(0);
	let cel2 = line.insertCell(1);
	let cel3 = line.insertCell(2);

	cel1.innerHTML = obj.localName;
	cel2.innerHTML = obj.id;
	cel3.innerHTML = obj.address;

}

function deleteTable(){
	rowCount = lines.length;
	for(let count = rowCount - 1; count > 1 ; count--)//Count foi até 1 por causa da linha oculta para não perder a formatação
		table.deleteRow(count);

}

function refreshTable(){
	deleteTable();
	atualizaLinhas();
	socket.emit('refresh', true);

}


function atualizaLinhas(){
  for(var i = 0; i < lines.length; i++){
	  var linha = lines[i];
	  linha.addEventListener("click", function(){
	      //Adicionar ao atual
	      selLinha(this, false); //Selecione apenas um
	      //selLinha(this, true); //Selecione quantos quiser
	    });
  }

}


/**
Caso passe true, você pode selecionar multiplas lines.
Caso passe false, você só pode selecionar uma linha por vez.
**/
function selLinha(linha, multiplos){
	if(!multiplos){
  	var lines = linha.parentElement.getElementsByTagName("tr");
    for(var i = 0; i < lines.length; i++){
      var linha_ = lines[i];
      linha_.classList.remove("selecionado");    
    }
  }
  linha.classList.toggle("selecionado");
}

function connect(){
	var selecionado = table.getElementsByClassName("selecionado");
	//Verificar se eestá selecionado
  	if(selecionado.length < 1){
  		alert("Selecione um dispositivo");
  		return false;
  	}

  	else{

  		let idDevice = selecionado[0].cells[1].innerHTML;
  		console.log(idDevice);
  		socket.emit('conectDevice', idDevice);
  	}
}

//End table functions

socket.on('bleList', function(data){
	addDeviceTable(data);
	lines = table.getElementsByTagName("tr");
	atualizaLinhas();

});

