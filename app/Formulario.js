//console.log("Formulario");
function cleanInput(inputs){
    inputs.forEach(function(Arreglo,i){
        document.getElementById(Arreglo).value="";
    });
}

var Storage = window.localStorage;
var estudiantes=[];

window.onload = function(){
    var dEstudiantes = Storage.getItem("Estudiantes");
    if(dEstudiantes != undefined){
        console.log("Estudiante encontrado.");
        estudiantes = JSON.parse(dEstudiantes);
        estudiantes.forEach(function(Value,i){
            agregarHTML(Value);
        });
    }
    else{
        this.console.log("Estudiantes no encontrado.");
    }
}
function read(){
    var nombre = document.getElementById("nombre").value;
    var matricula = document.getElementById("matricula").value;
    var identificacion = document.getElementById("identificacion").value;

    var est = new Estudiante();
    est.nombre = nombre;
    est.matricula = matricula;
    est.identificacion = identificacion;

    for(var i=0 ; i<estudiantes.length ; i++){
        if(estudiantes[i].matricula == matricula){
            return editar(i);
        }
    }
    agregar(est);
    cleanInput(["nombre","matricula","identificacion"]);
}
function agregar(estudiante){
    estudiantes.push(estudiante);

    agregarHTML(estudiante); // Agregar a la Tabla HTML

    Storage.setItem("Estudiantes", JSON.stringify(estudiantes));// Guardar en LocalStore
}
function agregarHTML(estudiante){

    var tabla = document.getElementById("tabla");
    var tdNombre = document.createElement("td");
    var tdMatricula = document.createElement("td");
    var tdIdentificacion = document.createElement("td");
    var tdActions = document.createElement("td");

    var btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    btnEditar.setAttribute("onclick", "btnEditar(this);");
	btnEditar.setAttribute("class", "btn btn-outline-dark");
    btnEditar.setAttribute("matricula", estudiante.matricula);
	tdActions.setAttribute("align", "right");
    tdActions.appendChild(btnEditar);

    var tr = document.createElement("tr");
    tdNombre.textContent = estudiante.nombre;
    tdMatricula.textContent = estudiante.matricula;
    tdIdentificacion.textContent = estudiante.identificacion;
    
    tr.appendChild(tdNombre);
    tr.appendChild(tdMatricula);
    tr.appendChild(tdIdentificacion);
    tr.appendChild(tdActions);
	

    tabla.appendChild(tr);
}
function btnEditar(Matricula){
    var ID = Matricula.getAttribute("matricula");
    
    for(var i=0 ; i<estudiantes.length ; i++){
        if(estudiantes[i].matricula == ID){
            document.getElementById("nombre").value = estudiantes[i].nombre;
            document.getElementById("matricula").value = estudiantes[i].matricula;
            document.getElementById("identificacion").value = estudiantes[i].identificacion;
        }
    }
}

function editar(code){
    estudiantes[code].nombre = document.getElementById("nombre").value;
    estudiantes[code].identificacion = document.getElementById("identificacion").value;
    
    Storage.setItem("Estudiantes", JSON.stringify(estudiantes));// Guardar en LocalStore
    cleanInput(["nombre","matricula","identificacion"]);
    location.reload(); // Cargando pagina...
}