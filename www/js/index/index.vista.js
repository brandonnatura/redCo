var that;
var indexVista = {	
	ref:null,
	init:function(){
		that = this;
		console.log('Entrada en index');
		$('#chatRef').on('click',that.irChat);
		$('#normativaRef').on('click',that.irNormativa);
		$('#redRef').on('click',that.irRed);
		$('#fpRef').on('click',that.irFP);
		$('#camRef').on('click',that.irCamara);		
		$('#emailRef').on('click',that.irEmail);
		$('#phoneRef').on('click',that.irPhone);
		$('#facebookRef').on('click',that.irFacebook);
		$('#youtubeRef').on('click',that.irYoutube);
		$('#iniciarSession').on('click',that.irLogin);
		that.onDeviceReady();        
        /*if(__app.obtenerUsuarioActualGCP()!== null){
        	setTimeout('that.extSession()', 1000);
		}*/	
		//that.checkConnection();	
	},

	agregarConversacionHistorial: function(texto){
		var userActual=__app.obtenerUsuarioActual();
		if(userActual.historial !== undefined){
			texto = chatVista.replaceAll(texto,"<p>", "");
			texto = chatVista.replaceAll(texto,"</p>", "<br>");
			texto = chatVista.replaceAll(texto,"<br/><br/><br/>", "<br/>");
			texto = chatVista.replaceAll(texto,"<br/><br/>", "<br/>");
			texto = chatVista.replaceAll(texto,"<br/><br/>", "<br/>");
			texto = chatVista.replaceAll(texto,"<br><br><br>", "<br>");
			texto = chatVista.replaceAll(texto,"<br><br>", "<br>");	
			
			if(texto.indexOf('target="_blank"') >= 0){
				texto=texto.replace('target="_blank"', ' target="_blank" onclick="irNavegador(this);" ');
			}
				
			var f = new Date();
			var id= "'"+f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()+"-"+f.getHours() + "-" + f.getMinutes() + "-" + (f.getSeconds()+1)+"'";
			
			var nuevo ='<div class="mensaje"><div id="'+id+'" class="mensajeMaquina"><strong>Asesor dice: </strong>'+texto+'<div><div class="fechaTama">'+f.toLocaleString()+'</div><div class="botonTama"><button class="goTextoVoz" onclick="irTextoVoz('+id+');"><span class="fa fa-play-circle" style="font-size: 2.72rem;" ></span></button><button class="goTextoVoz goTextoVozStop" onclick="irTextoVozStop();"><span class="fa fa-stop-circle" style="font-size: 2.72rem;" ></span></button></div></div></div></div>';
			
			var historial=userActual.historial+nuevo;
			__app.almacenarHistorialUsuario(historial,null);
		}
	},
	onDeviceReady: function() {
        var push = PushNotification.init({
            "android": {
                "senderID": "173404398879",
                "clearBadge":"true",
                "forceShow":"true"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true", "clearBadge": "true"}, 
            "windows": {} 
        });
        
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = '<textarea id="SessionIDReg">'+data.registrationId+'</textarea>';
            __app.AlmacenarSessionIDgo(data.registrationId);
            /*var SessionIDgo = __app.ObtenerSessionIDgo();            
        	alert(SessionIDgo);*/
            //setTimeout("window.location = 'views/login.html'", 1000);
            //window.location = 'views/login.html';
        });

        push.on('notification', function(data) {
            console.log("notification event index");
            //alert(JSON.stringify(data));
            push.finish(function() {
		        console.log("processing of push data is finished");
		    });
	        console.log(JSON.stringify(data));

	        //Espera de Cola
	        __dom.ocultarCargador();
	        
	       
	            //Conversacion        
	            if(data.additionalData.info == 'newsletter'){
                    var servidorUrl2 = servidorUrl +'view?boud='+data.additionalData.cola;
	            	var ref = cordova.InAppBrowser.open(encodeURI(servidorUrl2), '_blank', 'location=yes');
	            }else{
	            	window.location = 'views/login.html';	
	            }
	            /*else if(data.additionalData.info == 'AsesorLeave'){
	                that.AsesorLeave();
	            }else{	   
	            	var cont = __app.ObtenerUltimoTextoAsesorCont(); 
			        var contAct=parseInt(data.additionalData.info);
			        console.log(cont+'<'+contAct);
					if(cont<contAct){         	
		                that.agregarConversacionHistorial(data.message+'</br>');
		                __app.AlmacenarUltimoTextoAsesorCont(contAct);
		                //chatModel.ultimoTextoAsesor=contAct;
		            }
		        }*/	             
	            __dom.ocultarCargador();
	        		    
	        //window.location = 'views/login.html';
        });

        push.on('error', function(e) {
            console.log("push error");
            console.log(e);
        });
    },
    AsesorLeave:function() {
        answer = "La sesi&oacute;n ha sido finalizada!";				
	                that.agregarConversacionHistorial(answer+'</br>');
	                var dataAlert={
				          mensaje: "La sesion ha sido finalizada!",
				          callback:null,
				          titulo: 'Interrumpido',
				          nombreBoton: 'Aceptar'
					};
					__dom.mostrarDialogo(dataAlert);					
	                //that.regresarCerrarSesion(1);
    },

    ServerDown:function(resp) {                  
         //answer = "Estamos experimentando un inconveniente de conexi&oacute;n, por favor env&iacute;enos su solicitud en el siguiente <a href='javascript:void(0);' onclick='agLeave()' class = 'link'>link</a> y le responderemos en el menor tiempo posible.";
	                that.agregarConversacionHistorial(resp+'</br>');
	                var dataAlert={
				          mensaje: resp,
				          callback:null,
				          titulo: 'Interrumpido',
				          nombreBoton: 'Aceptar'
					};
					__dom.mostrarDialogo(dataAlert);
	                //that.regresarCerrarSesion(1);
    },
    timeOut:function(resp) {
        //$('#divPos').html("");
        //timeOut = "Expiró el tiempo para que lo atendiera un asesor";				
	    that.agregarConversacionHistorial(resp+'</br>');
                    //that.eliminarUsuarioActual();
                    var dataAlert={
                        mensaje: resp,
                        callback:null,
                        titulo: 'Chat',
                        nombreBoton: 'Aceptar'
        };
        __dom.mostrarDialogo(dataAlert);
        __dom.ocultarCargador();
    },
    setPositionQueue:function(q) {
        console.log(q);
        if (q > 0) {
            chatModel.numeroCola=q;
            //$('#divPos').html("<p>Usted tiene la posici&oacute;n <strong>" + q + "</strong> en la cola de espera.</p>");
            var dataAlert={
                mensaje: "<p>Usted tiene la posici&oacute;n <strong>" + q + "</strong> en la cola de espera.</p>",
                callback:null,
                titulo: 'Chat',
                nombreBoton: 'Aceptar'
            };
        } 
    },
    checkConnection:function() { 
	    var networkState = navigator.connection.type; 

	    var states = {}; 
	    states[Connection.UNKNOWN]  = 'Unknown connection'; 
	    states[Connection.ETHERNET] = 'Ethernet connection'; 
	    states[Connection.WIFI]     = 'WiFi connection'; 
	    states[Connection.CELL_2G]  = 'Cell 2G connection'; 
	    states[Connection.CELL_3G]  = 'Cell 3G connection'; 
	    states[Connection.CELL_4G]  = 'Cell 4G connection'; 
	    states[Connection.NONE]     = 'No network connection'; 

	    alert('Connection type: ' + states[networkState]); 
	},
	irChat:function(){
		console.log('Entrada en irChat');
		console.log(__app.obtenerUsuarioActual());
		__app.AlmacenarSessionIDgo($("#SessionIDReg").val());
		if(__app.obtenerUsuarioActual()!== null){
			console.log('Entrada en irChat 1');
			window.location=indexModel.chatUrl;
		}
		else{
			console.log('Entrada en irChat 2');
			window.location=indexModel.loginUrl;
		}
	},	
	renderLista:function(data){
		if(data.codigo === 1){
			__app.almacenarListaDirectorio(data.datos);
			window.location=indexModel.contactUrl;
		}else{
			var dataAlert={
		          mensaje: "No se ha podido establecer conexión con internet",
		          callback:null,
		          titulo: 'Error cargar Directorio',
		          nombreBoton: 'Aceptar'
		    };
		    __dom.mostrarDialogo(dataAlert);
		}
	},
	cargarDirectorioSinConexion:function(){
		if(__app.obtenerListaDirectorio()!=null){
			window.location=indexModel.contactUrl;
		}else{
			var dataAlert={
		          mensaje: "No se ha podido establecer conexión con internet",
		          callback:null,
		          titulo: 'Error cargar Directorio',
		          nombreBoton: 'Aceptar'
		    };
		    __dom.ocultarCargador();
		    __dom.mostrarDialogo(dataAlert);

		}
		
	},
	irLogin:function(){
		console.log('Entrada en irEquipos');
		//top.location.href = 'https://www.facebook.com/';
		window.location = 'views/login.html';
		
	},
	
 	consultarConexionNormatividad:function(data){    
  	  	window.location=indexModel.filtroNormatividad;
 	},
 	noHayConexionError:function(){
 	__dom.ocultarCargador();
	var dataAlert={
	        mensaje: "No se ha podido establecer conexión con internet",
	        callback:null,
	        titulo: "Normatividad",
	        nombreBoton: "Aceptar"
	    };
	    __dom.mostrarDialogo(dataAlert); 
	},

	irCamara:function(){
		console.log('Entrada en irCamara');		
		window.location=indexModel.camaraUrl;
	},

	irEmail:function(){
		console.log('Entrada en irEmail');
		//window.location.href = "mailto:prue@a.gov.co";
		window.open('mailto:prue@a.gov.co', '_system');
	},
	irPhone:function(){
		console.log('Entrada en irPhone');
		window.location.href = "tel:000 000";
	},
	changeBackgroundColor:function() {
		console.log('Entre en cambio css');
        that.ref.insertCSS({
            code: "iframe { width: 100% !important; min-width: 100% !important; min-height: 100vh !important; }"
        }, function() {
            console.log("Styles Altered");
        });
    },
    iabClose:function(event) {
    	console.log('Entrada en iabClose');
        that.ref.removeEventListener('loadstop', that.changeBackgroundColor);
        that.ref.removeEventListener('exit', that.iabClose);
    }
};

function onBackKeyDownIndex() {
	navigator.app.exitApp();
     //window.location= "menuPqrd.html";
}