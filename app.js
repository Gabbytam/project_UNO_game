console.log('(uno) what it isssss');

let cardType= ['red', 'yellow', 'green', 'blue'];
let cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'switch', 'reverse'];
let specialCardValue= ['wild Card', 'Wild Card +4'];

//MIGHT BE BETTER TO USE CLASS SO YOU CAN ACCESS TYPE AND VALUE 
class Card {
    constructor(type, value){
        this.type= type;
        this.value= value;
    }
}

class Factory {
    constructor() {
        this.deckOfCards= [];
        this.shuffledCards= [];
    }
    makeDeck(){
        for(let k= 0; k<2; k++){ //makes it so there can be 2 of each card
            for(let i= 0; i<cardType.length; i++){ //loops through the different color cards 
                for(let j= 0; j<cardValue.length; j++){ //loops through different available values for each color, because its a nested loop
                    let card= new Card(cardType[i], cardValue[j]); //creating a new card object that calls on our Card class, passing in the current cardType for the type and the cardValue for the value
                    this.deckOfCards.push(card); //adds this newly made object into our deckOfCards array 
                }
            }
        }   
        for(let f=0; f<4; f++){ //need to make 4 of each of these cards
            let card= new Card(specialCardValue[0], -1); //creates card using Card class passing in a specified type and value
            this.deckOfCards.push(card); //push that before moving on
            card= new Card(specialCardValue[1], '+4'); //same thing as above but for different type and value 
            this.deckOfCards.push(card);

        }
        console.log(this.deckOfCards); //able to see our deckOfCards
        //return this.deckOfCards;
    }
}

const deck= new Factory(); //have to instantiate(?) using Factory and set it to variable deck 
deck.makeDeck(); //call the makeDeck function on deck
console.log(deck); //now we see that deck contains a filled deckOfCards array



//DO IT WITH A FUNCTION
// let cardType= ['red', 'yellow', 'green', 'blue'];
// let cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'switch', 'reverse'];
// let specialCardValue= ['wild Card', 'Wild Card +4'];
// let deckOfCards= [];
// let shuffledCards= [];
// let generateDeck=()=> {

//     //series of for loops that will end up making 2 of each number card in each color 
//     for(let k=0; k<2; k++){ //runs twice so we can get double of each number card
//         for(let i=0; i<cardType.length; i++){ //runs the inner for loops for each color type of card
//             for(let j=0; j<cardValue.length; j++){//runs through all the values 
//                 deckOfCards.push(`Type: ${cardType[i]} Value: ${cardValue[j]}`); //each card thats made, with a color and a value, will be pushed into deckOfCards array
//             }
//         }
//     }
//     for(let f=0; f<4; f++){
//         deckOfCards.push(`Type: ${specialCardValue[0]} Value: 0`);
//         deckOfCards.push(`Type: ${specialCardValue[1]} Value: +4`);
//     }
// }
// generateDeck();
// console.log(deckOfCards);


document.addEventListener('DOMContentLoaded', ()=> {
    
})