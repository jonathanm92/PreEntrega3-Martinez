// BASE DE DATOS DE ALMUNOS CON SUS NOTAS EN UN SEMESTRE, TRIMESTRE O CUATRIMESTRE de Jonathan Martinez - Segunda Entrega//


//Funcion encargada de asignarle una letra a la nota final
function calculadorLetra (notas){
    if (notas >= 90){
        return "A";
    }else if ( notas >= 80){
        return "B";
    }else if ( notas >= 70){
        return "C";
    }else if ( notas >= 60){
        return "D";
    }else{
        return "F";
    }
}

//Declaracion de la clase para el objeto que vamos a utilizar
class Alumno {
    constructor(nombre, edad, nota){
        this.nombre = nombre;
        this.edad = edad;
        this.nota = nota;
    }

    get_datos(){
        alert(`Nombre: ${this.nombre} \nEdad: ${this.edad} \nNota: ${this.nota}`);
        console.log(`Nombre: ${this.nombre} \nEdad: ${this.edad} \nNota: ${this.nota}`);
    }
    setNombre(nombre){
        this.nombre = nombre;
    }
    setEdad(edad){
        this.edad = edad;
    }
    setNota(nota){
        this.nota = nota;
    }
}
function isStudent (estudiante){
    return estudiante.nombre == fieldBusqueda;

}

// Declaracion de arreglo

let students = [];

// Declaracion de variables que voy a usar
let opcion = 1;
let fieldBusqueda;
let resultadoBusqueda;
let recuperar_students = localStorage.getItem("students");

// Agregando datos a nuestro arreglo para prueba
students.push(new Alumno("Jose", 24, "B"));
students.push(new Alumno("Pedro", 34, "A"));
students.push(new Alumno("Thomas", 14, "C"));

//Agregando objeto al local storage

//variables de los botones

const btnAgregar = document.getElementById("btn-Agregar");
const btnBorrar = document.getElementById("btn-Borrar");
const btnListaAlumnos = document.getElementById("btn-ListaAlumnos");
const btnBuscarAlumno = document.getElementById("btn-BuscarAlumnos");
const btnFinAgregar = document.getElementById("btn-Finalizar");
const btnSearch = document.getElementById("btn-search");
const btnActualizar = document.getElementById("btn-actualizar");

//variables suplementarias
const containerNotas = document.getElementById("container_notas");
const agregarContainer = document.getElementById("agregar_wrapper");
const periodosSeleccionados = document.querySelector(".periodos");
const taskForm = document.getElementById('task-form')
const listaAlumnos = document.getElementById("listaAlumnos");
const opcionActualizar = document.querySelector(".opcionActualizar");
let busquedaForm = document.getElementById("busqueda_wrapper");
let value = periodosSeleccionados.value;
let divActualizar = document.getElementById("divActualizar");
let test = document.getElementById("agregarActualizar");
const agregarPeriodo = document.getElementById("agregar_periodo-wrapper");

//Event listener de los botones

//-------------- Boton de agregar Alumnos --------//
btnAgregar.addEventListener("click", ()=>{
    if (agregarContainer.style.display == 'block'){
        agregarContainer.style.display = 'none';
    } else {
        agregarContainer.style.display = 'block';
    }

});

periodosSeleccionados.addEventListener("change", (e) => {
    value = periodosSeleccionados.value;
    agregarPeriodo.innerHTML = ``;
    for(let i = 0; i <value; i++){
            agregarPeriodo.innerHTML += `
            <div>
                <label for="Nota${i+1}">Nota #${i+1}:</label>
                <input class="notaInput" type="number" placeholder="#" id="nota${i+1}">
            </div>
            `;
    }
})

btnFinAgregar.addEventListener("click", ()=>{
    let name = document.getElementById("task-nombre").value;
    let age = document.getElementById("task-edad").value;
    let todasNotas = document.querySelectorAll(".notaInput");
    let j = 0;
    if(name == "" || age == ""){
        alert("Valor incorrecto en el nombre o edad");
    }else{
        let notas = 0; 
        for (let [i,nota] of todasNotas.entries()){
            if(nota.value == ""){
                alert("Valor incorrecto en la nota #" + (i+1) );
                break;
            }else{
                notas+= parseFloat(nota.value);
                j++;
            }
        }
        if(j>=3){
            notas = notas / j;
            recuperar_students = localStorage.getItem("students");
            if(recuperar_students != null){
                students = JSON.parse(recuperar_students);
                let estudiante = new Alumno (name, age, calculadorLetra(notas))
                students.push(estudiante);
                let students_JSON = JSON.stringify(students);
                localStorage.setItem("students", students_JSON);
                alert("Alumno Agregado!");
                document.getElementById("task-nombre").value ="";
                document.getElementById("task-edad").value = "";
                for (let nota of todasNotas){
                    nota.value = "";
                }
            agregarContainer.style.display = 'none';
            }else{
                let estudiante = new Alumno (name, age, calculadorLetra(notas))
                students.push(estudiante);
                let students_JSON = JSON.stringify(students);
                localStorage.setItem("students", students_JSON);
                alert("Alumno Agregado!");
                document.getElementById("task-nombre").value ="";
                document.getElementById("task-edad").value = "";
                for (let nota of todasNotas){
                    nota.value = "";
                }
                agregarContainer.style.display = 'none';
            }

        }
    }

})

//-------------- Boton de borrar Alumnos --------//

btnBorrar.addEventListener("click", ()=>{
    estudianteBusqueda = prompt("Introduzca el estudiante que desea borrar: ");
    resultadoBusqueda = students.find(isStudent);
        if (resultadoBusqueda){
            students = students.filter((person) => person.nombre != estudianteBusqueda);
            alert(`El alumno ${estudianteBusqueda} fue borrado de la base de datos`);
        }
        else{
            alert(`El alumno ${estudianteBusqueda} NO se encuentra en la base de datos`);
        }


})


//-------------- Boton de listar Alumnos --------//

btnListaAlumnos.addEventListener("click", ()=>{
    if (listaAlumnos.style.display == 'block'){
        listaAlumnos.style.display = 'none';
    } else {
        recuperar_students = localStorage.getItem("students");
        if(recuperar_students != null){
            listaAlumnos.innerHTML = `Nombre --- Edad -- Calificacion`;
            students = JSON.parse(recuperar_students);
            listaAlumnos.style.display = 'block';
            for (let alumno of students){
                listaAlumnos.innerHTML += `
                <div class="alumnoEnLista">
                    <h1>${alumno.nombre} ${alumno.edad} ${alumno.nota}</h1>
                </div>
                `;
            }
        }
    }

})

//-------------- Boton de buscar Alumnos --------//

btnBuscarAlumno.addEventListener("click", ()=>{
    if(busquedaForm.style.display == 'block'){
        busquedaForm.style.display = 'none';

    }else {
        busquedaForm.style.display = 'block';
        btnSearch.addEventListener("click", ()=>{
            fieldBusqueda = document.getElementById("task-nombreBusqueda").value;
            recuperar_students = localStorage.getItem("students");
            students = JSON.parse(recuperar_students);
            resultadoBusqueda = students.find(isStudent);
                if (resultadoBusqueda){
                    let actualizarOpcion = prompt(`El alumno ${fieldBusqueda} se encuentra en la base de datos \n1)Actualizar Nombre \n2)Actualizar edad \n3)Actualizar nota \n4)RETORNAR \nQue desea realizar?`);
                    divActualizar.style.display = 'block';
                    test.innerHTML += `
                    <label for="NombreNuevo">Nuevo Nombre:</label>
                    <input type="text" placeholder="Nombre nuevo del alumno" id="task-nuevoNombre">
                    `;
                    btnActualizar.style.display = 'block';
                    if (actualizarOpcion == 1){
                        resultadoBusqueda.setNombre(prompt("Introduzca un nuevo nombre"));
                    }else if (actualizarOpcion == 2){
                        resultadoBusqueda.setEdad(prompt("Introduzca una nueva Edad"));
                    }else if (actualizarOpcion == 3){
                        resultadoBusqueda.setNota(calculadorLetra(calculadorNotas()));
                    }
                    else {
                        alert("Opcion incorrecta.");
                    }
                }else {
                    alert(`El alumno ${fieldBusqueda} NO se encuentra en la base de datos`);
                }
        })
    }
})

opcionActualizar.addEventListener("change", (e) => {
    opcion = opcionActualizar.value;
    test.innerHTML = ``;
    console.log(opcion);
    if (opcion == 1 ){
        test.innerHTML += `
        <label for="NombreNuevo">Nuevo Nombre:</label>
        <input type="text" placeholder="Nombre nuevo del alumno" id="task-nuevoNombre">
        `;
    }   

})

btnActualizar.addEventListener("click", ()=>{   
    let nuevoDato = document.getElementById("task-nuevoNombre").value;
    console.log(resultadoBusqueda);
    recuperar_students = localStorage.getItem("students");
    students = JSON.parse(recuperar_students);
    resultadoBusqueda.nombre = nuevoDato;
    console.log(students);
    let students_JSON = JSON.stringify(students);
    localStorage.setItem("students", students_JSON);
    alert("Alumno Actualizado!");
})