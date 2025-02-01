const contenedor = document.querySelector('.desplegable-container');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar-carrito');
const botonOferta = document.querySelector('#boton-oferta-2');
const desplegableOferta = document.querySelector('.desp-oferta-2')

const contenedorCursos = document.querySelector('#contenedor-cursos');
const tablaCarrito = document.querySelector('#tabla-carrito');
const bodyTable = document.querySelector('#table-body');
const contCarrito = document.querySelector('.columna-tabla');
const vaciarCarrito = document.querySelector('#vaciar');
const comprarCarrito = document.querySelector('#comprar');
let articulosCarrito = [];
const alertaAgregado = document.querySelector('.alerta-agregado')

cargarEventListeners();
function cargarEventListeners(){

    abrir.addEventListener('click', () =>{

        contenedor.classList.remove('d-none');
    })
    
    cerrar.addEventListener('click', () =>{
    
        contenedor.classList.add('d-none');
    })

    botonOferta.addEventListener('click', (e) =>{

        e.preventDefault();

        desplegableOferta.classList.remove('d-none');

        setTimeout(() =>{

            desplegableOferta.classList.add('d-none');
        }, 4000)
    })

    contenedorCursos.addEventListener('click', agregarCurso);

    contCarrito.addEventListener('click', quitarCurso);

    vaciarCarrito.addEventListener('click', () =>{

        articulosCarrito = [];
        limpiarHTML();
    })

    comprarCarrito.addEventListener('click', (e) =>{

        e.preventDefault();

        const texto = document.createElement('p');
        texto.textContent = 'Compra realizada';
        texto.classList.add("bg-success", "text-light", "text-center", "mt-4", "alertas-width");

        articulosCarrito.forEach( curso =>{

            if(curso){

                contCarrito.appendChild(texto);
                setTimeout(() =>{
    
                texto.remove();
                articulosCarrito = [];
                limpiarHTML();
            }, 4000);
    
            } else {
    
                return;
            }
        })
    });

}

function agregarCurso(e){

    e.preventDefault();

    if(e.target.classList.contains('boton-curso')){

        const cursoSeleccionado = e.target.parentElement;
        leerDatosCurso(cursoSeleccionado);

    } else if (e.target.classList.contains('boton-sub')){

        const subSeleccion = e.target.parentElement.parentElement;
        leerDatosSub(subSeleccion);
    }
}

function leerDatosCurso(curso){

    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.titulo-curso').textContent,
        precio: curso.querySelector('.precio-descuento').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    
    if(existe){

        return;

    } else {

        articulosCarrito = [...articulosCarrito, infoCurso];
        compraRealizada();
    }

    console.log(articulosCarrito);
    crearHTML();
}

function leerDatosSub(sub){

    const infoSub = {

        imagen: sub.querySelector('img').src,
        titulo: sub.querySelector('.titulo-suscripcion').textContent,
        precio: sub.querySelector('.precio-sub-descuento').textContent,
        id: sub.querySelector('a').getAttribute('data-id')
    }

    const existe = articulosCarrito.some(sub => sub.id === infoSub.id);

    if(existe){

        return;

    } else {

        articulosCarrito = [...articulosCarrito, infoSub];
        compraRealizada();
    }

    console.log(articulosCarrito);
    crearHTML();
}

function crearHTML(){

    limpiarHTML();
    
    articulosCarrito.forEach(curso =>{

        const {imagen, titulo, precio, id} = curso;

        const fila = document.createElement('tr');
        fila.classList.add('tr-body');

        fila.innerHTML = `
        
            <td class="td-imagen p-2 td-body">
                <img src="${imagen}">
            </td>

            <td class="td-body">
                ${titulo}
            </td>

            <td class="td-body">
                ${precio}
            </td>
        
            <td class="td-body">
                ${id}
            </td>

            <td class="td-quitar td-body">
                <a href="#">
                    <img class="quitar-curso" src="img/cross-mark.png" data-id="${id}">
                </a>
            </td>
        `
        bodyTable.appendChild(fila);
    })
}

function limpiarHTML(){

    while(bodyTable.children[0]){

        bodyTable.removeChild(bodyTable.children[0])
    }
}

function quitarCurso(e){

    if(e.target.classList.contains('quitar-curso')){

        const cursoId = e.target.getAttribute('data-id');
        
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        crearHTML();
    }
}

function compraRealizada(){

    alertaAgregado.classList.remove('d-none');

    setTimeout(() => {
        alertaAgregado.classList.add('d-none')
    }, 3000);
}