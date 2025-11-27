import { animales } from "./modelo.js";

window.onload = () => {

    cargarGaleriaDeAnimales();
}

function cargarGaleriaDeAnimales() {

    // 1. Crear el contenedor principal
    const galeriaDeAnimales = document.createElement('section');
    //2 recorrer el arreglo con foreach
    animales.forEach(animal =>{
        // 3. Crear un <div> con clase animal-tarjeta
        const animalTarjeta = document.createElement('div');
        animalTarjeta.className = 'animal-tarjeta';

        // se crea un img del animal y se le pasa la ruta
        const img = document.createElement('img');
        img.src = animal.img;

        // Agregamos un h4 con el nombre del animal
        const nombreH4 = document.createElement('h4');
        nombreH4.textContent = animal.nombre;
       
        //Agregamos un p con el tipo del animal
        const tipoP = document.createElement('p');
        tipoP.textContent = `Tipo: ${animal.tipo}`;

        //se agrena como hijos al div
        animalTarjeta.appendChild(img);
        animalTarjeta.appendChild(nombreH4);
        animalTarjeta.appendChild(tipoP);

        //Añadir cada tarjeta al contenedor principal
        galeria.appendChild(animalTarjeta);
    })

        document.body.appendChild(galeriaDeAnimales);
    
}