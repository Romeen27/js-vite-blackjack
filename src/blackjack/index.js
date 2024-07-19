import _ from 'underscore';
import {crearDeck, pedirCarta, valorCarta} from './usecases';

const miModulo = (() => {
    'use strict';

   let deck = [];
   const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

   // Referencias del HTML
   const btnPedir = document.querySelector('#btnPedir');
   const btnDetener = document.querySelector('#btnDetener');
   const btnNuevo = document.querySelector('#btnNuevo');
   const puntosHTML = document.querySelectorAll('small');
   const divCartasJugadores = document.querySelectorAll('.divCartas');

   // inicializar el juego
   const inicializarJuego = (numJugadores = 2) => {
       deck = crearDeck(tipos, especiales);

       puntosJugadores = [];
       for(let i = 0; i<numJugadores; i++) {
           puntosJugadores.push(0);

       puntosHTML.forEach(elem => elem.innerText = 0);
       divCartasJugadores.forEach(elem => elem.innerHTML = '');
       
       btnDetener.disabled = false;
       btnPedir.disabled = false;
   }}

   // Turno: 0 = primer jugador y el último será la computadora
   const acumularPuntos = (carta, turno) => {

       puntosJugadores[turno] += valorCarta(carta);
       puntosHTML[turno].innerText = puntosJugadores[turno];
       return puntosJugadores[turno];
   }

   const crearCarta = (carta, turno) => {
       const imgCarta = document.createElement('img');
       imgCarta.src = `assets/cartas/${carta}.png`;
       imgCarta.classList.add('carta');
       divCartasJugadores[turno].append(imgCarta);
   }

   const determinarGanador = () => {

       const [puntosMinimos, puntosComputadora] = puntosJugadores;

       setTimeout(() => {
             if ( puntosMinimos > 21 && puntosComputadora <= 21) {
               alert('Computadora Gana');
           } else if ( puntosMinimos <= 21 && puntosComputadora > 21) {
               alert('Jugador Gana');
           } else if ( puntosMinimos < 21 && puntosComputadora <= 21) {
               alert('Computadora Gana');
           }
   }, 100);
       };
   

   // Turno de la computadora
   const turnoComputadora = (puntosMinimos) => {

       let puntosComputadora = 0;

       do {
       const carta = pedirCarta(deck);
       puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1); // turno computadora
       crearCarta(carta, puntosJugadores.length - 1); // turno computadora
           
       } while( (puntosComputadora < puntosMinimos) &&  (puntosMinimos <= 21)  );

       determinarGanador();
   };

   // Eventos

   btnPedir.addEventListener('click', () => {
       const carta = pedirCarta(deck);
       const puntosJugador = acumularPuntos(carta, 0); // turno jugador

       crearCarta(carta, 0);

       if (puntosJugador > 21) {
           console.warn('Perdiste, has pasado de 21 puntos');
           btnPedir.disabled = true;
           btnDetener.disabled = true;
           turnoComputadora(puntosJugador);
       } else if (puntosJugador === 21){
           console.warn('21, genial!');
           btnPedir.disabled = true;
           btnDetener.disabled = true;
           turnoComputadora(puntosJugador);
       }
   })

   btnDetener.addEventListener('click', () => {
       const puntosJugador = puntosJugadores[0]; 
       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora(puntosJugador);

   } )


   btnNuevo.addEventListener('click', () => {

       inicializarJuego();
   })

   return {
        nuevoJuego: inicializarJuego()
   }

})();
