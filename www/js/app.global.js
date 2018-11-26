function App(){
};

var nom_local="AgenteFuncionP";

App.prototype.validarEmail = function(mail){
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	return regex.test(mail);
};


App.prototype.almacenarUltimoUsuarioLogeado = function(usuario){
    console.log('entre a almacenarUltimoUsuarioLogeado');
    try {
        window.localStorage.setItem('ultUsuLogeo'+nom_local,JSON.stringify(usuario));
        return true;
    }
    catch(err) {
        console.log(err.message);
        return false;
    }
};

App.prototype.obtenerUltimoUsuarioLogeado = function(){
    console.log('entre a obtenerUltimoUsuarioLogeado');
    try {
        return JSON.parse(window.localStorage.getItem('ultUsuLogeo'+nom_local));
    }
    catch(err) {
        console.log(err.message);
        return null;
    }
};


App.prototype.almacenarUsuarioActual = function(usuario){
	console.log('entre a almacenarUsuarioActual');
    try {
        window.localStorage.setItem('currentUsuario'+nom_local,JSON.stringify(usuario));
        return true;
    }
    catch(err) {
        console.log(err.message);
        return false;
    }
};

App.prototype.obtenerUsuarioActual = function(){
    console.log('entre a obtenerUsuarioActual');
    try {
        return JSON.parse(window.localStorage.getItem('currentUsuario'+nom_local));
    }
    catch(err) {
        console.log(err.message);
        return null;
    }
};

App.prototype.eliminarUsuarioActual = function(){
    var userCurren = JSON.parse(window.localStorage.getItem('currentUsuario'+nom_local));
    var jsession = userCurren.jsession;
    console.log('entre a eliminarUsuarioActual'+nom_local);
    try {       
        /*var newMess = {exit: 1, smail: 0 };
        var result = chatControl.obtenerRespuestaAsesor(newMess , jsession);*/
        window.localStorage.removeItem('currentUsuario'+nom_local);
        window.sessionStorage.clear();
        return true;
    }
    catch(err) {
        console.log(err.message);
        return null;
    }
};

App.prototype.almacenarHistorialUsuario = function(hist,mail){
	console.log('entre a almacenarHistorialUsuario');
	try{
	    var usuario = JSON.parse(window.localStorage.getItem('currentUsuario'+nom_local));
	    
	    usuario.historial = hist;
        console.log('El historial');
                //console.log(item.historial);
	    window.localStorage.setItem('currentUsuario'+nom_local,JSON.stringify(usuario));
	    
    }
    catch(err) {
        console.log(err.message);
    }
};

App.prototype.AlmacenarSessionIDgo = function(IDgo){
    console.log('entre a AlmacenarSessionIDgo');
    try {
        window.sessionStorage.setItem('SessionIDgo'+nom_local,IDgo);
        return true;
    }
    catch(err) {
        console.log(err.message);
        return false;
    }
};

App.prototype.ObtenerSessionIDgo = function(){
    console.log('entre a ObtenerSessionIDgo');
    try {
        return window.sessionStorage.getItem('SessionIDgo'+nom_local);
    }
    catch(err) {
        console.log(err.message);
        return null;
    }
};

App.prototype.AlmacenarUltimoTextoAsesorCont = function(cont){
    console.log('entre a AlmacenarUltimoTextoAsesorCont');
    try {
        window.localStorage.setItem('UltimoTextoAsesorCont'+nom_local,cont);
        return true;
    }
    catch(err) {
        console.log(err.message);
        return false;
    }
};

App.prototype.ObtenerUltimoTextoAsesorCont = function(){
    console.log('entre a ObtenerUltimoTextoAsesorCont');
    try {
        return window.localStorage.getItem('UltimoTextoAsesorCont'+nom_local);
    }
    catch(err) {
        console.log(err.message);
        return null;
    }
};



















