import { multiverso } from "./model.js";
//este arreglo guarda los favoritos
let favoritos = [];

window.onload = () => {

    //cargarDatos();
    mostrarTodos();

    //Variables del modal
    const btnCerrar = document.querySelector('.cerrarModal');
    const btnCerrarInformacion = document.getElementById('cerrarInformacionModal');
    //fin Variables del modal

    
    // botones de busqueda 
    const btnMostrarVillanos = document.getElementById('btnVillanos');
    const btnMostrarHeroes = document.getElementById('btnHeroes');
    const btnMostrarTodos = document.getElementById('btnTodos');
    const btnMostrarFavoritos = document.getElementById('btnMostrarFavoritos');
    //fin botones de busqueda
    
    //funcion que crea la grilla de forma dinamica, dependiendo del tipo de arreglo
    const contenedor = document.getElementById('contenedor');
    const cargador = document.getElementById('cargador');
    
    //simularemos que la pagina se demora 3 segundos en cargar
    setTimeout(() => {

        mostrarVillanosYSuperHeroes(multiverso);
        mostrarTituloYSubtitulo();

        //mostrar el contenedor
        contenedor.classList.add('loader-mostrar');
        cargador.classList.add('loader-ocultar');
        
    }, 1000);

    //se va a buscar por ID al html el input y la guardo en una const llamada "buscador"
    const inputBuscadorPersonaje = document.getElementById('inputBuscar');
    
    //OPCION1
    // se agrega el 'eventListener' para la variable 'buscador'
    inputBuscadorPersonaje.addEventListener('input', (e) =>{

        //e.target es el input que gatillo el evento(input)
        const inputBuscar = e.target;
        
        //se transforma a minuscula lo que esta escrito en el 'inputBuscar'
        const textoInput = inputBuscar.value.toLowerCase();

        // //se crea una const llamada 'personajesFiltrados' que es igual al arreglo
        // //de objetos en este caso al multiverso y se le debe hacer 'filter'
        // //para un nuevo arreglo con una condicion determinada en este caso por
        // //el nombre y se determina si el texto escrito en el input esta contenido dentro del nombre del personaje
        // //
        const personajesFiltrados = multiverso.filter(personaje => personaje.nombre.toLowerCase().includes(textoInput));

        //se debe eliminar el div de la grilla de presonajes antes de volver a crearla
        eliminarGrilla();

        mostrarVillanosYSuperHeroes(personajesFiltrados);

    });

    
    // Escuchador: al hacer clic en la "X", cerramos el modal
    btnCerrar.addEventListener('click', () => {
        cerrarModal(modal);
    });

    // También cerramos si el usuario hace clic fuera del cuadro blanco
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal(modal);
    });

    btnCerrarInformacion.addEventListener('click',() =>{
        cerrarModal(modal);
    })

    //****Botones que van a mostrar a los personajes segun el tipo */

    btnMostrarHeroes.addEventListener('click', () =>{

        mostrarHeroes(modal,multiverso);
        
    })

    btnMostrarVillanos.addEventListener('click', () =>{
        
        mostrarVillanos(multiverso);

    })

    //PENDIENTE
    btnMostrarTodos.addEventListener('click', () =>{
        eliminarGrilla();
        mostrarVillanosYSuperHeroes(multiverso);
    })

    btnMostrarFavoritos.addEventListener('click', () =>{
        console.log(btnMostrarFavoritos);
        
        //DEBE PERMITIR 2 ACCIONES
        //AGREGAR A FAVORITOS Y QUITAR DE FAVORITOS

        if (favoritos.length === 0) {

            const divFavoritos = document.getElementById('mensaje');
            divFavoritos.textContent = 'No hay favoritos!';
            
        }


        const filtrados = multiverso.filter(personaje => favoritos.includes(personaje.id));
        // Esta línea de código en JavaScript crea un nuevo arreglo llamado filtrados que contiene solo los personajes del arreglo multiverso
        // cuyos IDs se encuentran en el arreglo favoritos. El método filter() itera sobre cada personaje en multiverso y, para cada uno, verifica
        // si su personaje.id está incluido en el arreglo favoritos. Si la condición favoritos.includes(personaje.id) es verdadera, el personaje se
        // incluye en el nuevo arreglo filtrados

        //INICIO EXPLICACION DETALLADA DE LA LINEA DE CODIGO 115
        // 1 const filtrados=... Declara una nueva constante llamada filtrados que almacenará el resultado del filtrado.
        // 2 multiverso.filter(...) = Llama al método filter() en el arreglo multiverso, que se usa para crear un nuevo arreglo con los elementos que cumplen una condición
        // 3 personaje => = Es una función flecha que se ejecuta para cada elemento del arreglo multiverso. El personaje representa el elemento actual que se está procesando
        // 4 favoritos.includes(personaje.id) = Es la condición del filtro. includes() comprueba si el arreglo favoritos contiene el id del personaje actual. Si lo contiene,
        // devuelve true y el personaje se incluye en filtrados; de lo contrario, devuelve false
        //FIN EXPLICACION DETALLADA DE LA LINEA DE CODIGO 115

        eliminarGrilla();
        mostrarVillanosYSuperHeroes(filtrados);

    })

    //CODIGO ACORDEON, aqui se va a buscar por clase del html, para las clases se ocupa "querySelector"
    const boton = document.querySelector('.acordeon-titulo');    
    const contenidoAcordion = document.querySelector('.acordeon-contenido');

    //evento click del boton acordeon
    boton.addEventListener('click', () =>{

        // Si está abierto → cerrarlo
        if (contenidoAcordion.style.maxHeight) {
            contenidoAcordion.style.maxHeight = null;
        }
        else {
            contenidoAcordion.style.maxHeight = null;

            // Abrir este acordeón
            contenidoAcordion.style.maxHeight = contenidoAcordion.scrollHeight + "px";
        }
    })
};

function mostrarTituloYSubtitulo() {

    // Crea el div que tendra ambos titulos
    const divContenedor = document.createElement('div');
    divContenedor.classList.add('tituloSubtitulo')

    //creacion del titulo con su clase titulo
    const titulo = document.createElement('h1');
    titulo.classList.add('titulo');
    titulo.textContent = 'Super Héroes';

    //creacion del subtitulo con su clase "subtitulo"
    const subtitulo = document.createElement('h2');
    subtitulo.classList.add('subtitulo');
    subtitulo.textContent = 'lista de super héroes';

    divContenedor.appendChild(titulo);
    divContenedor.appendChild(subtitulo);

    let titulosPrincipales = document.getElementById('contenedorTitulosEncabezado');
    titulosPrincipales.appendChild(divContenedor);
}

function mostrarVillanosYSuperHeroes(arregloPersonajes) {
    
        //aqui hago el contador de villanos y heroes
        // se Inicializa los contadores
        let contadoresHeroes = 0;
        let contadoresVillanos = 0;
        

    arregloPersonajes.forEach(personaje =>{

        //aqui filtro en el arreglo de objetos los personajes que tienen
        //el nivel mayor o igual a 7
        if (personaje.nivel >= 7) {

            //Crea el div tarjeta
            const divtarjetaPersonaje = document.createElement('div');
            //Agrega clase tarjeta, ya que el css lo requiere para darle estilos.
            divtarjetaPersonaje.classList.add('tarjeta');

            divtarjetaPersonaje.addEventListener('mouseenter', () => {
            	divtarjetaPersonaje.style.transform = 'scale(1.05)';
	            divtarjetaPersonaje.style.boxShadow = '0 0 15px white';
            })

            divtarjetaPersonaje.addEventListener('mouseleave', () =>{
                divtarjetaPersonaje.style.transform = 'scale(1)';
	            divtarjetaPersonaje.style.boxShadow = 'none';
            })

            //Crea el img y se le Agrega la ruta para crear dinamicamente
            //al personaje
            const img = document.createElement('img');
            img.src = personaje.img;

            //se crea un div en la informacion del personaje el cual es
            //una clase creada dinamicamente
            const infoPersonaje = document.createElement('div');
            infoPersonaje.classList.add('informacion-personaje');

            //le creamos el nombre que va a estar guardado en un h3
            //y se le asigna su nombre en textContent 
            const h3NombreDePersonaje = document.createElement('h3');
            h3NombreDePersonaje.textContent = personaje.nombre;

            //se Crea el universo en un p y se le asigna altiro su
            //universo en el textContent
            const pUniverso = document.createElement('p');
            pUniverso.textContent = personaje.universo;

            //se Crea el tipo en un p y se le asigna altiro su
            //tipo en el textContent
            const pTipoDePersonaje = document.createElement('p');
            pTipoDePersonaje.textContent = personaje.tipo;

            //se Crea el poder en un p y se le asigna altiro su
            //poder en el textContent
            const pPoderDePersonaje = document.createElement('p');
            pPoderDePersonaje.textContent = personaje.poder;

            //se Crea el nivel en un p y se le asigna altiro su
            //nivel en el textContent
            const pNivelDePersonaje = document.createElement('p');
            pNivelDePersonaje.textContent = personaje.nivel;

            const pregunta = document.createElement('p');
            pregunta.textContent = personaje.nivel;

            //boton para la estrella
            const estrellaVacia = '\u2606'; 
            const estrellaLlena = '\u2605';
            const btnEstrellaFavorito = document.createElement('button');            
            btnEstrellaFavorito.classList.add('btnEstrella');
            const icono = document.createElement('i');
            icono.classList.add('iconoDeEstrella');
            icono.innerHTML = estrellaVacia;

            icono.addEventListener('click', () =>{
                
                //pregunta si la estrella esta vacia entonces la llena con el color amarillo
                if (icono.innerHTML === estrellaVacia) {
                    //agregar personaje al arreglo favoritos
                    favoritos.push(personaje.id);
                    icono.innerHTML = estrellaLlena;
                    icono.style.color = 'yellow';
                } else {
                    icono.innerHTML = estrellaVacia;
                    icono.style.color = 'white';
                }                
            });

            //modal de personaje
            const btnModalPersonaje = document.createElement('button');
            btnModalPersonaje.classList.add('mostrar');
            btnModalPersonaje.textContent = 'Información';
            
                btnModalPersonaje.addEventListener('click', () =>{
                //creacion del contenido del modal llamadas por id desde el html
                const modal = document.getElementById('modal');
                abrirModal(modal);
                //inicio de 4 valores que son llamados por id y mostrados por el modal
                const imgPersonaje = document.getElementById('imagenPersonaje');
                imgPersonaje.src = personaje.img;
                const nombrePersonaje = document.getElementById('nombrePersonaje');
                nombrePersonaje.textContent = personaje.nombre;

                const poderPersonaje = document.getElementById('poderPersonaje');
                poderPersonaje.textContent = personaje.poder;
                const pDescripcionDePersonaje = document.getElementById('descripcionPersonaje');
                pDescripcionDePersonaje.textContent = personaje.descripcion;
                //fin a 4 valores

                //agregar la pregunta como hijo del acordeon contenido
                const acordeonContenido = document.querySelector('.acordeon-contenido');

                //se crea el mensaje de responder la pregunta
                const respuesta = document.createElement('p');
                respuesta.textContent = 'Si quieres ver la historia oculta del personaje responde la siguiente pregunta';
                
                //se crea el parrafo con la pregunta 
                const pregunta = document.createElement('p');
                pregunta.classList.add('preguntaGeneral');
                pregunta.textContent = personaje.historiaOculta.pregunta;
               
                //acordeonContenido.classList.add('acordeonPreguntas');;
                acordeonContenido.innerHTML = '';//aqui va este mensaje vacio para asi evitar que la pregunta se repita
                acordeonContenido.appendChild(respuesta);
                //se agrega como hijo la pregunta que tiene que responder el usuario al 
                acordeonContenido.appendChild(pregunta);//prepend: método de JavaScript que inserta uno o más nodos o cadenas de texto al principio de un elemento padre
                
                //crear un boton por cada alternativa de la historio oculta del personaje
                personaje.historiaOculta.alternativas.forEach(alternativa =>{

                    const botonOpciones = document.createElement('button');
                    botonOpciones.classList.add('detallesDescripcion');
                    console.log(botonOpciones);
                    
                    botonOpciones.textContent = alternativa;

                    //se crea el evento click a los botones de alrernativas
                    botonOpciones.addEventListener('click', (e) =>{

                        console.log("se hizo click");
                        
                        const textoBoton = e.target.textContent;//indica que se esta presionando
                        const descripcion = personaje.historiaOculta.descripcionHistoriaOculta;                        
                        
                        //si el usyario respondio correctamente
                        if (textoBoton === personaje.historiaOculta.respuestaCorrecta) {
                            
                            console.log("entro al if");
                            
                            //ahora se debe mostrar la historia oculta del personaje
                            //mostrar el p con id texto historia
                            const phistoriaOculta = document.getElementById('textoHistoria');
                            console.log(phistoriaOculta);
                            
                            phistoriaOculta.classList.remove('ocultar');
                            phistoriaOculta.classList.add('mostrar');
                        }
                        else{}
                    })
                    
                    //se agrega dinamicamente como hijos los botones alternativas a al acordeon
                    acordeonContenido.appendChild(botonOpciones);

                })//FIN DEL FOREACH BOTONES DE ALTERNATIVA

                //Se crea dinamicamente un p el cual me representa la historia oculta y se lopaso como hijo al acordeon
                const pHistoriaOculta = document.createElement('p');
                pHistoriaOculta.id = 'textoHistoria';
                pHistoriaOculta.classList.add('ocultar');
                acordeonContenido.appendChild(pHistoriaOculta);
                pHistoriaOculta.textContent = personaje.historiaOculta.descripcionHistoriaOculta; 
            })

            //Agrega el img como hijo al div tarjetaPersonaje
            // divtarjetaPersonaje.appendChild(h1);
            divtarjetaPersonaje.appendChild(img);
            //Agrega h3 como hijo al div informacion
            infoPersonaje.appendChild(h3NombreDePersonaje);
            //le agreganmos los p como hijo al div info
            infoPersonaje.appendChild(pUniverso);
            infoPersonaje.appendChild(pTipoDePersonaje);
            infoPersonaje.appendChild(pPoderDePersonaje);
            infoPersonaje.appendChild(pNivelDePersonaje);
            infoPersonaje.appendChild(btnModalPersonaje);
            infoPersonaje.appendChild(icono);
            divtarjetaPersonaje.appendChild(infoPersonaje);

            let divGrillaDePeliculasMultiuniverso = document.getElementById('grillaSuperHeroesYVillanos');
            identificarTipoPersonaje(personaje, divtarjetaPersonaje);           
            identificarUniverso(personaje,divtarjetaPersonaje);

            // se pregunta por el tipo y se va sumando
            if (personaje.tipo === 'Héroe') {
                contadoresHeroes++;
            }else if (personaje.tipo === 'Villano') {
                contadoresVillanos++;
            }            
            divGrillaDePeliculasMultiuniverso.appendChild(divtarjetaPersonaje);
                
        }//cierre del if

    })//cierre foreach
}

// Función para abrir el modal
function abrirModal(modal) {
    
  // Primero quitamos la clase "hidden" para que sea visible
  modal.classList.remove('hidden');
  
  // Pequeño truco: forzamos un reflow para asegurar la animación
  void modal.offsetWidth;
  // Luego agregamos la clase "show" para activar la transición CSS
  modal.classList.add('show');
}

// Función para cerrar el modal
function cerrarModal(modal) {
  // Quitamos la clase "show" para iniciar la animación de salida (explicado en tutotial Modal)
  modal.classList.remove('show');

  // Volvemos a ocultar el Modal
  modal.classList.add('hidden');
}

function identificarTipoPersonaje(personaje, divtarjetaPersonaje) {
    //aqui pregunto y meto clases dinamicamente
    if (personaje.tipo === 'Villano') {
        divtarjetaPersonaje.classList.add('resplandorRojo');
    }else if (personaje.tipo === 'Héroe') {
        divtarjetaPersonaje.classList.add('resplandorAzul');
    }
}

function identificarUniverso(personaje, divtarjetaPersonaje) {

    if (personaje.universo === 'Marvel') {
        divtarjetaPersonaje.classList.add('colorDeFondomarvel');
    }else if (personaje.universo === 'DC') {
        divtarjetaPersonaje.classList.add('colorDeFondoDC');
    }
    
}

//CREACION DE LAS FUNCIONES QUE Se ENCARGARAN DE FILTRAR A LOS 
//PERSONAJES

//esta funcion se encarga de mostrar los villanos de la siguiente manera: recibe como parametros el "modal" la informacion que tiene
// cuando se presiona "informacion" del personaje y el "multiverso" que es arreglo de objetos
function mostrarVillanos(multiverso) {
    // aqui se debe programar el filter(), sirve para encontrar en el multiverso el tipo de personaje que tiene la palabra "heroe" y
    //si es asi lo incluye y que repite sobre cada personaje en el arreglo multiverso
    const villanos = multiverso.filter(personaje => personaje.tipo === 'Villano');
    //vaciar la grilla de personajes
    eliminarGrilla();
    //busca a los villanos
    mostrarVillanosYSuperHeroes(villanos);

}

//esta funcion se encarga de mostrar los heroes de la siguiente manera: recibe como parametros el "modal" la informacion que tiene
// el modal cuando se presiona "informacion" del personaje y el "multiverso" que es arreglo de objetos
function mostrarHeroes(modal,multiverso) {
    // aqui se debe programar el filter(), sirve para encontrar en el multiverso el tipo de personaje que tiene la palabra "heroe" y
    //si es asi lo incluye y que repite sobre cada personaje en el arreglo multiverso
    const heroesBuenos = multiverso.filter(personaje => personaje.tipo === 'Héroe'); 
    //vaciar la grilla de personajes
    eliminarGrilla();
    mostrarVillanosYSuperHeroes(heroesBuenos);
}

//PENDIENTE
function mostrarTodos() {
    // aqui se debe programar el filter()
    const todosLosPersonajes = document.getElementById('listaDePersonajes');
}

//HECHA
function eliminarGrilla() {
    const vacia = document.getElementById('grillaSuperHeroesYVillanos');
    vacia.innerHTML = '';

}





