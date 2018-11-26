var __dom = {
	mostrarCargador:function() {
		$.mobile.loading("show",{
			text: 'Procesando...',
			textVisible: true,
			theme: 'b',
			html: ""
		});
	},
	ocultarCargador:function() {
    	$.mobile.loading("hide");    	
	},
	onKeyboardHide:function(){
		console.log('onKeyboardHide');
	},
	onKeyboardShow:function(){
		console.log('onKeyboardShow');
	},
	validarFormulario:function(form) {
	    try{
			if (!(form instanceof jQuery)) {
				form = $(form);
			}
		    var errores = '';
		    var requeridos = form.find('*[required]');
		    $.each(requeridos, function(i, item) {
		        item = $(item);
		        var validacion = __dom.validarControl(item);
		        if (validacion === true) {
		            item.parent().removeClass('has-errors').removeClass('has-warning').addClass('has-success');
		        } else {
		            item.parent().removeClass('has-success').removeClass('has-warning').addClass('has-errors');
		            errores += validacion + '\n';
		        }
		    });

		    if (errores.length > 0) {
		    	var dataAlert={
						mensaje: errores,
						callback:null,
						titulo: 'Error de registro',
						nombreBoton: 'Aceptar'
					};
					__dom.mostrarDialogo(dataAlert);
		      return false;
		    }
		    else{
		    	return true;
		    }
	    } catch(error){
	    	console.log(error);
	    }
	},
	validarControl:function(control) {
	    var valor = control.val();
	    var resultado = '';
	    switch (control.prop('tagName')) {
	        case 'INPUT':
	            if (valor.trim() === '') {
	                resultado = 'El campo '+control.attr('placeholder') +' se encuentra vacío';
	            } else if (control.attr('pattern') !== undefined) {
	                var exp = new RegExp(control.attr('pattern'));
	                if (!exp.test(valor)) {
	                    resultado = __app.mensajes[control.attr('data-mensaje')];
	                }
	            } else {
	                return true;
	            }
	            break;
	        case 'SELECT':
	            if (valor === '' || valor === null || valor === 0) {
	                resultado = __app.mensajes.seleccionarOpcion;
	            } else {
	                return true;
	            }
	            break;
	    }
	    return Mustache.render(resultado, {item: control.prev('label').text().replace(':', '').replace('(*)', '').replace('/', '-')});
	},
	mostrarDialogo:function(args){
		navigator.notification.alert(args.mensaje,args.callback,args.titulo,args.nombreBoton);
	}
};

