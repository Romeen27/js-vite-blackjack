

   // Esta función me permite tomar una carta
  export const pedirCarta = (deck) => {
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja'
    }

    return deck.pop();
}
