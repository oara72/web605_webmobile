/*
	WEB 303
	Starting file for Assignment 2 
	{Oliver Rodriguez}
*/

$(document).ready(function() {  // se crea una function ready de jquery
	$('#content a').on('click', function (){
		var $joder = $(this).attr("id");  // se almacena la info que quiero desplegar en una variable
	$('#solution').load('solutions.html #'+ $joder );
	});


});