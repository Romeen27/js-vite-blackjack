import _ from 'underscore';


/**
 * 
 * @param {string[]} tiposDeCarta  
 * @param {string[]} tiposEspeciales 
 * @returns {string[]} retorna un arreglo de cartas
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if (!tiposDeCarta || tiposDeCarta.length === 0) throw new Error ('tiposDeCarta debe ser un arreglo de strings');

    let deck = [];
    
    for (let i = 2; i <= 10; i++) {
    for ( let tipo of tiposDeCarta) {
        deck.push(i + tipo);
        }
    }

    for( let tipo of tiposDeCarta) {
        for (let esp of tiposEspeciales) {
            deck.push(esp + tipo);
        }
    }

    return _.shuffle(deck);
   
    
}

// export default crearDeck;