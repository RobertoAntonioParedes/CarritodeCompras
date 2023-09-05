//variables
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

agregarEventListeners();

function agregarEventListeners(){
    //Agrega cursos al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    
    //vaciar carrito de compras
    btnCarrito.addEventListener('click', (e)=>{
        e.preventDefault();
        articulosCarrito = []; //reseteamos el arreglo
       
        limpiarHtml();  //eliminamos todo el HTML
    });
};


//funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCurso(cursoSeleccionado);
    }
    //console.log(e.target.classList);
};

//Eliminar un curso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso'));
    const cursoId = e.target.getAttribute('data-id');

    //Elmininar articulos del carrito
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );
    console.log(articulosCarrito);
    mostrarCarrito(); //Iterar sobre el carrito y mostrar su HTML
};

//Leer los datos del HTML del curso que se dio click y extraer esa informacion
function leerCurso(curso){

    //crear un objeto con el curso
    const infoCurso = {
        img : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.u-pull-right').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1,

    };

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregamos el curso al carrito 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    mostrarCarrito();
};

//muestra el carrito de compras en el HTML
function mostrarCarrito(){

    //Limpiar el HTML
    limpiarHtml();

    //Recorre el carrito y genera HTML
    articulosCarrito.forEach(curso=>{
        const {img, titulo, precio, cantidad, id } = curso; 
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td>
            <img src= "${img}" width="100"></img>;
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `
        //Agrega el HTML del carrito en el tbody
        listaCarrito.appendChild(row);
    });
};

//Elimina los cursos del tbody
function limpiarHtml(){
    //forma lenta
    //listaCarrito.innerHTML = ' ';
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
};














