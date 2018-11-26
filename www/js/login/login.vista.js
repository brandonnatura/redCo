var loginVista = {
    init:function(){
        that = this;
        console.log('loginView Launched');
        $('.logeoEnter').keypress(that.enviarPreguntaTeclado);
        $('#btnIngresar').on('click',that.submitLogin);
        $('a#politicasRef').on('click',that.irPoliticas);
        $('#btnCerrarSesion').on('click',that.cerrarSesionCommunity);
        $('#btnvVolver').on('click',that.volver);
        $('#terms1').blur();
        //that.eliminarUsuarioActual();
        setTimeout('__dom.mostrarCargador()', 10); 
        //that.obtenerInformacionInicialSel();
        setTimeout('__dom.ocultarCargador()', 30);
        $("#selDepartamento").on("change",that.cambioMunicipios);
        $("#btnAtras").on("click",that.regresarIndex);
        that.obtenerInformacionInicial();
        that.validarSession();
        that.onDeviceReady();
        
        //$(document).on( "pageinit", "#myPage", function()
        $("#divLogin").on("pageinit",function(){
            $(".autocomplete").on("listviewbeforefilter",that.autocompletelistviewbeforefilterrefresh);
        });   



       
        //$( document).on( "click", ".autocomplete li", function() { 
        //$("li").on("click",that.autocompleteSelect);
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
            console.log(JSON.stringify(data));
            document.getElementById("regId").innerHTML = '<textarea id="SessionIDReg">'+data.registrationId+'</textarea>';
            __app.AlmacenarSessionIDgo(data.registrationId);
        });

        push.on('notification', function(data) {
            console.log("notification event index");
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
                }             
                __dom.ocultarCargador();
        });

        push.on('error', function(e) {
            console.log("push error");
            console.log(e);
        });
    },
    irPoliticas:function(){
        console.log('Entrada en irRed');
        //top.location.href = 'https://www.facebook.com/';
        var ref = cordova.InAppBrowser.open(encodeURI('http://docs.google.com/viewer?url=https://www.funcionpublica.gov.co/documents/418537/616038/Pol%C3%ADtica+para+el+tratamiento+de+datos+personales.pdf'), '_blank', 'location=yes');

    },
    cerrarSesionCommunity:function(){
        console.log('Entra a cerrarSesionCommunity');
        that.eliminarUsuarioActual();
        loginControl.cerrarSesionCommunity();
        window.location= "login.html";

    },
    obtenerInformacionInicialSel:function(){ 
        loginControl.obtenerDepartamentos(that.obtenerDepartamentosCompletado);
        loginControl.obtenerMunicipios(that.obtenerMunicipiosCompletado);
        loginControl.obtenerEntidades(that.obtenerEntidadesCompletado);
    },
    obtenerDepartamentosCompletado:function(data){
        if(data !== 'undefined'){
            loginModel.Departamentos = data;
          $.each(loginModel.Departamentos,function(i,item){
            $("#selDepartamento").append(
              $("<option>").val(item.departamentoId).html(item.nombreDepartamento)
            );
          });      
        }
    __dom.ocultarCargador();
    },
    obtenerMunicipiosCompletado:function(data){
        if(data !== 'undefined'){
            loginModel.Municipios = data;               
        }
    __dom.ocultarCargador();
    },
    obtenerEntidadesCompletado:function(data){
        if(data !== 'undefined'){
            loginModel.Entidades = data; 
            setTimeout('that.autocompletelistviewbeforefilter();', 10);               
        }
    __dom.ocultarCargador();
    },
    cambioMunicipios:function(event){
        var opcionSeleccionada = $(this).find("option:selected").val();
        console.log("valor seleccionado: "+opcionSeleccionada);
        that.reiniciarMunicipiosSelect();
        $.each(loginModel.Municipios,function(i,item){
          //console.log("val: "+item.Departamento.idDepartamento+"/"+opcionSeleccionada);
          if(item.departamentoId.toString() === opcionSeleccionada){
            //console.log("entre: "+i);
            $("#selMunicipio").append(
              $("<option>").val(item.ciudadId).html(item.nombreCiudad)
            );
          }
        });
    },
    reiniciarMunicipiosSelect:function(){
        $("#selMunicipio-button span").html("* Municipios");
        $("#selMunicipio").find("option").remove().end().append($("<option>").val(0).html("* Municipios")).val("0");
    },
    autocompletelistviewbeforefilterrefresh:function(e, data){
        var $ul = $(this);                       // $ul refers to the shell unordered list under the input box
        var value = $( data.input ).val();        // this is value of what user entered in input box
        // clears value of set the html content of unordered list
        
        // on third character, trigger the drop-down
        if ( value && value.length > 3 ) {
        // hard code some values... TO DO: replace with AJAX call
        //var response = ['1111','1112','1113','1114','2116','2117','2119'];
            $("form.ui-filterable a.ui-btn").removeClass("ui-icon-delete").addClass("ui-icon-ajax");            
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout"); 
            $('.autocomplete').show(); 
            $("form.ui-filterable a.ui-btn").removeClass("ui-icon-ajax").addClass("ui-icon-delete");
        }else{
           $('.autocomplete').hide();   
        }
    },
    autocompletelistviewbeforefilter:function(e, data){
        var src = loginModel.Entidades;
        /*var dropdownContent='';
        $.each(response, function( index, val ) {
                dropdownContent +=  val.NOMBRE_INSTITUCION;                 
        });
        var src = [
              "ActionScript",
              "AppleScript",
              "Asp",
              "BASIC",
              "C",
              "C++",
            ];*/
        $("#txtEntidad").autocomplete({
            minLength:5,
            //source: src,
            source: function(request, response) {
                var results = $.ui.autocomplete.filter(src, request.term);                
                response(results.slice(0, 50));
            },
            open: function(event, ui) {
                $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
            }
        }); 

    //$(document).on( "pageinit", "#myPage", function() {
    //  $( ".autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {        
        //var $ul = $(this);
        /*var $ul = $(".autocomplete");                        // $ul refers to the shell unordered list under the input box
        //var value = $( data.input ).val();        // this is value of what user entered in input box
        var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
        $ul.html("") ;                            // clears value of set the html content of unordered list
        
        // on third character, trigger the drop-down
        //if ( value && value.length > 3 ) {
        // hard code some values... TO DO: replace with AJAX call
        //var response = ['1111','1112','1113','1114','2116','2117','2119'];
            $("form.ui-filterable a.ui-btn").removeClass("ui-icon-delete").addClass("ui-icon-ajax");
            var response = loginModel.Entidades;
            $('.autocomplete').hide();           
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading' ></span></div></li>" );
            $ul.listview( "refresh" );
            $.each(response, function( index, val ) {
                dropdownContent += "<li  class='loginLi'>" + val.NOMBRE_INSTITUCION + "</li>";                 
            });
            $ul.html( dropdownContent );
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout"); 
            $("form.ui-filterable a.ui-btn").removeClass("ui-icon-ajax").addClass("ui-icon-delete");
        //}
      //})*/
    //});
    },  
    
    // click to select value of auto-complete
    /*autocompleteSelect:function(){
    //$( document).on( "click", ".autocomplete li", function() {      
        var selectedItem = $(this).html();
        $(this).parent().parent().find('input').val(selectedItem);   
        $('.autocomplete').hide();     
    //});
    },*/
    enviarPreguntaTeclado:function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) {
            $('#btnIngresar').focus();
            that.submitLogin();
        }
    },
    submitLogin:function(e){
        //e.preventDefault();
        console.log('Form Submitted');
        var resultEmail = __app.validarEmail($('#txtUsuario').val());
        console.log('El resultado es: '+resultEmail);
        if($('#txtPass').val() == '' || $('#txtUsuario').val() == '' ){            
                navigator.notification.alert(
                    'Todos los campos son obligatorios.',  // message
                    null,         // callback
                    'Alerta',            // title
                    'OK'                  // buttonName
                );
            //alert('Debe escribir una direccion de correo valida!');
        }else{            
            if(resultEmail){
                var termsAcepto= $("#terms1").is(':checked');
                var termsAcepto=true;                
                if(termsAcepto ===true){
                    var cod_inst="";
                    var entidad=$('#txtEntidad').val();
                    if(entidad !=""){
                        var response = loginModel.Entidades;
                        $.each(response, function( index, val ) {
                            if(entidad ==val.value){
                                cod_inst=val.COD_INSTITUCION;
                            }               
                        });  
                    }
                    var SessionIDgo = __app.ObtenerSessionIDgo(); 

                    var data = {
                        //botid: servidorAgentibotid,
                        kpass: $('#txtPass').val(),
                        knombre: $('#txtUsuario').val(),
                        idMovil : SessionIDgo,
                        typeMovil: cordova.platformId
                    };
                    var respuesta = loginControl.obtenerIdSesion(data);
                    __dom.mostrarCargador();
                    //console.log(respuesta);
                    //respuesta= true;
                    if(respuesta === null || respuesta === undefined || respuesta.code == 500 ){
                            var dataAlert={
                                  mensaje: respuesta.msg ,
                                  callback:null,
                                  titulo: 'Red conexiones',
                                  nombreBoton: 'Aceptar'
                            };
                            __dom.ocultarCargador();
                            __dom.mostrarDialogo(dataAlert);

                    }else{
                        __app.AlmacenarUltimoTextoAsesorCont(0);
                        usuarioAlmacenar = {
                            userid:respuesta.userid, 
                            email : $('#txtUsuario').val(),
                            nombre : $('#txtPass').val(),
                            accesibilidad : 0,
                            historial : ''
                        };
                        console.log(usuarioAlmacenar);                    
                        var resultado = loginControl.guardarUsuarioActual(usuarioAlmacenar);        
                        UltimoUsuarioLogeado = {
                            email : $('#txtUsuario').val(),
                            nombre : $('#txtPass').val(),
                        };
                        loginControl.almacenarUltimoUsuarioLogeado(UltimoUsuarioLogeado);              
                        console.log('nuevo usuario guardado? '+resultado);
                        //window.location = 'chat.html';
                        __dom.ocultarCargador();
                        
                        $('#divContentLogin').hide();
                        $('#btnIngresar').hide();
                        $('#btnCerrarSesion').show();
                        $('#btnvVolver').show();
                        var ref = cordova.InAppBrowser.open(encodeURI(servidorUrl), '_blank', 'location=yes');

                    }
                }else{
                    var data = {
                        knombre: $('#txtPass').val(),
                        kmail: $('#txtUsuario').val(),
                    };
                    var dataAlert={
                        mensaje: "Debe aceptar las políticas de Privacidad de Datos",
                        callback:null,
                        titulo: "Políticas",
                        nombreBoton: "Aceptar"
                    };
                 __dom.mostrarDialogo(dataAlert);
                }                          
            }else{
                navigator.notification.alert(
                    'Dirección de correo electrónico no válida',  // message
                    null,         // callback
                    'Alerta',            // title
                    'OK'                  // buttonName
                );
                 // alert('Es necesario digitar un nombre de usuario!');
            }
        }
    },
    obtenerInformacionInicial:function(){ 
        var UltimoUsuarioLogeado = loginControl.obtenerUltimoUsuarioLogeado();
        if(UltimoUsuarioLogeado!=null && UltimoUsuarioLogeado!=''){
            $('#txtUsuario').val(UltimoUsuarioLogeado.email);
            $('#txtPass').val(UltimoUsuarioLogeado.nombre);
        }           
    },
    validarSession:function(){
        console.log('Entrada en validarSession');
        console.log(__app.obtenerUsuarioActual());
        if(__app.obtenerUsuarioActual() !== null){
            $('#divContentLogin').hide();
            $('#btnIngresar').hide();
            $('#btnCerrarSesion').show();
            $('#btnvVolver').show();
            var ref = cordova.InAppBrowser.open(encodeURI(servidorUrl), '_blank', 'location=yes');
        }else{
            $('#divContentLogin').show();
            $('#btnIngresar').show();
            $('#btnCerrarSesion').hide();
            $('#btnvVolver').hide();
        }
    },
    eliminarUsuarioActual:function(){
        __app.eliminarUsuarioActual();
    },
    volver:function(){
        $('#divContentLogin').hide();
        $('#btnIngresar').hide();
        $('#btnCerrarSesion').show();
        $('#btnvVolver').show();
        var ref = cordova.InAppBrowser.open(encodeURI(servidorUrl), '_blank', 'location=yes');
    },
    regresarIndex:function(){
        window.location= "../index.html";
    }
};
function onBackKeyDown() {
     window.location= "../index.html";
}