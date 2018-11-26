function Cnn(){
};

Cnn.myError = null;

Cnn.prototype.ajax = function(args) {
    var result = undefined;
    var defecto = {
        'url':args.url,
        'data':(args.data)?args.data:null,
        'type': (args.type)?args.type : 'GET',
        'async': (args.async!==null || args.async!==undefined)?args.async:true,
        'dataType': (args.tipo)?args.tipo:'json',
        'success': (args.async!==undefined)?function(data){__dom.mostrarCargador(); result = data;  }:args.completado,
        'error': (args.error)?args.error:this.capturarError,
        'contentType': 'application/x-www-form-urlencoded;charset=ISO-8859-1',
        'beforeSend': (!args.background)?function(){__dom.mostrarCargador();}:null,
        'timeout':180000000      

    };

   $.ajax(defecto);
       
   /*if(xhr && xhr.readyState != 4) { 
        console.log(xhr);
        console.log(result);
        xhr.fail(function() { 
            conn = false; 
            console.log(conn);
            xhr.abort();
            result = 0;
            return false;
        })
        .done(function() { 
            conn = true; 
            console.log(conn);
        });
        
    }*/

    if(typeof result !== "undefined"){
        return result;
    }
    /* 
    else{
        return Cnn.myError.responseText;
    }*/
};

Cnn.prototype.capturarError = function(_error, textStatus) {
    __dom.ocultarCargador();
    Cnn.myError = _error;
    console.error(_error);
    if (_error.status === 0) {                       
                    //alert('No hay conexion: Comprobar la red.');
        navigator.notification.alert('No hay conexion: Comprobar la red.', null, 'Error');
    } else if (_error.status == 404) {                
                    //alert('La página solicitada no se encuentra [404]');
        navigator.notification.alert('La página solicitada no se encuentra [404]', null, 'Error');
    } else if (_error.status == 500) {      
                    //alert('Error Interno Del Servidor [500].');
        navigator.notification.alert('Error Interno Del Servidor [500].', null, 'Error');
    } else if (textStatus === 'parsererror') {                
                    //alert('Requested JSON parse failed.');
        navigator.notification.alert('Requested JSON parse failed.', null, 'Error');
    } else if (textStatus === 'timeout') {             
                    //alert('Error de tiempo de espera.');
        navigator.notification.alert('Error de tiempo de espera.', null, 'Error');
    } else if (textStatus === 'abort') {                
                    //alert('Ajax request aborted.');
        navigator.notification.alert('Ajax request aborted.', null, 'Error');
    } else {                
                    //alert('Error no detectado: ' + jqXHR.responseText);
        navigator.notification.alert('Error no detectado: ' + _error.responseText, null, 'Error');
     }
};