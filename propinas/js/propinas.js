var app = {};
app.VERSION = '2.0';
app.AUTOR = 'Enzo Ahumada';

app.garzones = [];
app.totalPropina = 0;

app.getTotalGarzones = function(){;
	return this.garzones.length;
}

app.getTotalPropina = function(){	
	return this.totalPropina;
}

app.getHorasTrabajadas = function(){
	var horasTrabajadas = 0;

	for (var i = 0; i < this.getTotalGarzones(); i++){
		horasTrabajadas = horasTrabajadas + parseInt(this.garzones[i].horas); 
	}			
	return horasTrabajadas;
}

app.calcularPropinaIndividual = function(garzon, horas){
	var propina = 0;
	var resultado = '';

	propina = horas * this.calcularValorHora();
	resultado = garzon + '  :  $' + Math.round(propina);

	return resultado;
}

app.obtieneCalculoPropina = function(){
	var ulResultado = $('<ul></ul>');
	ulResultado.addClass('list-group');

	for (var i = 0; i < this.getTotalGarzones(); i++){
		var liResultado = $('<li></li>');
		liResultado.addClass('list-group-item');
		liResultado.html(this.calcularPropinaIndividual(this.garzones[i].nombre, this.garzones[i].horas));
		ulResultado.append(liResultado);
	}

	$('#divResultado').html(ulResultado);
}

app.calcularValorHora = function(){
	var valorHora = 0;
	var horasTrabajadas = this.getHorasTrabajadas();

	valorHora = this.getTotalPropina() / horasTrabajadas;
	return valorHora;
}

app.listarGarzones = function(){
	var arrGarzones = ['Roly', 'Lili', 'Vero', 'Dani', 'Ferny'];
	
	var optGarzon = $('<option></option>');
	optGarzon.val(-1);
	optGarzon.text('Seleccionar...');
	$('#lstGarzones').append(optGarzon);

	for (i in arrGarzones){
		var optGarzon =  $('<option></option>');
		optGarzon.val(i);
		optGarzon.text(arrGarzones[i]);
		$('#lstGarzones').append(optGarzon);
	}
}

app.agregarGarzonCalculo = function(sNomGarzon, iHoras){
	var index = 0;
	index = app.garzones.length;
	app.garzones[index] = {'nombre': sNomGarzon, 'horas': iHoras};
	return sNomGarzon;	
}

app.resetCalculaPropina = function() {	
	$('#divReset').addClass('hide');
	
	$('#txtTotalPropina').val('');
	$('#txtHoras').val();
	
	this.garzones = [];
	$('#lstGarzones').empty();
	this.listarGarzones();

	$('#divResultado').empty();
}

$(document).ready(function() {

	$('#txtTotalPropina').change(function(event) {
		app.totalPropina = parseInt($(this).val());
	});

	$('#btnAñadir').click(function(event) {
		if ($('#lstGarzones option:selected').val() == '-1'){
			alert('Debe seleccionar un garzon');
			return;
		}
		
		if ($('#txtHoras').val() == ''){
			alert('Debe ingresar horas trabajadas');
			return;
		}

		var horas = parseInt($('#txtHoras').val());
		if (horas > 24 || horas < 0)  {
			$('#txtHoras').val('');
			alert('Horas trabajadas fuera de rango');
			return;
		}

		var res = app.agregarGarzonCalculo($('#lstGarzones option:selected').text(),$('#txtHoras').val());
		if (res != '') {
			$('#lstGarzones option:selected').remove();
			$('#txtHoras').val('');
			alert('Se añadió Garzon <' + res + '> al calculo');
		} else {
			alert('Error');
		} 				

	});

	$('#btnCalcular').click(function(event) {
		if ($('#txtTotalPropina').val() == '') {
			alert('Debe ingresar total propinas');
			return false;
		}

		if (app.garzones.length == 0){
			alert('Debe ingresar garzones y las horas');
			return false;
		}

		app.obtieneCalculoPropina();

		$('#divReset').removeClass('hide');
	});

	$('#btnReset').click(function(event) {
		app.resetCalculaPropina();
	});

	app.listarGarzones();

});
