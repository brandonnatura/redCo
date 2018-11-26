var loginControl = {
	obtenerUsuarioAlmacenado:function(actUser){
		console.log('entre a obtenerUsuarioAlmacenado');
		return __app.obtenerUsuarioAlmacenado(actUser);
	},
	guardarUsuarioActual:function(actUser){
		console.log('entre a guardarUsuarioActual');
		return __app.almacenarUsuarioActual(actUser);
	},
	obtenerIdSesion:function(data){
		return __cnn.ajax({
			'url': servidorUrl+'validation',
            'async': false,
            'data': data,
            'type':'POST'
		});
	},
	cerrarSesionCommunity:function(){
		return __cnn.ajax({
			'url': servidorUrl+'logout_service',
            'async': false,
            'type':'POST'
		});
	},
	almacenarUltimoUsuarioLogeado:function(actUser){
		console.log('entre a almacenarUltimoUsuarioLogeado');
		return __app.almacenarUltimoUsuarioLogeado(actUser);
	},
	obtenerUltimoUsuarioLogeado:function(){
		console.log('entre a obtenerUltimoUsuarioLogeado');
		return __app.obtenerUltimoUsuarioLogeado();
	},
	obtenerDepartamentos:function(completado){
		return __cnn.ajax({
			'url': '../js/index/data/departamentos.json',
      'completado':completado,      
      'type': 'POST'
		});
	},
	obtenerMunicipios:function(completado){
		return __cnn.ajax({
			'url': '../js/index/data/ciudades.json',
      'completado':completado,
      'type': 'POST'
		});
	},
	obtenerEntidades:function(completado){
		return __cnn.ajax({
			'url': '../js/index/data/entidades.json',
      'completado':completado,
      'type': 'POST'
		});
	}

};