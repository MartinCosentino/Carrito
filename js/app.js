// VAR
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
// LISTENERS
cargarEventListeners();
function cargarEventListeners(){ //Dispara cuando se presiona Agregar Carrito
    cursos.addEventListener('click', comprarCurso);

// Cuando se elimina un curose del carrito
carrito.addEventListener('click', eliminarCurso);
}

//vaciar todo el carrito
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//Al cargar el documento, mostarar LocalStorage
document.addEventListener('DOMContentLoaded', leerLocalStorage);


// FUNCTIONS

//Funcion que AÑADE EL CURSO AL CARRITO
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar-carrito
    if  (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement; //1er partent =  info card, 2do parent = Card.
        //enviamos el curso seleccionado para tomar sus datos<<
        leerDatosCurso(curso);
    }

}
//lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        // id : curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

}

//Muesta el curso seleccionado en el carrito

function insertarCarrito(curso){

        const row = document.createElement('tr');
        row.innerHTML= `
        <td><img src="${curso.imagen}" width=100>        </td>
        <td>${curso.titulo}        </td>
        <td>${curso.precio}        </td>
        <td>
           <a href='#' class="borrar-curso" data-id="${curso.id}">X</a>
        </td>

        `;
        listaCursos.appendChild(row);

        guardarCursoLocalStorage(curso);
}
//elimina el curso del carrito en el DOM

function eliminarCurso(e){

    e.preventDefault();

   let curso,
        cursoID;
   if(e.target.classList.contains('borrar-curso') ){
       e.target.parentElement.parentElement.remove();//1er parent va al TD, 2do al TR
       curso=  e.target.parentElement.parentElement;
       cursoId = curso.querySelector('a').getAttribute('data-id');

   }

   eliminarCursoLocalStorage(cursoId);
}

//elimina los curos del carrito en el dom

function vaciarCarrito(){
    //forma lenta

    // listaCursos.innerHTML = '';

    //forma rápida y mejor

    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar Local Storage
    vaciarLocalStorage();

    return false;

}

// almacena cursos en elcarrito en el local Storage

function guardarCursoLocalStorage(curso){
    let cursos;
    //toma el valor de un arreglo con datos de localStorage o vacio
    cursos = obtenerCursosLocalStorage();

    //el curso se agrega al final del arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en el localstorage
    if(localStorage.getItem('cursos') === null){
        cursosLS =[];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));//JSON.parse para guardar el string como arreglo
    }
    return cursosLS;
}
 

//imprime los cuross del local storage en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS= obtenerCursosLocalStorage();

cursosLS.forEach(function(curso){
    //consturir el template
    
    const row = document.createElement('tr');
    row.innerHTML= `
    <td><img src="${curso.imagen}" width=100>        </td>
    <td>${curso.titulo}        </td>
    <td>${curso.precio}        </td>
    <td>
       <a href='#' class="borrar-curso" data-id="${curso.id}">X</a>
    </td>

    `;
    listaCursos.appendChild(row);
});
}

//Elimina el curso por el ID en el Local Storage

function eliminarCursoLocalStorage(curso){
   let cursosLS;
    //Obtenemos el arreglo de cursos
   cursosLS = obtenerCursosLocalStorage();
   //Itreamos comparando el ID del cruso borrado con los del LocalStorage
   cursosLS.forEach(function(cursoLS, index){
       if (cursoLS.id === curso) {
           cursosLS.splice(index, 1);
           
       }
   });
//Añadimos el arreglo actual a storage
localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//elimina todos lso cursos del localstorage
function vaciarLocalStorage() {
    localStorage.clear();
}