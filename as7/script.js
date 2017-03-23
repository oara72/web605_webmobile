/*
	WEB 303
	Starting file for Assignment 2 
	{Oliver Rodriguez}
*/

$(document).ready(function() {  // se crea una function ready de jquery

    $("#villains1").on('click',function(){
        $('#outputArea').html('');

        var ping = new XMLHttpRequest();
        ping.open('Head','/index.html');
        ping.send();

        if (localStorage.getItem('villains1') != null || localStorage.getItem('villains1') != undefined) {
            $("#outputArea").append('<pre>');
            $("#outputArea pre").append(localStorage.getItem('villains1'));
        }else{

            ping.addEventListener('load',function(){

                if(ping.status == 200){
                    console.log('Status: online');
                    $.getJSON('data/villains1.json', function(data){
                        console.log('Set Data in localStorage');
                        localStorage.setItem('villains1',JSON.stringify(data,null,'\t'));

                        //JSON.parse(localStorage.getItem('villains1'));

                        $("#outputArea").append('<pre>');
                        $("#outputArea pre").append(localStorage.getItem('villains1'));


                    });

                }

            });


        }


    });

    $("#villains2").on('click',function(){
        $('#outputArea').html('');

        var ping = new XMLHttpRequest();
        ping.open('Head','/index.html');
        ping.send();

        if (localStorage.getItem('villains2') != null || localStorage.getItem('villains2') != undefined) {
            $("#outputArea").append('<pre>');
            $("#outputArea pre").append(localStorage.getItem('villains2'));
        }else{

            ping.addEventListener('load',function(){

                if(ping.status == 200){
                    console.log('Status: online');
                    $.getJSON('data/villains2.json', function(data){
                        console.log('Set Data in localStorage');
                        localStorage.setItem('villains2',JSON.stringify(data,null,'\t'));

                        //JSON.parse(localStorage.getItem('villains2'));

                        $("#outputArea").append('<pre>');
                        $("#outputArea pre").append(localStorage.getItem('villains2'));


                    });

                }

            });


        }


    });

    $("#villains3").on('click',function(){
        $('#outputArea').html('');

        var ping = new XMLHttpRequest();
        ping.open('Head','/index.html');
        ping.send();

        if (localStorage.getItem('villains3') != null || localStorage.getItem('villains3') != undefined) {
            $("#outputArea").append('<pre>');
            $("#outputArea pre").append(localStorage.getItem('villains3'));
        }else{

            ping.addEventListener('load',function(){

                if(ping.status == 200){
                    console.log('Status: online');
                    $.getJSON('data/villains3.json', function(data){
                        console.log('Set Data in localStorage');
                        localStorage.setItem('villains3',JSON.stringify(data,null,'\t'));

                        //JSON.parse(localStorage.getItem('villains3'));

                        $("#outputArea").append('<pre>');
                        $("#outputArea pre").append(localStorage.getItem('villains3'));


                    });

                }

            });


        }


    });

    $("#villains4").on('click',function(){
        $('#outputArea').html('');

        var ping = new XMLHttpRequest();
        ping.open('Head','/index.html');
        ping.send();

        if (localStorage.getItem('villains4') != null || localStorage.getItem('villains4') != undefined) {
            $("#outputArea").append('<pre>');
            $("#outputArea pre").append(localStorage.getItem('villains4'));
        }else{

            ping.addEventListener('load',function(){

                if(ping.status == 200){
                    console.log('Status: online');
                    $.getJSON('data/villains4.json', function(data){
                        console.log('Set Data in localStorage');
                        localStorage.setItem('villains4',JSON.stringify(data,null,'\t'));

                        //JSON.parse(localStorage.getItem('villains4'));

                        $("#outputArea").append('<pre>');
                        $("#outputArea pre").append(localStorage.getItem('villains4'));


                    });

                }

            });


        }


    });
});